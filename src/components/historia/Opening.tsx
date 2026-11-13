"use client";

import { photoSlots } from "@/data/historia";
import { Scene, SplitReveal } from "./motion";
import { PhotoSlot, type Photos } from "./PhotoSlot";

/**
 * CAPÍTULO 00 — Abertura cinematográfica.
 * Primeiro o título; ao rolar, a imagem se aproxima, o título sobe e entra a
 * segunda camada com os anos de história — o convite para atravessá-los.
 */
export function Opening({ photos, years }: { photos: Photos; years: number }) {
  return (
    <Scene
      id="abertura"
      label="Abertura"
      length={2}
      className="bg-[var(--ink-dark)] text-stone-100"
      stickyClassName="flex items-center"
    >
      <div className="opening__bg absolute inset-0">
        <PhotoSlot slot={photoSlots.abertura} photos={photos} tone="archive" variant="ambient" className="h-full w-full" priority sizes="100vw" />
      </div>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_45%,transparent_0%,rgba(15,13,11,0.55)_55%,var(--ink-dark)_100%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--ink-dark)] to-transparent" aria-hidden="true" />
      <span className="story-grain" aria-hidden="true" />

      <span
        className="opening__year story-outline pointer-events-none absolute -bottom-[0.18em] -right-[0.06em] select-none font-display text-[44vw] font-semibold leading-none text-stone-100/[0.09] md:text-[30vw]"
        aria-hidden="true"
      >
        1977
      </span>

      <div className="container-site relative">
        <div className="opening__title">
          <p className="flex animate-fade-in items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-stone-400 sm:text-xs">
            <span className="h-px w-10 bg-red-500" aria-hidden="true" />
            SINTAEMA-SC · Santa Catarina · desde 1977
          </p>
          <SplitReveal
            as="h1"
            text={"Sonhos,\nlutas e\nconquistas"}
            accent={["conquistas"]}
            delay={150}
            stagger={110}
            className="mt-6 font-display text-[17vw] font-semibold uppercase leading-[0.86] tracking-tight sm:text-[13vw] lg:text-[min(10.5rem,16svh)] [&_.split-accent]:text-brand-green"
          />
          <p className="font-story-serif mt-8 max-w-xl animate-fade-up text-lg italic leading-relaxed text-stone-300 [animation-delay:900ms] sm:text-xl">
            A história de quem ousou se organizar quando lutar por direitos era proibido.
          </p>
        </div>

        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-6 lg:inset-x-8">
        <div className="opening__second">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-400">9 de novembro de 1977</p>
          <p className="mt-4 font-display font-semibold uppercase leading-[0.85] text-stone-50">
            <span className="block text-[34vw] tabular-nums sm:text-[24vw] lg:text-[16rem]">{years}</span>
            <span className="block text-3xl tracking-wide text-stone-300 sm:text-5xl">anos de história</span>
          </p>
          <p className="font-story-serif mt-8 max-w-2xl text-lg leading-relaxed text-stone-300 sm:text-2xl">
            Esta é a trajetória de cada trabalhadora e trabalhador que teve a ousadia de quebrar as algemas e lutar.
          </p>
        </div>
        </div>
      </div>

      <div className="opening__cue absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-stone-400">
        Role para começar
        <span className="relative block h-12 w-px overflow-hidden bg-stone-700">
          <span className="scroll-cue-line absolute inset-0 bg-stone-200" />
        </span>
      </div>
    </Scene>
  );
}
