"use client";

import { FadeIn, SplitReveal } from "./motion";

/** Abertura tipográfica de cada capítulo: número, título e introdução. */
export function ChapterHeading({
  number,
  title,
  intro,
  tone = "dark",
  accent,
  className = "",
}: {
  number: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  accent?: string[];
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <header className={`container-site relative ${className}`}>
      <FadeIn from="left">
        <p
          className={`flex items-center gap-4 font-display text-sm font-semibold uppercase tracking-[0.35em] ${
            dark ? "text-stone-400" : "text-brand-blue"
          }`}
        >
          <span className={`text-4xl tracking-normal ${dark ? "text-stone-100" : "text-brand-navy"}`}>{number}</span>
          <span className={`h-px w-12 ${dark ? "bg-stone-500" : "bg-brand-blue/50"}`} aria-hidden="true" />
          Capítulo
        </p>
      </FadeIn>
      <SplitReveal
        text={title}
        accent={accent}
        className={`mt-6 max-w-5xl font-display text-5xl font-semibold uppercase leading-[0.92] sm:text-7xl lg:text-8xl ${
          dark ? "text-stone-50 [&_.split-accent]:text-red-400" : "text-brand-navy [&_.split-accent]:text-brand-blue"
        }`}
      />
      {intro ? (
        <FadeIn delay={250}>
          <p
            className={`font-story-serif mt-8 max-w-2xl text-xl leading-relaxed sm:text-2xl ${
              dark ? "text-stone-300" : "text-slate-600"
            }`}
          >
            {intro}
          </p>
        </FadeIn>
      ) : null}
    </header>
  );
}
