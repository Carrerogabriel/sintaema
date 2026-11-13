import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { NewsCard } from "@/components/NewsCard";
import { PdfActions } from "@/components/PdfActions";
import { Reveal } from "@/components/Reveal";
import { ReadingProgress } from "@/components/ScrollWidgets";
import { ShareButtons } from "@/components/ShareButtons";
import { Waves } from "@/components/Waves";
import { getCompany } from "@/data/companies";
import { getPost, relatedPosts } from "@/data/content";
import { categoryStyles, formatDate, readingTime } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ empresa: string; slug: string }>;
}) {
  const { empresa, slug } = await params;
  const post = getCompany(empresa) ? getPost(slug, empresa) : undefined;
  if (!post) return { title: "Matéria não encontrada" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ empresa: string; slug: string }>;
}) {
  const { empresa, slug } = await params;
  const company = getCompany(empresa);
  const post = company ? getPost(slug, empresa) : undefined;
  if (!company || !post) notFound();
  const base = `/${company.slug}`;
  const related = relatedPosts(slug, empresa);

  return (
    <article>
      <ReadingProgress />

      <header className="relative isolate overflow-hidden bg-brand-navy-dark pb-24 pt-10 text-white md:pb-32 md:pt-14">
        <Image
          src={post.image}
          alt=""
          fill
          priority
          className="-z-10 animate-ken-burns object-cover opacity-30 blur-[2px]"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-navy-dark/70 via-brand-navy-dark/85 to-brand-navy-dark" />

        <div className="container-site">
          <nav aria-label="Trilha de navegação" className="animate-fade-in">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-sky-200/80 sm:text-sm">
              <li>
                <Link href={base} className="transition hover:text-white">Início</Link>
              </li>
              <li className="flex items-center gap-1.5">
                <Icon name="chevronRight" className="h-3 w-3 opacity-60" />
                <Link href={`${base}/noticias`} className="transition hover:text-white">Notícias</Link>
              </li>
              {post.category !== "Notícias" ? (
                <li className="flex items-center gap-1.5">
                  <Icon name="chevronRight" className="h-3 w-3 opacity-60" />
                  <Link href={`${base}/noticias?categoria=${post.category}`} className="transition hover:text-white">
                    {post.category}
                  </Link>
                </li>
              ) : null}
            </ol>
          </nav>

          <div className="mx-auto mt-8 max-w-4xl text-center md:mt-12">
            <span
              className={`inline-block animate-fade-up rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${categoryStyles[post.category]}`}
            >
              {post.category}
            </span>
            <h1 className="mt-5 animate-fade-up font-display text-3xl font-semibold uppercase leading-[1.1] tracking-tight [animation-delay:100ms] sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl animate-fade-up text-base leading-relaxed text-sky-100/90 [animation-delay:200ms] md:text-lg">
              {post.excerpt}
            </p>
            <p className="mt-6 flex animate-fade-up flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-sky-200 [animation-delay:280ms]">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="calendar" className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-4 w-4" />
                {readingTime(post)} min de leitura
              </span>
            </p>
            <PdfActions
              href={`${base}/pdf/noticias/${post.slug}`}
              label="esta matéria"
              className="mt-6 animate-fade-up justify-center [animation-delay:320ms]"
            />
          </div>
        </div>
        <Waves />
      </header>

      <div className="container-site">
        <div className="relative z-10 mx-auto -mt-16 max-w-5xl animate-fade-up [animation-delay:350ms] md:-mt-24">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-brand-water shadow-card-hover md:aspect-[21/9] md:rounded-3xl">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
          <p className="mt-2 text-center text-xs text-slate-500">{post.imageAlt}</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl md:mt-14">
          <div className="prose-sintaema">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-y border-brand-navy/10 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-navy">
              Compartilhe esta matéria
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <ShareButtons title={post.title} />
              <PdfActions href={`${base}/pdf/noticias/${post.slug}`} label="esta matéria" tone="light" />
            </div>
          </div>

          <p className="mt-6 rounded-2xl bg-brand-sand p-5 text-sm leading-relaxed text-slate-600 ring-1 ring-brand-blue/10">
            Texto produzido para o blog do SINTAEMA-SC com base nas pautas públicas da entidade.
            Consulte também o{" "}
            <a
              className="font-semibold text-brand-blue underline-offset-4 hover:underline"
              href="https://www.sintaema.org.br/site/"
              target="_blank"
              rel="noreferrer"
            >
              site oficial
            </a>
            .
          </p>
        </div>

        <section className="mt-16 md:mt-24">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-brand-green">Continue lendo</p>
              <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-brand-navy">
                Leia também
              </h2>
            </div>
            <Link href={`${base}/noticias`} className="link-arrow">
              Todas as notícias
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 100}>
                <NewsCard post={item} base={base} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
