/**
 * Banco de dados do sistema (SQLite embutido no Node 22, sem dependências).
 *
 * Os dados ficam em `storage/` (ou na pasta definida em SINTAEMA_DATA_DIR):
 *   storage/sintaema.db   → banco de dados
 *   storage/acervo/       → arquivos do acervo de documentos
 *   storage/midia/        → imagens enviadas para as matérias
 */
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { seedBulletins, seedEvents, seedPosts } from "./seed";

/**
 * Na Vercel a pasta do projeto é somente leitura: lá o único lugar gravável é /tmp,
 * que é temporário (os dados voltam ao conteúdo inicial quando o servidor reinicia).
 */
const defaultDataDir = process.env.VERCEL ? "/tmp/sintaema" : path.join(process.cwd(), "storage");
export const DATA_DIR = path.resolve(process.env.SINTAEMA_DATA_DIR ?? defaultDataDir);
export const ARCHIVE_DIR = path.join(DATA_DIR, "acervo");
export const MEDIA_DIR = path.join(DATA_DIR, "midia");

const SCHEMA_VERSION = 1;

function migrate(db: DatabaseSync) {
  const version = (db.prepare("PRAGMA user_version").get() as { user_version: number }).user_version;
  if (version >= SCHEMA_VERSION) return;

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT NOT NULL,
      email         TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      role          TEXT NOT NULL CHECK (role IN ('admin', 'jornalista', 'diretor')),
      active        INTEGER NOT NULL DEFAULT 1,
      created_at    TEXT NOT NULL DEFAULT (datetime('now')),
      last_login_at TEXT
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS posts (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      slug       TEXT NOT NULL UNIQUE,
      title      TEXT NOT NULL,
      excerpt    TEXT NOT NULL DEFAULT '',
      content    TEXT NOT NULL DEFAULT '',
      category   TEXT NOT NULL,
      date       TEXT NOT NULL,
      image      TEXT NOT NULL DEFAULT '',
      image_alt  TEXT NOT NULL DEFAULT '',
      featured   INTEGER NOT NULL DEFAULT 0,
      companies  TEXT NOT NULL DEFAULT '[]',
      status     TEXT NOT NULL DEFAULT 'publicado' CHECK (status IN ('publicado', 'rascunho')),
      author_id  INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS posts_date ON posts(date DESC);

    CREATE TABLE IF NOT EXISTS events (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT NOT NULL,
      date        TEXT NOT NULL,
      place       TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      companies   TEXT NOT NULL DEFAULT '[]',
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bulletins (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      issue      TEXT NOT NULL DEFAULT '',
      summary    TEXT NOT NULL DEFAULT '',
      companies  TEXT NOT NULL DEFAULT '[]',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS documents (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT NOT NULL,
      doc_type    TEXT NOT NULL,
      edition     TEXT NOT NULL DEFAULT '',
      doc_date    TEXT,
      year        INTEGER,
      company     TEXT NOT NULL DEFAULT '',
      tags        TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      file_name   TEXT NOT NULL,
      stored_name TEXT NOT NULL,
      mime        TEXT NOT NULL DEFAULT 'application/octet-stream',
      size        INTEGER NOT NULL DEFAULT 0,
      uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS documents_year ON documents(year);
    CREATE INDEX IF NOT EXISTS documents_type ON documents(doc_type);
    CREATE INDEX IF NOT EXISTS documents_company ON documents(company);

    -- Busca textual sem acentos: "agua" encontra "água"
    CREATE VIRTUAL TABLE IF NOT EXISTS documents_fts USING fts5(
      title, edition, tags, description, file_name, doc_type,
      content='documents', content_rowid='id',
      tokenize='unicode61 remove_diacritics 2'
    );
    CREATE TRIGGER IF NOT EXISTS documents_ai AFTER INSERT ON documents BEGIN
      INSERT INTO documents_fts(rowid, title, edition, tags, description, file_name, doc_type)
      VALUES (new.id, new.title, new.edition, new.tags, new.description, new.file_name, new.doc_type);
    END;
    CREATE TRIGGER IF NOT EXISTS documents_ad AFTER DELETE ON documents BEGIN
      INSERT INTO documents_fts(documents_fts, rowid, title, edition, tags, description, file_name, doc_type)
      VALUES ('delete', old.id, old.title, old.edition, old.tags, old.description, old.file_name, old.doc_type);
    END;
    CREATE TRIGGER IF NOT EXISTS documents_au AFTER UPDATE ON documents BEGIN
      INSERT INTO documents_fts(documents_fts, rowid, title, edition, tags, description, file_name, doc_type)
      VALUES ('delete', old.id, old.title, old.edition, old.tags, old.description, old.file_name, old.doc_type);
      INSERT INTO documents_fts(rowid, title, edition, tags, description, file_name, doc_type)
      VALUES (new.id, new.title, new.edition, new.tags, new.description, new.file_name, new.doc_type);
    END;
  `);

  seed(db);
  db.exec(`PRAGMA user_version = ${SCHEMA_VERSION}`);
}

function seed(db: DatabaseSync) {
  const hasPosts = (db.prepare("SELECT COUNT(*) AS n FROM posts").get() as { n: number }).n > 0;
  if (hasPosts) return;

  const insertPost = db.prepare(`
    INSERT INTO posts (slug, title, excerpt, content, category, date, image, image_alt, featured, companies)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const p of seedPosts) {
    insertPost.run(
      p.slug, p.title, p.excerpt, p.content.join("\n\n"), p.category, p.date,
      p.image, p.imageAlt, p.featured ? 1 : 0, JSON.stringify(p.companies ?? []),
    );
  }

  const insertEvent = db.prepare(
    "INSERT INTO events (title, date, place, description, companies) VALUES (?, ?, ?, ?, ?)",
  );
  for (const e of seedEvents) {
    insertEvent.run(e.title, e.date, e.place, e.description, JSON.stringify(e.companies ?? []));
  }

  const insertBulletin = db.prepare(
    "INSERT INTO bulletins (name, issue, summary, companies, sort_order) VALUES (?, ?, ?, ?, ?)",
  );
  seedBulletins.forEach((b, i) =>
    insertBulletin.run(b.name, b.issue, b.summary, JSON.stringify(b.companies ?? []), i),
  );
}

function open() {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
  const db = new DatabaseSync(path.join(DATA_DIR, "sintaema.db"));
  db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
  migrate(db);
  ensureAdmin(db);
  return db;
}

/**
 * Garante a conta de administrador a partir das variáveis de ambiente
 * SINTAEMA_ADMIN_EMAIL, SINTAEMA_ADMIN_PASSWORD_HASH e SINTAEMA_ADMIN_NAME (opcional).
 * Necessário na Vercel, onde o banco começa vazio a cada reinício do servidor.
 * Só cria a conta se o e-mail ainda não existir; não altera contas já cadastradas.
 */
function ensureAdmin(db: DatabaseSync) {
  const email = process.env.SINTAEMA_ADMIN_EMAIL?.trim();
  const hash = process.env.SINTAEMA_ADMIN_PASSWORD_HASH?.trim();
  if (!email || !hash?.startsWith("scrypt$")) return;
  const name = process.env.SINTAEMA_ADMIN_NAME?.trim() || "Administrador";
  db.prepare(
    "INSERT OR IGNORE INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'admin')",
  ).run(name, email, hash);
}

// Reuse one connection across hot reloads in development.
const globalForDb = globalThis as unknown as { __sintaemaDb?: DatabaseSync };

export function db(): DatabaseSync {
  if (!globalForDb.__sintaemaDb) globalForDb.__sintaemaDb = open();
  return globalForDb.__sintaemaDb;
}

/** Runs `fn` inside a transaction. */
export function transaction<T>(fn: () => T): T {
  const conn = db();
  conn.exec("BEGIN");
  try {
    const result = fn();
    conn.exec("COMMIT");
    return result;
  } catch (error) {
    conn.exec("ROLLBACK");
    throw error;
  }
}

export const parseCompanies = (value: unknown): string[] => {
  try {
    const parsed = JSON.parse(String(value ?? "[]"));
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
};
