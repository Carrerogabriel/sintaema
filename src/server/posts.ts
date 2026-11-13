import { db, parseCompanies } from "./db";

export type PostRecord = {
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
  companies: string[];
  status: "publicado" | "rascunho";
  author_id: number | null;
  author_name: string | null;
  updated_at: string;
};

type Row = Omit<PostRecord, "companies"> & { companies: string };
const toRecord = (row: Row): PostRecord => ({ ...row, companies: parseCompanies(row.companies) });

export function listPosts(filters: { q?: string; company?: string; category?: string; status?: string }) {
  const where: string[] = [];
  const args: string[] = [];
  if (filters.q) {
    where.push("(p.title LIKE ? OR p.excerpt LIKE ? OR p.content LIKE ?)");
    const like = `%${filters.q}%`;
    args.push(like, like, like);
  }
  if (filters.category) {
    where.push("p.category = ?");
    args.push(filters.category);
  }
  if (filters.status) {
    where.push("p.status = ?");
    args.push(filters.status);
  }
  const rows = db()
    .prepare(
      `SELECT p.*, u.name AS author_name FROM posts p LEFT JOIN users u ON u.id = p.author_id
       ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
       ORDER BY p.date DESC, p.id DESC`,
    )
    .all(...args) as Row[];
  const records = rows.map(toRecord);
  if (!filters.company) return records;
  if (filters.company === "todas") return records.filter((p) => p.companies.length === 0);
  return records.filter((p) => p.companies.length === 0 || p.companies.includes(filters.company!));
}

export function getPostById(id: number) {
  const row = db()
    .prepare("SELECT p.*, u.name AS author_name FROM posts p LEFT JOIN users u ON u.id = p.author_id WHERE p.id = ?")
    .get(id) as Row | undefined;
  return row ? toRecord(row) : undefined;
}

export function slugTaken(slug: string, exceptId?: number) {
  return Boolean(
    db().prepare("SELECT 1 FROM posts WHERE slug = ? AND id IS NOT ?").get(slug, exceptId ?? null),
  );
}

export function uniqueSlug(base: string, exceptId?: number) {
  let slug = base || "materia";
  for (let i = 2; slugTaken(slug, exceptId); i++) slug = `${base}-${i}`;
  return slug;
}
