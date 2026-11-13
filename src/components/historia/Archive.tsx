"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { archive, archiveSource, type ArchiveDecade } from "@/data/historia";
import { FadeIn, SplitReveal } from "./motion";

const filters: Array<{ id: ArchiveDecade | "all"; label: string }> = [
  { id: "all", label: "Todas" },
  { id: "80", label: "Anos 80" },
  { id: "90", label: "Anos 90" },
  { id: "2000", label: "Anos 2000" },
  { id: "2010", label: "Anos 2010" },
];

const src = (file: string) => `/historia/acervo/${file}.jpg`;

/**
 * Acervo — 40 anos em imagens.
 * Fotos reais com as legendas originais, filtráveis por década. Ao clicar,
 * a foto abre em tela cheia (setas do teclado navegam, Esc fecha).
 */
export function Archive() {
  const [decade, setDecade] = useState<ArchiveDecade | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const items = useMemo(() => archive.filter((a) => decade === "all" || a.decade === decade), [decade]);
  const current = open !== null ? items[open] : null;

  const show = (index: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setOpen(index);
  };

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null) {
      if (d.open) d.close();
      // Esc fecha o diálogo nativo antes deste efeito: devolve o foco à foto clicada.
      lastTrigger.current?.focus();
      lastTrigger.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <section id="acervo" aria-label="Acervo — 40 anos em imagens" className="relative bg-[var(--ink-warm)] pb-24 pt-24 text-stone-100 md:pb-32 md:pt-32">
      <span className="story-grain" aria-hidden="true" />
      <div className="container-site relative">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <FadeIn from="left">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-400">Acervo · 1985 — 2017</p>
            </FadeIn>
            <SplitReveal
              text={"Quem esteve\nlá, na luta"}
              accent={["luta"]}
              className="mt-5 font-display text-5xl font-semibold uppercase leading-[0.92] sm:text-7xl [&_.split-accent]:text-brand-green"
            />
            <FadeIn delay={200}>
              <p className="font-story-serif mt-6 max-w-2xl text-xl leading-relaxed text-stone-300">
                Assembleias, greves, ocupações e atos registrados ao longo das décadas. Cada foto, com a legenda original do acervo.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={250}>
            <div role="group" aria-label="Filtrar por década" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={decade === f.id}
                  onClick={() => setDecade(f.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    decade === f.id ? "bg-stone-100 text-[var(--ink-warm)]" : "text-stone-300 ring-1 ring-stone-600 hover:ring-stone-300"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        <ul key={decade} className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>li]:mb-4">
          {items.map((item, index) => (
            <li key={item.file} className="timeline-panel break-inside-avoid" style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}>
              <button
                type="button"
                onClick={(e) => show(index, e.currentTarget)}
                className="group relative block w-full overflow-hidden rounded-xl text-left ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-brand-green"
                aria-label={`Ampliar foto: ${item.caption}`}
              >
                <Image
                  src={src(item.file)}
                  alt={item.caption}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-12 text-sm font-semibold leading-snug text-white">
                  {item.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-stone-500">{archiveSource}</p>
      </div>

      {/* Visualizador em tela cheia */}
      <dialog
        ref={dialog}
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label={current ? current.caption : "Foto do acervo"}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/90 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && close()}>
            <div key={current.file} className="timeline-panel relative max-h-[78vh] w-full max-w-6xl">
              <Image
                src={src(current.file)}
                alt={current.caption}
                width={current.width}
                height={current.height}
                sizes="100vw"
                className="mx-auto h-auto max-h-[78vh] w-auto rounded-lg object-contain"
                priority
              />
            </div>
            <div className="flex w-full max-w-6xl items-center justify-between gap-4 text-white">
              <p className="font-display text-lg uppercase leading-tight sm:text-2xl">{current.caption}</p>
              <div className="flex shrink-0 items-center gap-2">
                <span className="mr-2 font-display text-sm tabular-nums text-white/60">
                  {(open ?? 0) + 1} / {items.length}
                </span>
                <button type="button" onClick={() => step(-1)} aria-label="Foto anterior" className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/30 transition hover:bg-white/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Próxima foto" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black transition hover:bg-white/90">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
                <button type="button" onClick={close} aria-label="Fechar" className="ml-1 grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/30 transition hover:bg-white/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
