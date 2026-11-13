"use client";

import { useEffect, useRef } from "react";
import { CountUp } from "@/components/CountUp";
import { battles, photoSlots } from "@/data/historia";
import { ChapterHeading } from "./ChapterHeading";
import { prefersReducedMotion, useScrollVar } from "./motion";
import { PhotoSlot, type Photos } from "./PhotoSlot";

/**
 * CAPÍTULO 03 — As primeiras batalhas (1985–1989).
 * No desktop, a rolagem vertical vira um percurso horizontal: o visitante
 * "caminha" pelas greves. No celular, vira um carrossel de deslizar.
 * O percurso termina no clímax de 1989.
 */
export function Battles({ photos }: { photos: Photos }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useScrollVar(outer, { mode: "pin" });

  // Altura da cena = distância horizontal a percorrer + uma tela.
  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const size = () => {
      if (!desktop.matches || prefersReducedMotion()) {
        o.style.height = "";
        o.style.removeProperty("--shift");
        return;
      }
      const shift = t.scrollWidth - window.innerWidth;
      o.style.setProperty("--shift", `${shift}px`);
      o.style.height = `${shift + window.innerHeight}px`;
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(t);
    desktop.addEventListener("change", size);
    window.addEventListener("resize", size);
    return () => {
      ro.disconnect();
      desktop.removeEventListener("change", size);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <section id="primeiras-batalhas" aria-label="Capítulo 03 — As primeiras batalhas" className="relative bg-brand-navy-dark text-sky-50">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--ink-warm)] to-transparent" aria-hidden="true" />
      <ChapterHeading
        number="03"
        title={"As primeiras\nbatalhas"}
        accent={["batalhas"]}
        intro="Com o fim da ditadura, em 1985, e impulsionado pelo momento político do país, o Sindicato passa a travar inúmeras batalhas."
        className="pb-14 pt-32 md:pb-20 md:pt-44"
      />

      <div ref={outer} className="relative">
        <div className="lg:sticky lg:top-[var(--hh,64px)] lg:h-[var(--stage-h)] lg:overflow-hidden">
          <div
            ref={track}
            className="hscroll__track no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-10 sm:px-6 lg:h-full lg:w-max lg:snap-none lg:gap-10 lg:overflow-visible lg:px-[8vw] lg:pb-0"
          >
            {battles.map((battle, index) => (
              <article
                key={battle.title}
                className="relative flex w-[84vw] shrink-0 snap-center flex-col justify-center sm:w-[60vw] lg:h-full lg:w-[44vw] xl:w-[38vw]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:h-[52%]">
                  <div className="hscroll__photo-inner absolute inset-0">
                    <PhotoSlot slot={photoSlots[battle.photo]} photos={photos} tone="faded" className="h-full w-full" sizes="(min-width: 1024px) 40vw, 84vw" />
                  </div>
                </div>
                <p className="mt-6 flex items-baseline gap-4">
                  <span className="font-display text-sm font-semibold text-brand-green">0{index + 1}</span>
                  <span className="font-display text-xl font-semibold uppercase tracking-[0.18em] text-sky-200">{battle.date}</span>
                </p>
                <h3 className="mt-2 font-display text-4xl font-semibold uppercase leading-none text-white lg:text-5xl">{battle.title}</h3>
                <p className="font-story-serif mt-4 max-w-md text-lg leading-relaxed text-sky-100/80">{battle.text}</p>
              </article>
            ))}

            {/* Clímax — 1989 */}
            <article className="relative flex w-[92vw] shrink-0 snap-center flex-col justify-center overflow-hidden rounded-3xl bg-black/30 p-6 ring-1 ring-white/10 sm:p-10 lg:my-[6vh] lg:w-[78vw] lg:rounded-[2rem] lg:p-16">
              <div className="absolute inset-0 opacity-40">
                <PhotoSlot slot={photoSlots.greve1989} photos={photos} tone="archive" variant="ambient" className="h-full w-full" sizes="80vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy-dark/80 to-transparent" aria-hidden="true" />
              <div className="relative">
                <p className="font-display text-xl font-semibold uppercase tracking-[0.25em] text-brand-green">1989</p>
                <h3 className="mt-3 max-w-2xl font-display text-4xl font-semibold uppercase leading-[0.95] text-white sm:text-6xl">
                  A greve que entrou para a história
                </h3>
                <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
                  <div>
                    <p className="font-display text-[7rem] font-semibold leading-[0.8] text-white sm:text-[9rem]">
                      <CountUp value={36} duration={2200} />
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-sky-200">dias de greve, com salários descontados</p>
                  </div>
                  <div>
                    <p className="font-display text-[7rem] font-semibold leading-[0.8] text-brand-green sm:text-[9rem]">
                      <CountUp value={5} duration={1400} />
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-sky-200">dias de greve de fome</p>
                  </div>
                </div>
              </div>
            </article>
            <span className="w-1 shrink-0 lg:w-[4vw]" aria-hidden="true" />
          </div>

          {/* Régua de progresso (desktop) */}
          <div className="absolute inset-x-[8vw] bottom-8 hidden items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-sky-200/70 lg:flex" aria-hidden="true">
            <span>1985</span>
            <span className="relative h-px flex-1 bg-white/15">
              <span className="hscroll__progress absolute inset-0 bg-brand-green" />
            </span>
            <span>1989</span>
          </div>
        </div>
      </div>

      <p className="container-site pb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/60 lg:hidden" aria-hidden="true">
        Deslize para o lado →
      </p>
    </section>
  );
}
