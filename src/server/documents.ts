import { db } from "./db";

export const DOC_TYPES = [
  "Bomba d'Água",
  "Boletim / Informativo",
  "Ata de assembleia",
  "Ata de reunião",
  "Acordo coletivo (ACT)",
  "Ofício",
  "Processo jurídico",
  "Relatório / Prestação de contas",
  "Estatuto / Regimento",
  "Foto",
  "Outro",
] as const;

export type DocumentRecord = {
  id: number;
  title: string;
  doc_type: string;
  edition: string;
  doc_date: string | null;
  year: number | null;
  company: string;
  tags: string;
  description: string;
  file_name: string;
  stored_name: string;
  mime: string;
  size: number;
  uploaded_by: number | null;
  uploader_name: string | null;
  created_at: string;
};

export type DocFilters = {
  q?: string;
  tipo?: string;
  empresa?: string;
  de?: string;
  ate?: string;
  ordem?: string;
  pagina?: string;
};

export const PAGE_SIZE = 25;

/** Turns free text into an FTS5 query: every word must match, as a prefix. */
export function ftsQuery(text: string) {
  const words = text
    .normalize("NFKC")
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length > 0)
    .slice(0, 12);
  return words.map((w) => `"${w.replace(/"/g, "")}"*`).join(" ");
}

type Clause = { sql: string; args: Array<string | number> };

function buildWhere(filters: DocFilters, skip?: "tipo" | "empresa" | "ano"): Clause {
  const parts: string[] = [];
  const args: Array<string | number> = [];
  const match = filters.q ? ftsQuery(filters.q) : "";
  if (match) {
    parts.push("d.id IN (SELECT rowid FROM documents_fts WHERE documents_fts MATCH ?)");
    args.push(match);
  }
  if (filters.tipo && skip !== "tipo") {
    parts.push("d.doc_type = ?");
    args.push(filters.tipo);
  }
  if (filters.empresa !== undefined && filters.empresa !== "" && skip !== "empresa") {
    parts.push("d.company = ?");
    args.push(filters.empresa === "geral" ? "" : filters.empresa);
  }
  if (skip !== "ano") {
    const from = Number(filters.de);
    const to = Number(filters.ate);
    if (from) {
      parts.push("d.year >= ?");
      args.push(from);
    }
    if (to) {
      parts.push("d.year <= ?");
      args.push(to);
    }
  }
  return { sql: parts.length ? `WHERE ${parts.join(" AND ")}` : "", args };
}

const ORDERS: Record<string, string> = {
  recentes: "COALESCE(d.doc_date, d.year || '-12-31', d.created_at) DESC, d.id DESC",
  antigos: "COALESCE(d.doc_date, d.year || '-01-01', d.created_at) ASC, d.id ASC",
  titulo: "d.title COLLATE NOCASE ASC",
  enviados: "d.created_at DESC, d.id DESC",
};

export function searchDocuments(filters: DocFilters) {
  const page = Math.max(1, Number(filters.pagina) || 1);
  const where = buildWhere(filters);
  const conn = db();

  const total = (
    conn.prepare(`SELECT COUNT(*) AS n FROM documents d ${where.sql}`).get(...where.args) as { n: number }
  ).n;

  const useRelevance = Boolean(filters.q && ftsQuery(filters.q)) && (!filters.ordem || filters.ordem === "relevancia");
  const order = useRelevance
    ? "(SELECT bm25(documents_fts, 10.0, 6.0, 4.0, 2.0, 3.0, 1.0) FROM documents_fts WHERE documents_fts.rowid = d.id AND documents_fts MATCH ?) ASC, d.id DESC"
    : (ORDERS[filters.ordem ?? ""] ?? ORDERS.recentes);
  const orderArgs = useRelevance ? [ftsQuery(filters.q!)] : [];

  const items = conn
    .prepare(
      `SELECT d.*, u.name AS uploader_name FROM documents d LEFT JOIN users u ON u.id = d.uploaded_by
       ${where.sql} ORDER BY ${order} LIMIT ? OFFSET ?`,
    )
    .all(...where.args, ...orderArgs, PAGE_SIZE, (page - 1) * PAGE_SIZE) as DocumentRecord[];

  const facet = (column: string, skip: "tipo" | "empresa" | "ano") => {
    const w = buildWhere(filters, skip);
    return conn
      .prepare(
        `SELECT ${column} AS value, COUNT(*) AS count FROM documents d ${w.sql}
         GROUP BY ${column} ORDER BY ${column === "d.year" ? "value DESC" : "count DESC"}`,
      )
      .all(...w.args) as Array<{ value: string | number | null; count: number }>;
  };

  return {
    items,
    total,
    page,
    pages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    facets: {
      types: facet("d.doc_type", "tipo"),
      companies: facet("d.company", "empresa"),
      years: facet("d.year", "ano").filter((y) => y.value !== null),
    },
  };
}

export function archiveTotals() {
  return db().prepare("SELECT COUNT(*) AS count, COALESCE(SUM(size), 0) AS size, MIN(year) AS first, MAX(year) AS last FROM documents").get() as {
    count: number;
    size: number;
    first: number | null;
    last: number | null;
  };
}

export function getDocument(id: number) {
  return db()
    .prepare("SELECT d.*, u.name AS uploader_name FROM documents d LEFT JOIN users u ON u.id = d.uploaded_by WHERE d.id = ?")
    .get(id) as DocumentRecord | undefined;
}

/** Guesses a year (1970–2099) from a file name like "bomba-dagua-880-2026.pdf". */
export function guessYear(text: string) {
  const match = /(19[7-9]\d|20\d\d)/.exec(text);
  return match ? Number(match[1]) : null;
}

export function cleanTitle(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
