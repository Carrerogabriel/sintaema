import { site } from "@/data/content";

export const metadata = { title: "Jurídico" };

const areas = [
  {
    title: "Direito do trabalho",
    text: "Orientação sobre verbas, jornada, assédio, estabilidade, acidentes e cumprimento de normas coletivas.",
  },
  {
    title: "Previdência",
    text: "Acompanhamento de aposentadorias, pensões, auxílios e revisão de benefícios, inclusive PPP.",
  },
  {
    title: "Interesses coletivos",
    text: "Atuação contra ataques a direitos da categoria e em defesa do saneamento público.",
  },
];

export default function LegalPage() {
  return (
    <div className="grid gap-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
          Assessoria
        </p>
        <h1 className="mt-1 font-display text-4xl uppercase text-brand-navy">Jurídico</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          O plantão dos advogados no SINTAEMA-SC ocorre {site.lawyers}. Todos os atendimentos
          precisam de agendamento.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {areas.map((area) => (
          <article key={area.title} className="rounded-xl bg-white p-6 shadow-card">
            <h2 className="font-display text-2xl uppercase text-brand-navy">{area.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{area.text}</p>
          </article>
        ))}
      </div>

      <section className="rounded-xl bg-brand-navy p-6 text-sky-50 md:p-8">
        <h2 className="font-display text-2xl uppercase text-white">Como agendar</h2>
        <p className="mt-3 max-w-2xl text-sm">
          Ligue para {site.phone} ou escreva para {site.email}. Informe nome, local de trabalho e
          o tema da consulta. O atendimento presencial acontece na sede, {site.address}.
        </p>
      </section>
    </div>
  );
}
