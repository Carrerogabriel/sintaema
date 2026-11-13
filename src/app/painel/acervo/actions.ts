"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { companies } from "@/data/companies";
import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { DOC_TYPES, getDocument } from "@/server/documents";
import { removeStored } from "@/server/files";

const validCompanies = new Set(companies.map((c) => c.slug));

export async function updateDocumentAction(formData: FormData) {
  await requireUser("jornalista");
  const doc = getDocument(Number(formData.get("id")));
  if (!doc) redirect("/painel/acervo?erro=Documento%20n%C3%A3o%20encontrado.");

  const title = String(formData.get("titulo") ?? "").trim();
  const docType = String(formData.get("tipo") ?? "");
  const company = String(formData.get("empresa") ?? "");
  const docDate = String(formData.get("data") ?? "");
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(docDate) ? docDate : null;
  const yearInput = Number(formData.get("ano"));
  const year = validDate ? Number(validDate.slice(0, 4)) : yearInput >= 1900 && yearInput <= 2100 ? yearInput : null;
  const back = `/painel/acervo/${doc!.id}`;

  if (!title) redirect(`${back}?erro=${encodeURIComponent("Informe o título.")}`);
  if (!(DOC_TYPES as readonly string[]).includes(docType)) redirect(`${back}?erro=${encodeURIComponent("Tipo inválido.")}`);
  if (company && !validCompanies.has(company)) redirect(`${back}?erro=${encodeURIComponent("Empresa inválida.")}`);

  db()
    .prepare(
      `UPDATE documents SET title = ?, doc_type = ?, edition = ?, doc_date = ?, year = ?, company = ?,
       tags = ?, description = ?, updated_at = datetime('now') WHERE id = ?`,
    )
    .run(
      title,
      docType,
      String(formData.get("edicao") ?? "").trim(),
      validDate,
      year,
      company,
      String(formData.get("tags") ?? "").trim(),
      String(formData.get("descricao") ?? "").trim(),
      doc!.id,
    );
  revalidatePath("/painel/acervo");
  redirect(`/painel/acervo?ok=${encodeURIComponent("Documento atualizado.")}`);
}

export async function deleteDocumentAction(formData: FormData) {
  await requireUser("jornalista");
  const doc = getDocument(Number(formData.get("id")));
  if (!doc) redirect("/painel/acervo");
  db().prepare("DELETE FROM documents WHERE id = ?").run(doc!.id);
  removeStored("acervo", doc!.stored_name);
  revalidatePath("/painel/acervo");
  redirect(`/painel/acervo?ok=${encodeURIComponent("Documento excluído do acervo.")}`);
}
