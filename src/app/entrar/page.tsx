import Link from "next/link";
import { redirect } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { site } from "@/data/site";
import { currentUser, roleHome } from "@/server/auth";
import { LoginForm } from "./LoginForms";

export const metadata = { title: "Entrar" };
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await currentUser();
  if (user) redirect(roleHome[user.role]);

  return (
    <main id="conteudo" className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      {/* Brand panel */}
      <section className="relative isolate hidden overflow-hidden bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-navy-light p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <div className="absolute -left-24 bottom-0 -z-10 h-96 w-96 animate-float rounded-full bg-brand-blue/30 blur-3xl" aria-hidden="true" />
        <div className="absolute right-0 top-10 -z-10 h-72 w-72 animate-float rounded-full bg-brand-green/20 blur-3xl [animation-delay:2s]" aria-hidden="true" />
        <Logo variant="light" />
        <div className="max-w-md animate-fade-up">
          <p className="eyebrow text-brand-cyan">Área restrita</p>
          <h1 className="mt-4 font-display text-5xl font-semibold uppercase leading-[1.05]">
            Painel do <span className="text-brand-green">Sintaema</span>
          </h1>
          <p className="mt-4 text-sky-100/85">
            Gestão de conteúdo do portal, acervo de documentos do sindicato e administração de
            usuários em um só lugar.
          </p>
          <ul className="mt-8 grid gap-3 text-sm">
            {[
              { icon: "file" as const, text: "Jornalistas publicam e editam o conteúdo de todas as empresas" },
              { icon: "book" as const, text: "Diretores consultam o acervo histórico com busca e filtros" },
              { icon: "shield" as const, text: "Administração centralizada de acessos" },
            ].map((item, index) => (
              <li
                key={item.text}
                className="flex animate-fade-up items-center gap-3"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10">
                  <Icon name={item.icon} className="h-4 w-4 text-brand-cyan" />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-sky-100/60">{site.slogan}</p>
      </section>

      {/* Form */}
      <section className="flex flex-col justify-center bg-water-pattern px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo />
          </div>
          <div className="card animate-scale-in p-7 sm:p-9">
            <h2 className="font-display text-3xl font-semibold uppercase text-brand-navy">Entrar</h2>
            <p className="mt-2 text-sm text-slate-600">Acesse com o e-mail e a senha cadastrados.</p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </div>
          <Link
            href="/"
            className="group mx-auto mt-6 flex w-fit items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand-navy"
          >
            <Icon name="arrowLeft" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Voltar ao site
          </Link>
        </div>
      </section>
    </main>
  );
}
