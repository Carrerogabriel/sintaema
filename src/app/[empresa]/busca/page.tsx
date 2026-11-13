import Link from "next/link";
import { Icon } from "@/components/Icon";
import { NewsCard } from "@/components/NewsCard";
import { PageHero } from "@/components/PageHero";
import { searchPosts } from "@/data/content";
import { resolveCompany, type CompanyParams } from "@/lib/company";

export const metadata = { title: "Busca" };

export default async function SearchPage({
  params,
  searchParams,
}: CompanyParams & {
  searchParams: Promise<{ q?: string }>;
}) {
  const { company, base } = await resolveCompany(params);
  const { q = "" } = await searchParams;
  const results = searchPosts(q, company.slug);

  return (
    <>
      <PageHero
        eyebrow="Pesquisa"
        title={q ? <>Resultados para “{q}”</> : "Busca"}
        description={`${results.length} ${results.length === 1 ? "matéria encontrada" : "matérias encontradas"}.`}
        crumbs={[{ label: "Busca" }]}
        base={base}
      >
        <form action={`${base}/busca`} className="relative max-w-xl">
          <Icon name="search" className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar notícias, campanhas, temas…"
            aria-label="Termo de busca"
            className="h-14 w-full rounded-full bg-white pl-14 pr-32 text-base text-brand-ink shadow-xl outline-none ring-brand-cyan/40 transition focus:ring-4"
          />
          <button type="submit" className="btn-primary absolute right-1.5 top-1.5 !py-2.5">
            Buscar
          </button>
        </form>
      </PageHero>

      <div className="container-site pt-4">
        {results.length === 0 ? (
          <div className="card mx-auto max-w-lg animate-scale-in p-10 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-sand text-brand-blue">
              <Icon name="search" className="h-7 w-7" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold uppercase text-brand-navy">
              Nenhum resultado
            </h2>
            <p className="mt-2 text-slate-600">Tente outras palavras ou navegue pelas notícias.</p>
            <Link href={`${base}/noticias`} className="btn-primary mt-6">
              Ver notícias
            </Link>
          </div>
        ) : (
          <div key={q} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post, index) => (
              <div
                key={post.slug}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
              >
                <NewsCard post={post} base={base} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
