"use client";

import Link from "next/link";
import { CountUp } from "@/components/CountUp";
import { numbers, photoSlots } from "@/data/historia";
import { ChapterHeading } from "./ChapterHeading";
import { FadeIn, Parallax } from "./motion";
import { PhotoSlot, type Photos } from "./PhotoSlot";

const pillars = [
  { title: "Defender", text: "os direitos dos trabalhadores e trabalhadoras." },
  { title: "Fiscalizar", text: "as condições de trabalho em cada local." },
  { title: "Cobrar", text: "dos empregadores mais valorização do quadro funcional." },
];

const actions = ["Atos", "Manifestações públicas", "Palestras", "Oficinas", "Debates", "Movimentos sociais", "Movimentos populares", "Água é direito"];

/**
 * CAPÍTULO 07 — O presente e o futuro.
 * A página chega à luz: compromissos do dia a dia, a atuação além da
 * categoria (faixa em movimento contínuo), os números da trajetória e o
 * 1º Congresso como ponte para as próximas lutas.
 */
export function Present({ photos, years, base }: { photos: Photos; years: number; base: string }) {
  return (
    <section id="presente" aria-label="Capítulo 07 — O presente e o futuro" className="relative overflow-hidden bg-brand-sand">
      <ChapterHeading
        number="07"
        title={"O presente\ne o futuro"}
        accent={["futuro"]}
        tone="light"
        intro="Em nossa luta diária, o objetivo maior continua o mesmo."
        className="pb-14 pt-28 md:pb-20 md:pt-40"
      />

      {/* Compromissos */}
      <div className="container-site grid gap-px overflow-hidden border-y border-brand-navy/10 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <FadeIn key={pillar.title} delay={index * 120} className="py-10 md:px-8 md:py-14 md:first:pl-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-brand-navy/10">
            <p className="font-display text-sm font-semibold text-brand-blue">0{index + 1}</p>
            <p className="mt-3 font-display text-5xl font-semibold uppercase leading-none text-brand-navy lg:text-6xl">{pillar.title}</p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{pillar.text}</p>
          </FadeIn>
        ))}
      </div>

      {/* Além da categoria */}
      <div className="py-24 md:py-32">
        <div className="container-site grid items-end gap-8 lg:grid-cols-2">
          <FadeIn>
            <h3 className="font-display text-4xl font-semibold uppercase leading-[0.95] text-brand-navy sm:text-6xl">
              Muito além
              <br />
              <span className="text-brand-green">da categoria</span>
            </h3>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="font-story-serif text-xl leading-relaxed text-slate-600">
              Como entidade de classe, o SINTAEMA-SC atua junto aos movimentos sociais, populares e institucionais, combinando os interesses
              mais imediatos da categoria com os interesses gerais da sociedade.
            </p>
          </FadeIn>
        </div>
        <div className="mt-14 flex overflow-hidden border-y border-brand-navy/10 py-6" aria-hidden="true">
          <div className="story-marquee flex shrink-0 gap-10 pr-10">
            {[...actions, ...actions].map((action, i) => (
              <span key={i} className="flex shrink-0 items-center gap-10 font-display text-3xl font-semibold uppercase text-brand-navy/80 sm:text-5xl">
                {action}
                <span className="h-3 w-3 rounded-full bg-brand-green" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Números */}
      <div className="bg-brand-navy py-20 text-white md:py-28">
        <div className="container-site">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-cyan">Em números</p>
          </FadeIn>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-5">
            <FadeIn className="col-span-2 lg:col-span-1">
              <p className="font-display text-[6.5rem] font-semibold leading-[0.8] text-brand-green sm:text-[8rem]">
                <CountUp value={years} duration={2000} />
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-sky-100/80">anos de história</p>
            </FadeIn>
            {numbers.map((n, i) => (
              <FadeIn key={n.label} delay={(i + 1) * 100}>
                <p className="font-display text-6xl font-semibold leading-[0.85] sm:text-7xl">
                  <CountUp value={n.value} duration={n.value > 100 ? 2000 : 1300} suffix={n.suffix} />
                </p>
                <p className="mt-3 max-w-[16ch] text-sm leading-snug text-sky-100/75">{n.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Futuro */}
      <div className="py-24 md:py-36">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <Parallax speed={-60}>
              <FadeIn from="scale">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover">
                  <PhotoSlot slot={photoSlots.congresso} photos={photos} tone="color" className="h-full w-full" />
                </div>
              </FadeIn>
            </Parallax>
            <Parallax speed={90} className="absolute -bottom-10 -right-2 w-[46%] sm:-right-6">
              <FadeIn from="scale" delay={200}>
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-card-hover ring-8 ring-brand-sand">
                  <PhotoSlot slot={photoSlots.sede} photos={photos} tone="color" variant="ambient" className="h-full w-full" sizes="25vw" />
                </div>
              </FadeIn>
            </Parallax>
          </div>
          <div>
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-blue">Rumo às próximas lutas</p>
              <h3 className="mt-4 font-display text-4xl font-semibold uppercase leading-[0.95] text-brand-navy sm:text-6xl">
                1º Congresso do SINTAEMA-SC
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Em Itapema, delegadas e delegados atualizaram o Estatuto, aprovaram a tese em defesa da CASAN pública e um plano de lutas para
                orientar a mobilização da categoria.
              </p>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="mt-8 flex items-end gap-5 border-t border-brand-navy/10 pt-8">
                <p className="font-display text-8xl font-semibold leading-[0.8] text-brand-green">
                  <CountUp value={20} />
                </p>
                <p className="pb-1 text-sm font-semibold uppercase tracking-[0.15em] text-brand-navy">
                  pontos no plano
                  <br />
                  de lutas aprovado
                </p>
              </div>
              <Link href={`${base}/noticias/plano-de-lutas-aprovado-no-congresso`} className="link-arrow mt-8">
                Conheça o plano de lutas
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
