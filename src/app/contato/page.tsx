import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/content";

export const metadata = { title: "Contato" };

export default function ContactPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        <header className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            Fale conosco
          </p>
          <h1 className="mt-1 font-display text-4xl uppercase text-brand-navy">Contato</h1>
        </header>
        <ContactForm />
      </div>
      <aside className="h-fit rounded-xl bg-white p-6 shadow-card">
        <h2 className="font-display text-2xl uppercase text-brand-navy">Sede</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {site.address}
          <br />
          CEP {site.cep}
          <br />
          {site.city}
        </p>
        <p className="mt-4 text-sm">
          Telefone:{" "}
          <a className="font-semibold text-brand-blue" href="tel:+554832243868">
            {site.phone}
          </a>
        </p>
        <p className="mt-2 text-sm">
          E-mail:{" "}
          <a className="font-semibold text-brand-blue" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <p className="mt-4 text-sm text-slate-600">Horário: {site.hours}</p>
      </aside>
    </div>
  );
}
