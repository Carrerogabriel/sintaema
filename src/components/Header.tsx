"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { Company } from "@/data/companies";
import { site } from "@/data/site";
import { CompanyLogo } from "./CompanyLogo";
import { Icon, SocialIcon } from "./Icon";
import { Logo } from "./Logo";

export const nav = [
  { href: "/sobre", label: "O Sindicato" },
  { href: "/noticias", label: "Notícias" },
  { href: "/noticias?categoria=Lutas", label: "Campanhas" },
  { href: "/noticias?categoria=Eleições", label: "Eleições" },
  { href: "/juridico", label: "Jurídico" },
  { href: "/agenda", label: "Agenda" },
  { href: "/contato", label: "Contato" },
];

const quickSearches = ["CASAN", "Privatização", "Congresso", "Escala 6x1", "Eleições"];

const socials = [
  { network: "facebook" as const, href: site.social.facebook, label: "Facebook" },
  { network: "instagram" as const, href: site.social.instagram, label: "Instagram" },
  { network: "youtube" as const, href: site.social.youtube, label: "YouTube" },
];

function isActive(pathname: string, href: string) {
  if (href.includes("?")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SwitchCompany({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={className}>
      <Icon name="arrowLeft" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Trocar empresa
    </Link>
  );
}

export function Header({ company }: { company: Company }) {
  const base = `/${company.slug}`;
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays on navigation
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock scroll + Escape key while an overlay is open
  useEffect(() => {
    const open = menuOpen || searchOpen;
    document.body.style.overflow = open ? "hidden" : "";
    if (searchOpen) setTimeout(() => searchInput.current?.focus(), 50);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, searchOpen]);

  function runSearch(term: string) {
    const query = term.trim();
    router.push(query ? `${base}/busca?q=${encodeURIComponent(query)}` : `${base}/busca`);
    setSearchOpen(false);
    setMenuOpen(false);
  }

  function onSearch(event: FormEvent) {
    event.preventDefault();
    runSearch(q);
  }

  return (
    <>
      <header className="sticky top-0 z-40">
        {/* Top info bar */}
        <div
          className={`hidden overflow-hidden bg-brand-navy-dark text-sky-100 transition-all duration-500 md:block ${
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="container-site flex items-center justify-between gap-6 py-2 text-xs">
            <div className="flex items-center gap-5">
              <a href="tel:+554832243868" className="inline-flex items-center gap-1.5 transition hover:text-white">
                <Icon name="phone" className="h-3.5 w-3.5 text-brand-cyan" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 transition hover:text-white">
                <Icon name="mail" className="h-3.5 w-3.5 text-brand-cyan" />
                {site.email}
              </a>
              <span className="hidden items-center gap-1.5 lg:inline-flex">
                <Icon name="clock" className="h-3.5 w-3.5 text-brand-cyan" />
                Seg. a sex., {site.hours}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <p className="hidden items-center gap-2 lg:flex">
                <span className="text-sky-200/70">Você está em:</span>
                <strong className="font-semibold text-white">{company.name}</strong>
              </p>
              <SwitchCompany className="group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-semibold text-white transition hover:bg-white/20" />
              <Link href="/entrar" className="inline-flex items-center gap-1.5 font-semibold text-sky-100 transition hover:text-white">
                <Icon name="user" className="h-3.5 w-3.5 text-brand-cyan" />
                Área restrita
              </Link>
              <div className="flex items-center gap-1">
                {socials.map((social) => (
                  <a
                    key={social.network}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white/10 hover:text-white"
                  >
                    <SocialIcon network={social.network} className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`border-b transition-all duration-500 ${
            scrolled
              ? "border-brand-navy/10 bg-white/85 shadow-[0_8px_30px_rgba(11,46,92,0.08)] backdrop-blur-xl"
              : "border-transparent bg-white"
          }`}
        >
          <div
            className={`container-site flex items-center gap-3 transition-all duration-500 ${
              scrolled ? "py-2" : "py-3 md:py-4"
            }`}
          >
            <Link href={base} className="mr-auto flex shrink-0 items-center gap-3" aria-label={`Página inicial do SINTAEMA · ${company.name}`}>
              <Logo compact={scrolled} className="max-[399px]:[&>div]:hidden [&>div>p:last-child]:hidden sm:[&>div>p:last-child]:block" />
              <span className="h-8 w-px bg-slate-200" aria-hidden="true" />
              <CompanyLogo company={company} size="sm" className="!h-9" />
            </Link>

            <nav aria-label="Menu principal" className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => {
                  const href = `${base}${item.href}`;
                  const active = isActive(pathname, href);
                  return (
                    <li key={item.label}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`group relative block rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                          active ? "text-brand-green" : "text-brand-navy hover:text-brand-blue"
                        }`}
                      >
                        {item.label}
                        <span
                          className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-green transition-transform duration-300 ${
                            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Abrir busca"
              className="group hidden h-11 items-center gap-2 rounded-full border border-slate-200 pl-4 pr-2 text-sm text-slate-500 transition hover:border-brand-blue hover:text-brand-navy md:inline-flex xl:w-11 xl:justify-center xl:p-0"
            >
              <Icon name="search" className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="xl:hidden">Buscar no site</span>
              <kbd className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 xl:hidden">
                Ctrl K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Abrir busca"
              className="grid h-11 w-11 place-items-center rounded-full text-brand-navy transition hover:bg-brand-sand md:hidden"
            >
              <Icon name="search" />
            </button>

            <Link href={`${base}/filie-se`} className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
              <Icon name="heart" className="h-4 w-4" />
              Filie-se
            </Link>

            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full bg-brand-navy text-white transition hover:bg-brand-navy-light xl:hidden"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label="Abrir menu"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet drawer */}
      <div
        className={`fixed inset-0 z-50 xl:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-brand-navy-dark/60 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-brand-navy text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="flex items-center gap-3">
              <Logo variant="light" compact />
              <CompanyLogo company={company} size="sm" className="!h-8" />
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:rotate-90 hover:bg-white/20"
            >
              <Icon name="close" />
            </button>
          </div>

          <form onSubmit={onSearch} className="relative mx-5 mt-5">
            <Icon name="search" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-200" />
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Buscar no site"
              aria-label="Buscar no site"
              className="w-full rounded-full border border-white/15 bg-white/10 py-3 pl-11 pr-4 text-base text-white outline-none transition placeholder:text-sky-200/70 focus:border-brand-cyan focus:bg-white/15"
            />
          </form>

          <nav aria-label="Menu móvel" className="mt-4 flex-1 px-3">
            <ul>
              {[{ href: "", label: "Início" }, ...nav].map((item, index) => {
                const href = `${base}${item.href}`;
                const active = item.href === "" ? pathname === base : isActive(pathname, href);
                return (
                  <li
                    key={item.label}
                    className={`transition-all duration-500 ${
                      menuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                    }`}
                    style={{ transitionDelay: menuOpen ? `${120 + index * 45}ms` : "0ms" }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-xl uppercase tracking-wide transition ${
                        active ? "bg-white/10 text-brand-green" : "hover:bg-white/5 hover:pl-5"
                      }`}
                    >
                      {item.label}
                      <Icon name="chevronRight" className="h-4 w-4 opacity-50" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6 space-y-4 border-t border-white/10 p-5">
            <SwitchCompany
              onClick={() => setMenuOpen(false)}
              className="btn-ghost group w-full"
            />
            <Link href={`${base}/filie-se`} onClick={() => setMenuOpen(false)} className="btn-primary w-full">
              <Icon name="heart" className="h-4 w-4" />
              Filie-se agora
            </Link>
            <a href="tel:+554832243868" className="flex items-center gap-3 text-sm text-sky-100">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
                <Icon name="phone" className="h-4 w-4" />
              </span>
              {site.phone}
            </a>
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.network}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-brand-green"
                >
                  <SocialIcon network={social.network} />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Search overlay */}
      {searchOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Busca">
          <div
            className="absolute inset-0 animate-fade-in bg-brand-navy-dark/70 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl animate-scale-in overflow-hidden rounded-3xl bg-white shadow-2xl">
            <form onSubmit={onSearch} className="flex items-center gap-3 border-b border-slate-100 px-5">
              <Icon name="search" className="h-5 w-5 shrink-0 text-brand-blue" />
              <input
                ref={searchInput}
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="O que você procura?"
                aria-label="Termo de busca"
                className="h-16 w-full bg-transparent text-lg text-brand-ink outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-200"
              >
                ESC
              </button>
            </form>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Buscas sugeridas
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {quickSearches.map((term, index) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => runSearch(term)}
                    className="animate-fade-up rounded-full bg-brand-sand px-4 py-2 text-sm font-semibold text-brand-navy ring-1 ring-brand-blue/10 transition hover:bg-brand-blue hover:text-white"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
