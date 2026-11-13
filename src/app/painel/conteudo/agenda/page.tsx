import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CompanySelect } from "@/components/painel/CompanySelect";
import { ContentHeader } from "@/components/painel/ContentTabs";
import { ConfirmButton, EmptyState, SubmitButton } from "@/components/painel/ui";
import { companies, getCompany } from "@/data/companies";
import { formatShortDate } from "@/lib/format";
import { requireUser } from "@/server/auth";
import { db, parseCompanies } from "@/server/db";
import { deleteEventAction, saveEventAction } from "../actions";

export const metadata = { title: "Agenda" };

type EventRow = {
  id: number;
  title: string;
  date: string;
  place: string;
  description: string;
  companies: string;
};

export default async function AgendaAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ editar?: string }>;
}) {
  await requireUser("jornalista");
  const { editar } = await searchParams;
  const events = db().prepare("SELECT * FROM events ORDER BY date DESC").all() as EventRow[];
  const editing = editar ? events.find((e) => e.id === Number(editar)) : undefined;
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });

  return (
    <div className="mx-auto max-w-6xl">
      <ContentHeader active="agenda" title="Agenda" description="Atos, assembleias e atendimentos exibidos nos portais." />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section>
          {events.length === 0 ? (
            <EmptyState icon="calendar" title="Agenda vazia" text="Adicione o primeiro evento pelo formulário." />
          ) : (
            <ul className="grid gap-3">
              {events.map((event, index) => {
                const d = formatShortDate(event.date);
                const list = parseCompanies(event.companies);
                const past = event.date < today;
                return (
                  <li
                    key={event.id}
                    className={`card flex animate-fade-up items-start gap-4 p-4 ${editing?.id === event.id ? "ring-2 ring-brand-green" : ""} ${past ? "opacity-70" : ""}`}
                    style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
                  >
                    <div className="grid h-16 w-16 shrink-0 place-content-center rounded-xl bg-brand-navy text-center text-white">
                      <span className="font-display text-2xl font-semibold leading-none">{d.day}</span>
                      <span className="text-[10px] font-bold uppercase">{d.month} {d.year.slice(2)}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold leading-snug text-brand-navy">{event.title}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                        <Icon name="pin" className="h-3.5 w-3.5" />
                        {event.place || "Local a definir"}
                        {past ? <span className="ml-1 rounded bg-slate-200 px-1.5 text-[10px] font-bold uppercase">Passado</span> : null}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {list.length === 0 ? "Todas as empresas" : list.map((s) => getCompany(s)?.name ?? s).join(" · ")}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Link
                        href={`/painel/conteudo/agenda?editar=${event.id}`}
                        scroll={false}
                        title="Editar"
                        aria-label="Editar"
                        className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-navy"
                      >
                        <Icon name="pencil" className="h-4 w-4" />
                      </Link>
                      <form action={deleteEventAction}>
                        <input type="hidden" name="id" value={event.id} />
                        <ConfirmButton
                          message={`Excluir “${event.title}” da agenda?`}
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
        </section>

        <aside className="h-fit lg:sticky lg:top-6">
          <form key={editing?.id ?? "novo"} action={saveEventAction} className="card grid animate-fade-up gap-4 p-5">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold uppercase text-brand-navy">
              <Icon name={editing ? "pencil" : "plus"} className="h-5 w-5 text-brand-green" />
              {editing ? "Editar evento" : "Novo evento"}
            </h2>
            {editing ? <input type="hidden" name="id" value={editing.id} /> : null}
            <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
              Título
              <input name="titulo" required defaultValue={editing?.title} className="input !py-2.5" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
                Data
                <input name="data" type="date" required defaultValue={editing?.date ?? today} className="input !px-3 !py-2.5" />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
                Local
                <input name="local" defaultValue={editing?.place} className="input !px-3 !py-2.5" />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
              Descrição
              <textarea name="descricao" rows={4} defaultValue={editing?.description} className="input resize-y" />
            </label>
            <CompanySelect companies={companies} selected={editing ? parseCompanies(editing.companies) : []} compact />
            <div className="flex gap-2">
              <SubmitButton className="btn-primary flex-1">{editing ? "Salvar" : "Adicionar"}</SubmitButton>
              {editing ? (
                <Link href="/painel/conteudo/agenda" className="btn-secondary ring-1 ring-slate-200">
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
