"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon, type IconName } from "../Icon";
import { Logo } from "../Logo";

export type NavItem = { href: string; label: string; icon: IconName; description: string };

export function PanelNav({
  items,
  user,
  logout,
}: {
  items: NavItem[];
  user: { name: string; roleLabel: string };
  logout: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const nav = (
    <nav aria-label="Menu do painel" className="grid gap-1">
      {items.map((item, index) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`group flex animate-fade-up items-center gap-3 rounded-xl px-3 py-3 transition ${
              active ? "bg-white text-brand-navy shadow-lg" : "text-sky-100 hover:bg-white/10"
            }`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${
                active ? "bg-brand-green text-white" : "bg-white/10 group-hover:bg-white/15"
              }`}
            >
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold">{item.label}</span>
              <span className={`block truncate text-xs ${active ? "text-slate-500" : "text-sky-200/70"}`}>
                {item.description}
              </span>
            </span>
          </Link>
        );
      })}
      <Link
        href="/"
        target="_blank"
        className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-sky-100 transition hover:bg-white/10"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
          <Icon name="external" className="h-5 w-5" />
        </span>
        Ver o site
      </Link>
    </nav>
  );

  const userBox = (
    <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-green font-display text-lg font-semibold text-white">
        {initials || "?"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-white">{user.name}</span>
        <span className="block text-xs text-sky-200/80">{user.roleLabel}</span>
      </span>
      <form action={logout}>
        <button
          type="submit"
          title="Sair"
          aria-label="Sair"
          className="grid h-9 w-9 place-items-center rounded-lg text-sky-100 transition hover:bg-white/10 hover:text-white"
        >
          <Icon name="logout" className="h-4 w-4" />
        </button>
      </form>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col justify-between overflow-y-auto bg-gradient-to-b from-brand-navy-dark to-brand-navy p-5 lg:flex">
        <div>
          <Link href="/painel" className="block px-2">
            <Logo variant="light" compact />
          </Link>
          <p className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-200/60">
            Painel
          </p>
          {nav}
        </div>
        {userBox}
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-brand-navy-dark px-4 py-3 text-white lg:hidden">
        <Link href="/painel">
          <Logo variant="light" compact />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu do painel"
          className="grid h-11 w-11 place-items-center rounded-full bg-white/10"
        >
          <Icon name="menu" />
        </button>
      </header>

      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col justify-between overflow-y-auto bg-gradient-to-b from-brand-navy-dark to-brand-navy p-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="mb-6 flex items-center justify-between">
              <Logo variant="light" compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
              >
                <Icon name="close" />
              </button>
            </div>
            {nav}
          </div>
          <div className="mt-6">{userBox}</div>
        </aside>
      </div>
    </>
  );
}
