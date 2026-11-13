"use client";

import { useActionState, useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";
import { PasswordInput } from "@/components/painel/PasswordInput";
import { createUserAction } from "./actions";

const roles = [
  { value: "jornalista", label: "Jornalista", hint: "Publica e edita notícias, agenda, informativos e acervo" },
  { value: "diretor", label: "Diretor", hint: "Consulta o acervo de documentos" },
  { value: "admin", label: "Administrador", hint: "Acesso total, inclusive usuários" },
];

export function CreateUserForm() {
  const [state, action] = useActionState(createUserAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state?.error) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="grid gap-4">
      {state?.error ? (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200">
          <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
          {state.error}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          Nome
          <input name="nome" required defaultValue={state?.values?.nome} className="input" />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          E-mail
          <input name="email" type="email" required defaultValue={state?.values?.email} className="input" />
        </label>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-brand-navy">Perfil</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {roles.map((role) => (
            <label
              key={role.value}
              className="relative flex cursor-pointer flex-col rounded-xl border-2 border-slate-200 bg-white p-3 transition hover:border-brand-blue/50 has-[:checked]:border-brand-green has-[:checked]:bg-brand-green-light"
            >
              <input
                type="radio"
                name="perfil"
                value={role.value}
                required
                defaultChecked={(state?.values?.perfil ?? "jornalista") === role.value}
                className="peer sr-only"
              />
              <span className="font-bold text-brand-navy">{role.label}</span>
              <span className="mt-0.5 text-xs leading-snug text-slate-500">{role.hint}</span>
              <Icon name="check" className="absolute right-3 top-3 hidden h-4 w-4 text-brand-green-dark peer-checked:block" strokeWidth={3} />
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
        Senha inicial
        <PasswordInput name="senha" required autoComplete="new-password" placeholder="Mínimo 8 caracteres, letras e números" />
        <span className="text-xs font-normal text-slate-500">
          Passe a senha à pessoa por um canal seguro. Você pode redefini-la a qualquer momento.
        </span>
      </label>

      <button type="submit" className="btn-primary w-full sm:w-fit">
        <Icon name="plus" className="h-4 w-4" />
        Criar usuário
      </button>
    </form>
  );
}
