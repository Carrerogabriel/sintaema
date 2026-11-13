import type { ReactNode } from "react";
import { Reveal } from "../Reveal";

/**
 * "Do manancial à sua torneira": o caminho da água com encanamento animado.
 * Horizontal no desktop, vertical no celular.
 */

const ink = "rgb(var(--c-primary))";
const water = "rgb(var(--c-secondary))";
const light = "rgb(var(--c-highlight))";
const accent = "rgb(var(--c-accent))";

function Manancial() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
      <path d="M4 38 L20 16 L30 28 L40 12 L60 38 Z" fill={ink} opacity="0.85" />
      <path d="M36 17.5 L40 12 L44 17.5 L40 20 Z" fill="#fff" opacity="0.9" />
      <clipPath id="j-river">
        <rect x="2" y="36" width="60" height="24" rx="6" />
      </clipPath>
      <g clipPath="url(#j-river)">
        <rect x="2" y="36" width="60" height="24" fill={water} />
        <g className="journey-river">
          <path d="M-60 44 q7.5 -4 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 V60 H-60 Z" fill={light} opacity="0.7" />
          <path d="M-60 51 q7.5 -3 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}

function Captacao() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
      <rect x="6" y="40" width="14" height="8" rx="2" fill={water} />
      <rect x="44" y="20" width="14" height="8" rx="2" fill={water} />
      <circle cx="32" cy="34" r="16" fill={ink} />
      <circle cx="32" cy="34" r="11" fill="#fff" opacity="0.15" />
      <g className="origin-center animate-spin [animation-duration:2.4s]" style={{ transformOrigin: "32px 34px" }}>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path key={deg} d="M32 34 L32 24 Q37 26 36 31 Z" fill={light} transform={`rotate(${deg} 32 34)`} />
        ))}
      </g>
      <circle cx="32" cy="34" r="3" fill="#fff" />
    </svg>
  );
}

function Tratamento() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
      <rect x="8" y="14" width="22" height="40" rx="4" fill="none" stroke={ink} strokeWidth="3" />
      <rect x="34" y="22" width="22" height="32" rx="4" fill="none" stroke={ink} strokeWidth="3" />
      <rect x="10" y="30" width="18" height="22" rx="2" fill={accent} opacity="0.55" className="journey-level" />
      <rect x="36" y="34" width="18" height="18" rx="2" fill={water} className="journey-level [animation-delay:-1.2s]" />
      {[14, 20, 24].map((x, i) => (
        <circle key={x} cx={x} cy="48" r="1.6" fill="#fff" className="journey-bubble" style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
      {[40, 46, 50].map((x, i) => (
        <circle key={x} cx={x} cy="48" r="1.4" fill="#fff" className="journey-bubble" style={{ animationDelay: `${0.3 + i * 0.6}s` }} />
      ))}
      <path d="M30 26 h4" stroke={ink} strokeWidth="3" />
    </svg>
  );
}

function Reservatorio() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
      <path d="M20 40 L14 60 M44 40 L50 60 M17 50 H47" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <clipPath id="j-tank">
        <rect x="12" y="8" width="40" height="32" rx="8" />
      </clipPath>
      <rect x="12" y="8" width="40" height="32" rx="8" fill="#fff" stroke={ink} strokeWidth="3" />
      <g clipPath="url(#j-tank)">
        <g className="journey-tank">
          <path d="M0 22 q8 -4 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 V44 H0 Z" fill={water} />
        </g>
      </g>
      <rect x="12" y="8" width="40" height="32" rx="8" fill="none" stroke={ink} strokeWidth="3" />
    </svg>
  );
}

function Torneira() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
      <path d="M4 18 H30 a10 10 0 0 1 10 10 V34" stroke={ink} strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="18" y="8" width="10" height="5" rx="2" fill={accent} />
      <rect x="21" y="11" width="4" height="6" fill={ink} />
      <rect x="34" y="33" width="12" height="4" rx="1.5" fill={ink} />
      <path className="journey-drip" d="M40 40c-2.5 3.5-4 5.6-4 7.5a4 4 0 0 0 8 0c0-1.9-1.5-4-4-7.5Z" fill={water} />
      <ellipse cx="40" cy="60" rx="10" ry="2" fill={light} opacity="0.5" className="journey-splash" />
    </svg>
  );
}

function Devolucao() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
      <g className="animate-spin [animation-duration:9s]" style={{ transformOrigin: "32px 32px" }}>
        <path d="M32 6 a26 26 0 0 1 24 16" stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M52 16 l5 7 l-8 1" fill={accent} />
        <path d="M32 58 a26 26 0 0 1 -24 -16" stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M12 48 l-5 -7 l8 -1" fill={accent} />
      </g>
      <path d="M32 16c-6 8.5-10 13.8-10 18.5a10 10 0 0 0 20 0c0-4.7-4-10-10-18.5Z" fill={water} />
      <path d="M27 36a5 5 0 0 0 5 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const steps: Array<{ title: string; text: string; art: ReactNode }> = [
  { title: "Manancial", text: "Rios e represas: a água bruta nasce aqui.", art: <Manancial /> },
  { title: "Captação", text: "Bombas e adutoras levam a água até a estação.", art: <Captacao /> },
  { title: "Tratamento", text: "Na ETA, a água fica própria para o consumo.", art: <Tratamento /> },
  { title: "Reservação", text: "Reservatórios garantem pressão e abastecimento.", art: <Reservatorio /> },
  { title: "Sua torneira", text: "Rede de distribuição até cada casa.", art: <Torneira /> },
  { title: "Esgoto tratado", text: "Coletado, tratado e devolvido limpo à natureza.", art: <Devolucao /> },
];

export function WaterJourney({ companyName }: { companyName: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-brand-water/40 to-white py-16 md:py-24">
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-brand-green">O caminho da água</p>
          <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-brand-navy md:text-4xl">
            Do manancial à sua torneira
          </h2>
          <p className="mt-3 text-slate-600">
            Cada etapa do saneamento na {companyName} depende de quem trabalha nela. É essa
            categoria que o SINTAEMA representa.
          </p>
        </Reveal>

        <ol className="relative mt-12 grid gap-6 lg:mt-16 lg:grid-cols-6 lg:gap-4">
          {/* Encanamento: vertical no celular, horizontal no desktop */}
          <span className="pipe pipe-y absolute bottom-10 left-[38px] top-10 w-3 lg:hidden" aria-hidden="true" />
          <span className="pipe pipe-x absolute left-[8%] right-[8%] top-[42px] hidden h-3 lg:block" aria-hidden="true" />

          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 110}
              className="relative flex items-center gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
            >
              <span className="relative z-10 grid h-[88px] w-[88px] shrink-0 place-items-center rounded-full bg-white shadow-card ring-4 ring-brand-water transition duration-500 hover:-translate-y-1 hover:shadow-card-hover">
                {step.art}
                <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-brand-navy font-display text-sm font-semibold text-white">
                  {index + 1}
                </span>
              </span>
              <span className="lg:mt-5">
                <span className="block font-display text-lg font-semibold uppercase text-brand-navy">{step.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">{step.text}</span>
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
