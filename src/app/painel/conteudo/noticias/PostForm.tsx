"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Icon } from "@/components/Icon";
import { CompanySelect } from "@/components/painel/CompanySelect";
import type { Company } from "@/data/companies";
import { categories } from "@/data/site";
import { savePostAction } from "../actions";

export type PostFormValues = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  companies: string[];
  status: "publicado" | "rascunho";
};

function SaveButtons({ isNew }: { isNew: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
      <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
      {pending ? "Salvando…" : isNew ? "Salvar matéria" : "Salvar alterações"}
    </button>
  );
}

export function PostForm({ values, companies }: { values: PostFormValues; companies: Company[] }) {
  const [state, action] = useActionState(savePostAction, undefined);
  const [preview, setPreview] = useState<string | null>(values.image || null);
  const [removeImage, setRemoveImage] = useState(false);
  const [excerpt, setExcerpt] = useState(values.excerpt);
  const [content, setContent] = useState(values.content);
  const [status, setStatus] = useState(values.status);
  const isNew = !values.id;

  useEffect(() => {
    if (state?.error) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state]);

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim()).length;

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}

      {state?.error ? (
        <p role="alert" className="flex animate-fade-up items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200 lg:col-span-2">
          <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
          {state.error}
        </p>
      ) : null}

      {/* Main column */}
      <div className="card grid animate-fade-up gap-5 p-5 sm:p-7">
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold text-brand-navy">Título</span>
          <input
            name="titulo"
            required
            defaultValue={values.title}
            placeholder="Escreva um título claro e direto"
            className="input font-display !text-xl font-medium sm:!text-2xl"
          />
        </label>

        <label className="grid gap-1.5">
          <span className="flex items-center justify-between text-sm font-semibold text-brand-navy">
            Resumo
            <span className={`text-xs font-normal ${excerpt.length > 240 ? "text-amber-600" : "text-slate-400"}`}>
              {excerpt.length}/240
            </span>
          </span>
          <textarea
            name="resumo"
            rows={2}
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            placeholder="Uma ou duas frases que aparecem nos cards e no topo da matéria"
            className="input resize-y"
          />
        </label>

        <label className="grid gap-1.5">
          <span className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-brand-navy">
            Texto da matéria
            <span className="text-xs font-normal text-slate-400">
              {words} palavras · {paragraphs} parágrafo{paragraphs === 1 ? "" : "s"}
            </span>
          </span>
          <textarea
            name="texto"
            required
            rows={16}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={"Escreva o texto aqui.\n\nDeixe uma linha em branco entre um parágrafo e outro."}
            className="input resize-y font-[inherit] leading-relaxed"
          />
          <span className="flex items-center gap-1.5 text-xs font-normal text-slate-500">
            <Icon name="alert" className="h-3.5 w-3.5" />
            Deixe uma linha em branco para separar os parágrafos.
          </span>
        </label>

        <details className="group rounded-xl bg-brand-sand/60 p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-brand-navy">
            Opções avançadas
            <Icon name="chevronDown" className="h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <label className="mt-3 grid gap-1.5 text-sm font-semibold text-brand-navy">
            Endereço da matéria (slug)
            <input name="slug" defaultValue={values.slug} placeholder="gerado a partir do título" className="input !py-2 font-mono text-sm" />
            <span className="text-xs font-normal text-slate-500">Deixe em branco para gerar automaticamente.</span>
          </label>
        </details>
      </div>

      {/* Side column */}
      <aside className="grid h-fit animate-fade-up gap-5 [animation-delay:100ms]">
        <section className="card grid gap-4 p-5">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-brand-navy">Situação</legend>
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
              {(["publicado", "rascunho"] as const).map((option) => (
                <label
                  key={option}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-center text-sm font-semibold transition ${
                    status === option ? "bg-white text-brand-navy shadow" : "text-slate-500 hover:text-brand-navy"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option}
                    checked={status === option}
                    onChange={() => setStatus(option)}
                    className="sr-only"
                  />
                  {option === "publicado" ? "Publicada" : "Rascunho"}
                </label>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              {status === "publicado" ? "Fica visível no site ao salvar." : "Só aparece aqui no painel."}
            </p>
          </fieldset>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
              Data
              <input name="data" type="date" required defaultValue={values.date} className="input !px-3 !py-2" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
              Categoria
              <select name="categoria" required defaultValue={values.category} className="input !px-3 !py-2">
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-amber-50 px-4 py-3 ring-1 ring-amber-200">
            <span>
              <span className="block text-sm font-bold text-brand-navy">Destaque da página inicial</span>
              <span className="block text-xs text-slate-500">Substitui o destaque atual</span>
            </span>
            <input type="checkbox" name="destaque" defaultChecked={values.featured} className="peer sr-only" />
            <span className="relative h-7 w-12 shrink-0 rounded-full bg-slate-300 transition peer-checked:bg-amber-500 peer-focus-visible:ring-4 peer-focus-visible:ring-amber-300 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5" />
          </label>

          <div className="hidden lg:block">
            <SaveButtons isNew={isNew} />
            <Link href="/painel/conteudo" className="mt-2 block text-center text-sm font-semibold text-slate-500 hover:text-brand-navy">
              Cancelar
            </Link>
          </div>
        </section>

        <section className="card grid gap-3 p-5">
          <span className="text-sm font-semibold text-brand-navy">Imagem de capa</span>
          <label className="group relative grid aspect-[16/10] cursor-pointer place-items-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-brand-sand/60 transition hover:border-brand-blue">
            {preview && !removeImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : null}
            <span
              className={`relative flex flex-col items-center gap-1 rounded-xl px-4 py-3 text-center text-xs font-semibold transition ${
                preview && !removeImage ? "bg-black/55 text-white opacity-0 group-hover:opacity-100" : "text-slate-500"
              }`}
            >
              <Icon name="upload" className="h-5 w-5" />
              {preview && !removeImage ? "Trocar imagem" : "Clique para escolher uma imagem"}
              <span className="font-normal opacity-80">JPG, PNG ou WebP · até 10 MB</span>
            </span>
            <input
              type="file"
              name="imagem"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setRemoveImage(false);
                }
              }}
            />
          </label>
          {values.image ? (
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <input
                type="checkbox"
                name="remover_imagem"
                checked={removeImage}
                onChange={(event) => setRemoveImage(event.target.checked)}
                className="h-4 w-4 accent-red-600"
              />
              Remover a imagem atual
            </label>
          ) : null}
          <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
            Legenda / descrição da imagem
            <input name="legenda" defaultValue={values.imageAlt} placeholder="Ex.: Assembleia na sede, em Florianópolis" className="input !py-2" />
          </label>
        </section>

        <section className="card p-5">
          <CompanySelect companies={companies} selected={values.companies} compact />
        </section>
      </aside>

      {/* Mobile sticky save bar */}
      <div className="sticky bottom-0 z-20 -mx-4 flex gap-2 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <Link href="/painel/conteudo" className="btn-secondary !px-4 ring-1 ring-slate-200">
          Cancelar
        </Link>
        <div className="flex-1">
          <SaveButtons isNew={isNew} />
        </div>
      </div>
    </form>
  );
}
