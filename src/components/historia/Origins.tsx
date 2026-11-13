"use client";

import type { CSSProperties } from "react";
import { photoSlots } from "@/data/historia";
import { ChapterHeading } from "./ChapterHeading";
import { Scene } from "./motion";
import { PhotoSlot, type Photos } from "./PhotoSlot";
import { ScrollText } from "./ScrollText";

const collage = [
  { slot: photoSlots.fundacao, className: "left-[4%] top-[42%] w-[46%] md:left-[6%] md:top-[38%] md:w-[30%]", o: 0, rot: "-2.5deg", drift: "-30px" },
  { slot: photoSlots.primeiraDiretoria, className: "right-[4%] top-[50%] w-[44%] md:left-[38%] md:right-auto md:top-[46%] md:w-[26%]", o: 0.18, rot: "1.5deg", drift: "-60px" },
  { slot: photoSlots.primeirasReunioes, className: "hidden md:block md:right-[6%] md:top-[36%] md:w-[24%]", o: 0.36, rot: "3deg", drift: "-90px" },
];

/**
 * CAPÍTULO 02 — Onde tudo começou.
 * Cena fixada em quatro tempos: 1975 → a data da fundação se monta na tela
 * vinda de três direções → as fotos da fundação se revelam → seguem para cima.
 */
export function Origins({ photos }: { photos: Photos }) {
  return (
    <section id="onde-tudo-comecou" aria-label="Capítulo 02 — Onde tudo começou" className="relative bg-[var(--ink-warm)] text-stone-200">
      <ChapterHeading
        number="02"
        title={"Onde tudo\ncomeçou"}
        accent={["começou"]}
        intro="A categoria também sentia na carne as mazelas do sistema. Um grupo de companheiras e companheiros abnegados resolveu agir."
        className="pb-10 pt-28 md:pt-40"
      />

      <Scene length={4} phases={[[0, 0.2], [0.2, 0.5], [0.5, 0.85], [0.85, 1]]} stickyClassName="text-stone-100">
        <span className="story-grain" aria-hidden="true" />

        {/* Tempo 1 — 1975 */}
        <div className="origins__1975 absolute inset-0 flex items-center">
          <div className="container-site grid items-center gap-6 md:grid-cols-[auto_1fr] md:gap-14">
            <p className="story-outline font-display text-[36vw] font-semibold leading-[0.8] text-stone-200/70 md:text-[16rem]">1975</p>
            <div className="max-w-md">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">Na clandestinidade</p>
              <p className="mt-4 font-display text-3xl font-semibold uppercase leading-tight text-stone-50 sm:text-4xl">
                Associação dos Servidores da Casan
              </p>
              <p className="font-story-serif mt-4 text-lg leading-relaxed text-stone-300">
                De forma clandestina, a categoria começa a se organizar e funda a Associação: o primeiro passo.
              </p>
            </div>
          </div>
        </div>

        {/* Tempo 2 — a data se monta */}
        <div className="origins__date absolute inset-x-0 top-[6%] flex flex-col items-center px-4 md:top-[10%]">
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-red-400 sm:text-xs">A fundação</p>
          <p className="flex items-end gap-[2vw] font-display font-semibold leading-[0.8] text-stone-50" aria-label="9 de novembro de 1977">
            <span className="origins__d text-[20vw] md:text-[11rem]">09</span>
            <span className="origins__m mb-[0.12em] text-[9vw] text-red-500 md:text-[5rem]">/</span>
            <span className="origins__m text-[20vw] md:text-[11rem]">11</span>
            <span className="origins__m mb-[0.12em] text-[9vw] text-red-500 md:text-[5rem]">/</span>
            <span className="origins__y story-outline text-[20vw] text-stone-50 md:text-[11rem]">1977</span>
          </p>
          <p className="origins__claim font-story-serif mt-6 max-w-xl text-center text-xl italic text-stone-300 sm:text-2xl">
            Ousaram e fundaram o nosso Sindicato.
          </p>
        </div>

        {/* Tempo 3 — as fotos da fundação */}
        {collage.map((item) => (
          <div
            key={item.slot.file}
            className={`origins__photo absolute aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ${item.className}`}
            style={{ "--o": item.o, "--rot": item.rot, "--drift": item.drift } as CSSProperties}
          >
            <PhotoSlot slot={item.slot} photos={photos} tone="archive" className="h-full w-full" sizes="(min-width: 768px) 30vw, 50vw" />
          </div>
        ))}
      </Scene>

      <div className="container-site pb-28 pt-10 md:pb-40">
        <ScrollText
          text="Passo a passo, o Sindicato foi se constituindo numa entidade combativa e respeitada, travando inúmeras batalhas em defesa dos direitos imediatos dos trabalhadores e nas lutas gerais do povo brasileiro."
          highlight={["combativa", "respeitada", "batalhas"]}
          highlightClassName="text-red-400"
          className="font-story-serif max-w-5xl text-3xl leading-[1.3] text-stone-100 sm:text-5xl sm:leading-[1.2]"
        />
      </div>
    </section>
  );
}
