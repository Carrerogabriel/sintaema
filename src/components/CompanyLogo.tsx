import Image from "next/image";
import type { Company } from "@/data/companies";

const sizes = {
  sm: { box: "h-10 px-3 rounded-xl", one: "text-base", two: "text-[11px]", img: "h-10 w-24 rounded-xl p-1" },
  md: { box: "h-16 px-5 rounded-2xl", one: "text-2xl", two: "text-base", img: "h-16 w-40 rounded-2xl p-2" },
  lg: { box: "h-28 px-8 rounded-3xl sm:h-32", one: "text-4xl sm:text-5xl", two: "text-2xl sm:text-3xl", img: "h-28 w-56 rounded-3xl p-3 sm:h-32" },
};

/**
 * Shows the company's logo file when `company.logo` is set; otherwise a
 * wordmark badge in the company's own colors.
 */
export function CompanyLogo({
  company,
  size = "md",
  className = "",
}: {
  company: Company;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const s = sizes[size];

  if (company.logo) {
    return (
      <span
        className={`inline-flex shrink-0 bg-white shadow-md ring-1 ring-black/5 ${s.img} ${className}`}
      >
        <span className="relative h-full w-full">
          <Image
            src={company.logo}
            alt={`Logo ${company.name}`}
            fill
            className="object-contain"
            sizes="(min-width: 640px) 224px, 160px"
          />
        </span>
      </span>
    );
  }

  const multi = company.logoLines.length > 1;

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden text-center font-display font-semibold uppercase leading-[1.05] tracking-wide text-white shadow-lg ${s.box} ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${company.colors.primary}, ${company.colors.secondary})`,
      }}
      role="img"
      aria-label={`Logo ${company.name}`}
    >
      <span
        className="absolute inset-x-0 bottom-0 h-1"
        style={{ backgroundColor: company.colors.accent }}
        aria-hidden="true"
      />
      <span className={`relative flex flex-col ${multi ? s.two : s.one}`}>
        {company.logoLines.map((line) => (
          <span key={line} className="whitespace-nowrap">
            {line}
          </span>
        ))}
      </span>
    </span>
  );
}
