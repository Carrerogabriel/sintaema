"use client";

import { useId, useState } from "react";
import { conquests, photoSlots, waterVictories } from "@/data/historia";
import { ChapterHeading } from "./ChapterHeading";
import { FadeIn, Scene } from "./motion";
import { PhotoSlot, type Photos } from "./PhotoSlot";

/**
 * CAPÍTULO 04 — Conquistas e transformações.
 * 1) Lista interativa das lutas por direitos (abre ao selecionar).
 * 2) 2002: a água sobe e cobre a tela — a virada da história; a página,
 *    escura até aqui, ganha cor e luz.
 * 3) A lista de 500 demissões é riscada pela rolagem.
 */
export function Conquests({ photos }: { photos: Photos }) {
  return (
    <section id="conquistas" aria-label="Capítulo 04 — Conquistas e transformações">
      <RightsList photos={photos} />
      <WaterTurn />
      <WaterVictories photos={photos} />
      <FiveHundred />
    </section>
  );
}

function RightsList({ photos }: { photos: Photos }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();
  const current = conquests[open] ?? conquests[0];

  return (
    <div className="relative bg-brand-navy-dark pb-28 text-sky-50 md:pb-40">
      <ChapterHeading
        number="04"
        title={"Conquistas e\ntransformações"}
        accent={["transformações"]}
        intro="Direito por direito, ano após ano: a luta pela carreira, pela saúde, pelo emprego e contra o desmonte do serviço público."
        className="pb-14 pt-24 md:pb-20 md:pt-36 [&_.split-accent]:!text-brand-green"
      />

      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Prévia fixa (desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--hh,64px)+2rem)] aspect-[4/5] overflow-hidden rounded-2xl">
            <div key={current.title} className="timeline-panel absolute inset-0">
              <PhotoSlot slot={photoSlots[current.photo]} photos={photos} tone="faded" className="h-full w-full" sizes="40vw" />
            </div>
            <p className="absolute bottom-5 left-5 font-display text-7xl font-semibold text-white/90" aria-hidden="true">
              0{open + 1}
            </p>
          </div>
        </div>

        <ul className="border-t border-white/15">
          {conquests.map((item, index) => {
            const expanded = open === index;
            const panelId = `${baseId}-${index}`;
            return (
              <li key={item.title} className="border-b border-white/15">
                <FadeIn delay={index * 80}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(index)}
                    onMouseEnter={() => setOpen(index)}
                    className="group flex w-full items-start gap-5 py-7 text-left sm:gap-8"
                  >
                    <span className={`mt-2 font-display text-sm font-semibold transition-colors ${expanded ? "text-brand-green" : "text-sky-200/50"}`}>
                      0{index + 1}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block font-display text-3xl font-semibold uppercase leading-none transition-all duration-500 sm:text-5xl ${
                          expanded ? "translate-x-2 text-white" : "text-sky-100/45 group-hover:text-sky-100/80"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="mt-3 block text-xs font-bold uppercase tracking-[0.2em] text-sky-200/60">{item.period}</span>
                    </span>
                    <span
                      className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        expanded ? "rotate-45 border-brand-green bg-brand-green text-white" : "border-white/25 text-white/70"
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    className={`grid transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-8 pl-10 sm:pl-14">
                        <p className="font-story-serif max-w-xl text-lg leading-relaxed text-sky-100/85 sm:text-xl">{item.text}</p>
                        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-xl lg:hidden">
                          <PhotoSlot slot={photoSlots[item.photo]} photos={photos} tone="faded" className="h-full w-full" sizes="90vw" />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function WaterTurn() {
  return (
    <Scene length={2.6} phases={[[0, 0.55], [0.55, 0.85]]} className="bg-brand-navy-dark" stickyClassName="text-white">
      <div className="water__intro absolute inset-0 grid place-items-center px-6 text-center">
        <p className="font-display text-[26vw] font-semibold leading-none text-white/[0.07] md:text-[18rem]" aria-hidden="true">
          2002
        </p>
        <p className="absolute font-story-serif max-w-xl text-xl italic text-sky-100/80 sm:text-2xl">
          E então a luta mudou de tamanho.
        </p>
      </div>

      {/* A água sobe */}
      <div className="water__fill absolute inset-x-0 bottom-0 h-[115%]">
        <svg className="absolute -top-[59px] left-0 h-[60px] w-[200%] animate-wave text-brand-blue" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path fill="currentColor" d="M0 30 C 180 0 360 60 540 30 S 900 0 1080 30 S 1260 60 1440 30 V60 H0Z" />
        </svg>
        <div className="h-full bg-gradient-to-b from-brand-blue via-brand-blue to-brand-cyan" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="water__title">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/80">A partir de 2002</p>
          <h3 className="mt-5 font-display text-[13vw] font-semibold uppercase leading-[0.88] md:text-[8.5rem]">
            Água pública
            <br />
            não se vende
          </h3>
          <p className="font-story-serif mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
            O Sindicato entra na dura batalha contra a privatização da água e contra o desmonte da Casan.
          </p>
        </div>
        <p className="water__quote mt-10 font-display text-3xl font-semibold uppercase text-white sm:text-5xl">
          “Hora da onça beber água.”
        </p>
      </div>
    </Scene>
  );
}

function WaterVictories({ photos }: { photos: Photos }) {
  return (
    <div className="relative bg-gradient-to-b from-brand-cyan via-brand-sand to-brand-sand pb-24 pt-24 md:pb-36 md:pt-36">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn from="left">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover">
            <PhotoSlot slot={photoSlots.aguaPublica} photos={photos} tone="color" className="h-full w-full" />
          </div>
        </FadeIn>
        <div>
          <FadeIn>
            <p className="font-story-serif text-2xl leading-relaxed text-brand-navy sm:text-3xl">
              Não bastava resistir. Era preciso <em className="text-brand-blue">propor</em> um novo modelo.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-10">
            {waterVictories.map((item, index) => (
              <FadeIn key={item.title} delay={150 + index * 150}>
                <div className="grid grid-cols-[auto_1fr] gap-6">
                  <span className="font-display text-5xl font-semibold leading-none text-brand-blue/30">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-3xl font-semibold uppercase leading-tight text-brand-navy sm:text-4xl">{item.title}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FiveHundred() {
  return (
    <Scene length={2.2} phases={[[0, 0.3], [0.3, 0.6], [0.6, 0.85]]} className="bg-brand-sand" stickyClassName="flex items-center">
      <div className="container-site relative">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-blue">2004</p>
        <p className="mt-3 max-w-xl font-story-serif text-xl text-slate-600 sm:text-2xl">A famigerada lista de</p>
        <div className="relative mt-2 inline-block">
          <p className="five__number font-display text-[42vw] font-semibold leading-[0.8] text-brand-navy md:text-[22rem]">500</p>
          <span className="five__strike absolute left-[-4%] top-1/2 h-[0.12em] w-[108%] rounded-full bg-brand-green text-[42vw] md:text-[22rem]" aria-hidden="true" />
        </div>
        <p className="font-display text-2xl font-semibold uppercase tracking-wide text-brand-navy sm:text-4xl">demissões</p>
        <div className="five__after mt-8 max-w-2xl">
          <p className="font-display text-4xl font-semibold uppercase leading-[0.95] text-brand-green sm:text-6xl">E a batalha foi vencida.</p>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            O Sindicato enfrentou a lista com valentia e sabedoria. Da mesma forma, enfrentou as reformas administrativas que tinham como
            objetivo desmontar a Casan — e, em 2011, travou uma nova batalha contra a venda de ações da empresa.
          </p>
        </div>
      </div>
    </Scene>
  );
}
