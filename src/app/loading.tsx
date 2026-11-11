export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-label="Carregando">
      <div className="relative grid h-16 w-16 place-items-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-blue/30" />
        <svg viewBox="0 0 56 72" className="h-12 w-9 animate-drip" aria-hidden="true">
          <path d="M28 4C16 22 8 34 8 46a20 20 0 0 0 40 0C48 34 40 22 28 4Z" fill="#0090d0" />
          <path
            d="M18 47c2 7 8 12 16 12 3 0 6-.7 8-2-3 7-10 11-17 8-8-3-11-12-7-18Z"
            fill="#1aaa4a"
          />
        </svg>
      </div>
    </div>
  );
}
