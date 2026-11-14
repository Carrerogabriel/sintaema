import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BackToTop } from "@/components/ScrollWidgets";
import { companies, getCompany } from "@/data/companies";
import { resolveCompany } from "@/lib/company";
import { themeVars } from "@/lib/theme";

// Só as páginas que leem o banco (notícias, agenda, busca, início) são
// dinâmicas; as demais são geradas uma vez e servidas pela CDN.

/** Gera as páginas estáticas de todas as empresas no build. */
export function generateStaticParams() {
  return companies.map((company) => ({ empresa: company.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ empresa: string }>;
}): Promise<Metadata> {
  const { empresa } = await params;
  const company = getCompany(empresa);
  if (!company) return {};
  return {
    title: {
      absolute: `SINTAEMA · ${company.name}`,
      template: `%s | SINTAEMA · ${company.name}`,
    },
    description: `${company.description}`,
    other: { "theme-color": company.colors.primary },
  };
}

export default async function CompanyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ empresa: string }>;
}) {
  const { company } = await resolveCompany(params);

  return (
    <div style={themeVars(company.colors)} className="bg-water-pattern min-h-screen text-brand-ink">
      <Header company={company} />
      <main id="conteudo">{children}</main>
      <Footer company={company} />
      <BackToTop />
    </div>
  );
}
