/**
 * Efeitos visuais de água (puro CSS/SVG, sem JavaScript no cliente).
 * Todas as posições são determinísticas para não gerar diferença entre servidor e navegador.
 * As animações respeitam prefers-reduced-motion pela regra global em globals.css.
 */
import type { CSSProperties } from "react";

/** Gerador pseudo-aleatório determinístico (mesmo resultado no servidor e no cliente). */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** Bolhas subindo pela área (use dentro de um pai `relative overflow-hidden`). */
export function Bubbles({
  count = 14,
  seed = 7,
  className = "",
  color = "255 255 255",
  rise,
}: {
  count?: number;
  seed?: number;
  className?: string;
  /** canais RGB, ex.: "255 255 255" */
  color?: string;
  /** distância da subida (padrão 110vh); use px em áreas pequenas */
  rise?: string;
}) {
  const rand = seeded(seed);
  const bubbles = Array.from({ length: count }, () => ({
    left: rand() * 100,
    size: 4 + rand() * 16,
    duration: 9 + rand() * 12,
    delay: -rand() * 20,
    drift: (rand() - 0.5) * 60,
  }));
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={rise ? ({ "--rise": rise } as CSSProperties) : undefined}
      aria-hidden="true"
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="water-bubble"
          style={
            {
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              "--drift": `${b.drift}px`,
              "--bubble": color,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Feixes de luz do sol entrando na água, balançando devagar. */
export function LightRays({ className = "" }: { className?: string }) {
  const rays = [
    { left: "8%", width: "9%", delay: "0s", duration: "11s", opacity: 0.5 },
    { left: "24%", width: "5%", delay: "-3s", duration: "9s", opacity: 0.35 },
    { left: "41%", width: "12%", delay: "-6s", duration: "13s", opacity: 0.45 },
    { left: "63%", width: "6%", delay: "-2s", duration: "10s", opacity: 0.3 },
    { left: "78%", width: "10%", delay: "-8s", duration: "12s", opacity: 0.4 },
  ];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {rays.map((ray, i) => (
        <span
          key={i}
          className="water-ray"
          style={{
            left: ray.left,
            width: ray.width,
            animationDelay: ray.delay,
            animationDuration: ray.duration,
            opacity: ray.opacity,
          }}
        />
      ))}
    </div>
  );
}

/** Brilho de cáustica (reflexo da luz no fundo d'água), bem sutil. */
export function Caustics({ className = "" }: { className?: string }) {
  return <div className={`water-caustics pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
}

/** Gotas caindo e formando ondinhas na superfície. */
export function DropRipples({
  count = 4,
  seed = 3,
  className = "",
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const rand = seeded(seed);
  const drops = Array.from({ length: count }, () => ({
    left: 8 + rand() * 84,
    top: 35 + rand() * 50,
    delay: -rand() * 6,
    duration: 4.5 + rand() * 3,
  }));
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {drops.map((d, i) => {
        const timing = { animationDelay: `${d.delay}s`, animationDuration: `${d.duration}s` };
        return (
          <span key={i} className="absolute" style={{ left: `${d.left}%`, top: `${d.top}%` }}>
            <span className="water-fall" style={timing} />
            <span className="water-ripple" style={timing} />
            <span className="water-ripple water-ripple-late" style={timing} />
          </span>
        );
      })}
    </div>
  );
}

const WAVE_A = "M0 50 C 150 90 350 10 600 50 C 850 90 1050 10 1200 50 L1200 200 L0 200 Z";
const WAVE_B = "M0 60 C 200 20 400 100 600 60 C 800 20 1000 100 1200 60 L1200 200 L0 200 Z";

function WaveStrip({
  d,
  fill,
  className,
  style,
}: {
  d: string;
  fill: string;
  className: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`absolute inset-x-0 bottom-0 w-[200%] ${className}`} style={style}>
      {/* um único SVG com duas cópias da onda: sem emenda visível no meio */}
      <svg viewBox="0 0 2400 200" preserveAspectRatio="none" className="block h-full w-full">
        <path d={d} style={{ fill }} />
        <path d={d} style={{ fill }} transform="translate(1199.5 0)" />
        <path d={d} style={{ fill }} transform="translate(2399 0)" />
      </svg>
    </div>
  );
}

/** Faixa de onda andando na horizontal (absolute, no rodapé do pai). */
export function MovingWave({
  fill,
  className = "",
  variant = "a",
  style,
}: {
  fill: string;
  className?: string;
  variant?: "a" | "b";
  style?: CSSProperties;
}) {
  return (
    <WaveStrip
      d={variant === "a" ? WAVE_A : WAVE_B}
      fill={fill}
      className={`pointer-events-none ${className}`}
      style={style}
    />
  );
}

/**
 * Mar em camadas (parallax) com espuma, para o rodapé de cenas grandes.
 * `tone` define a cor da última camada (geralmente a cor de fundo da próxima seção).
 */
export function Ocean({
  className = "",
  tone = "rgb(var(--c-surface))",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden md:h-56 ${className}`} aria-hidden="true">
      <WaveStrip d={WAVE_B} fill="rgb(var(--c-highlight) / 0.18)" className="h-full animate-wave-slow" />
      <WaveStrip
        d={WAVE_A}
        fill="rgb(var(--c-secondary) / 0.28)"
        className="h-[85%] animate-wave [animation-direction:reverse] [animation-duration:18s]"
      />
      <WaveStrip d={WAVE_B} fill="rgb(var(--c-primary-light) / 0.55)" className="h-[68%] animate-wave [animation-duration:11s]" />
      <WaveStrip d={WAVE_A} fill="rgb(255 255 255 / 0.35)" className="h-[52%] animate-wave-slow [animation-direction:reverse]" />
      <WaveStrip d={WAVE_A} fill={tone} className="h-[45%] animate-wave [animation-duration:16s]" />
    </div>
  );
}

/** Onda estática para a borda de seções (sem animação, só o recorte). */
export function WaveEdge({
  position = "bottom",
  fill = "rgb(var(--c-surface))",
  className = "",
}: {
  position?: "top" | "bottom";
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-8 w-full md:h-12 ${
        position === "top" ? "top-0 rotate-180" : "bottom-0"
      } ${className}`}
    >
      <path
        d="M0 30 C 100 55 200 5 300 30 C 400 55 500 5 600 30 C 700 55 800 5 900 30 C 1000 55 1100 5 1200 30 L1200 61 L0 61 Z"
        style={{ fill }}
      />
    </svg>
  );
}

/** Divisor com três gotas pingando, usado no fim de textos. */
export function DropDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-brand-blue/40" />
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-4 w-4 animate-drip text-brand-blue"
          style={{ animationDelay: `${i * 0.25}s` }}
        >
          <path d="M12 3c-4 5.5-6.5 9-6.5 12a6.5 6.5 0 0 0 13 0C18.5 12 16 8.5 12 3Z" fill="currentColor" />
        </svg>
      ))}
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-brand-blue/40" />
    </div>
  );
}

/** Cena subaquática completa: raios, cáustica, bolhas. */
export function UnderwaterScene({ bubbles = 14, seed = 7 }: { bubbles?: number; seed?: number }) {
  return (
    <>
      <Caustics />
      <LightRays />
      <Bubbles count={bubbles} seed={seed} />
    </>
  );
}
