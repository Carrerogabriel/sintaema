import Link from "next/link";
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

export default function JoinPage() {
  return (
    <div className="grid gap-8">
      <section className="rounded-xl bg-gradient-to-r from-brand-navy to-brand-blue p-8 text-white md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200">Campanha</p>
        <h1 className="mt-2 font-display text-4xl uppercase md:text-5xl">Filie-se ao Sintaema</h1>
        <p className="mt-4 max-w-2xl text-sky-50">
          Para organizar, defender e expandir a luta sindical. Cada direito conquistado foi fruto
          de muita luta. Faça parte.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-xl bg-white p-6 shadow-card">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-green font-display text-xl text-white">
              {index + 1}
            </span>
            <h2 className="mt-4 font-display text-2xl uppercase text-brand-navy">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl bg-white p-6 shadow-card md:p-10">
        <h2 className="font-display text-3xl uppercase text-brand-navy">Por que se filiar?</h2>
        <ul className="mt-4 grid gap-3 text-slate-700">
          <li>Defesa jurídica e acompanhamento de direitos trabalhistas.</li>
          <li>Informação permanente sobre campanhas, ACTs e condições de trabalho.</li>
          <li>Organização contra privatização, municipalização e precarização.</li>
          <li>Voz nas assembleias, congressos e locais de trabalho.</li>
        </ul>
        <Link
          href="/contato"
          className="mt-6 inline-block bg-brand-green px-5 py-3 font-bold uppercase text-white hover:bg-brand-green-dark"
        >
          Quero me filiar
        </Link>
      </section>
    </div>
  );
}
