"use client";

import { useEffect, useRef, useState } from "react";
import { contextSteps, photoSlots } from "@/data/historia";
import { ChapterHeading } from "./ChapterHeading";
import { PhotoSlot, type Photos } from "./PhotoSlot";

/**
 * CAPÍTULO 01 — Anos de chumbo.
 * Scrollytelling: a imagem fica fixa enquanto os parágrafos passam; a palavra
 * sobre a imagem troca a cada parágrafo, marcando o ritmo da leitura.
 */
export function Context({ photos }: { photos: Photos }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (items) => {
        for (const item of items) {
          if (item.isIntersecting) setActive(Number((item.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="anos-de-chumbo" aria-labelledby="cap-01" className="relative bg-[var(--ink-dark)] text-stone-300">
      <span className="story-grain" aria-hidden="true" />
      <div id="cap-01" className="sr-only">
        Capítulo 01 — Anos de chumbo
      </div>
      <ChapterHeading
        number="01"
        title={"Anos de\nchumbo"}
        accent={["chumbo"]}
        intro="Antes do Sindicato, havia o silêncio imposto. Foi nesse cenário que tudo começou."
        className="pb-16 pt-28 md:pb-24 md:pt-40"
      />

      <div className="container-site relative grid lg:grid-cols-2 lg:gap-16">
        {/* Imagem fixa */}
        <div className="sticky top-[var(--hh,64px)] z-10 -mx-4 h-[42svh] sm:-mx-6 lg:mx-0 lg:h-[var(--stage-h)] lg:py-10">
          <div className="relative h-full overflow-hidden lg:rounded-2xl">
            <PhotoSlot slot={photoSlots.ditadura} photos={photos} tone="archive" variant="ambient" className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-dark)] via-[var(--ink-dark)]/40 to-transparent" />
            {contextSteps.map((step, index) => (
              <p
                key={step.keyword}
                aria-hidden="true"
                className={`absolute bottom-5 left-5 right-5 font-display text-[13vw] font-semibold uppercase leading-[0.85] text-stone-50 transition-all duration-700 ease-out sm:bottom-8 sm:left-8 lg:text-[5.5rem] ${
                  active === index ? "translate-y-0 opacity-100" : index < active ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0"
                }`}
              >
                {step.keyword}
              </p>
            ))}
            <div className="absolute right-5 top-5 flex gap-1.5 sm:right-8 sm:top-8" aria-hidden="true">
              {contextSteps.map((step, index) => (
                <span
                  key={step.keyword}
                  className={`h-1 rounded-full transition-all duration-500 ${active === index ? "w-8 bg-red-500" : "w-3 bg-stone-500"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Parágrafos */}
        <div className="relative pb-[20svh] pt-[6svh] lg:pt-[30svh]">
          {contextSteps.map((step, index) => (
            <div
              key={step.keyword}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              data-step={index}
              className={`flex min-h-[70svh] flex-col justify-center transition-opacity duration-700 lg:min-h-[85svh] ${
                active === index ? "opacity-100" : "opacity-25"
              }`}
            >
              <p className="font-story-serif text-2xl leading-relaxed text-stone-200 sm:text-[1.7rem] sm:leading-[1.55]">
                {step.text}
              </p>
              {step.quote ? (
                <p className="mt-10 border-l-2 border-red-500 pl-6 font-display text-4xl font-semibold uppercase leading-[1.02] text-stone-50 sm:text-5xl">
                  {step.quote}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
