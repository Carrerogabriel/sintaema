import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsCard } from "@/components/NewsCard";
import { getPost, posts, relatedPosts } from "@/data/content";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Matéria não encontrada" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(slug);

  return (
    <article>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
        {post.category} · {formatDate(post.date)}
      </p>
      <h1 className="mt-2 max-w-4xl font-display text-3xl uppercase leading-tight text-brand-navy md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-600">{post.excerpt}</p>

      <div className="relative mt-6 aspect-[21/9] overflow-hidden rounded-xl bg-slate-200">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
        />
      </div>

      <div className="prose-sintaema mx-auto mt-8 max-w-3xl rounded-xl bg-white p-6 text-base leading-7 text-slate-700 shadow-card md:p-10">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="mt-6 border-t border-sky-100 pt-4 text-sm text-slate-500">
          Texto produzido para o blog do SINTAEMA-SC com base nas pautas públicas da entidade.
          Consulte também o{" "}
          <a
            className="text-brand-blue underline"
            href="https://www.sintaema.org.br/site/"
            target="_blank"
            rel="noreferrer"
          >
            site oficial
          </a>
          .
        </p>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl uppercase text-brand-navy">Leia também</h2>
          <Link href="/noticias" className="text-sm font-semibold text-brand-blue">
            Todas as notícias
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <NewsCard key={item.slug} post={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
