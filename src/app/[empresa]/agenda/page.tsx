import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { PdfActions } from "@/components/PdfActions";
import { Reveal } from "@/components/Reveal";
import { eventsFor } from "@/data/content";
import { resolveCompany, type CompanyParams } from "@/lib/company";
import { formatShortDate } from "@/lib/format";


// Lê o banco (editado pelo painel): renderiza a cada acesso.
export const dynamic = "force-dynamic";

export const metadata = { title: "Agenda" };

export default async function AgendaPage({ params }: CompanyParams) {
  const { company, base } = await resolveCompany(params);
  const sorted = [...eventsFor(company.slug)].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero
        eyebrow="Calendário"
        title="Agenda"
        description={`Atos, assembleias e atendimentos do SINTAEMA-SC para a categoria da ${company.name}.`}
        base={base}
        crumbs={[{ label: "Agenda" }]}
      >
        <PdfActions href={`${base}/pdf/agenda`} label="a agenda" />
      </PageHero>

      <div className="container-site">
        <ul className="mx-auto grid max-w-4xl gap-5 pt-4">
          {sorted.map((event, index) => {
            const d = formatShortDate(event.date);
            return (
              <Reveal as="li" key={event.title} delay={index * 100}>
                <article className="card card-hover group flex flex-col overflow-hidden sm:flex-row">
                  <div className="flex items-center gap-3 bg-gradient-to-br from-brand-navy to-brand-navy-light px-6 py-4 text-white transition-colors duration-500 group-hover:from-brand-green group-hover:to-brand-green-dark sm:w-36 sm:flex-col sm:justify-center sm:gap-0 sm:py-8 sm:text-center">
                    <span className="font-display text-4xl font-semibold leading-none sm:text-5xl">{d.day}</span>
                    <span className="text-sm font-bold uppercase tracking-wider sm:mt-1">
                      {d.month} <span className="opacity-70">{d.year}</span>
                    </span>
                  </div>
                  <div className="flex-1 p-6">
                    <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                      <Icon name="pin" className="h-4 w-4" />
                      {event.place}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold uppercase leading-tight text-brand-navy">
                      {event.title}
                    </h2>
                    <p className="mt-2 leading-relaxed text-slate-600">{event.description}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </>
  );
}
