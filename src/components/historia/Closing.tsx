"use client";

import Link from "next/link";
import { PdfActions } from "@/components/PdfActions";
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

        {/* Leve a história com você — dossiê em PDF */}
        <FadeIn delay={100} className="mx-auto mt-24 max-w-5xl">
          <div
            id="baixar-pdf"
            className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] bg-white/[0.05] p-6 ring-1 ring-white/10 sm:p-10 md:grid-cols-[auto_1fr] md:gap-14 lg:p-14"
          >
            <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />

            {/* Capa do documento */}
            <a
              href={`${base}/pdf/historia`}
              target="_blank"
              rel="noopener"
              aria-label="Abrir o dossiê histórico em PDF (nova aba)"
              className="group relative mx-auto block w-44 sm:w-52 [perspective:900px]"
            >
              <span className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg bg-white/10" aria-hidden="true" />
              <span className="relative flex aspect-[1/1.414] flex-col justify-between overflow-hidden rounded-lg bg-[#17130f] p-4 text-left shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/15 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotateY(-14deg)_rotateX(4deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateY(-6px)]">
                <span className="text-[0.5rem] font-bold uppercase tracking-[0.3em] text-stone-400">SINTAEMA-SC · Dossiê histórico</span>
                <span className="font-display text-[1.65rem] font-semibold uppercase leading-[0.9] text-stone-50">
                  Sonhos,
                  <br />
                  lutas e
                  <br />
                  <span className="text-brand-green">conquistas</span>
                </span>
                <span className="flex items-end justify-between">
                  <span className="font-display text-sm text-stone-300">1977 — hoje</span>
                  <span className="rounded bg-red-500 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-white">PDF</span>
                </span>
              </span>
            </a>

            <div className="relative text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-cyan">Leve esta história com você</p>
              <h3 className="mt-3 font-display text-4xl font-semibold uppercase leading-[0.95] text-white sm:text-5xl">
                Baixe o dossiê histórico
              </h3>
              <p className="font-story-serif mt-4 max-w-xl text-lg leading-relaxed text-sky-100/80 md:max-w-none">
                Toda a trajetória do SINTAEMA-SC em um documento para ler, imprimir e compartilhar em assembleias, escolas e
                com quem está chegando à categoria.
              </p>
              <PdfActions href={`${base}/pdf/historia`} label="o dossiê histórico" className="mt-7 justify-center md:justify-start" />
              <a
                href={`${base}/pdf/sobre?download=1`}
                download
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-200/80 underline-offset-4 transition hover:text-white hover:underline"
              >
                Também disponível: perfil institucional em PDF
              </a>
            </div>
          </div>
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
