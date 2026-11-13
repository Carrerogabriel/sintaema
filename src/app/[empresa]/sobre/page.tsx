import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { PdfActions } from "@/components/PdfActions";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/content";
import { aboutParagraphs, aboutTimeline as timeline, aboutValues as values } from "@/data/institucional";
import { resolveCompany, type CompanyParams } from "@/lib/company";

export const metadata = { title: "O sindicato" };

export default async function AboutPage({ params }: CompanyParams) {
  const { base } = await resolveCompany(params);
  return (
    <>
      <PageHero
        eyebrow="Histórico"
        title="Sonhos, lutas e conquistas"
        description="Desde 1977 organizando trabalhadoras e trabalhadores em água, esgoto e meio ambiente de Santa Catarina."
        crumbs={[{ label: "O Sindicato" }]}
        base={base}
      >
        <PdfActions href={`${base}/pdf/sobre`} label="o perfil institucional" />
      </PageHero>

      <div className="container-site -mt-6 grid gap-10 md:-mt-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-10">
          <Reveal>
            <div className="card relative z-10 p-6 sm:p-10">
              <div className="prose-sintaema">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <section>
            <Reveal className="mb-8">
              <p className="eyebrow text-brand-green">Linha do tempo</p>
              <h2 className="mt-2 font-display text-3xl font-semibold uppercase text-brand-navy md:text-4xl">
                Nossa trajetória
              </h2>
            </Reveal>
            <ol className="relative ml-3 border-l-2 border-dashed border-brand-blue/30 sm:ml-4">
              {timeline.map((item, index) => (
                <li key={item.year} className="relative pb-8 pl-8 last:pb-0 sm:pl-10">
                  <span className="absolute -left-[11px] top-1 grid h-5 w-5 place-items-center rounded-full bg-white ring-4 ring-brand-sand">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-green" />
                  </span>
                  <Reveal variant="left" delay={index * 60}>
                    <div className="card card-hover p-5 sm:p-6">
                      <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-blue">
                        {item.year}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-semibold uppercase text-brand-navy">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

          <Reveal>
            <Link
              href={`${base}/historia`}
              className="group relative block overflow-hidden rounded-3xl bg-[#14110e] p-8 text-stone-200 shadow-card-hover sm:p-10"
            >
              <span className="history-grain" aria-hidden="true" />
              <span
                className="history-outline pointer-events-none absolute -bottom-6 -right-2 select-none font-display text-[9rem] font-semibold leading-none sm:text-[12rem]"
                aria-hidden="true"
              >
                1977
              </span>
              <span className="relative">
                <span className="eyebrow text-red-400">Linha do tempo completa</span>
                <span className="mt-3 block max-w-md font-display text-3xl font-semibold uppercase leading-tight text-white sm:text-4xl">
                  Da clandestinidade à defesa da água pública
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-green">
                  Conheça a nossa história
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>

        <aside className="grid gap-5 lg:sticky lg:top-28 lg:h-fit">
          <Reveal variant="right">
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy p-6 text-sky-50 shadow-card">
              <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="relative">
                <h2 className="font-display text-2xl font-semibold uppercase text-white">Identidade</h2>
                <p className="mt-3 text-sm leading-relaxed">{site.fullName}</p>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Icon name="calendar" className="h-4 w-4 text-brand-cyan" />
                    <dt className="sr-only">Fundação</dt>
                    <dd>Fundação: 9 de novembro de 1977</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="pin" className="h-4 w-4 text-brand-cyan" />
                    <dt className="sr-only">Sede</dt>
                    <dd>Sede: {site.city}</dd>
                  </div>
                </dl>
                <p className="mt-6 font-display text-2xl font-semibold uppercase leading-tight text-brand-green">
                  {site.slogan}
                </p>
              </div>
            </div>
          </Reveal>

          {values.map((value, index) => (
            <Reveal key={value.title} variant="right" delay={(index + 1) * 80}>
              <div className="card flex items-start gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-green-light text-brand-green-dark">
                  <Icon name={value.icon} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase text-brand-navy">{value.title}</h3>
                  <p className="text-sm text-slate-600">{value.text}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal variant="right" delay={320}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/assembleia.jpg"
                alt="Assembleia da categoria"
                fill
                className="object-cover transition duration-700 hover:scale-105"
                sizes="(min-width: 1024px) 340px, 100vw"
              />
            </div>
          </Reveal>

          <div className="card p-5">
            <p className="font-display text-lg font-semibold uppercase text-brand-navy">Dossiê histórico</p>
            <p className="mt-1 text-sm text-slate-600">
              A história completa do sindicato em um documento para ler, imprimir e compartilhar.
            </p>
            <PdfActions href={`${base}/pdf/historia`} label="o dossiê histórico" tone="light" className="mt-4" />
          </div>

          <Link href={`${base}/filie-se`} className="btn-primary">
            Faça parte desta história
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </>
  );
}
