"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { originalText } from "@/data/historia";
import { FadeIn, Scene } from "./motion";

const lines = [
  ["A", "vida", "segue"],
  ["e", "a", "luta"],
  ["continua."],
];

/**
 * ENCERRAMENTO — Uma história que continua.
 * A frase final do histórico se acende palavra por palavra; uma luz sobe ao
 * fundo. Depois, o convite para fazer parte e o texto original na íntegra.
 */
export function Closing({ base }: { base: string }) {
  const total = lines.flat().length;
  let i = 0;
  return (
    <section id="encerramento" aria-label="Uma história que continua" className="relative bg-brand-navy-dark text-white">
      <Scene length={2.4} phases={[[0.05, 0.6], [0.62, 0.9]]} stickyClassName="flex items-center justify-center overflow-hidden">
        <div
          className="closing__glow absolute left-1/2 top-1/2 h-[90vmax] w-[90vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--c-accent)/0.35),rgb(var(--c-secondary)/0.12)_40%,transparent_65%)]"
          aria-hidden="true"
        />
        <div className="relative px-4 text-center">
          <h2
            className="font-display text-[17vw] font-semibold uppercase leading-[0.86] tracking-tight sm:text-[13vw] lg:text-[10rem]"
            aria-label="A vida segue e a luta continua."
          >
            {lines.map((line, li) => (
              <span key={li} className="block" aria-hidden="true">
                {line.map((word) => {
                  const index = i++;
                  return (
                    <span
                      key={word + index}
                      className={`closing__word inline-block ${word.startsWith("continua") ? "text-brand-green" : ""}`}
                      style={{ "--i": index, "--n": total } as CSSProperties}
                    >
                      {word}&nbsp;
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>
          <div className="closing__after mt-10">
            <p className="font-story-serif text-xl italic text-sky-100/85 sm:text-2xl">Valeu, companheiras e companheiros.</p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-sky-200/60">Um abraço fraterno a todas e todos</p>
          </div>
        </div>
      </Scene>

      <div className="container-site pb-24 md:pb-32">
        <FadeIn className="flex flex-wrap justify-center gap-3">
          <Link href={`${base}/filie-se`} className="btn-primary">
            Faça parte desta história
          </Link>
          <Link href={`${base}/contato`} className="btn-ghost">
            Envie fotos e documentos
          </Link>
        </FadeIn>

        <FadeIn delay={150} className="mx-auto mt-20 max-w-3xl">
          <details className="story-letter group overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 sm:p-8 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-cyan">Texto na íntegra</span>
                <span className="mt-2 block font-display text-2xl font-semibold uppercase leading-tight">{originalText.title}</span>
              </span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 transition-transform duration-300 group-open:rotate-180" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="font-story-serif space-y-5 border-t border-white/10 p-6 text-lg leading-relaxed text-sky-100/85 sm:p-10">
              {originalText.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </details>
        </FadeIn>
      </div>
    </section>
  );
}
