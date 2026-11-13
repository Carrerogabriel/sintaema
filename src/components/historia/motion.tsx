"use client";

/**
 * Motor de animação da página "Nossa história" — sem dependências.
 *
 * Um único listener de scroll + requestAnimationFrame calcula o progresso de
 * cada cena e escreve variáveis CSS (--p, --p0, --p1…) direto no elemento.
 * Toda a animação acontece em CSS (transform/opacity), sem re-render do React
 * durante a rolagem. Cenas fora da tela são ignoradas (IntersectionObserver).
 */

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";

type Mode = "pin" | "view";
type Entry = {
  el: HTMLElement;
  mode: Mode;
  phases?: Array<[number, number]>;
  onProgress?: (p: number) => void;
  active: boolean;
  last: number;
};

const entries = new Set<Entry>();
let frame = 0;
let started = false;
let io: IntersectionObserver | null = null;

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function measure(entry: Entry, vh: number) {
  const rect = entry.el.getBoundingClientRect();
  if (entry.mode === "pin") {
    const total = rect.height - vh;
    return total > 0 ? clamp(-rect.top / total) : rect.top <= 0 ? 1 : 0;
  }
  return clamp((vh - rect.top) / (vh + rect.height));
}

function run() {
  frame = 0;
  const vh = window.innerHeight;
  for (const entry of entries) {
    if (!entry.active) continue;
    const p = measure(entry, vh);
    if (Math.abs(p - entry.last) < 0.0005) continue;
    entry.last = p;
    entry.el.style.setProperty("--p", p.toFixed(4));
    entry.phases?.forEach(([from, to], i) => {
      entry.el.style.setProperty(`--p${i}`, clamp((p - from) / (to - from)).toFixed(4));
    });
    entry.onProgress?.(p);
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(run);
}

function syncHeaderHeight() {
  const header = document.querySelector("header");
  if (!header) return;
  const set = () =>
    document.documentElement.style.setProperty("--hh", `${Math.round(header.getBoundingClientRect().height)}px`);
  set();
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(set).observe(header);
}

function start() {
  if (started) return;
  started = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  syncHeaderHeight();
  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(
      (items) => {
        for (const item of items) {
          for (const entry of entries) {
            if (entry.el === item.target) entry.active = item.isIntersecting;
          }
        }
        schedule();
      },
      { rootMargin: "25% 0px 25% 0px" },
    );
  }
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Liga um elemento ao motor de scroll. */
export function useScrollVar(
  ref: RefObject<HTMLElement | null>,
  options: { mode?: Mode; phases?: Array<[number, number]>; onProgress?: (p: number) => void } = {},
) {
  const { mode = "view", phases, onProgress } = options;
  const callback = useRef(onProgress);
  callback.current = onProgress;
  const phaseKey = JSON.stringify(phases ?? []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    start();
    const entry: Entry = {
      el,
      mode,
      phases: phases ? (JSON.parse(phaseKey) as Array<[number, number]>) : undefined,
      onProgress: (p) => callback.current?.(p),
      active: !io,
      last: -1,
    };
    entries.add(entry);
    io?.observe(el);
    // Primeira medição imediata para não "piscar" no carregamento.
    entry.active = true;
    schedule();
    return () => {
      entries.delete(entry);
      io?.unobserve(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mode, phaseKey]);
}

/* ──────────────────────────── Primitivas ──────────────────────────── */

/**
 * Cena fixada: o conteúdo fica preso na tela enquanto o visitante rola
 * `length` alturas de tela. Expõe --p (0→1) e --p0, --p1… por fase.
 */
export function Scene({
  length = 2,
  phases,
  onProgress,
  className = "",
  stickyClassName = "",
  children,
  id,
  label,
}: {
  length?: number;
  phases?: Array<[number, number]>;
  onProgress?: (p: number) => void;
  className?: string;
  stickyClassName?: string;
  children: ReactNode;
  id?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollVar(ref, { mode: "pin", phases, onProgress });
  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      className={`story-scene relative ${className}`}
      style={{ "--len": length } as CSSProperties}
    >
      <div className={`story-scene__sticky ${stickyClassName}`}>{children}</div>
    </section>
  );
}

/** Desloca o conteúdo em velocidade diferente da rolagem (profundidade). */
export function Parallax({
  speed = 80,
  className = "",
  children,
  as = "div",
}: {
  speed?: number;
  className?: string;
  children?: ReactNode;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollVar(ref, { mode: "view" });
  return createElement(
    as,
    { ref, className: `story-parallax ${className}`, style: { "--speed": `${speed}px` } as CSSProperties },
    children,
  );
}

/** Dispara uma vez quando o elemento entra na tela. */
export function useInView<T extends HTMLElement>(ref: RefObject<T | null>, rootMargin = "0px 0px -12% 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([item]) => {
        if (item.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

/**
 * Título que entra palavra por palavra, cada palavra subindo de trás de uma
 * máscara. O texto completo fica disponível para leitores de tela.
 */
export function SplitReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 70,
  accent,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Palavras (exatas) que recebem a classe .split-accent. */
  accent?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const lines = text.split("\n");
  let index = 0;
  return createElement(
    as,
    { ref, className: `split-reveal ${className}`, "data-in": inView ? "true" : "false", "aria-label": text.replace(/\n/g, " ") },
    lines.map((line, li) => (
      <span key={li} className="block" aria-hidden="true">
        {line.split(" ").map((word, wi) => {
          const i = index++;
          return (
            <span key={wi}>
              <span className="split-reveal__mask">
                <span
                  className={`split-reveal__word ${accent?.includes(word) ? "split-accent" : ""}`}
                  style={{ transitionDelay: `${delay + i * stagger}ms` }}
                >
                  {word}
                </span>
              </span>{" "}
            </span>
          );
        })}
      </span>
    )),
  );
}

/** Wrapper simples de entrada (fade + deslocamento) usando IntersectionObserver. */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  from = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left" | "right" | "scale" | "none";
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return createElement(
    as,
    {
      ref,
      className: `story-fade ${className}`,
      "data-from": from,
      "data-in": inView ? "true" : "false",
      style: { transitionDelay: `${delay}ms` },
    },
    children,
  );
}
