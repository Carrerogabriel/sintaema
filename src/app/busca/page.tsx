import { NewsCard } from "@/components/NewsCard";
import { searchPosts } from "@/data/content";

export const metadata = { title: "Busca" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchPosts(q);

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Pesquisa</p>
        <h1 className="mt-1 font-display text-4xl uppercase text-brand-navy">
          {q ? `Resultados para “${q}”` : "Busca"}
        </h1>
        <p className="mt-2 text-slate-600">
          {results.length} {results.length === 1 ? "matéria encontrada" : "matérias encontradas"}.
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((post) => (
          <NewsCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
