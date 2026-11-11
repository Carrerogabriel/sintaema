import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/content";

export const metadata = { title: "Filie-se" };

const steps = [
  {
    title: "Preencha a ficha",
    text: "Use o formulário de contato ou procure a representação de base da sua região.",
  },
  {
    title: "Envie ao sindicato",
    text: `Entregue a um representante, envie pelos Correios para ${site.address} ou, no caso da CASAN, use o malote da empresa.`,
  },
  {
    title: "Contribua e participe",
    text: `O desconto mensal é de ${site.contribution}. Filiação é organização, informação e defesa coletiva.`,
  },
];

const benefits: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "scale",
    title: "Defesa jurídica",
    text: "Acompanhamento de direitos trabalhistas e previdenciários com advogados do sindicato.",
  },
  {
    icon: "megaphone",
    title: "Informação permanente",
    text: "Campanhas, ACTs e condições de trabalho em informativos e canais oficiais.",
  },
  {
    icon: "shield",
    title: "Contra a precarização",
    text: "Organização contra privatização, municipalização e terceirizações.",
  },
  {
    icon: "users",
    title: "Voz ativa",
    text: "Participação nas assembleias, congressos e nos locais de trabalho.",
  },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Campanha de filiação"
        title={
          <>
            Filie-se ao <span className="text-brand-green">Sintaema</span>
          </>
        }
        description="Para organizar, defender e expandir a luta sindical. Cada direito conquistado foi fruto de muita luta. Faça parte."
        crumbs={[{ label: "Filie-se" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contato" className="btn-primary">
            <Icon name="heart" className="h-4 w-4" />
            Quero me filiar
          </Link>
          <a href="#como-filiar" className="btn-ghost">
            Como funciona
          </a>
        </div>
      </PageHero>

      <div className="container-site">
        <section id="como-filiar" className="scroll-mt-28 pt-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center text-brand-green">Passo a passo</p>
            <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-brand-navy md:text-4xl">
              Como se filiar
            </h2>
          </Reveal>
          <div className="relative mt-12">
            <div
              className="absolute left-[16.6%] right-[16.6%] top-8 hidden h-0.5 bg-gradient-to-r from-brand-green via-brand-cyan to-brand-blue md:block"
              aria-hidden="true"
            />
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 140} className="relative">
                <div className="card card-hover mt-8 h-[calc(100%-2rem)] p-6 pt-0 text-center">
                  <span className="relative mx-auto -mt-8 grid h-16 w-16 place-items-center rounded-full bg-brand-green font-display text-2xl font-semibold text-white shadow-glow ring-8 ring-brand-sand">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold uppercase text-brand-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          </div>
        </section>

        <section className="mt-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="left">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover">
                <Image
                  src="/images/uniao.jpg"
                  alt="Grupo de pessoas unidas em ato público"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="absolute -bottom-6 right-4 animate-float rounded-2xl bg-white p-4 shadow-card-hover sm:-right-6 sm:p-5">
                <p className="font-display text-4xl font-semibold text-brand-green">1%</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  sobre o salário fixo
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-brand-green">Vantagens</p>
              <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-brand-navy md:text-4xl">
                Por que se filiar?
              </h2>
            </Reveal>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <Reveal as="li" key={benefit.title} delay={index * 90}>
                  <div className="group h-full rounded-2xl p-4 transition hover:bg-white hover:shadow-card">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-navy text-white transition duration-300 group-hover:bg-brand-green">
                      <Icon name={benefit.icon} />
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold uppercase text-brand-navy">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{benefit.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={300}>
              <Link href="/contato" className="btn-primary mt-8">
                Quero me filiar
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
