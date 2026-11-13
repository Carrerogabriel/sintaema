import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { Waves } from "./Waves";
import { DropRipples, UnderwaterScene } from "./water/WaterFx";

type Crumb = { href?: string; label: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  base,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  base: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-navy-light pb-20 pt-10 text-white md:pb-28 md:pt-14">
      <UnderwaterScene bubbles={12} seed={2} />
      <DropRipples count={3} seed={6} className="left-1/3" />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl md:h-96 md:w-96"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 left-1/4 h-56 w-56 rounded-full bg-brand-green/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <nav aria-label="Trilha de navegação" className="animate-fade-in">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-sky-200/80 sm:text-sm">
            <li>
              <Link href={base} className="inline-flex items-center gap-1 transition hover:text-white">
                <Icon name="home" className="h-3.5 w-3.5" />
                Início
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.label} className="flex min-w-0 items-center gap-1.5">
                <Icon name="chevronRight" className="h-3 w-3 shrink-0 opacity-60" />
                {crumb.href ? (
                  <Link href={crumb.href} className="transition hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="line-clamp-1 text-white/90">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow ? (
          <p className="eyebrow mt-6 animate-fade-up text-brand-cyan [animation-delay:80ms] md:mt-8">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-4xl animate-fade-up font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight [animation-delay:160ms] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-sky-100/90 [animation-delay:240ms] md:text-lg">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8 animate-fade-up [animation-delay:320ms]">{children}</div> : null}
      </div>
      <Waves />
    </section>
  );
}
