export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 56 72"
        className="h-12 w-9 shrink-0 md:h-14 md:w-10"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="drop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ec6f2" />
            <stop offset="55%" stopColor="#0090d0" />
            <stop offset="100%" stopColor="#0077b3" />
          </linearGradient>
        </defs>
        <path
          d="M28 4C16 22 8 34 8 46a20 20 0 0 0 40 0C48 34 40 22 28 4Z"
          fill="url(#drop)"
        />
        <path
          d="M18 47c2 7 8 12 16 12 3 0 6-.7 8-2-3 7-10 11-17 8-8-3-11-12-7-18Z"
          fill="#1aaa4a"
          opacity="0.95"
        />
      </svg>
      <div className="leading-none">
        <p className="font-display text-[1.85rem] font-semibold tracking-tight text-brand-navy md:text-[2.1rem]">
          sintaema
        </p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-500 md:text-[11px]">
          Água, esgoto e meio ambiente · SC
        </p>
      </div>
    </div>
  );
}
