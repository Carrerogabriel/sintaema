"use client";

import { FormEvent, useState } from "react";
import { site } from "@/data/content";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("nome") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("assunto") ?? "Contato pelo blog");
    const message = String(data.get("mensagem") ?? "");
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="rounded-xl bg-green-50 p-6 text-brand-green-dark">
        Se o seu programa de e-mail abriu, basta enviar a mensagem. Caso contrário, escreva para{" "}
        {site.email}.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl bg-white p-6 shadow-card md:p-8">
      <label className="grid gap-1 text-sm">
        Nome
        <input
          name="nome"
          required
          className="rounded border border-slate-200 px-3 py-2 outline-none ring-brand-blue focus:ring-2"
        />
      </label>
      <label className="grid gap-1 text-sm">
        E-mail
        <input
          name="email"
          type="email"
          required
          className="rounded border border-slate-200 px-3 py-2 outline-none ring-brand-blue focus:ring-2"
        />
      </label>
      <label className="grid gap-1 text-sm">
        Assunto
        <select
          name="assunto"
          className="rounded border border-slate-200 px-3 py-2 outline-none ring-brand-blue focus:ring-2"
        >
          <option>Fale conosco</option>
          <option>Filiação</option>
          <option>Plantão jurídico</option>
          <option>Ouvidoria</option>
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        Mensagem
        <textarea
          name="mensagem"
          required
          rows={6}
          className="rounded border border-slate-200 px-3 py-2 outline-none ring-brand-blue focus:ring-2"
        />
      </label>
      <button
        type="submit"
        className="w-fit bg-brand-green px-5 py-3 font-bold uppercase text-white hover:bg-brand-green-dark"
      >
        Enviar
      </button>
    </form>
  );
}
