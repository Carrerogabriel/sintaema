import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CompanySelect } from "@/components/painel/CompanySelect";
import { ContentHeader } from "@/components/painel/ContentTabs";
import { ConfirmButton, EmptyState, SubmitButton } from "@/components/painel/ui";
import { companies, getCompany } from "@/data/companies";
import { requireUser } from "@/server/auth";
import { db, parseCompanies } from "@/server/db";
import { deleteBulletinAction, saveBulletinAction } from "../actions";

export const metadata = { title: "Informativos" };

type BulletinRow = { id: number; name: string; issue: string; summary: string; companies: string };

export default async function BulletinsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ editar?: string }>;
}) {
  await requireUser("jornalista");
  const { editar } = await searchParams;
  const bulletins = db().prepare("SELECT * FROM bulletins ORDER BY sort_order, id").all() as BulletinRow[];
  const editing = editar ? bulletins.find((b) => b.id === Number(editar)) : undefined;

  return (
    <div className="mx-auto max-w-6xl">
      <ContentHeader
        active="informativos"
        title="Informativos"
        description="Publicações exibidas na página inicial de cada portal."
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section>
          {bulletins.length === 0 ? (
            <EmptyState icon="megaphone" title="Nenhum informativo" text="Adicione o primeiro pelo formulário." />
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {bulletins.map((item, index) => {
                const list = parseCompanies(item.companies);
                return (
                  <li
                    key={item.id}
                    className={`card flex animate-fade-up flex-col p-5 ${editing?.id === item.id ? "ring-2 ring-brand-green" : ""}`}
                    style={{ animationDelay: `${Math.min(index, 10) * 50}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-green-light text-brand-green-dark">
                        <Icon name="file" />
                      </span>
                      <div className="flex gap-1">
                        <Link
                          href={`/painel/conteudo/informativos?editar=${item.id}`}
                          scroll={false}
                          title="Editar"
                          aria-label="Editar"
                          className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-navy"
                        >
                          <Icon name="pencil" className="h-4 w-4" />
                        </Link>
                        <form action={deleteBulletinAction}>
                          <input type="hidden" name="id" value={item.id} />
                          <ConfirmButton
                            message={`Excluir o informativo “${item.name}”?`}
                            title="Excluir"
                            className="grid h-9 w-9 place-items-center rounded-lg text-red-600 transition hover:bg-red-50"
                          >
                            <Icon name="trash" className="h-4 w-4" />
                          </ConfirmButton>
                        </form>
                      </div>
                    </div>
                    <p className="mt-3 font-display text-xl font-semibold text-brand-navy">{item.name}</p>
                    {item.issue ? <p className="text-xs font-semibold uppercase text-brand-blue">{item.issue}</p> : null}
                    <p className="mt-2 flex-1 text-sm text-slate-600">{item.summary}</p>
                    <p className="mt-3 text-xs text-slate-400">
                      {list.length === 0 ? "Todas as empresas" : list.map((s) => getCompany(s)?.name ?? s).join(" · ")}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <aside className="h-fit lg:sticky lg:top-6">
          <form key={editing?.id ?? "novo"} action={saveBulletinAction} className="card grid animate-fade-up gap-4 p-5">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold uppercase text-brand-navy">
              <Icon name={editing ? "pencil" : "plus"} className="h-5 w-5 text-brand-green" />
              {editing ? "Editar informativo" : "Novo informativo"}
            </h2>
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
            <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
              Nome
              <input name="nome" required defaultValue={editing?.name} placeholder="Ex.: Bomba d'Água" className="input !py-2.5" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
              Edição
              <input name="edicao" defaultValue={editing?.issue} placeholder="Ex.: Edição 881" className="input !py-2.5" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
              Resumo
              <textarea name="resumo" rows={3} defaultValue={editing?.summary} className="input resize-y" />
            </label>
            <CompanySelect companies={companies} selected={editing ? parseCompanies(editing.companies) : []} compact />
            <p className="flex items-start gap-1.5 text-xs text-slate-500">
              <Icon name="folder" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Para guardar o arquivo (PDF) da edição, envie-o também ao Acervo.
            </p>
            <div className="flex gap-2">
              <SubmitButton className="btn-primary flex-1">{editing ? "Salvar" : "Adicionar"}</SubmitButton>
              {editing ? (
                <Link href="/painel/conteudo/informativos" className="btn-secondary ring-1 ring-slate-200">
                  Cancelar
                </Link>
              ) : null}
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}
