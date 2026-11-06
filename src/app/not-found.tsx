import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-xl bg-white p-10 text-center shadow-card">
      <h1 className="font-display text-4xl uppercase text-brand-navy">Página não encontrada</h1>
      <p className="mt-3 text-slate-600">O endereço não existe ou a matéria foi removida.</p>
      <Link
        href="/"
        className="mt-6 inline-block bg-brand-green px-5 py-3 font-bold uppercase text-white"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
