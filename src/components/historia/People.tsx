"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { photoSlots, type PhotoSlotInfo } from "@/data/historia";
import { ChapterHeading } from "./ChapterHeading";
import { FadeIn, Scene } from "./motion";
import { PhotoSlot, type Photos } from "./PhotoSlot";

/* Impressão digital gerada (determinística): laços concêntricos com falhas. */
const fingerprint = Array.from({ length: 17 }, (_, i) => {
  const cx = 100;
  const cy = 112;
  const rx = 7 + i * 5.4;
  const ry = 9 + i * 6.6;
  const gap = 0.35 + ((i * 37) % 11) / 30; // abertura do laço (rad)
  const start = Math.PI / 2 + gap;
  const end = Math.PI / 2 + Math.PI * 2 - gap * (i % 3 === 0 ? 1.6 : 1);
  const steps = 72;
  const points: string[] = [];
  for (let s = 0; s <= steps; s++) {
    const a = start + ((end - start) * s) / steps;
    const wobble = 1 + Math.sin(a * 3 + i) * 0.025;
    const x = cx + Math.cos(a) * rx * wobble;
    const y = cy - Math.sin(a) * ry * wobble * (a > Math.PI ? 0.92 : 1);
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `M${points.join(" L")}`;
});

const around: Array<{ slot: PhotoSlotInfo; className: string; o: number; speed: string }> = [
  { slot: photoSlots.liderancas, className: "left-[3%] top-[8%] w-[17%] aspect-[3/4]", o: 0.05, speed: "160px" },
  { slot: photoSlots.fundadores, className: "left-[8%] bottom-[6%] w-[15%] aspect-square", o: 0.15, speed: "90px" },
  { slot: photoSlots.campo, className: "left-[24%] top-[3%] w-[12%] aspect-[4/5]", o: 0.25, speed: "220px" },
  { slot: photoSlots.assembleias, className: "right-[4%] top-[6%] w-[18%] aspect-[4/3]", o: 0.1, speed: "130px" },
  { slot: photoSlots.diretoriaAtual, className: "right-[6%] bottom-[8%] w-[16%] aspect-[3/4]", o: 0.2, speed: "200px" },
  { slot: photoSlots.movimentos, className: "right-[25%] bottom-[2%] w-[12%] aspect-square", o: 0.3, speed: "70px" },
];

const quote =
  "A história do SINTAEMA-SC tem a impressão digital de cada trabalhadora e de cada trabalhador que, de forma altiva, teve a ousadia de quebrar as algemas e lutar.";

/**
 * CAPÍTULO 05 — Pessoas que fizeram a história.
 * A impressão digital se desenha com a rolagem enquanto as pessoas — fotos
 * de fundadores, lideranças, base — chegam pelas bordas, em profundidades
 * diferentes. A frase do histórico acende palavra por palavra.
 */
export function People({ photos, base }: { photos: Photos; base: string }) {
  const words = quote.split(" ");
  return (
    <section id="pessoas" aria-label="Capítulo 05 — Pessoas que fizeram a história" className="relative bg-white">
      <ChapterHeading
        number="05"
        title={"Pessoas que\nfizeram a história"}
        accent={["história"]}
        tone="light"
        intro="Nenhuma conquista tem um só autor. Esta é a parte da história que pertence a cada um."
        className="pb-10 pt-28 md:pt-40"
      />

      <Scene length={2.6} phases={[[0.2, 0.85]]} stickyClassName="grid place-items-center">
        <svg
          viewBox="0 0 200 230"
          className="fingerprint absolute h-[78%] max-w-[92vw] text-brand-blue/25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {fingerprint.map((d, i) => (
            <path key={i} d={d} pathLength={1} style={{ "--d": (i / fingerprint.length) * 0.5 } as CSSProperties} />
          ))}
        </svg>

        {around.map((item) => (
          <div
            key={item.slot.file}
            className={`people__photo absolute hidden overflow-hidden rounded-xl shadow-card-hover md:block ${item.className}`}
            style={{ "--o": item.o, "--speed": item.speed } as CSSProperties}
          >
            <PhotoSlot slot={item.slot} photos={photos} tone="color" variant="ambient" className="h-full w-full" sizes="20vw" />
          </div>
        ))}

        <p className="font-story-serif relative mx-auto max-w-[18ch] px-4 text-center text-[1.85rem] leading-[1.22] text-brand-navy sm:text-4xl md:max-w-[22ch] lg:text-[3.1rem]" aria-label={quote}>
          {words.map((word, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`closing__word inline-block ${/digital|ousadia|lutar/.test(word) ? "italic text-brand-blue" : ""}`}
              style={{ "--i": i, "--n": words.length } as CSSProperties}
            >
              {word}&nbsp;
            </span>
          ))}
        </p>
      </Scene>

      {/* Mosaico — celular e tablet */}
      <div className="container-site grid grid-cols-2 gap-3 pb-6 md:hidden">
        {around.map((item, index) => (
          <FadeIn key={item.slot.file} delay={index * 60} from="scale" className={index % 3 === 0 ? "col-span-2" : ""}>
            <div className={`relative overflow-hidden rounded-xl ${index % 3 === 0 ? "aspect-[16/9]" : "aspect-square"}`}>
              <PhotoSlot slot={item.slot} photos={photos} tone="color" className="h-full w-full" sizes="50vw" />
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="container-site pb-28 pt-10 md:pb-36">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 border-t border-brand-navy/10 pt-10 md:flex-row md:items-center">
            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              <strong className="font-semibold text-brand-navy">Você faz parte desta história?</strong> Fotos, documentos e
              lembranças ajudam a contar quem esteve em cada luta.
            </p>
            <Link href={`${base}/contato`} className="btn-primary shrink-0">
              Envie seu registro
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
