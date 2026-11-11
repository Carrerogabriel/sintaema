import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/content";

export const metadata = { title: "O sindicato" };

const timeline = [
  {
    year: "Anos 1970",
    title: "Organização na clandestinidade",
    text: "Em plena ditadura militar, um grupo da categoria começa a se organizar de forma clandestina.",
  },
  {
    year: "1975",
    title: "Associação dos Servidores da Casan",
    text: "Nasce a associação que daria origem à entidade sindical.",
  },
  {
    year: "1977",
    title: "Fundação do sindicato",
    text: "Em 9 de novembro é fundado o sindicato que hoje é o SINTAEMA-SC.",
  },
  {
    year: "Redemocratização",
    title: "Greves e conquistas",
    text: "Greves, listas de demissão, disputa por planos de carreira e de saúde, terceirizações e tentativas de venda de ações da CASAN.",
  },
  {
    year: "2002",
    title: "Contra a privatização da água",
    text: "A luta contra a privatização e o desmonte da empresa pública passa ao centro da ação sindical.",
  },
  {
    year: "2026",
    title: "1º Congresso do SINTAEMA-SC",
    text: "Estatuto atualizado, tese aprovada e um plano de lutas com 20 pontos para as próximas batalhas.",
  },
];

const values = [
  { icon: "drop" as const, title: "Água é direito", text: "Saneamento público, universal e com tarifa justa." },
  { icon: "users" as const, title: "Unidade", text: "Organização de base em todas as regionais do estado." },
  { icon: "shield" as const, title: "Defesa", text: "Direitos imediatos da categoria e interesse da população." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Histórico"
        title="Sonhos, lutas e conquistas"
        description="Desde 1977 organizando trabalhadoras e trabalhadores em água, esgoto e meio ambiente de Santa Catarina."
        crumbs={[{ label: "O Sindicato" }]}
      />

      <div className="container-site -mt-6 grid gap-10 md:-mt-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-10">
          <Reveal>
            <div className="card relative z-10 p-6 sm:p-10">
              <div className="prose-sintaema">
                <p>
                  Na década de 1970, em plena ditadura militar, um grupo da categoria começou a se
                  organizar de forma clandestina. Em 1975 nasceu a Associação dos Servidores da
                  Casan. Em 9 de novembro de 1977 foi fundado o sindicato que hoje é o SINTAEMA-SC.
                </p>
                <p>
                  Com o fim da ditadura, a entidade enfrentou greves, listas de demissão, disputa
                  por planos de carreira e de saúde, terceirizações e tentativas de venda de ações
                  da CASAN. A partir de 2002, a luta contra a privatização da água e o desmonte da
                  empresa pública passou ao centro da ação sindical.
                </p>
                <p>
                  O SINTAEMA não se limita às pautas corporativas. Atua com movimentos sociais,
                  manifestações, debates e propostas de gestão compartilhada, sempre combinando
                  direitos imediatos da categoria com o interesse da população pelo saneamento
                  público.
                </p>
                <p>
                  A história do sindicato tem a marca de cada trabalhadora e trabalhador que ousou
                  se organizar. A vida segue e a luta continua.
                </p>
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

          <Link href="/filie-se" className="btn-primary">
            Faça parte desta história
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </>
  );
}
