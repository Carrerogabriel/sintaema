import Link from "next/link";
import { Icon } from "@/components/Icon";
import { companies } from "@/data/companies";
import { requireUser } from "@/server/auth";
import { DOC_TYPES } from "@/server/documents";
import { Uploader } from "./Uploader";

export const metadata = { title: "Enviar ao acervo" };

export default async function UploadPage() {
  await requireUser("jornalista");
  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 animate-fade-up">
        <Link href="/painel/acervo" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-navy">
          <Icon name="arrowLeft" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Acervo
        </Link>
        <h1 className="mt-2 font-display text-4xl font-semibold uppercase text-brand-navy">Enviar documentos</h1>
        <p className="text-slate-600">
          Envie vários arquivos de uma vez. O título vem do nome do arquivo e o ano é detectado
          automaticamente — confira antes de enviar.
        </p>
      </header>
      <Uploader types={DOC_TYPES} companies={companies} />
    </div>
  );
}
