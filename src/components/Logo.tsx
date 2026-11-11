export function Logo({
  className = "",
  variant = "dark",
  compact = false,
}: {
  className?: string;
  variant?: "dark" | "light";
  compact?: boolean;
}) {
  const light = variant === "light";
  return (
    <div className={`group flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 56 72"
        className={`shrink-0 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${
          compact ? "h-10 w-8" : "h-11 w-8 md:h-12 md:w-9"
        }`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`drop-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ec6f2" />
            <stop offset="55%" stopColor="#0090d0" />
            <stop offset="100%" stopColor="#0077b3" />
          </linearGradient>
        </defs>
        <path
          d="M28 4C16 22 8 34 8 46a20 20 0 0 0 40 0C48 34 40 22 28 4Z"
          fill={`url(#drop-${variant})`}
        />
        <path
          d="M18 47c2 7 8 12 16 12 3 0 6-.7 8-2-3 7-10 11-17 8-8-3-11-12-7-18Z"
          fill="#1aaa4a"
          opacity="0.95"
        />
        <ellipse cx="21" cy="34" rx="3" ry="6" fill="#fff" opacity="0.35" transform="rotate(20 21 34)" />
      </svg>
      <div className="leading-none">
        <p
          className={`font-display font-semibold tracking-tight transition-all duration-300 ${
            light ? "text-white" : "text-brand-navy"
          } ${compact ? "text-[1.6rem]" : "text-[1.7rem] md:text-[2rem]"}`}
        >
          sintaema
        </p>
        <p
          className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] sm:text-[10px] ${
            light ? "text-sky-200/80" : "text-slate-500"
          } ${compact ? "hidden sm:block" : ""}`}
        >
          Água, esgoto e meio ambiente · SC
        </p>
      </div>
    </div>
  );
}
