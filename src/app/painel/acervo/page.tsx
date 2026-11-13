import Link from "next/link";
import { Icon } from "@/components/Icon";
import { FileBadge } from "@/components/painel/FileBadge";
import { EmptyState } from "@/components/painel/ui";
import { getCompany } from "@/data/companies";
import { formatBytes, formatShortDateBR } from "@/lib/panel-format";
import { requireUser } from "@/server/auth";
import { archiveTotals, searchDocuments, type DocFilters } from "@/server/documents";

export const metadata = { title: "Acervo" };

const KEYS: Array<keyof DocFilters> = ["q", "tipo", "empresa", "de", "ate", "ordem"];

function href(filters: DocFilters, changes: Partial<DocFilters>) {
  const next: Record<string, string> = {};
  for (const key of KEYS) {
    const value = key in changes ? changes[key] : filters[key];
    if (value) next[key] = value;
  }
  if (changes.pagina) next.pagina = changes.pagina;
  const qs = new URLSearchParams(next).toString();
  return qs ? `/painel/acervo?${qs}` : "/painel/acervo";
}

const companyName = (slug: string) => (slug ? (getCompany(slug)?.name ?? slug) : "Geral (sindicato)");

export default async function ArchivePage({ searchParams }: { searchParams: Promise<DocFilters> }) {
  const user = await requireUser();
  const filters = await searchParams;
  const canEdit = user.role === "admin" || user.role === "jornalista";
  const result = searchDocuments(filters);
  const totals = archiveTotals();

  const activeChips: Array<{ label: string; remove: Partial<DocFilters> }> = [];
  if (filters.q) activeChips.push({ label: `“${filters.q}”`, remove: { q: undefined } });
  if (filters.tipo) activeChips.push({ label: filters.tipo, remove: { tipo: undefined } });
  if (filters.empresa) activeChips.push({ label: companyName(filters.empresa === "geral" ? "" : filters.empresa), remove: { empresa: undefined } });
  if (filters.de || filters.ate) {
    const label =
      filters.de && filters.de === filters.ate
        ? `Ano ${filters.de}`
        : `${filters.de ?? "…"} a ${filters.ate ?? "hoje"}`;
    activeChips.push({ label, remove: { de: undefined, ate: undefined } });
  }

  const facets = (
    <div className="grid gap-5">
      <FacetGroup title="Tipo de documento">
        {result.facets.types.map((facet) => {
          const active = filters.tipo === facet.value;
          return (
            <FacetLink
              key={String(facet.value)}
              href={href(filters, { tipo: active ? undefined : String(facet.value) })}
              label={String(facet.value)}
              count={facet.count}
              active={active}
            />
          );
        })}
      </FacetGroup>

      <FacetGroup title="Empresa">
        {result.facets.companies.map((facet) => {
          const value = facet.value ? String(facet.value) : "geral";
          const active = filters.empresa === value;
          return (
            <FacetLink
              key={value}
              href={href(filters, { empresa: active ? undefined : value })}
              label={companyName(String(facet.value ?? ""))}
              count={facet.count}
              active={active}
            />
          );
        })}
      </FacetGroup>

      <FacetGroup title="Período">
        <form action="/painel/acervo" className="grid grid-cols-2 gap-2">
          {KEYS.filter((k) => k !== "de" && k !== "ate").map((key) =>
            filters[key] ? <input key={key} type="hidden" name={key} value={filters[key]} /> : null,
          )}
          <label className="grid gap-1 text-xs font-semibold text-slate-500">
            De
            <input name="de" type="number" min={1900} max={2100} defaultValue={filters.de} placeholder={String(totals.first ?? "")} className="input !px-2 !py-1.5 text-sm" />
          </label>
          <label className="grid gap-1 text-xs font-semibold text-slate-500">
            Até
            <input name="ate" type="number" min={1900} max={2100} defaultValue={filters.ate} placeholder={String(totals.last ?? "")} className="input !px-2 !py-1.5 text-sm" />
          </label>
          <button type="submit" className="col-span-2 rounded-lg bg-brand-sand py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-water">
            Aplicar período
          </button>
        </form>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {result.facets.years.slice(0, 24).map((facet) => {
            const year = String(facet.value);
            const active = filters.de === year && filters.ate === year;
            return (
              <Link
                key={year}
                href={href(filters, active ? { de: undefined, ate: undefined } : { de: year, ate: year })}
                className={`rounded-lg px-2 py-1 text-xs font-semibold transition ${
                  active ? "bg-brand-navy text-white" : "bg-white text-brand-navy ring-1 ring-slate-200 hover:ring-brand-blue"
                }`}
              >
                {year} <span className="opacity-60">{facet.count}</span>
              </Link>
            );
          })}
        </div>
      </FacetGroup>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header + search */}
      <header className="relative isolate animate-fade-up overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-navy-light p-6 text-white sm:p-8">
        <div className="bg-grid absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
        <div className="absolute -right-16 -top-16 -z-10 h-64 w-64 animate-float rounded-full bg-brand-blue/30 blur-2xl" aria-hidden="true" />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-brand-cyan">Memória do sindicato</p>
            <h1 className="mt-2 font-display text-4xl font-semibold uppercase">Acervo de documentos</h1>
            <p className="mt-1 text-sm text-sky-100/85">
              {totals.count.toLocaleString("pt-BR")} documentos · {formatBytes(totals.size)}
              {totals.first ? ` · de ${totals.first} a ${totals.last}` : ""}
            </p>
          </div>
          {canEdit ? (
            <Link href="/painel/acervo/enviar" className="btn-primary">
              <Icon name="upload" className="h-4 w-4" />
              Enviar documentos
            </Link>
          ) : null}
        </div>

        <form action="/painel/acervo" className="mt-6 flex flex-col gap-2 sm:flex-row">
          {(["tipo", "empresa", "de", "ate"] as const).map((key) =>
            filters[key] ? <input key={key} type="hidden" name={key} value={filters[key]} /> : null,
          )}
          <label className="relative flex-1">
            <span className="sr-only">Pesquisar no acervo</span>
            <Icon name="search" className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              name="q"
              defaultValue={filters.q}
              placeholder="Pesquise por título, edição, assunto, palavra-chave…"
              className="h-14 w-full rounded-2xl bg-white pl-14 pr-4 text-base text-brand-ink shadow-xl outline-none ring-brand-cyan/40 transition focus:ring-4"
              autoFocus={!filters.q}
            />
          </label>
          <select
            name="ordem"
            defaultValue={filters.ordem ?? (filters.q ? "relevancia" : "recentes")}
            aria-label="Ordenar por"
            className="h-14 rounded-2xl bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/20 [&>option]:text-brand-ink"
          >
            <option value="relevancia">Mais relevantes</option>
            <option value="recentes">Mais recentes</option>
            <option value="antigos">Mais antigos</option>
            <option value="titulo">Título (A–Z)</option>
            <option value="enviados">Enviados por último</option>
          </select>
          <button type="submit" className="btn-primary h-14 !rounded-2xl">
            Pesquisar
          </button>
        </form>
        <p className="mt-2 text-xs text-sky-100/70">
          Dica: a busca ignora acentos e encontra palavras incompletas — “assemb 2019” acha “Assembleia … 2019”.
        </p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Facets */}
        <aside className="hidden h-fit animate-fade-up [animation-delay:100ms] lg:sticky lg:top-6 lg:block">{facets}</aside>
        <details className="card group p-4 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-brand-navy">
            <span className="inline-flex items-center gap-2">
              <Icon name="filter" className="h-4 w-4" />
              Filtros {activeChips.length ? `(${activeChips.length})` : ""}
            </span>
            <Icon name="chevronDown" className="h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <div className="mt-4">{facets}</div>
        </details>

        {/* Results */}
        <section className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-2 text-sm font-semibold text-brand-navy">
              {result.total.toLocaleString("pt-BR")} {result.total === 1 ? "documento" : "documentos"}
            </p>
            {activeChips.map((chip) => (
              <Link
                key={chip.label}
                href={href(filters, chip.remove)}
                className="group inline-flex items-center gap-1.5 rounded-full bg-brand-navy px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-600"
              >
                {chip.label}
                <Icon name="close" className="h-3 w-3 opacity-70 group-hover:opacity-100" />
              </Link>
            ))}
            {activeChips.length > 1 ? (
              <Link href="/painel/acervo" className="text-xs font-semibold text-slate-500 hover:text-brand-navy">
                Limpar tudo
              </Link>
            ) : null}
          </div>

          {result.items.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                icon={totals.count === 0 ? "folder" : "search"}
                title={totals.count === 0 ? "O acervo está vazio" : "Nenhum documento encontrado"}
                text={
                  totals.count === 0
                    ? canEdit
                      ? "Envie os primeiros documentos — você pode mandar vários de uma vez."
                      : "Ainda não há documentos cadastrados. Os jornalistas e o administrador podem enviá-los."
                    : "Tente outras palavras ou remova algum filtro."
                }
                action={
                  totals.count === 0 && canEdit ? (
                    <Link href="/painel/acervo/enviar" className="btn-primary">
                      <Icon name="upload" className="h-4 w-4" />
                      Enviar documentos
                    </Link>
                  ) : null
                }
              />
            </div>
          ) : (
            <ul className="mt-4 grid gap-2">
              {result.items.map((doc, index) => (
                <li
                  key={doc.id}
                  className="card group flex animate-fade-up flex-col gap-3 p-4 transition hover:shadow-card-hover sm:flex-row sm:items-center"
                  style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}
                >
                  <a href={`/painel/acervo/arquivo/${doc.id}`} target="_blank" rel="noreferrer" className="flex min-w-0 flex-1 items-start gap-4">
                    <FileBadge fileName={doc.file_name} />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full bg-brand-sand px-2 py-0.5 text-[10px] font-bold uppercase text-brand-blue">
                          {doc.doc_type}
                        </span>
                        {doc.edition ? <span className="text-xs font-semibold text-slate-500">{doc.edition}</span> : null}
                      </span>
                      <span className="mt-1 line-clamp-2 block font-semibold leading-snug text-brand-navy transition group-hover:text-brand-blue">
                        {doc.title}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Icon name="calendar" className="h-3.5 w-3.5" />
                          {doc.doc_date ? formatShortDateBR(doc.doc_date) : (doc.year ?? "Sem data")}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Icon name="layers" className="h-3.5 w-3.5" />
                          {companyName(doc.company)}
                        </span>
                        <span>{formatBytes(doc.size)}</span>
                      </span>
                      {doc.tags ? (
                        <span className="mt-1.5 flex flex-wrap gap-1">
                          {doc.tags
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .slice(0, 6)
                            .map((tag) => (
                              <span key={tag} className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600">
                                #{tag}
                              </span>
                            ))}
                        </span>
                      ) : null}
                    </span>
                  </a>
                  <div className="flex shrink-0 items-center gap-1 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
                    <a
                      href={`/painel/acervo/arquivo/${doc.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy-light"
                    >
                      <Icon name="eye" className="h-4 w-4" />
                      Abrir
                    </a>
                    <a
                      href={`/painel/acervo/arquivo/${doc.id}?baixar=1`}
                      title="Baixar"
                      aria-label="Baixar"
                      className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-navy"
                    >
                      <Icon name="download" className="h-4 w-4" />
                    </a>
                    {canEdit ? (
                      <Link
                        href={`/painel/acervo/${doc.id}`}
                        title="Editar informações"
                        aria-label="Editar informações"
                        className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-navy"
                      >
                        <Icon name="pencil" className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {result.pages > 1 ? (
            <nav aria-label="Páginas" className="mt-6 flex items-center justify-center gap-2">
              {result.page > 1 ? (
                <Link href={href(filters, { pagina: String(result.page - 1) })} className="btn-secondary !px-4 !py-2 ring-1 ring-slate-200">
                  <Icon name="arrowLeft" className="h-4 w-4" />
                  Anterior
                </Link>
              ) : null}
              <span className="px-3 text-sm font-semibold text-slate-500">
                Página {result.page} de {result.pages}
              </span>
              {result.page < result.pages ? (
                <Link href={href(filters, { pagina: String(result.page + 1) })} className="btn-secondary !px-4 !py-2 ring-1 ring-slate-200">
                  Próxima
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
              ) : null}
            </nav>
          ) : null}
        </section>
      </div>
    </div>
  );
}

function FacetGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{title}</h2>
      <div className="grid gap-1">{children}</div>
    </section>
  );
}

function FacetLink({ href, label, count, active }: { href: string; label: string; count: number; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition ${
        active ? "bg-brand-navy font-semibold text-white" : "text-brand-navy hover:bg-white hover:shadow-sm"
      }`}
    >
      <span className="truncate">{label}</span>
      <span className={`shrink-0 rounded-full px-2 text-xs ${active ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
        {count}
      </span>
    </Link>
  );
}

