import { events } from "@/data/content";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Agenda" };

export default function AgendaPage() {
  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Calendário</p>
        <h1 className="mt-1 font-display text-4xl uppercase text-brand-navy">Agenda</h1>
      </header>
      <ul className="grid gap-4">
        {events.map((event) => (
          <li key={event.title} className="rounded-xl bg-white p-6 shadow-card">
            <p className="text-xs uppercase tracking-wide text-brand-green">
              {formatDate(event.date)} · {event.place}
            </p>
            <h2 className="mt-2 font-display text-2xl uppercase text-brand-navy">{event.title}</h2>
            <p className="mt-2 text-slate-600">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
