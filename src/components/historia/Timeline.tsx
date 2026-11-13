"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { milestones, photoSlots } from "@/data/historia";
import { ChapterHeading } from "./ChapterHeading";
import { FadeIn } from "./motion";
import { PhotoSlot, type Photos } from "./PhotoSlot";

const eraColor = { chumbo: "bg-red-500", luta: "bg-brand-green", agua: "bg-brand-cyan" } as const;
const eraTone = { chumbo: "archive", luta: "faded", agua: "color" } as const;
const eraName = { chumbo: "Ditadura", luta: "Redemocratização", agua: "Água pública" } as const;

/**
 * CAPÍTULO 06 — O Sindicato ao longo do tempo.
 * Linha do tempo navegável: marcos selecionáveis (clique, setas do teclado,
 * anterior/próximo). A régua preenche até o marco escolhido e o painel troca
 * com uma revelação lateral da foto.
 */
export function Timeline({ photos }: { photos: Photos }) {
  const [index, setIndex] = useState(2);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const rail = useRef<HTMLDivElement>(null);
  const item = milestones[index];

  // Mantém o marco ativo visível na régua (celular)
  useEffect(() => {
    const tab = tabs.current[index];
    const r = rail.current;
    if (!tab || !r) return;
    r.scrollTo({ left: tab.offsetLeft - r.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, [index]);

  const go = (next: number, focus = false) => {
    const value = (next + milestones.length) % milestones.length;
    setIndex(value);
    if (focus) tabs.current[value]?.focus();
  };

  const onKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") go(index + 1, true);
    else if (event.key === "ArrowLeft") go(index - 1, true);
    else if (event.key === "Home") go(0, true);
    else if (event.key === "End") go(milestones.length - 1, true);
    else return;
    event.preventDefault();
  };

  const fill = (index / (milestones.length - 1)) * 100;

  return (
    <section id="linha-do-tempo" aria-label="Capítulo 06 — O Sindicato ao longo do tempo" className="relative overflow-hidden bg-brand-navy-dark pb-24 text-white md:pb-32">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <ChapterHeading
        number="06"
        title={"O Sindicato ao\nlongo do tempo"}
        accent={["tempo"]}
        intro="Escolha um momento e percorra a trajetória."
        className="pb-12 pt-28 md:pb-16 md:pt-36 [&_.split-accent]:!text-brand-cyan"
      />

      <FadeIn className="relative">
        {/* Régua */}
        <div ref={rail} className="no-scrollbar overflow-x-auto">
          <div className="relative mx-auto min-w-[900px] max-w-7xl px-4 pb-4 pt-2 sm:px-6 lg:px-8">
            <div className="absolute left-8 right-8 top-[46px] h-px bg-white/15" aria-hidden="true">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-brand-green to-brand-cyan transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: `${fill}%` }}
              />
            </div>
            <div role="tablist" aria-label="Marcos históricos" className="relative flex justify-between" onKeyDown={onKey}>
              {milestones.map((m, i) => {
                const active = i === index;
                return (
                  <button
                    key={m.year}
                    ref={(node) => {
                      tabs.current[i] = node;
                    }}
                    role="tab"
                    id={`marco-${i}`}
                    aria-selected={active}
                    aria-controls="marco-painel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => go(i)}
                    className="group flex w-16 flex-col items-center gap-3 text-center"
                  >
                    <span
                      className={`font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
                        active ? "text-white" : i < index ? "text-white/60" : "text-white/35 group-hover:text-white/70"
                      }`}
                    >
                      {m.year}
                    </span>
                    <span className="relative grid h-5 w-5 place-items-center">
                      {active ? <span className={`absolute inset-0 animate-pulse-ring rounded-full ${eraColor[m.era]}`} /> : null}
                      <span
                        className={`rounded-full transition-all duration-500 ${
                          active ? `h-5 w-5 ${eraColor[m.era]}` : i < index ? `h-2.5 w-2.5 ${eraColor[m.era]}` : "h-2.5 w-2.5 bg-white/30 group-hover:bg-white/60"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Painel */}
        <div className="container-site mt-10">
          <div
            key={index}
            id="marco-painel"
            role="tabpanel"
            aria-labelledby={`marco-${index}`}
            className="timeline-panel grid items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]">
              <PhotoSlot slot={photoSlots[item.photo]} photos={photos} tone={eraTone[item.era]} className="h-full w-full" sizes="(min-width: 1024px) 55vw, 100vw" />
            </div>
            <div>
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                <span className={`h-2 w-2 rounded-full ${eraColor[item.era]}`} aria-hidden="true" />
                {eraName[item.era]}
              </p>
              <p className="story-outline mt-4 font-display text-7xl font-semibold leading-none text-white sm:text-8xl">{item.year}</p>
              <h3 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight sm:text-4xl">{item.title}</h3>
              <p className="font-story-serif mt-4 text-lg leading-relaxed text-sky-100/85 sm:text-xl">{item.text}</p>

              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Marco anterior"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition hover:-translate-x-0.5 hover:border-white hover:bg-white/10"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Próximo marco"
                  className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand-navy transition hover:translate-x-0.5"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
                <span className="ml-2 font-display text-sm tabular-nums tracking-widest text-white/60">
                  {String(index + 1).padStart(2, "0")} / {milestones.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
