"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import {
  hashPassword,
  passwordProblem,
  requireUser,
  revokeSessionsOf,
  type Role,
} from "@/server/auth";

const ROLES: Role[] = ["admin", "jornalista", "diretor"];
const back = (message: string, kind: "ok" | "erro" = "ok") =>
  redirect(`/painel/admin?${kind}=${encodeURIComponent(message)}`);

function activeAdmins() {
  return (
    db().prepare("SELECT COUNT(*) AS n FROM users WHERE role = 'admin' AND active = 1").get() as {
      n: number;
    }
  ).n;
}

function targetUser(formData: FormData) {
  const id = Number(formData.get("id"));
  const user = db().prepare("SELECT id, name, role, active FROM users WHERE id = ?").get(id) as
    | { id: number; name: string; role: Role; active: number }
    | undefined;
  return user;
}

export type CreateUserState = { error?: string; values?: Record<string, string> } | undefined;

export async function createUserAction(
  _prev: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  await requireUser("admin");
  const values = {
    nome: String(formData.get("nome") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    perfil: String(formData.get("perfil") ?? ""),
  };
  const password = String(formData.get("senha") ?? "");

  if (!values.nome || !values.email) return { error: "Preencha nome e e-mail.", values };
  if (!/^\S+@\S+\.\S+$/.test(values.email)) return { error: "E-mail inválido.", values };
  if (!ROLES.includes(values.perfil as Role)) return { error: "Escolha um perfil.", values };
  const problem = passwordProblem(password);
  if (problem) return { error: problem, values };

  const exists = db().prepare("SELECT 1 FROM users WHERE email = ?").get(values.email);
  if (exists) return { error: "Já existe um usuário com esse e-mail.", values };

  db()
    .prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)")
    .run(values.nome, values.email, hashPassword(password), values.perfil);
  revalidatePath("/painel/admin");
  back(`Usuário ${values.nome} criado.`);
}

export async function updateRoleAction(formData: FormData) {
  const me = await requireUser("admin");
  const user = targetUser(formData);
  const role = String(formData.get("perfil") ?? "") as Role;
  if (!user || !ROLES.includes(role)) back("Usuário não encontrado.", "erro");
  if (user!.id === me.id && role !== "admin") back("Você não pode alterar o seu próprio perfil.", "erro");
  if (user!.role === "admin" && role !== "admin" && user!.active && activeAdmins() <= 1) {
    back("É preciso manter pelo menos um administrador ativo.", "erro");
  }
  db().prepare("UPDATE users SET role = ? WHERE id = ?").run(role, user!.id);
  revalidatePath("/painel/admin");
  back(`Perfil de ${user!.name} atualizado.`);
}

export async function toggleActiveAction(formData: FormData) {
  const me = await requireUser("admin");
  const user = targetUser(formData);
  if (!user) back("Usuário não encontrado.", "erro");
  if (user!.id === me.id) back("Você não pode desativar a sua própria conta.", "erro");
  if (user!.active && user!.role === "admin" && activeAdmins() <= 1) {
    back("É preciso manter pelo menos um administrador ativo.", "erro");
  }
  const next = user!.active ? 0 : 1;
  db().prepare("UPDATE users SET active = ? WHERE id = ?").run(next, user!.id);
  if (!next) revokeSessionsOf(user!.id);
  revalidatePath("/painel/admin");
  back(next ? `${user!.name} reativado.` : `${user!.name} desativado.`);
}

export async function resetPasswordAction(formData: FormData) {
  await requireUser("admin");
  const user = targetUser(formData);
  const password = String(formData.get("senha") ?? "");
  if (!user) back("Usuário não encontrado.", "erro");
  const problem = passwordProblem(password);
  if (problem) back(problem, "erro");
  db().prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hashPassword(password), user!.id);
  revokeSessionsOf(user!.id);
  revalidatePath("/painel/admin");
  back(`Senha de ${user!.name} redefinida.`);
}

export async function deleteUserAction(formData: FormData) {
  const me = await requireUser("admin");
  const user = targetUser(formData);
  if (!user) back("Usuário não encontrado.", "erro");
  if (user!.id === me.id) back("Você não pode excluir a sua própria conta.", "erro");
  if (user!.role === "admin" && user!.active && activeAdmins() <= 1) {
    back("É preciso manter pelo menos um administrador ativo.", "erro");
  }
  db().prepare("DELETE FROM users WHERE id = ?").run(user!.id);
  revalidatePath("/painel/admin");
  back(`${user!.name} excluído.`);
}
