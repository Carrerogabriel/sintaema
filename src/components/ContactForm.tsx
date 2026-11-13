"use client";

import { FormEvent, useState } from "react";
import { site } from "@/data/content";
import { Icon } from "./Icon";

const subjects = ["Fale conosco", "Filiação", "Plantão jurídico", "Ouvidoria"];

export function ContactForm({ companyName }: { companyName?: string }) {
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState(subjects[0]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("nome") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("mensagem") ?? "");
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\n${message}`);
    const fullSubject = companyName ? `[${companyName}] ${subject}` : subject;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(fullSubject)}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card animate-scale-in p-8 text-center sm:p-12">
        <span className="relative mx-auto grid h-20 w-20 place-items-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-green/30" />
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-brand-green text-white">
            <Icon name="check" className="h-9 w-9" strokeWidth={2.5} />
          </span>
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold uppercase text-brand-navy">Quase lá!</h2>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          Se o seu programa de e-mail abriu, basta enviar a mensagem. Caso contrário, escreva para{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-blue">
            {site.email}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn-secondary mt-6">
          Escrever outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-5 p-6 sm:p-8 md:p-10">
      <div>
        <h2 className="font-display text-2xl font-semibold uppercase text-brand-navy">Envie sua mensagem</h2>
        <p className="mt-1 text-sm text-slate-500">Respondemos em horário comercial.</p>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-brand-navy">Assunto</legend>
        <div className="flex flex-wrap gap-2">
          {subjects.map((item) => (
            <label
              key={item}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-blue/30 ${
                subject === item
                  ? "bg-brand-navy text-white shadow-md"
                  : "bg-brand-sand text-brand-navy hover:bg-brand-water"
              }`}
            >
              <input
                type="radio"
                name="assunto"
                value={item}
                checked={subject === item}
                onChange={() => setSubject(item)}
                className="sr-only"
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          Nome
          <input name="nome" required autoComplete="name" placeholder="Seu nome completo" className="input" />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          E-mail
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="voce@exemplo.com"
            className="input"
          />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
        Mensagem
        <textarea
          name="mensagem"
          required
          rows={6}
          placeholder="Escreva sua mensagem"
          className="input resize-y"
        />
      </label>
      <button type="submit" className="btn-primary group w-full sm:w-fit">
        Enviar mensagem
        <Icon name="send" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
