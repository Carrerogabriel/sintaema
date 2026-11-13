"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import type { Company } from "@/data/companies";
import { Icon } from "./Icon";
import { Bubbles, MovingWave } from "./water/WaterFx";

const STORAGE_KEY = "sintaema:empresa";

type Selection = { company: Company; x: number; y: number; expanded: boolean };

export function CompanyPicker({ companies }: { companies: Company[] }) {
  const router = useRouter();
  const [selection, setSelection] = useState<Selection | null>(null);
  const [last, setLast] = useState<Company | null>(null);

  useEffect(() => {
    companies.forEach((company) => router.prefetch(`/${company.slug}`));
    try {
      const slug = localStorage.getItem(STORAGE_KEY);
      setLast(companies.find((company) => company.slug === slug) ?? null);
    } catch {
      // storage unavailable
    }
  }, [companies, router]);

  function choose(event: MouseEvent<HTMLAnchorElement>, company: Company) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    try {
      localStorage.setItem(STORAGE_KEY, company.slug);
    } catch {
      // storage unavailable
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      router.push(`/${company.slug}`);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setSelection({
      company,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      expanded: false,
    });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setSelection((s) => (s ? { ...s, expanded: true } : s))),
    );
    setTimeout(() => router.push(`/${company.slug}`), 750);
  }

  return (
    <>
      {last ? (
        <div className="mb-8 flex animate-fade-up justify-center [animation-delay:250ms]">
          <Link
            href={`/${last.slug}`}
            onClick={(event) => choose(event, last)}
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2 pl-2 pr-5 text-sm text-sky-100 backdrop-blur transition hover:border-white/30 hover:bg-white/10"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-full text-white"
              style={{ backgroundColor: last.colors.accent }}
            >
              <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
            Continuar em <strong className="font-semibold text-white">{last.name}</strong>
          </Link>
        </div>
      ) : null}

      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {companies.map((company, index) => (
          <li
            key={company.slug}
            className="animate-fade-up"
            style={{ animationDelay: `${300 + index * 70}ms` }}
          >
            <Link
              href={`/${company.slug}`}
              onClick={(event) => choose(event, company)}
              aria-label={`Entrar no portal da ${company.name}`}
              className="group relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl p-4 text-center text-white ring-1 ring-white/10 transition duration-500 ease-out hover:-translate-y-2 hover:ring-white/40 focus-visible:-translate-y-2 sm:rounded-3xl sm:p-6"
              style={{
                backgroundImage: `linear-gradient(145deg, ${company.colors.primary} 0%, ${company.colors.primary} 45%, ${company.colors.secondary} 130%)`,
                boxShadow: `0 18px 40px -18px ${company.colors.primary}`,
              }}
            >
              {/* decorative circle in accent color */}
              <span
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 transition-transform duration-700 group-hover:scale-150"
                style={{ backgroundColor: company.colors.accent }}
                aria-hidden="true"
              />
              {/* light sweep on hover */}
              <span
                className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/15 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
                aria-hidden="true"
              />
              {/* água no fundo do card: sobe ao passar o mouse */}
              <span
                className="absolute inset-x-0 bottom-0 h-full translate-y-[86%] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[38%] group-focus-visible:translate-y-[38%]"
                aria-hidden="true"
              >
                <MovingWave
                  fill={`${company.colors.secondary}55`}
                  variant="b"
                  className="!bottom-auto top-0 h-10 animate-wave-slow sm:h-14"
                />
                <MovingWave
                  fill={`${company.colors.accent}cc`}
                  className="!bottom-auto top-2 h-10 animate-wave [animation-duration:7s] sm:h-14"
                />
                <span className="absolute inset-x-0 bottom-0 top-[30px] sm:top-[44px]" style={{ backgroundColor: `${company.colors.accent}cc` }} />
              </span>
              <span className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true">
                <Bubbles count={7} seed={index + 3} rise="260px" />
              </span>

              {company.logo ? (
                <span className="relative flex h-[55%] w-[88%] rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-[1.04] sm:rounded-2xl sm:p-3">
                  <span className="relative h-full w-full">
                    <Image
                      src={company.logo}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 240px, 45vw"
                    />
                  </span>
                </span>
              ) : (
                <span className="relative flex flex-col font-display text-xl font-semibold uppercase leading-[1.05] tracking-wide drop-shadow-sm transition-transform duration-500 group-hover:scale-105 min-[420px]:text-2xl sm:text-3xl">
                  {company.logoLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              )}

              {company.logo ? (
                <span className="relative mt-2 line-clamp-1 font-display text-sm font-semibold uppercase tracking-wide sm:mt-3 sm:text-base">
                  {company.name}
                </span>
              ) : null}
              <span className="relative mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 sm:text-xs">
                <Icon name="pin" className="h-3 w-3" />
                {company.region}
              </span>

              <span className="absolute right-3 top-3 grid h-8 w-8 translate-x-2 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur transition duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:h-9 sm:w-9">
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Transição: a água da empresa escolhida sobe e inunda a tela */}
      {selection ? (
        <div
          className="fixed inset-0 z-[80] grid place-items-center overflow-hidden text-white"
          role="status"
          aria-live="polite"
        >
          <div
            className="absolute inset-x-0 -top-16 bottom-0"
            style={{
              transform: `translateY(${selection.expanded ? "0%" : "105%"})`,
              transition: "transform 800ms cubic-bezier(0.65, 0, 0.35, 1)",
            }}
            aria-hidden="true"
          >
            <div className="absolute inset-x-0 top-0 h-20 overflow-hidden">
              <MovingWave fill={`${selection.company.colors.secondary}99`} variant="b" className="h-full animate-wave [animation-duration:3s]" />
              <MovingWave fill={selection.company.colors.primary} className="h-full animate-wave [animation-direction:reverse] [animation-duration:4s]" />
            </div>
            <div
              className="absolute inset-x-0 bottom-0 top-[79px]"
              style={{
                backgroundImage: `linear-gradient(170deg, ${selection.company.colors.primary} 30%, ${selection.company.colors.secondary})`,
              }}
            >
              <Bubbles count={16} seed={21} />
            </div>
          </div>
          <div
            className={`relative text-center transition-all delay-300 duration-500 ${
              selection.expanded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {selection.company.logo ? (
              <span className="mx-auto flex h-36 w-64 rounded-3xl bg-white p-5 shadow-2xl sm:h-44 sm:w-80">
                <span className="relative h-full w-full">
                  <Image
                    src={selection.company.logo}
                    alt={`Logo ${selection.company.name}`}
                    fill
                    className="object-contain"
                    sizes="320px"
                  />
                </span>
              </span>
            ) : (
              <p className="flex flex-col font-display text-4xl font-semibold uppercase leading-[1.05] tracking-wide sm:text-6xl">
                {selection.company.logoLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            )}
            <p className="mt-5 font-display text-2xl font-semibold uppercase tracking-wide">
              {selection.company.name}
            </p>
            <span
              className="mx-auto mt-6 block h-1 w-24 origin-left animate-[shimmer_1s_linear_infinite] rounded-full"
              style={{ backgroundColor: selection.company.colors.accent }}
            />
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/80">Abrindo portal…</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
