import { notFound } from "next/navigation";
import { getCompany } from "@/data/companies";

export type CompanyParams = { params: Promise<{ empresa: string }> };

/** Resolves the company from the `[empresa]` route segment (404 if unknown). */
export async function resolveCompany(params: Promise<{ empresa: string }>) {
  const { empresa } = await params;
  const company = getCompany(empresa);
  if (!company) notFound();
  return { company, base: `/${company.slug}` };
}
