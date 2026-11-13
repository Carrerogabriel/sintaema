/** Animated layered water waves, used at the bottom of hero sections. */
export function Waves({
  className = "",
  fill = "rgb(var(--c-surface))",
}: {
  className?: string;
  fill?: string;
}) {
  const wave =
    "M0 40 C 150 80 350 0 600 40 C 850 80 1050 0 1200 40 L1200 120 L0 120 Z";
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden md:h-24 ${className}`} aria-hidden="true">
      {[
        "inset-0 animate-wave-slow opacity-30",
        "inset-0 top-3 animate-wave opacity-60 [animation-direction:reverse]",
        "inset-0 top-6 animate-wave",
      ].map((layer) => (
        <div key={layer} className={`absolute w-[200%] ${layer}`}>
          <svg viewBox="0 0 2400 120" preserveAspectRatio="none" className="block h-full w-full">
            <path d={wave} style={{ fill }} />
            <path d={wave} style={{ fill }} transform="translate(1199.5 0)" />
            <path d={wave} style={{ fill }} transform="translate(2399 0)" />
          </svg>
        </div>
      ))}
    </div>
  );
}
