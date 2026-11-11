/** Animated layered water waves, used at the bottom of hero sections. */
export function Waves({
  className = "",
  fill = "#f4fbff",
}: {
  className?: string;
  fill?: string;
}) {
  const wave =
    "M0 40 C 150 80 350 0 600 40 C 850 80 1050 0 1200 40 L1200 120 L0 120 Z";
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden md:h-24 ${className}`} aria-hidden="true">
      <div className="absolute inset-0 flex w-[200%] animate-wave-slow opacity-30">
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-1/2">
            <path d={wave} fill={fill} />
          </svg>
        ))}
      </div>
      <div className="absolute inset-0 top-3 flex w-[200%] animate-wave opacity-60 [animation-direction:reverse]">
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-1/2">
            <path d={wave} fill={fill} />
          </svg>
        ))}
      </div>
      <div className="absolute inset-0 top-6 flex w-[200%] animate-wave">
        {[0, 1].map((i) => (
          <svg key={i} viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-1/2">
            <path d={wave} fill={fill} />
          </svg>
        ))}
      </div>
    </div>
  );
}
