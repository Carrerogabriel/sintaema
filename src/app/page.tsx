import Link from "next/link";
import { CompanyPicker } from "@/components/CompanyPicker";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { DropRipples, Ocean, UnderwaterScene } from "@/components/water/WaterFx";
import { companies } from "@/data/companies";
import { site } from "@/data/site";

export default function CompanySelectPage() {
  return (
    <main
      id="conteudo"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-navy-light text-white"
    >
      {/* Fundo do mar: luz entrando, cáustica, bolhas e ondas */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-blue/25 via-transparent to-brand-navy-dark/60" aria-hidden="true" />
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <UnderwaterScene bubbles={22} seed={11} />
        <DropRipples count={5} seed={4} className="top-auto h-1/2" />
      </div>
      <div
        className="absolute -left-32 top-1/4 -z-10 h-96 w-96 animate-float rounded-full bg-brand-blue/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 bottom-10 -z-10 h-96 w-96 animate-float rounded-full bg-brand-green/20 blur-3xl [animation-delay:2s]"
        aria-hidden="true"
      />
      <Ocean className="-z-10" tone="rgb(var(--c-primary-dark))" />

      <div className="container-site flex-1 pb-16 pt-8 sm:pb-20 sm:pt-12">
        <div className="flex animate-fade-in items-center justify-between gap-4">
          <Logo variant="light" />
          <div className="flex items-center gap-2">
            <a
              href={`tel:+554832243868`}
              className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-sky-100 transition hover:bg-white/10 sm:inline-flex"
            >
              <Icon name="phone" className="h-4 w-4 text-brand-cyan" />
              {site.phone}
            </a>
            <Link
              href="/entrar"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20"
            >
              <Icon name="user" className="h-4 w-4 text-brand-cyan" />
              Área restrita
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center sm:mt-16">
          <p className="eyebrow animate-fade-up justify-center text-brand-cyan">
            Portal da categoria
          </p>
          <h1 className="mt-4 animate-fade-up font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight [animation-delay:80ms] sm:text-5xl md:text-6xl">
            Escolha a sua <span className="text-water">empresa</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl animate-fade-up text-base text-sky-100/85 [animation-delay:160ms] md:text-lg">
            Selecione onde você trabalha para ver notícias, agenda e informações exclusivas da sua
            empresa.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl sm:mt-14">
          <CompanyPicker companies={companies} />
        </div>
      </div>

      <footer className="relative bg-brand-navy-dark py-6 text-center text-xs text-sky-100/60">
        <p className="font-display text-sm uppercase tracking-wider text-brand-green">{site.slogan}</p>
        <p className="mt-1">
          {site.fullName} · {site.city}
        </p>
      </footer>
    </main>
  );
}
