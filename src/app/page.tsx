import Image from "next/image";
import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { Sidebar } from "@/components/Sidebar";
import { bulletins, posts, site } from "@/data/content";
import { formatDate } from "@/lib/format";

export default function HomePage() {
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const latest = posts.filter((post) => post.slug !== featured.slug).slice(0, 6);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="grid gap-8">
        <section className="overflow-hidden rounded-xl bg-white shadow-card">
          <Link href={`/noticias/${featured.slug}`} className="grid md:grid-cols-2">
            <div className="relative min-h-[260px]">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-col justify-center bg-brand-navy p-6 text-white md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
                Destaque · {formatDate(featured.date)}
              </p>
              <h1 className="mt-3 font-display text-3xl uppercase leading-tight md:text-4xl">
                {featured.title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-sky-100">{featured.excerpt}</p>
              <span className="mt-6 inline-flex w-fit bg-brand-green px-4 py-2 text-sm font-bold uppercase">
                Ler matéria
              </span>
            </div>
          </Link>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-2xl uppercase text-brand-navy">Notícias</h2>
            <Link href="/noticias" className="text-sm font-semibold text-brand-blue">
              Ver todas as notícias ►
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {latest.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl uppercase text-brand-navy">Informativos</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {bulletins.map((item) => (
              <article key={item.name} className="rounded-lg border border-sky-100 p-4">
                <p className="text-xs uppercase tracking-wide text-brand-green">{item.issue}</p>
                <h3 className="mt-1 font-display text-xl text-brand-navy">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-brand-green p-6 text-white shadow-card md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Lema da entidade</p>
          <p className="mt-2 font-display text-3xl uppercase md:text-4xl">{site.slogan}</p>
          <p className="mt-3 max-w-2xl text-sm text-green-50">
            Desde 9 de novembro de 1977, o SINTAEMA organiza a categoria em defesa da água
            pública, da CASAN e dos direitos de quem faz o saneamento funcionar em Santa Catarina.
          </p>
        </section>
      </div>
      <Sidebar />
    </div>
  );
}
