import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BackToTop } from "@/components/ScrollWidgets";
import { getCompany } from "@/data/companies";
import { resolveCompany } from "@/lib/company";
import { themeVars } from "@/lib/theme";

// Conteúdo vem do banco e é editado pelo painel: renderiza a cada acesso.
export const dynamic = "force-dynamic";

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
