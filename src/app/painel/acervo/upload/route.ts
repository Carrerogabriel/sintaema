import { revalidatePath } from "next/cache";
import { companies } from "@/data/companies";
import { currentUser } from "@/server/auth";
import { db } from "@/server/db";
import { cleanTitle, DOC_TYPES, guessYear } from "@/server/documents";
import { storeArchiveFile } from "@/server/files";

const validCompanies = new Set(companies.map((c) => c.slug));

/** Receives one archive file per request (the uploader sends files one by one). */
export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) return Response.json({ error: "Sessão expirada. Entre novamente." }, { status: 401 });
  if (user.role !== "admin" && user.role !== "jornalista") {
    return Response.json({ error: "Seu perfil só pode consultar o acervo." }, { status: 403 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Envio inválido." }, { status: 400 });
  }

  const file = form.get("arquivo");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Nenhum arquivo recebido." }, { status: 400 });
  }

  const docType = String(form.get("tipo") ?? "");
  if (!(DOC_TYPES as readonly string[]).includes(docType)) {
    return Response.json({ error: "Tipo de documento inválido." }, { status: 400 });
  }
  const company = String(form.get("empresa") ?? "");
  if (company && !validCompanies.has(company)) {
    return Response.json({ error: "Empresa inválida." }, { status: 400 });
  }

  const docDate = String(form.get("data") ?? "");
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(docDate) ? docDate : null;
  const yearInput = Number(form.get("ano"));
  const year = validDate
    ? Number(validDate.slice(0, 4))
    : yearInput >= 1900 && yearInput <= 2100
      ? yearInput
      : guessYear(file.name);

  let saved;
  try {
    saved = await storeArchiveFile(file);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }

  const title = String(form.get("titulo") ?? "").trim() || cleanTitle(file.name);
  const result = db()
    .prepare(
      `INSERT INTO documents (title, doc_type, edition, doc_date, year, company, tags, description,
        file_name, stored_name, mime, size, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      title,
      docType,
      String(form.get("edicao") ?? "").trim(),
      validDate,
      year,
      company,
      String(form.get("tags") ?? "").trim(),
      String(form.get("descricao") ?? "").trim(),
      file.name,
      saved.storedName,
      saved.mime,
      saved.size,
      user.id,
    );

  revalidatePath("/painel/acervo");
  return Response.json({ id: Number(result.lastInsertRowid) });
}
