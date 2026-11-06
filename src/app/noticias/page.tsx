import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { posts, type Category } from "@/data/content";

const filters: Array<Category | "Todas"> = [
  "Todas",
  "Notícias",
  "Lutas",
  "Eleições",
  "Jurídico",
  "Agenda",
];

export const metadata = {
  title: "Notícias",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const active = filters.includes(categoria as Category) ? (categoria as Category) : "Todas";
  const list = active === "Todas" ? posts : posts.filter((post) => post.category === active);

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
          Comunicação
        </p>
        <h1 className="mt-1 font-display text-4xl uppercase text-brand-navy">Notícias gerais</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Acompanhe as lutas da categoria, a defesa da CASAN pública e os informativos do
          SINTAEMA-SC.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((item) => {
          const href = item === "Todas" ? "/noticias" : `/noticias?categoria=${item}`;
          const isActive = item === active;
          return (
            <Link
              key={item}
              href={href}
              className={`rounded-full px-3 py-1 text-sm ${
                isActive
                  ? "bg-brand-navy text-white"
                  : "bg-white text-brand-navy shadow-sm hover:bg-sky-50"
              }`}
            >
              {item}
            </Link>
          );
        })}
      </div>

      {list.length === 0 ? (
        <p className="rounded-lg bg-white p-6 shadow-card">Nenhuma matéria nesta categoria ainda.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
