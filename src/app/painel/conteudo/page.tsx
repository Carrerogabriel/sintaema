import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ContentHeader } from "@/components/painel/ContentTabs";
import { ConfirmButton, EmptyState, SubmitButton } from "@/components/painel/ui";
import { companies, getCompany } from "@/data/companies";
import { categories } from "@/data/site";
import { categoryStyles } from "@/lib/format";
import { formatShortDateBR } from "@/lib/panel-format";
import type { Category } from "@/data/site";
import { requireUser } from "@/server/auth";
import { listPosts } from "@/server/posts";
import { deletePostAction, togglePostStatusAction } from "./actions";

export const metadata = { title: "Notícias" };

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; empresa?: string; categoria?: string; status?: string }>;
}) {
  await requireUser("jornalista");
  const filters = await searchParams;
  const posts = listPosts({
    q: filters.q?.trim(),
    company: filters.empresa,
    category: filters.categoria,
    status: filters.status,
  });
  const filtered = Boolean(filters.q || filters.empresa || filters.categoria || filters.status);

  return (
    <div className="mx-auto max-w-6xl">
      <ContentHeader
        active="noticias"
        title="Notícias"
        description="Crie, edite e publique as matérias de todos os portais."
        action={
          <Link href="/painel/conteudo/noticias/nova" className="btn-primary">
            <Icon name="plus" className="h-4 w-4" />
            Nova notícia
          </Link>
        }
      />

      {/* Filters */}
      <form className="card mt-6 grid animate-fade-up gap-3 p-4 [animation-delay:100ms] sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto]">
        <label className="relative sm:col-span-2 lg:col-span-1">
          <span className="sr-only">Buscar</span>
          <Icon name="search" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input name="q" defaultValue={filters.q} placeholder="Buscar por título ou texto" className="input !py-2.5 pl-11" />
        </label>
        <select name="empresa" defaultValue={filters.empresa ?? ""} aria-label="Empresa" className="input !py-2.5">
          <option value="">Todas as empresas</option>
          <option value="todas">Somente conteúdo geral</option>
          {companies.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select name="categoria" defaultValue={filters.categoria ?? ""} aria-label="Categoria" className="input !py-2.5">
          <option value="">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select name="status" defaultValue={filters.status ?? ""} aria-label="Situação" className="input !py-2.5">
          <option value="">Publicadas e rascunhos</option>
          <option value="publicado">Publicadas</option>
          <option value="rascunho">Rascunhos</option>
        </select>
        <div className="flex gap-2">
          <button type="submit" className="btn-secondary flex-1 !py-2.5 ring-1 ring-brand-navy/10">
            <Icon name="filter" className="h-4 w-4" />
            Filtrar
          </button>
          {filtered ? (
            <Link href="/painel/conteudo" className="grid place-items-center rounded-full px-3 text-sm font-semibold text-slate-500 hover:text-brand-navy" title="Limpar filtros">
              <Icon name="close" className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        {posts.length} {posts.length === 1 ? "matéria" : "matérias"}
        {filtered ? " encontradas com esses filtros" : ""}
      </p>

      {posts.length === 0 ? (
        <div className="mt-3">
          <EmptyState
            icon="file"
            title={filtered ? "Nada encontrado" : "Nenhuma matéria ainda"}
            text={filtered ? "Tente outros filtros ou limpe a busca." : "Comece escrevendo a primeira notícia do portal."}
            action={
              <Link href="/painel/conteudo/noticias/nova" className="btn-primary">
                <Icon name="plus" className="h-4 w-4" />
                Nova notícia
              </Link>
            }
          />
        </div>
      ) : (
        <ul className="mt-3 grid gap-3">
          {posts.map((post, index) => {
            const viewCompany = post.companies[0] ?? "casan";
            const published = post.status === "publicado";
            return (
              <li
                key={post.id}
                className="card group flex animate-fade-up flex-col gap-4 p-3 transition hover:shadow-card-hover sm:flex-row sm:items-center sm:p-4"
                style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
              >
                <Link
                  href={`/painel/conteudo/noticias/${post.id}`}
                  className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl bg-brand-water sm:aspect-[4/3] sm:w-36"
                >
                  {post.image ? (
                    <Image src={post.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 640px) 144px, 100vw" />
                  ) : (
                    <span className="grid h-full place-items-center text-brand-blue/40">
                      <Icon name="image" className="h-8 w-8" />
                    </span>
                  )}
                  {post.featured ? (
                    <span className="absolute left-2 top-2 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-navy-dark">
                      Destaque
                    </span>
                  ) : null}
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${categoryStyles[post.category as Category] ?? "bg-slate-200"}`}>
                      {post.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        published ? "bg-brand-green-light text-brand-green-dark" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${published ? "bg-brand-green" : "bg-slate-400"}`} />
                      {published ? "Publicada" : "Rascunho"}
                    </span>
                    <span className="text-xs text-slate-400">{formatShortDateBR(post.date)}</span>
                  </div>
                  <Link
                    href={`/painel/conteudo/noticias/${post.id}`}
                    className="mt-1.5 line-clamp-2 block font-display text-lg font-medium leading-snug text-brand-navy transition hover:text-brand-blue"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    <Icon name="layers" className="h-3.5 w-3.5" />
                    {post.companies.length === 0
                      ? "Todas as empresas"
                      : post.companies.map((slug) => getCompany(slug)?.name ?? slug).join(" · ")}
                    {post.author_name ? <span className="text-slate-400">· por {post.author_name}</span> : null}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
                  <Link
                    href={`/painel/conteudo/noticias/${post.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-sand px-3 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-water"
                  >
                    <Icon name="pencil" className="h-4 w-4" />
                    Editar
                  </Link>
                  {published ? (
                    <a
                      href={`/${viewCompany}/noticias/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Ver no site"
                      aria-label="Ver no site"
                      className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-navy"
                    >
                      <Icon name="external" className="h-4 w-4" />
                    </a>
                  ) : null}
                  <form action={togglePostStatusAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <SubmitButton
                      pendingLabel="…"
                      title={published ? "Mover para rascunhos" : "Publicar"}
                      className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-navy"
                    >
                      <Icon name={published ? "eyeOff" : "eye"} className="h-4 w-4" />
                    </SubmitButton>
                  </form>
                  <form action={deletePostAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <ConfirmButton
                      message={`Excluir a matéria “${post.title}”? Esta ação não pode ser desfeita.`}
                      title="Excluir"
                      className="grid h-9 w-9 place-items-center rounded-lg text-red-600 transition hover:bg-red-50"
                    >
                      <Icon name="trash" className="h-4 w-4" />
                    </ConfirmButton>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
