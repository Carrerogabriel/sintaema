"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { companies } from "@/data/companies";
import { categories } from "@/data/site";
import { slugify } from "@/lib/panel-format";
import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { removeStored, storeImage, uploadedMediaName } from "@/server/files";
import { getPostById, uniqueSlug } from "@/server/posts";

const validCompanies = new Set(companies.map((c) => c.slug));

function readCompanies(formData: FormData) {
  if (formData.get("todas") === "on") return [];
  return formData
    .getAll("empresas")
    .map(String)
    .filter((slug) => validCompanies.has(slug));
}

function refreshSite() {
  revalidatePath("/", "layout");
}

const go = (path: string, message: string, kind: "ok" | "erro" = "ok") =>
  redirect(`${path}${path.includes("?") ? "&" : "?"}${kind}=${encodeURIComponent(message)}`);

// ---------------------------------------------------------------- Notícias

export type PostFormState = { error?: string } | undefined;

export async function savePostAction(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const user = await requireUser("jornalista");
  const id = Number(formData.get("id")) || undefined;
  const existing = id ? getPostById(id) : undefined;
  if (id && !existing) return { error: "Matéria não encontrada." };

  const title = String(formData.get("titulo") ?? "").trim();
  const excerpt = String(formData.get("resumo") ?? "").trim();
  const content = String(formData.get("texto") ?? "").replace(/\r\n/g, "\n").trim();
  const category = String(formData.get("categoria") ?? "");
  const date = String(formData.get("data") ?? "");
  const imageAlt = String(formData.get("legenda") ?? "").trim();
  const status = formData.get("status") === "rascunho" ? "rascunho" : "publicado";
  const featured = formData.get("destaque") === "on" ? 1 : 0;
  const companyList = readCompanies(formData);
  const slugInput = slugify(String(formData.get("slug") ?? "") || title);

  if (!title) return { error: "Informe o título." };
  if (!content) return { error: "Escreva o texto da matéria." };
  if (!(categories as readonly string[]).includes(category)) return { error: "Escolha uma categoria." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Informe a data." };
  if (formData.get("todas") !== "on" && companyList.length === 0) {
    return { error: "Escolha ao menos uma empresa, ou marque “Todas as empresas”." };
  }

  let image = existing?.image ?? "";
  const upload = formData.get("imagem");
  if (upload instanceof File && upload.size > 0) {
    try {
      const saved = await storeImage(upload);
      const old = uploadedMediaName(image);
      if (old) removeStored("midia", old);
      image = `/midia/${saved.storedName}`;
    } catch (error) {
      return { error: (error as Error).message };
    }
  } else if (formData.get("remover_imagem") === "on") {
    const old = uploadedMediaName(image);
    if (old) removeStored("midia", old);
    image = "";
  }

  const slug = uniqueSlug(slugInput, id);
  const values = [
    slug, title, excerpt || content.split("\n")[0].slice(0, 220), content, category, date,
    image, imageAlt || title, featured, JSON.stringify(companyList), status,
  ];

  if (featured) db().prepare("UPDATE posts SET featured = 0 WHERE id IS NOT ?").run(id ?? null);

  if (existing) {
    db()
      .prepare(
        `UPDATE posts SET slug = ?, title = ?, excerpt = ?, content = ?, category = ?, date = ?, image = ?,
         image_alt = ?, featured = ?, companies = ?, status = ?, updated_at = datetime('now') WHERE id = ?`,
      )
      .run(...values, existing.id);
  } else {
    db()
      .prepare(
        `INSERT INTO posts (slug, title, excerpt, content, category, date, image, image_alt, featured, companies, status, author_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(...values, user.id);
  }

  refreshSite();
  go(
    "/painel/conteudo",
    existing
      ? `Matéria “${title.slice(0, 40)}” atualizada.`
      : status === "rascunho"
        ? "Rascunho salvo."
        : "Matéria publicada!",
  );
}

export async function deletePostAction(formData: FormData) {
  await requireUser("jornalista");
  const post = getPostById(Number(formData.get("id")));
  if (!post) go("/painel/conteudo", "Matéria não encontrada.", "erro");
  db().prepare("DELETE FROM posts WHERE id = ?").run(post!.id);
  const media = uploadedMediaName(post!.image);
  if (media) removeStored("midia", media);
  refreshSite();
  go("/painel/conteudo", "Matéria excluída.");
}

export async function togglePostStatusAction(formData: FormData) {
  await requireUser("jornalista");
  const post = getPostById(Number(formData.get("id")));
  if (!post) go("/painel/conteudo", "Matéria não encontrada.", "erro");
  const next = post!.status === "publicado" ? "rascunho" : "publicado";
  db().prepare("UPDATE posts SET status = ?, updated_at = datetime('now') WHERE id = ?").run(next, post!.id);
  refreshSite();
  go("/painel/conteudo", next === "publicado" ? "Matéria publicada." : "Matéria movida para rascunhos.");
}

// ---------------------------------------------------------------- Agenda

export async function saveEventAction(formData: FormData) {
  await requireUser("jornalista");
  const id = Number(formData.get("id")) || undefined;
  const title = String(formData.get("titulo") ?? "").trim();
  const date = String(formData.get("data") ?? "");
  const place = String(formData.get("local") ?? "").trim();
  const description = String(formData.get("descricao") ?? "").trim();
  const companyList = readCompanies(formData);
  const back = "/painel/conteudo/agenda";

  if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(date)) go(back, "Informe título e data.", "erro");

  if (id) {
    db()
      .prepare(
        "UPDATE events SET title = ?, date = ?, place = ?, description = ?, companies = ?, updated_at = datetime('now') WHERE id = ?",
      )
      .run(title, date, place, description, JSON.stringify(companyList), id);
  } else {
    db()
      .prepare("INSERT INTO events (title, date, place, description, companies) VALUES (?, ?, ?, ?, ?)")
      .run(title, date, place, description, JSON.stringify(companyList));
  }
  refreshSite();
  go(back, id ? "Evento atualizado." : "Evento adicionado à agenda.");
}

export async function deleteEventAction(formData: FormData) {
  await requireUser("jornalista");
  db().prepare("DELETE FROM events WHERE id = ?").run(Number(formData.get("id")));
  refreshSite();
  go("/painel/conteudo/agenda", "Evento excluído.");
}

// ---------------------------------------------------------------- Informativos

export async function saveBulletinAction(formData: FormData) {
  await requireUser("jornalista");
  const id = Number(formData.get("id")) || undefined;
  const name = String(formData.get("nome") ?? "").trim();
  const issue = String(formData.get("edicao") ?? "").trim();
  const summary = String(formData.get("resumo") ?? "").trim();
  const companyList = readCompanies(formData);
  const back = "/painel/conteudo/informativos";

  if (!name) go(back, "Informe o nome do informativo.", "erro");

  if (id) {
    db()
      .prepare(
        "UPDATE bulletins SET name = ?, issue = ?, summary = ?, companies = ?, updated_at = datetime('now') WHERE id = ?",
      )
      .run(name, issue, summary, JSON.stringify(companyList), id);
  } else {
    db()
      .prepare(
        "INSERT INTO bulletins (name, issue, summary, companies, sort_order) VALUES (?, ?, ?, ?, (SELECT COALESCE(MIN(sort_order), 0) - 1 FROM bulletins))",
      )
      .run(name, issue, summary, JSON.stringify(companyList));
  }
  refreshSite();
  go(back, id ? "Informativo atualizado." : "Informativo adicionado.");
}

export async function deleteBulletinAction(formData: FormData) {
  await requireUser("jornalista");
  db().prepare("DELETE FROM bulletins WHERE id = ?").run(Number(formData.get("id")));
  refreshSite();
  go("/painel/conteudo/informativos", "Informativo excluído.");
}
