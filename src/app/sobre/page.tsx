import { site } from "@/data/content";

export const metadata = { title: "O sindicato" };

export default function AboutPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <article className="rounded-xl bg-white p-6 shadow-card md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
          Histórico
        </p>
        <h1 className="mt-2 font-display text-4xl uppercase text-brand-navy">
          Sonhos, lutas e conquistas
        </h1>
        <div className="prose-sintaema mt-6 max-w-3xl text-[17px] leading-7 text-slate-700">
          <p>
            Na década de 1970, em plena ditadura militar, um grupo da categoria começou a se
            organizar de forma clandestina. Em 1975 nasceu a Associação dos Servidores da Casan.
            Em 9 de novembro de 1977 foi fundado o sindicato que hoje é o SINTAEMA-SC.
          </p>
          <p>
            Com o fim da ditadura, a entidade enfrentou greves, listas de demissão, disputa por
            planos de carreira e de saúde, terceirizações e tentativas de venda de ações da CASAN.
            A partir de 2002, a luta contra a privatização da água e o desmonte da empresa pública
            passou ao centro da ação sindical.
          </p>
          <p>
            O SINTAEMA não se limita às pautas corporativas. Atua com movimentos sociais,
            manifestações, debates e propostas de gestão compartilhada, sempre combinando direitos
            imediatos da categoria com o interesse da população pelo saneamento público.
          </p>
          <p>
            A história do sindicato tem a marca de cada trabalhadora e trabalhador que ousou se
            organizar. A vida segue e a luta continua.
          </p>
        </div>
      </article>
      <aside className="h-fit rounded-xl bg-brand-navy p-6 text-sky-50">
        <h2 className="font-display text-2xl uppercase text-white">Identidade</h2>
        <p className="mt-3 text-sm">{site.fullName}</p>
        <p className="mt-4 text-sm">Fundação: 9 de novembro de 1977</p>
        <p className="mt-2 text-sm">Sede: {site.city}</p>
        <p className="mt-6 font-display text-2xl uppercase text-brand-cyan">{site.slogan}</p>
      </aside>
    </div>
  );
}
