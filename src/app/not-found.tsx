import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="container-site grid min-h-[60vh] place-items-center py-16">
      <div className="max-w-lg animate-fade-up text-center">
        <div className="relative mx-auto h-28 w-24">
          <svg viewBox="0 0 56 72" className="h-28 w-24 animate-float" aria-hidden="true">
            <path d="M28 4C16 22 8 34 8 46a20 20 0 0 0 40 0C48 34 40 22 28 4Z" fill="#0090d0" />
            <circle cx="21" cy="44" r="2.5" fill="#fff" />
            <circle cx="35" cy="44" r="2.5" fill="#fff" />
            <path d="M22 54c3-3 9-3 12 0" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <p className="mt-6 font-display text-7xl font-semibold text-brand-blue/20">404</p>
        <h1 className="-mt-4 font-display text-3xl font-semibold uppercase text-brand-navy sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mt-3 text-slate-600">O endereço não existe ou a matéria foi removida.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            <Icon name="home" className="h-4 w-4" />
            Voltar ao início
          </Link>
          <Link href="/noticias" className="btn-secondary">
            Ver notícias
          </Link>
        </div>
      </div>
    </div>
  );
}
