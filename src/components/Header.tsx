"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Logo } from "./Logo";
import { site } from "@/data/content";

const nav = [
  { href: "/sobre", label: "Sintaema" },
  { href: "/filie-se", label: "Filie-se" },
  { href: "/juridico", label: "Jurídico" },
  { href: "/noticias", label: "Comunicação" },
  { href: "/agenda", label: "Agenda" },
  { href: "/noticias?categoria=Lutas", label: "Campanhas" },
  { href: "/noticias?categoria=Eleições", label: "Eleições" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const query = q.trim();
    router.push(query ? `/busca?q=${encodeURIComponent(query)}` : "/busca");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 shadow-md">
      <div className="bg-brand-green text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-xs md:text-sm">
          <nav className="flex gap-4">
            <Link href="/" className="hover:underline">
              Principal
            </Link>
            <Link href="/contato" className="hover:underline">
              Fale conosco
            </Link>
            <Link href="/sobre" className="hover:underline">
              O sindicato
            </Link>
          </nav>
          <p className="hidden font-medium sm:block">{site.slogan}</p>
        </div>
      </div>

      <div className="border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3 md:py-4">
          <Link href="/" className="mr-auto" aria-label="Página inicial do SINTAEMA">
            <Logo />
          </Link>

          <form
            onSubmit={onSearch}
            className="order-last hidden w-full max-w-md flex-1 md:order-none md:flex"
          >
            <label className="sr-only" htmlFor="busca-site">
              Buscar no site
            </label>
            <input
              id="busca-site"
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Faça uma busca no site"
              className="w-full rounded-l-full border border-slate-200 px-4 py-2 text-sm outline-none ring-brand-blue focus:ring-2"
            />
            <button
              type="submit"
              className="rounded-r-full bg-brand-navy px-4 text-white hover:bg-brand-navy-light"
            >
              Buscar
            </button>
          </form>

          <div className="flex items-center gap-3">
            <a
              href={`tel:+554832243868`}
              className="hidden text-lg font-semibold text-brand-cyan md:block"
            >
              {site.phone}
            </a>
            <a
              href={site.social.facebook}
              className="grid h-8 w-8 place-items-center rounded bg-[#1877f2] text-xs font-bold text-white"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href={site.social.youtube}
              className="grid h-8 w-8 place-items-center rounded bg-[#ff0000] text-[10px] font-bold text-white"
              aria-label="YouTube"
            >
              YT
            </a>
            <a
              href={site.social.instagram}
              className="grid h-8 w-8 place-items-center rounded bg-gradient-to-br from-amber-400 via-pink-500 to-purple-700 text-[10px] font-bold text-white"
              aria-label="Instagram"
            >
              IG
            </a>
            <button
              type="button"
              className="ml-1 rounded border border-slate-200 px-3 py-2 text-sm md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label="Abrir menu"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-brand-navy text-white">
        <div className="mx-auto hidden max-w-6xl items-center justify-between px-2 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="px-3 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-brand-navy-light"
            >
              {item.label}
            </Link>
          ))}
        </div>
        {open ? (
          <div className="grid gap-1 px-4 py-3 md:hidden">
            <form onSubmit={onSearch} className="mb-2 flex">
              <input
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Buscar"
                className="w-full rounded-l px-3 py-2 text-sm text-slate-900"
              />
              <button type="submit" className="rounded-r bg-brand-green px-3 text-sm">
                Ir
              </button>
            </form>
            {nav.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 text-sm uppercase hover:bg-brand-navy-light"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
