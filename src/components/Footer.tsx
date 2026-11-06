import Link from "next/link";
import { site } from "@/data/content";

export function Footer() {
  return (
    <footer className="mt-12 bg-brand-navy text-sky-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <h2 className="font-display text-xl uppercase tracking-wide text-white">
            Sintaema/SC
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sky-100/90">{site.fullName}</p>
          <p className="mt-4 text-sm">
            {site.address}
            <br />
            CEP {site.cep}, {site.city}
          </p>
          <p className="mt-2 text-sm">CNPJ: {site.cnpj}</p>
        </div>
        <div>
          <h2 className="font-display text-xl uppercase tracking-wide text-white">
            Atendimento
          </h2>
          <p className="mt-3 text-sm">Sindicato: {site.hours}</p>
          <p className="mt-3 text-sm">Plantão dos advogados: {site.lawyers}</p>
          <p className="mt-3 text-sm">Fone / Fax: {site.phone}</p>
          <a className="mt-2 block text-sm text-brand-cyan hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <div>
          <h2 className="font-display text-xl uppercase tracking-wide text-white">
            Navegação
          </h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Link className="hover:underline" href="/noticias">
                Notícias
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/filie-se">
                Filie-se
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/juridico">
                Assessoria jurídica
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/agenda">
                Agenda
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/contato">
                Fale conosco
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-sky-100/70">
        © {new Date().getFullYear()} SINTAEMA/SC — {site.slogan}
      </div>
    </footer>
  );
}
