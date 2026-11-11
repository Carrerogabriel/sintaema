import Link from "next/link";
import { Icon } from "@/components/Icon";
import { NewsCard } from "@/components/NewsCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
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
  const count = (item: Category | "Todas") =>
    item === "Todas" ? posts.length : posts.filter((post) => post.category === item).length;

  return (
    <>
      <PageHero
        eyebrow="Comunicação"
        title={active === "Todas" ? "Notícias gerais" : active}
        description="Acompanhe as lutas da categoria, a defesa da CASAN pública e os informativos do SINTAEMA-SC."
        crumbs={
          active === "Todas"
            ? [{ label: "Notícias" }]
            : [{ href: "/noticias", label: "Notícias" }, { label: active }]
        }
      />

      <div className="container-site -mt-8 md:-mt-12">
        <div className="card relative z-10 -mx-1 p-2 sm:mx-0">
          <nav aria-label="Filtrar por categoria" className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {filters.map((item) => {
              const href = item === "Todas" ? "/noticias" : `/noticias?categoria=${item}`;
              const isActive = item === active;
              return (
                <Link
                  key={item}
                  href={href}
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-brand-navy text-white shadow-md"
                      : "text-brand-navy hover:bg-brand-sand"
                  }`}
                >
                  {item}
                  <span
                    className={`rounded-full px-1.5 text-[11px] ${
                      isActive ? "bg-white/20" : "bg-brand-sand text-slate-500"
                    }`}
                  >
                    {count(item)}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-10">
          {list.length === 0 ? (
            <Reveal>
              <div className="card mx-auto max-w-lg p-10 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-sand text-brand-blue">
                  <Icon name="file" className="h-7 w-7" />
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold uppercase text-brand-navy">
                  Nada por aqui ainda
                </h2>
                <p className="mt-2 text-slate-600">Nenhuma matéria nesta categoria por enquanto.</p>
                <Link href="/noticias" className="btn-primary mt-6">
                  Ver todas as notícias
                </Link>
              </div>
            </Reveal>
          ) : (
            <div key={active} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((post, index) => (
                <div
                  key={post.slug}
                  className="animate-fade-up"
                  style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
                >
                  <NewsCard post={post} priority={index < 3} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
