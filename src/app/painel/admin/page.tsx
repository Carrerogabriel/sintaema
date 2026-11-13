import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { PasswordInput } from "@/components/painel/PasswordInput";
import { ConfirmButton, SubmitButton } from "@/components/painel/ui";
import { requireUser, roleLabels, type Role, type User } from "@/server/auth";
import { db } from "@/server/db";
import { formatBytes, formatDateTime } from "@/lib/panel-format";
import {
  deleteUserAction,
  resetPasswordAction,
  toggleActiveAction,
  updateRoleAction,
} from "./actions";
import { CreateUserForm } from "./CreateUserForm";

export const metadata = { title: "Administração" };

const roleStyles: Record<Role, string> = {
  admin: "bg-brand-navy text-white",
  jornalista: "bg-brand-blue/10 text-brand-blue",
  diretor: "bg-amber-100 text-amber-800",
};

function count(sql: string) {
  return (db().prepare(sql).get() as { n: number }).n;
}

export default async function AdminPage() {
  const me = await requireUser("admin");
  const users = db()
    .prepare(
      "SELECT id, name, email, role, active, created_at, last_login_at FROM users ORDER BY active DESC, role, name",
    )
    .all() as User[];

  const stats: Array<{ icon: IconName; label: string; value: string; href?: string }> = [
    { icon: "users", label: "Usuários ativos", value: String(count("SELECT COUNT(*) AS n FROM users WHERE active = 1")) },
    {
      icon: "file",
      label: "Matérias publicadas",
      value: String(count("SELECT COUNT(*) AS n FROM posts WHERE status = 'publicado'")),
      href: "/painel/conteudo",
    },
    {
      icon: "pencil",
      label: "Rascunhos",
      value: String(count("SELECT COUNT(*) AS n FROM posts WHERE status = 'rascunho'")),
      href: "/painel/conteudo?status=rascunho",
    },
    {
      icon: "folder",
      label: "Documentos no acervo",
      value: `${count("SELECT COUNT(*) AS n FROM documents")} · ${formatBytes(count("SELECT COALESCE(SUM(size), 0) AS n FROM documents"))}`,
      href: "/painel/acervo",
    },
  ];

  const byRole = (role: Role) => users.filter((u) => u.role === role && u.active).length;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="animate-fade-up">
        <p className="eyebrow text-brand-green">Administração</p>
        <h1 className="mt-2 font-display text-4xl font-semibold uppercase text-brand-navy">
          Olá, {me.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-slate-600">Tudo que é administrado no sistema, em uma única tela.</p>
      </header>

      {/* Stats */}
      <section className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const body = (
            <>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-sand text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white">
                <Icon name={stat.icon} />
              </span>
              <p className="mt-4 font-display text-3xl font-semibold text-brand-navy">{stat.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
            </>
          );
          return stat.href ? (
            <Link
              key={stat.label}
              href={stat.href}
              className="card card-hover group animate-fade-up p-5"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              {body}
            </Link>
          ) : (
            <div key={stat.label} className="card group animate-fade-up p-5" style={{ animationDelay: `${index * 70}ms` }}>
              {body}
            </div>
          );
        })}
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {/* Users */}
        <section className="card animate-fade-up overflow-hidden [animation-delay:200ms]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">
            <div>
              <h2 className="font-display text-2xl font-semibold uppercase text-brand-navy">Usuários</h2>
              <p className="text-sm text-slate-500">
                {byRole("admin")} administrador(es) · {byRole("jornalista")} jornalista(s) · {byRole("diretor")} diretor(es)
              </p>
            </div>
            <a href="#novo-usuario" className="btn-primary !px-4 !py-2.5 xl:hidden">
              <Icon name="plus" className="h-4 w-4" />
              Novo
            </a>
          </div>

          <ul className="divide-y divide-slate-100">
            {users.map((user) => {
              const isMe = user.id === me.id;
              return (
                <li key={user.id} className={`p-5 transition hover:bg-brand-sand/50 sm:px-6 ${user.active ? "" : "opacity-60"}`}>
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-navy font-display text-lg font-semibold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2 font-semibold text-brand-navy">
                        {user.name}
                        {isMe ? <span className="rounded-full bg-brand-green-light px-2 py-0.5 text-[11px] font-bold text-brand-green-dark">Você</span> : null}
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${roleStyles[user.role]}`}>
                          {roleLabels[user.role]}
                        </span>
                        {!user.active ? (
                          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-bold uppercase text-slate-600">Desativado</span>
                        ) : null}
                      </p>
                      <p className="truncate text-sm text-slate-500">{user.email}</p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Último acesso: {user.last_login_at ? formatDateTime(user.last_login_at) : "nunca"}
                      </p>
                    </div>

                    {!isMe ? (
                      <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                        <form action={updateRoleAction} className="flex items-center gap-1">
                          <input type="hidden" name="id" value={user.id} />
                          <label className="sr-only" htmlFor={`perfil-${user.id}`}>Perfil</label>
                          <select
                            id={`perfil-${user.id}`}
                            name="perfil"
                            defaultValue={user.role}
                            className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-brand-navy"
                          >
                            <option value="jornalista">Jornalista</option>
                            <option value="diretor">Diretor</option>
                            <option value="admin">Administrador</option>
                          </select>
                          <SubmitButton pendingLabel="…" className="rounded-lg bg-brand-sand px-3 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-water">
                            Salvar
                          </SubmitButton>
                        </form>
                        <form action={toggleActiveAction}>
                          <input type="hidden" name="id" value={user.id} />
                          <SubmitButton
                            pendingLabel="…"
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50"
                          >
                            {user.active ? "Desativar" : "Reativar"}
                          </SubmitButton>
                        </form>
                        <form action={deleteUserAction}>
                          <input type="hidden" name="id" value={user.id} />
                          <ConfirmButton
                            message={`Excluir ${user.name}? Esta ação não pode ser desfeita.`}
                            title="Excluir usuário"
                            className="grid h-9 w-9 place-items-center rounded-lg text-red-600 transition hover:bg-red-50"
                          >
                            <Icon name="trash" className="h-4 w-4" />
                          </ConfirmButton>
                        </form>
                      </div>
                    ) : null}
                  </div>

                  <details className="group mt-3 sm:ml-[3.75rem]">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-navy">
                      <Icon name="key" className="h-3.5 w-3.5" />
                      Redefinir senha
                      <Icon name="chevronDown" className="h-3.5 w-3.5 transition group-open:rotate-180" />
                    </summary>
                    <form action={resetPasswordAction} className="mt-2 flex max-w-md animate-fade-up flex-wrap gap-2">
                      <input type="hidden" name="id" value={user.id} />
                      <div className="min-w-[12rem] flex-1">
                        <PasswordInput name="senha" required autoComplete="new-password" placeholder="Nova senha" className="!py-2" />
                      </div>
                      <SubmitButton className="btn-primary !px-4 !py-2">Redefinir</SubmitButton>
                    </form>
                  </details>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Create user */}
        <aside className="grid h-fit gap-6">
          <section id="novo-usuario" className="card animate-fade-up scroll-mt-6 p-5 [animation-delay:280ms] sm:p-6">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold uppercase text-brand-navy">
              <Icon name="user" className="h-5 w-5 text-brand-green" />
              Novo usuário
            </h2>
            <div className="mt-5">
              <CreateUserForm />
            </div>
          </section>

          <section className="relative animate-fade-up overflow-hidden rounded-2xl bg-brand-navy p-6 text-white [animation-delay:360ms]">
            <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
            <h2 className="relative font-display text-xl font-semibold uppercase">Atalhos</h2>
            <div className="relative mt-4 grid gap-2">
              {[
                { href: "/painel/conteudo/noticias/nova", icon: "plus" as const, label: "Nova notícia" },
                { href: "/painel/acervo/enviar", icon: "upload" as const, label: "Enviar documentos ao acervo" },
                { href: "/painel/acervo", icon: "search" as const, label: "Pesquisar no acervo" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold ring-1 ring-white/10 transition hover:bg-white/10"
                >
                  <Icon name={item.icon} className="h-4 w-4 text-brand-cyan" />
                  {item.label}
                  <Icon name="arrowRight" className="ml-auto h-4 w-4 opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
