import Link from "next/link";
import type { Company } from "@/data/companies";
import { eventsFor } from "@/data/content";
import { formatShortDate } from "@/lib/format";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function Sidebar({ company }: { company: Company }) {
  const base = `/${company.slug}`;
  const upcoming = [...eventsFor(company.slug)].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <aside className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:content-start">
      <Reveal variant="right">
        <Link
          href={`${base}/filie-se`}
          className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan p-6 text-white shadow-glow-blue transition duration-500 hover:-translate-y-1"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 animate-float rounded-full bg-white/15" aria-hidden="true" />
          <div className="absolute -bottom-12 -left-6 h-28 w-28 rounded-full bg-white/10" aria-hidden="true" />
          <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/20 backdrop-blur">
            <Icon name="heart" />
          </span>
          <p className="relative mt-4 font-display text-3xl font-semibold uppercase leading-none">
            Filie-se hoje!
          </p>
          <p className="relative mt-3 text-sm text-sky-50">
            Fortaleça a luta pelos seus direitos. Contribuição de 1% sobre o salário fixo.
          </p>
          <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase">
            Saiba como
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Reveal>

      <Reveal variant="right" delay={80}>
        <div className="relative overflow-hidden rounded-2xl bg-brand-navy p-6 text-white shadow-card">
          <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
          <p className="relative inline-flex items-center gap-2 rounded-full bg-red-600/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
            <Icon name="alert" className="h-3.5 w-3.5" />
            Denúncia
          </p>
          <h2 className="relative mt-3 font-display text-2xl font-semibold uppercase leading-tight">
            Contra a municipalização
          </h2>
          <p className="relative mt-2 text-sm text-sky-100/90">
            Denúncias de corrupção em sistemas municipalizados. Todos contra a privatização do
            saneamento.
          </p>
          <Link href={`${base}/noticias?categoria=Lutas`} className="link-arrow relative mt-4 !text-brand-cyan hover:!text-white">
            Leia as denúncias
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <Reveal variant="right" delay={160}>
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold uppercase text-brand-navy">Agenda</h2>
            <Icon name="calendar" className="h-5 w-5 text-brand-green" />
          </div>
          <ul className="mt-4 grid gap-3">
            {upcoming.map((event) => {
              const d = formatShortDate(event.date);
              return (
                <li key={event.title} className="group flex gap-3 rounded-xl p-2 transition hover:bg-brand-sand">
                  <div className="grid h-14 w-14 shrink-0 place-content-center rounded-xl bg-brand-green-light text-center text-brand-green-dark transition group-hover:bg-brand-green group-hover:text-white">
                    <span className="font-display text-xl font-semibold leading-none">{d.day}</span>
                    <span className="text-[10px] font-bold uppercase">{d.month}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-brand-navy">
                      {event.title}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{event.place}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link href={`${base}/agenda`} className="link-arrow mt-4">
            Ver toda a agenda
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <Reveal variant="right" delay={240}>
        <Link href={`${base}/contato`} className="card card-hover group flex items-center gap-4 p-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-sand text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white">
            <Icon name="megaphone" />
          </span>
          <span>
            <span className="block font-display text-xl font-semibold uppercase text-brand-navy">Ouvidoria</span>
            <span className="text-sm text-slate-600">Denúncias, dúvidas e sugestões.</span>
          </span>
        </Link>
      </Reveal>
    </aside>
  );
}
