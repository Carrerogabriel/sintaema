import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { FileBadge } from "@/components/painel/FileBadge";
import { ConfirmButton, SubmitButton } from "@/components/painel/ui";
import { companies } from "@/data/companies";
import { formatBytes, formatDateTime } from "@/lib/panel-format";
import { requireUser } from "@/server/auth";
import { DOC_TYPES, getDocument } from "@/server/documents";
import { deleteDocumentAction, updateDocumentAction } from "../actions";

export const metadata = { title: "Editar documento" };

export default async function EditDocumentPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser("jornalista");
  const { id } = await params;
  const doc = getDocument(Number(id));
  if (!doc) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6 animate-fade-up">
        <Link href="/painel/acervo" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-navy">
          <Icon name="arrowLeft" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Acervo
        </Link>
        <h1 className="mt-2 font-display text-4xl font-semibold uppercase text-brand-navy">Editar documento</h1>
      </header>

      <div className="card mb-5 flex animate-fade-up flex-wrap items-center gap-4 p-4">
        <FileBadge fileName={doc.file_name} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-brand-navy">{doc.file_name}</p>
          <p className="text-xs text-slate-500">
            {formatBytes(doc.size)} · enviado em {formatDateTime(doc.created_at)}
            {doc.uploader_name ? ` por ${doc.uploader_name}` : ""}
          </p>
        </div>
        <a href={`/painel/acervo/arquivo/${doc.id}`} target="_blank" rel="noreferrer" className="btn-secondary !py-2 ring-1 ring-slate-200">
          <Icon name="eye" className="h-4 w-4" />
          Abrir
        </a>
      </div>

      <form action={updateDocumentAction} className="card grid animate-fade-up gap-4 p-5 [animation-delay:100ms] sm:p-7">
        <input type="hidden" name="id" value={doc.id} />
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          Título
          <input name="titulo" required defaultValue={doc.title} className="input" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
            Tipo
            <select name="tipo" defaultValue={doc.doc_type} className="input">
              {DOC_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
            Empresa
            <select name="empresa" defaultValue={doc.company} className="input">
              <option value="">Geral (sindicato)</option>
              {companies.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
            Edição / número
            <input name="edicao" defaultValue={doc.edition} className="input" />
          </label>
          <div className="grid grid-cols-[1fr_6rem] gap-2">
            <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
              Data
              <input name="data" type="date" defaultValue={doc.doc_date ?? ""} className="input !px-3" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
              Ano
              <input name="ano" type="number" min={1900} max={2100} defaultValue={doc.year ?? ""} className="input !px-3" />
            </label>
          </div>
        </div>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          Palavras-chave
          <input name="tags" defaultValue={doc.tags} placeholder="Separe por vírgulas" className="input" />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          Descrição
          <textarea name="descricao" rows={4} defaultValue={doc.description} className="input resize-y" />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <SubmitButton className="btn-primary">
            <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
            Salvar
          </SubmitButton>
        </div>
      </form>

      <form action={deleteDocumentAction} className="mt-5 flex animate-fade-up flex-wrap items-center justify-between gap-3 rounded-2xl bg-red-50 p-4 ring-1 ring-red-100 [animation-delay:200ms]">
        <input type="hidden" name="id" value={doc.id} />
        <p className="text-sm text-red-800">Excluir remove o arquivo do acervo de forma permanente.</p>
        <ConfirmButton
          message={`Excluir “${doc.title}” do acervo? O arquivo será apagado e não poderá ser recuperado.`}
          className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
        >
          <Icon name="trash" className="h-4 w-4" />
          Excluir documento
        </ConfirmButton>
      </form>
    </div>
  );
}
