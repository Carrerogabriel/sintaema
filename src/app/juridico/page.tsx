import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/content";

export const metadata = { title: "Jurídico" };

const areas: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "file",
    title: "Direito do trabalho",
    text: "Orientação sobre verbas, jornada, assédio, estabilidade, acidentes e cumprimento de normas coletivas.",
  },
  {
    icon: "shield",
    title: "Previdência",
    text: "Acompanhamento de aposentadorias, pensões, auxílios e revisão de benefícios, inclusive PPP.",
  },
  {
    icon: "users",
    title: "Interesses coletivos",
    text: "Atuação contra ataques a direitos da categoria e em defesa do saneamento público.",
  },
];

const schedule = [
  { icon: "phone" as const, title: "Entre em contato", text: `Ligue para ${site.phone} ou escreva para ${site.email}.` },
  { icon: "file" as const, title: "Informe os dados", text: "Nome, local de trabalho e o tema da consulta." },
  { icon: "pin" as const, title: "Compareça à sede", text: `Atendimento presencial em ${site.address}.` },
];

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="Assessoria"
        title="Jurídico"
        description={`O plantão dos advogados no SINTAEMA-SC ocorre ${site.lawyers}. Todos os atendimentos precisam de agendamento.`}
        crumbs={[{ label: "Jurídico" }]}
      >
        <div className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-3 pr-5 backdrop-blur">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-green">
            <Icon name="clock" />
          </span>
          <span className="text-sm">
            <strong className="block font-semibold text-white">Plantão jurídico</strong>
            <span className="text-sky-100/90">Segundas e quartas · 14h às 17h</span>
          </span>
        </div>
      </PageHero>

      <div className="container-site">
        <Reveal className="mb-8 pt-4">
          <p className="eyebrow text-brand-green">Áreas de atuação</p>
          <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-brand-navy md:text-4xl">
            Como podemos ajudar
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.title} delay={index * 100}>
              <article className="card card-hover group relative h-full overflow-hidden p-7">
                <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-sand transition-transform duration-700 group-hover:scale-[3]" aria-hidden="true" />
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-navy text-white transition duration-500 group-hover:rotate-[-6deg] group-hover:bg-brand-green">
                  <Icon name={area.icon} className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 font-display text-2xl font-semibold uppercase text-brand-navy">
                  {area.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{area.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="scale" className="mt-16">
          <section className="relative overflow-hidden rounded-3xl bg-brand-navy p-6 text-sky-50 sm:p-10 md:p-12">
            <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-blue/30 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <p className="eyebrow text-brand-cyan">Agendamento</p>
                <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-white md:text-4xl">
                  Como agendar
                </h2>
                <p className="mt-3 text-sky-100/90">
                  O atendimento é feito somente com hora marcada. Siga os passos ao lado.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="tel:+554832243868" className="btn-primary">
                    <Icon name="phone" className="h-4 w-4" />
                    Ligar agora
                  </a>
                  <Link href="/contato" className="btn-ghost">
                    Enviar mensagem
                  </Link>
                </div>
              </div>
              <ol className="grid gap-4">
                {schedule.map((item, index) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/10"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-cyan">
                      <Icon name={item.icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                        Passo {index + 1}
                      </span>
                      <strong className="block font-semibold text-white">{item.title}</strong>
                      <span className="break-words text-sm text-sky-100/80">{item.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
