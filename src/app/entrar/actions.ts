"use server";

import { redirect } from "next/navigation";
import {
  clearFailedLogins,
  endSession,
  findUserByEmail,
  loginLocked,
  registerFailedLogin,
  roleHome,
  startSession,
  verifyPassword,
} from "@/server/auth";

export type FormState = { error?: string; email?: string } | undefined;

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

export async function logoutAction() {
  await endSession();
  redirect("/entrar");
}
