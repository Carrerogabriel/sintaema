"use client";

import Image from "next/image";
import { useState } from "react";
import type { Company } from "@/data/companies";
import { Icon } from "../Icon";

/**
 * "Todas as empresas" switch + per-company checkboxes.
 * Submits `todas=on` or one `empresas` value per selected company.
 */
export function CompanySelect({
  companies,
  selected,
  compact = false,
}: {
  companies: Company[];
  selected: string[];
  compact?: boolean;
}) {
  const [all, setAll] = useState(selected.length === 0);
  const [chosen, setChosen] = useState<string[]>(selected);

  const toggle = (slug: string) =>
    setChosen((list) => (list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]));

  return (
    <fieldset className="grid gap-3">
      <legend className="mb-2 text-sm font-semibold text-brand-navy">Onde aparece</legend>

      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-brand-sand px-4 py-3 ring-1 ring-brand-blue/10">
        <span>
          <span className="block text-sm font-bold text-brand-navy">Todas as empresas</span>
          <span className="block text-xs text-slate-500">Conteúdo geral do sindicato, aparece em todos os portais</span>
        </span>
        <input
          type="checkbox"
          name="todas"
          checked={all}
          onChange={(event) => setAll(event.target.checked)}
          className="peer sr-only"
        />
        <span className="relative h-7 w-12 shrink-0 rounded-full bg-slate-300 transition peer-checked:bg-brand-green peer-focus-visible:ring-4 peer-focus-visible:ring-brand-blue/30 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
      </label>

      {!all ? (
        <div className={`grid animate-fade-up gap-2 ${compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4"}`}>
          {companies.map((company) => {
            const checked = chosen.includes(company.slug);
            return (
              <label
                key={company.slug}
                className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 bg-white p-3 text-center transition hover:-translate-y-0.5 ${
                  checked ? "border-brand-green shadow-md" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  name="empresas"
                  value={company.slug}
                  checked={checked}
                  onChange={() => toggle(company.slug)}
                  className="sr-only"
                />
                {company.logo ? (
                  <span className="relative h-10 w-full">
                    <Image src={company.logo} alt="" fill className="object-contain" sizes="120px" />
                  </span>
                ) : null}
                <span className="text-xs font-semibold leading-tight text-brand-navy">{company.name}</span>
                {checked ? (
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 animate-scale-in place-items-center rounded-full bg-brand-green text-white shadow">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>
      ) : null}
    </fieldset>
  );
}
