import Link from "next/link";
import type { Company } from "@/data/companies";
import { site } from "@/data/site";
import { CompanyLogo } from "./CompanyLogo";
import { Icon, SocialIcon } from "./Icon";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { Bubbles, Caustics, WaveEdge } from "./water/WaterFx";

const links = [
  { href: "/sobre", label: "O Sindicato" },
  { href: "/noticias", label: "Notícias" },
  { href: "/filie-se", label: "Filie-se" },
  { href: "/juridico", label: "Assessoria jurídica" },
  { href: "/agenda", label: "Agenda" },
  { href: "/contato", label: "Fale conosco" },
];

const socials = [
  { network: "facebook" as const, href: site.social.facebook, label: "Facebook" },
  { network: "instagram" as const, href: site.social.instagram, label: "Instagram" },
  { network: "youtube" as const, href: site.social.youtube, label: "YouTube" },
];

export function Footer({ company }: { company: Company }) {
  const base = `/${company.slug}`;
  return (
    <footer className="relative isolate mt-20 bg-brand-navy-dark text-sky-100 md:mt-28">
      <WaveEdge position="top" className="-z-10" />
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <Caustics className="!opacity-[0.12]" />
        <Bubbles count={10} seed={41} rise="700px" />
      </div>
      {/* CTA band overlapping the footer */}
      <div className="container-site relative -top-12 md:-top-16">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-green to-brand-green-dark p-7 text-white shadow-glow sm:p-10 md:flex md:items-center md:justify-between md:gap-10">
            <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <div
              className="absolute -right-10 -top-16 h-56 w-56 animate-float rounded-full bg-white/10"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="eyebrow text-green-100">Juntos somos mais fortes</p>
              <h2 className="mt-2 font-display text-3xl font-semibold uppercase leading-tight sm:text-4xl">
                Filie-se ao Sintaema
              </h2>
              <p className="mt-2 max-w-xl text-green-50">
                Trabalhador(a) da {company.name}: defesa jurídica, informação e organização coletiva. Contribuição de{" "}
                {site.contribution}.
              </p>
            </div>
            <div className="relative mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
              <Link href={`${base}/filie-se`} className="btn bg-white text-brand-green-dark hover:-translate-y-0.5 hover:shadow-xl">
                Quero me filiar
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link href={`${base}/contato`} className="btn-ghost">
                Tirar dúvidas
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-site -mt-4 grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex flex-wrap items-center gap-4">
            <Logo variant="light" />
            <CompanyLogo company={company} size="sm" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-sky-100/80">{site.fullName}.</p>
          <p className="mt-5 font-display text-lg uppercase tracking-wide text-brand-green">
            {site.slogan}
          </p>
          <Link
            href="/"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-cyan"
          >
            <Icon name="arrowLeft" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Escolher outra empresa
          </Link>
          <div className="mt-5 flex gap-2">
            {socials.map((social) => (
              <a
                key={social.network}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-brand-green hover:ring-brand-green"
              >
                <SocialIcon network={social.network} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg uppercase tracking-wider text-white">Navegação</h2>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={`${base}${link.href}`}
                  className="group inline-flex items-center gap-2 text-sky-100/80 transition hover:text-white"
                >
                  <span className="h-px w-0 bg-brand-green transition-all duration-300 group-hover:w-3" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg uppercase tracking-wider text-white">Atendimento</h2>
          <ul className="mt-4 grid gap-4 text-sm text-sky-100/80">
            <li className="flex gap-3">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
              <span>
                <strong className="block font-semibold text-white">Sindicato</strong>
                {site.hours}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="scale" className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
              <span>
                <strong className="block font-semibold text-white">Plantão jurídico</strong>
                {site.lawyers}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg uppercase tracking-wider text-white">Contato</h2>
          <ul className="mt-4 grid gap-4 text-sm text-sky-100/80">
            <li className="flex gap-3">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
              <span>
                {site.address}
                <br />
                CEP {site.cep}, {site.city}
              </span>
            </li>
            <li>
              <a href="tel:+554832243868" className="flex gap-3 transition hover:text-white">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 break-all transition hover:text-white">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-sky-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SINTAEMA/SC · Todos os direitos reservados
          </p>
          <p>CNPJ {site.cnpj}</p>
        </div>
      </div>
    </footer>
  );
}
