/**
 * Autenticação: senhas com scrypt, sessões guardadas no banco (só o hash do
 * token) e cookie httpOnly.
 */
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db } from "./db";

export type Role = "admin" | "jornalista" | "diretor";

export const roleLabels: Record<Role, string> = {
  admin: "Administrador",
  jornalista: "Jornalista",
  diretor: "Diretor",
};

/** Tela inicial de cada perfil no painel. */
export const roleHome: Record<Role, string> = {
  admin: "/painel/admin",
  jornalista: "/painel/conteudo",
  diretor: "/painel/acervo",
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  active: number;
  created_at: string;
  last_login_at: string | null;
};

export const SESSION_COOKIE = "sintaema_sessao";
const SESSION_DAYS = 7;

// ---------- Senhas ----------

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string) {
  const [scheme, saltHex, hashHex] = stored.split("$");
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = crypto.scryptSync(password, Buffer.from(saltHex, "hex"), expected.length, {
    N: 16384,
    r: 8,
    p: 1,
  });
  return crypto.timingSafeEqual(expected, actual);
}

export function passwordProblem(password: string): string | null {
  if (password.length < 8) return "A senha precisa ter pelo menos 8 caracteres.";
  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password))
    return "A senha precisa ter letras e números.";
  return null;
}

// ---------- Tentativas de login (proteção simples contra força bruta) ----------

const attempts = new Map<string, { count: number; until: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_MS = 5 * 60 * 1000;

export function loginLocked(email: string) {
  const entry = attempts.get(email.toLowerCase());
  return Boolean(entry && entry.count >= MAX_ATTEMPTS && entry.until > Date.now());
}

export function registerFailedLogin(email: string) {
  const key = email.toLowerCase();
  const entry = attempts.get(key);
  const count = entry && entry.until > Date.now() ? entry.count + 1 : 1;
  attempts.set(key, { count, until: Date.now() + LOCK_MS });
}

export function clearFailedLogins(email: string) {
  attempts.delete(email.toLowerCase());
}

// ---------- Usuários ----------

export function countUsers() {
  return (db().prepare("SELECT COUNT(*) AS n FROM users").get() as { n: number }).n;
}

export function findUserByEmail(email: string) {
  return db().prepare("SELECT * FROM users WHERE email = ?").get(email.trim()) as
    | (User & { password_hash: string })
    | undefined;
}

// ---------- Sessões ----------

const tokenHash = (token: string) => crypto.createHash("sha256").update(token).digest("hex");

export async function startSession(userId: number) {
  const token = crypto.randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  db()
    .prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)")
    .run(tokenHash(token), userId, expires.toISOString());
  db().prepare("UPDATE users SET last_login_at = datetime('now') WHERE id = ?").run(userId);
  db().prepare("DELETE FROM sessions WHERE expires_at < ?").run(new Date().toISOString());

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });
}

export async function endSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) db().prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash(token));
  store.delete(SESSION_COOKIE);
}

/** Usuário logado (ou null). Memorizado por requisição. */
export const currentUser = cache(async (): Promise<User | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const user = db()
    .prepare(
      `SELECT u.id, u.name, u.email, u.role, u.active, u.created_at, u.last_login_at
       FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = ? AND s.expires_at > ? AND u.active = 1`,
    )
    .get(tokenHash(token), new Date().toISOString()) as User | undefined;
  return user ?? null;
});

/** Exige login; se `roles` for informado, exige um desses perfis. Admin passa sempre. */
export async function requireUser(...roles: Role[]): Promise<User> {
  const user = await currentUser();
  if (!user) redirect("/entrar");
  if (roles.length > 0 && user.role !== "admin" && !roles.includes(user.role)) {
    redirect(roleHome[user.role]);
  }
  return user;
}

export function revokeSessionsOf(userId: number) {
  db().prepare("DELETE FROM sessions WHERE user_id = ?").run(userId);
}
