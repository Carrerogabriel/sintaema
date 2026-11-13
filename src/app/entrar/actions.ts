"use server";

import { redirect } from "next/navigation";
import { db } from "@/server/db";
import {
  clearFailedLogins,
  countUsers,
  endSession,
  findUserByEmail,
  hashPassword,
  loginLocked,
  passwordProblem,
  registerFailedLogin,
  roleHome,
  startSession,
  verifyPassword,
} from "@/server/auth";

export type FormState = { error?: string; email?: string; name?: string } | undefined;

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("senha") ?? "");

  if (!email || !password) return { error: "Informe e-mail e senha.", email };
  if (loginLocked(email)) {
    return { error: "Muitas tentativas. Aguarde alguns minutos e tente de novo.", email };
  }

  const user = findUserByEmail(email);
  if (!user || !user.active || !verifyPassword(password, user.password_hash)) {
    registerFailedLogin(email);
    return { error: "E-mail ou senha incorretos.", email };
  }

  clearFailedLogins(email);
  await startSession(user.id);
  redirect(roleHome[user.role]);
}

/** Primeira execução: cria a conta de administrador. */
export async function setupAction(_prev: FormState, formData: FormData): Promise<FormState> {
  if (countUsers() > 0) redirect("/entrar");

  const name = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("senha") ?? "");
  const confirm = String(formData.get("confirmar") ?? "");

  if (!name || !email) return { error: "Preencha nome e e-mail.", name, email };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "E-mail inválido.", name, email };
  const problem = passwordProblem(password);
  if (problem) return { error: problem, name, email };
  if (password !== confirm) return { error: "As senhas não conferem.", name, email };

  const result = db()
    .prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'admin')")
    .run(name, email, hashPassword(password));
  await startSession(Number(result.lastInsertRowid));
  redirect(roleHome.admin);
}

export async function logoutAction() {
  await endSession();
  redirect("/entrar");
}
