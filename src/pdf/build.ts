import { renderToBuffer } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import type { DocumentProps } from "@react-pdf/renderer";
import type { Company } from "@/data/companies";
import { eventsFor, getPost, postsFor, type Category } from "@/data/content";
import { registerFonts } from "./assets";
import {
  AboutDocument,
  AgendaDocument,
  ArticleDocument,
  JoinDocument,
  LegalDocument,
  NewsDigestDocument,
} from "./documents";
import { HistoryDocument } from "./history";

/**
 * Documentos disponíveis em PDF. O caminho após /[empresa]/pdf/ espelha a
 * página do site: "noticias", "noticias/<slug>", "historia", "agenda",
 * "sobre", "juridico" e "filie-se".
 */
export type BuiltPdf = { buffer: Buffer; filename: string };

const CATEGORIES: Category[] = ["Notícias", "Lutas", "Eleições", "Jurídico", "Agenda"];

export async function buildPdf(
  company: Company,
  segments: string[],
  options: { origin: string; categoria?: string | null },
): Promise<BuiltPdf | null> {
  registerFonts();
  const [kind, slug, ...rest] = segments;
  if (rest.length) return null;

  const pagePath = `/${company.slug}/${segments.join("/")}`;
  const onlineUrl = `${options.origin}${pagePath}`.replace(/^https?:\/\//, "");
  const ctx = { company, onlineUrl };
  const name = (s: string) => `sintaema-${company.slug}-${s}.pdf`;

  let element: ReactElement<DocumentProps>;
  let filename: string;

  switch (kind) {
    case "noticias": {
      if (slug) {
        const post = getPost(slug, company.slug);
        if (!post) return null;
        element = await ArticleDocument({ ...ctx, post });
        filename = name(post.slug);
      } else {
        const category = CATEGORIES.find((c) => c === options.categoria);
        const posts = postsFor(company.slug)
          .filter((post) => !category || post.category === category)
          .sort((a, b) => b.date.localeCompare(a.date));
        element = await NewsDigestDocument({ ...ctx, posts, category });
        filename = name(category ? `caderno-${category.toLowerCase()}` : "caderno-de-noticias");
      }
      break;
    }
    case "historia":
      if (slug) return null;
      element = await HistoryDocument(ctx);
      filename = name("historia");
      break;
    case "agenda": {
      if (slug) return null;
      const events = [...eventsFor(company.slug)].sort((a, b) => b.date.localeCompare(a.date));
      element = await AgendaDocument({ ...ctx, events });
      filename = name("agenda");
      break;
    }
    case "sobre":
      if (slug) return null;
      element = await AboutDocument(ctx);
      filename = name("o-sindicato");
      break;
    case "juridico":
      if (slug) return null;
      element = await LegalDocument(ctx);
      filename = name("juridico");
      break;
    case "filie-se":
      if (slug) return null;
      element = await JoinDocument(ctx);
      filename = name("filiacao");
      break;
    default:
      return null;
  }

  const buffer = await renderToBuffer(element);
  return { buffer, filename: filename.normalize("NFD").replace(/[̀-ͯ]/g, "") };
}
