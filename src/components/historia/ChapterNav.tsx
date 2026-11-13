"use client";

import { useEffect, useState } from "react";
import { chapters } from "@/data/historia";

/**
 * Índice dos capítulos. Desktop: trilha vertical à direita (com
 * mix-blend-difference para funcionar sobre fundos claros e escuros).
 * Celular: pílula inferior com o capítulo atual que abre o sumário.
 */
export function ChapterNav() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (items) => {
        for (const item of items) {
          if (!item.isIntersecting) continue;
          const idx = chapters.findIndex((c) => c.id === item.target.id);
          if (idx >= 0) setActive(idx);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const current = chapters[active];
  const show = active > 0;

  return (
    <>
      {/* Progresso geral */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
        <div
          className="h-full origin-left bg-gradient-to-r from-red-500 via-brand-green to-brand-cyan"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Desktop */}
      <nav
        aria-label="Capítulos da história"
        className={`fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 text-white mix-blend-difference transition-opacity duration-500 lg:block ${
          show ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ol className="flex flex-col items-end gap-1">
          {chapters.map((chapter, index) => {
            const isActive = index === active;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => goTo(chapter.id)}
                  aria-current={isActive ? "step" : undefined}
                  className="group flex items-center gap-3 py-1.5"
                >
                  <span
                    className={`whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-500 ${
                      "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    }`}
                  >
                    {chapter.title}
                  </span>
                  <span className={`font-display text-xs tabular-nums transition-opacity ${isActive ? "opacity-100" : "opacity-40"}`}>
                    {chapter.number}
                  </span>
                  <span className={`h-px bg-white transition-all duration-500 ${isActive ? "w-10" : "w-4 opacity-50 group-hover:w-6"}`} />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Celular / tablet */}
      <div
        className={`fixed bottom-4 left-1/2 z-40 -translate-x-1/2 transition-all duration-500 lg:hidden ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        {open ? (
          <div
            id="sumario-historia"
            className="mb-3 w-[min(86vw,22rem)] animate-scale-in overflow-hidden rounded-2xl bg-black/80 p-2 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
          >
            <ol>
              {chapters.map((chapter, index) => (
                <li key={chapter.id}>
                  <button
                    type="button"
                    onClick={() => goTo(chapter.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      index === active ? "bg-white/15 font-semibold" : "text-white/75 hover:bg-white/10"
                    }`}
                  >
                    <span className="w-6 font-display text-xs tabular-nums text-white/60">{chapter.number}</span>
                    {chapter.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="sumario-historia"
          className="mx-auto flex max-w-[86vw] items-center gap-3 rounded-full bg-black/70 py-2.5 pl-4 pr-3 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
        >
          <span className="font-display text-sm tabular-nums text-white/60">{current.number}</span>
          <span className="truncate text-sm font-semibold">{current.title}</span>
          <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m6 15 6-6 6 6" />
          </svg>
        </button>
      </div>
    </>
  );
}
