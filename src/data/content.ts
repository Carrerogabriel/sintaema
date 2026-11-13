/**
 * Conteúdo público do site, lido do banco de dados.
 * Só use em código de servidor (páginas, rotas, geração de PDF).
 * Componentes do navegador devem importar de "@/data/site".
 */
import { db, parseCompanies } from "@/server/db";
import type { Bulletin, Category, Post, SiteEvent } from "./site";

export { categories, site } from "./site";
export type { Bulletin, Category, Post, SiteEvent } from "./site";

type PostRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  image_alt: string;
  featured: number;
  companies: string;
};

export function rowToPost(row: PostRow): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
    category: row.category as Category,
    date: row.date,
    image: row.image || "/images/destaque.jpg",
    imageAlt: row.image_alt,
    featured: row.featured === 1,
    companies: parseCompanies(row.companies),
  };
}

const belongsTo = (item: { companies?: string[] }, company: string) =>
  !item.companies || item.companies.length === 0 || item.companies.includes(company);

function publishedPosts(): Post[] {
  const rows = db()
    .prepare(
      "SELECT * FROM posts WHERE status = 'publicado' ORDER BY date DESC, id DESC",
    )
    .all() as PostRow[];
  return rows.map(rowToPost);
}

export function postsFor(company: string): Post[] {
  return publishedPosts().filter((post) => belongsTo(post, company));
}

export function eventsFor(company: string): SiteEvent[] {
  const rows = db().prepare("SELECT * FROM events ORDER BY date DESC").all() as Array<
    Omit<SiteEvent, "companies"> & { companies: string }
  >;
  return rows
    .map((row) => ({ ...row, companies: parseCompanies(row.companies) }))
    .filter((event) => belongsTo(event, company));
}

export function bulletinsFor(company: string): Bulletin[] {
  const rows = db().prepare("SELECT * FROM bulletins ORDER BY sort_order, id").all() as Array<
    Omit<Bulletin, "companies"> & { companies: string }
  >;
  return rows
    .map((row) => ({ ...row, companies: parseCompanies(row.companies) }))
    .filter((bulletin) => belongsTo(bulletin, company));
}

export function getPost(slug: string, company: string) {
  return postsFor(company).find((post) => post.slug === slug);
}

export function relatedPosts(slug: string, company: string, limit = 3) {
  const current = getPost(slug, company);
  const pool = postsFor(company).filter((post) => post.slug !== slug);
  const same = pool.filter((post) => post.category === current?.category);
  return [...same, ...pool.filter((post) => post.category !== current?.category)].slice(
    0,
    limit,
  );
}

export function searchPosts(query: string, company: string) {
  const list = postsFor(company);
  const q = query
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  if (!q) return list;
  return list.filter((post) =>
    [post.title, post.excerpt, post.category, ...post.content]
      .join(" ")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .includes(q),
  );
}
