export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-label="Carregando">
      <div className="relative grid h-20 w-20 place-items-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-blue/25" />
        {/* Gota enchendo de água */}
        <svg viewBox="0 0 56 72" className="h-14 w-11" aria-hidden="true">
          <defs>
            <clipPath id="loading-drop">
              <path d="M28 4C16 22 8 34 8 46a20 20 0 0 0 40 0C48 34 40 22 28 4Z" />
            </clipPath>
          </defs>
          <path d="M28 4C16 22 8 34 8 46a20 20 0 0 0 40 0C48 34 40 22 28 4Z" fill="rgb(var(--c-tint))" />
          <g clipPath="url(#loading-drop)">
            <g className="drop-fill">
              <path
                className="journey-river"
                d="M-60 8 q7.5 -5 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 V80 H-60 Z"
                fill="rgb(var(--c-secondary))"
              />
            </g>
          </g>
          <path
            d="M28 4C16 22 8 34 8 46a20 20 0 0 0 40 0C48 34 40 22 28 4Z"
            fill="none"
            stroke="rgb(var(--c-primary))"
            strokeWidth="3"
          />
        </svg>
      </div>
      <span className="sr-only">Carregando…</span>
    </div>
  );
}
