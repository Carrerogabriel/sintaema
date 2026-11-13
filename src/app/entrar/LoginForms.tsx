"use client";

import { useActionState } from "react";
import { Icon } from "@/components/Icon";
import { PasswordInput } from "@/components/painel/PasswordInput";
import { loginAction } from "./actions";

function ErrorBox({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="flex animate-fade-up items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200">
      <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="grid gap-5">
      <ErrorBox message={state?.error} />
      <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
        E-mail
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          defaultValue={state?.email}
          placeholder="voce@sintaema.org.br"
          className="input"
          autoFocus
        />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
        Senha
        <PasswordInput name="senha" required autoComplete="current-password" placeholder="Sua senha" />
      </label>
      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-70">
        {pending ? "Entrando…" : "Entrar"}
        {!pending ? <Icon name="arrowRight" className="h-4 w-4" /> : null}
      </button>
      <p className="text-center text-xs text-slate-500">
        Esqueceu a senha? Peça ao administrador do sistema para redefini-la.
      </p>
    </form>
  );
}
