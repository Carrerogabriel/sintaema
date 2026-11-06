import Link from "next/link";
import { events } from "@/data/content";
import { formatDate } from "@/lib/format";

export function Sidebar() {
  return (
    <aside className="grid gap-5">
      <Link
        href="/filie-se"
        className="overflow-hidden rounded-lg bg-gradient-to-b from-sky-400 to-brand-blue p-5 text-center text-white shadow-card"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]">Clique aqui</p>
        <p className="mt-3 font-display text-3xl uppercase">Filie-se hoje!</p>
        <p className="mt-3 text-sm text-sky-50">
          Fortaleça a luta pelos seus direitos. Contribuição de 1% sobre o salário fixo.
        </p>
      </Link>

      <div className="rounded-lg bg-brand-navy p-5 text-white shadow-card">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">
          Ações contra as
        </p>
        <h2 className="mt-2 font-display text-3xl leading-none">
          Tentativas de municipalização
        </h2>
        <p className="mt-3 text-sm text-sky-100">
          Denúncias de corrupção em sistemas municipalizados. Todos contra a privatização do
          saneamento.
        </p>
        <Link
          href="/noticias?categoria=Lutas"
          className="mt-4 inline-block bg-red-600 px-3 py-1 text-xs font-bold uppercase"
        >
          Leia as denúncias
        </Link>
      </div>

      <Link href="/contato" className="rounded-lg bg-slate-100 p-5 shadow-card">
        <p className="font-display text-3xl text-brand-navy">Ouvidoria</p>
        <p className="mt-2 text-sm text-slate-600">
          Envie denúncias, dúvidas e sugestões para a secretaria do sindicato.
        </p>
      </Link>

      <div className="rounded-lg bg-white p-5 shadow-card">
        <h2 className="font-display text-xl uppercase text-brand-navy">Agenda</h2>
        <ul className="mt-4 grid gap-4">
          {events.map((event) => (
            <li key={event.title} className="border-l-4 border-brand-green pl-3">
              <p className="text-[11px] uppercase text-slate-500">{formatDate(event.date)}</p>
              <p className="font-semibold text-brand-navy">{event.title}</p>
              <p className="text-xs text-slate-500">{event.place}</p>
            </li>
          ))}
        </ul>
        <Link href="/agenda" className="mt-4 inline-block text-sm font-semibold text-brand-blue">
          Ver toda a agenda ►
        </Link>
      </div>
    </aside>
  );
}
