import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { companies } from "@/data/companies";
import { formatDateTime } from "@/lib/panel-format";
import { requireUser } from "@/server/auth";
import { getPostById } from "@/server/posts";
import { PostForm } from "../PostForm";

export const metadata = { title: "Editar notícia" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser("jornalista");
  const { id } = await params;
  const post = getPostById(Number(id));
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 flex animate-fade-up flex-wrap items-end justify-between gap-3">
        <div>
          <Link href="/painel/conteudo" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-navy">
            <Icon name="arrowLeft" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Notícias
          </Link>
          <h1 className="mt-2 font-display text-4xl font-semibold uppercase text-brand-navy">Editar notícia</h1>
          <p className="text-sm text-slate-500">
            Última alteração em {formatDateTime(post.updated_at)}
            {post.author_name ? ` · criada por ${post.author_name}` : ""}
          </p>
        </div>
        {post.status === "publicado" ? (
          <a
            href={`/${post.companies[0] ?? "casan"}/noticias/${post.slug}`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary ring-1 ring-brand-navy/10"
          >
            <Icon name="external" className="h-4 w-4" />
            Ver no site
          </a>
        ) : null}
      </header>
      <PostForm
        companies={companies}
        values={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          date: post.date,
          image: post.image,
          imageAlt: post.image_alt,
          featured: post.featured === 1,
          companies: post.companies,
          status: post.status,
        }}
      />
    </div>
  );
}
