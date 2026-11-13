"use client";

import Link from "next/link";
import { useRef, useState, type DragEvent } from "react";
import { Icon } from "@/components/Icon";
import { FileBadge } from "@/components/painel/FileBadge";
import type { Company } from "@/data/companies";
import { formatBytes } from "@/lib/panel-format";

type Item = {
  key: string;
  file: File;
  title: string;
  year: string;
  edition: string;
  status: "fila" | "enviando" | "ok" | "erro";
  progress: number;
  error?: string;
};

const CONCURRENCY = 3;

function guessYear(name: string) {
  return /(19[7-9]\d|20\d\d)/.exec(name)?.[1] ?? "";
}
function guessEdition(name: string) {
  const match = /(?:ed(?:i[cç][aã]o)?|n[ºo°]?)[\s._-]*(\d{1,5})/i.exec(name);
  return match ? `Edição ${match[1]}` : "";
}
function cleanTitle(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[_]+/g, " ").replace(/\s+/g, " ").trim();
}

function send(item: Item, shared: Record<string, string>, onProgress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const form = new FormData();
    form.append("arquivo", item.file);
    form.append("titulo", item.title);
    form.append("ano", item.year);
    form.append("edicao", item.edition);
    for (const [k, v] of Object.entries(shared)) form.append(k, v);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/painel/acervo/upload");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) return resolve();
      let message = "Falha no envio.";
      try {
        message = JSON.parse(xhr.responseText).error ?? message;
      } catch {}
      reject(new Error(message));
    };
    xhr.onerror = () => reject(new Error("Sem conexão com o servidor."));
    xhr.send(form);
  });
}

export function Uploader({ types, companies }: { types: readonly string[]; companies: Company[] }) {
  const [items, setItems] = useState<Item[]>([]);
  const [dragging, setDragging] = useState(false);
  const [running, setRunning] = useState(false);
  const [shared, setShared] = useState({ tipo: "", empresa: "", data: "", tags: "", descricao: "" });
  const inputRef = useRef<HTMLInputElement>(null);

  const update = (key: string, patch: Partial<Item>) =>
    setItems((list) => list.map((item) => (item.key === key ? { ...item, ...patch } : item)));

  function addFiles(files: FileList | File[]) {
    const next = Array.from(files).map((file) => ({
      key: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      title: cleanTitle(file.name),
      year: guessYear(file.name),
      edition: guessEdition(file.name),
      status: "fila" as const,
      progress: 0,
    }));
    setItems((list) => [...list, ...next]);
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files);
  }

  async function start() {
    if (!shared.tipo) {
      alert("Escolha o tipo de documento antes de enviar.");
      return;
    }
    setRunning(true);
    const queue = items.filter((item) => item.status === "fila" || item.status === "erro");
    let index = 0;
    const worker = async () => {
      while (index < queue.length) {
        const item = queue[index++];
        update(item.key, { status: "enviando", progress: 0, error: undefined });
        try {
          await send(item, shared, (progress) => update(item.key, { progress }));
          update(item.key, { status: "ok", progress: 100 });
        } catch (error) {
          update(item.key, { status: "erro", error: (error as Error).message });
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, queue.length) }, worker));
    setRunning(false);
  }

  const pending = items.filter((i) => i.status === "fila" || i.status === "erro").length;
  const done = items.filter((i) => i.status === "ok").length;
  const failed = items.filter((i) => i.status === "erro").length;
  const totalSize = items.reduce((sum, i) => sum + i.file.size, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
      {/* Shared metadata */}
      <aside className="card grid h-fit animate-fade-up gap-4 p-5 lg:sticky lg:top-6">
        <div>
          <h2 className="font-display text-xl font-semibold uppercase text-brand-navy">Informações do lote</h2>
          <p className="text-xs text-slate-500">Valem para todos os arquivos deste envio.</p>
        </div>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          Tipo de documento *
          <select
            value={shared.tipo}
            onChange={(e) => setShared({ ...shared, tipo: e.target.value })}
            className={`input !py-2.5 ${!shared.tipo && items.length ? "ring-2 ring-amber-300" : ""}`}
          >
            <option value="">Escolha…</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          Empresa
          <select value={shared.empresa} onChange={(e) => setShared({ ...shared, empresa: e.target.value })} className="input !py-2.5">
            <option value="">Geral (sindicato)</option>
            {companies.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          Data do documento
          <input type="date" value={shared.data} onChange={(e) => setShared({ ...shared, data: e.target.value })} className="input !py-2.5" />
          <span className="text-xs font-normal text-slate-500">Opcional. Sem data, usamos o ano de cada arquivo.</span>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          Palavras-chave
          <input
            value={shared.tags}
            onChange={(e) => setShared({ ...shared, tags: e.target.value })}
            placeholder="Ex.: greve, ACT, plano de saúde"
            className="input !py-2.5"
          />
          <span className="text-xs font-normal text-slate-500">Separe por vírgulas. Ajudam muito na busca.</span>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-brand-navy">
          Descrição
          <textarea
            rows={3}
            value={shared.descricao}
            onChange={(e) => setShared({ ...shared, descricao: e.target.value })}
            placeholder="Do que tratam esses documentos?"
            className="input resize-y"
          />
        </label>
      </aside>

      {/* Files */}
      <section className="grid h-fit gap-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          className={`grid animate-fade-up cursor-pointer place-items-center rounded-3xl border-2 border-dashed p-10 text-center transition ${
            dragging ? "scale-[1.01] border-brand-green bg-brand-green-light" : "border-slate-300 bg-white/70 hover:border-brand-blue hover:bg-white"
          }`}
        >
          <span className={`grid h-16 w-16 place-items-center rounded-2xl transition ${dragging ? "bg-brand-green text-white" : "bg-brand-sand text-brand-blue"}`}>
            <Icon name="upload" className="h-7 w-7" />
          </span>
          <p className="mt-4 font-display text-xl font-semibold uppercase text-brand-navy">
            Arraste os arquivos aqui
          </p>
          <p className="text-sm text-slate-500">ou clique para escolher — pode selecionar vários de uma vez</p>
          <p className="mt-2 text-xs text-slate-400">PDF, Word, Excel, imagens, áudio, vídeo e ZIP · até 200 MB cada</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="sr-only"
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        {items.length > 0 ? (
          <div className="card animate-fade-up overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
              <p className="text-sm font-semibold text-brand-navy">
                {items.length} arquivo{items.length === 1 ? "" : "s"} · {formatBytes(totalSize)}
                {done ? <span className="ml-2 text-brand-green-dark">· {done} enviado{done === 1 ? "" : "s"}</span> : null}
                {failed ? <span className="ml-2 text-red-600">· {failed} com erro</span> : null}
              </p>
              <div className="flex gap-2">
                {!running && done < items.length ? (
                  <button type="button" onClick={() => setItems((l) => l.filter((i) => i.status === "ok"))} className="rounded-full px-3 py-2 text-sm font-semibold text-slate-500 hover:text-red-600">
                    Limpar fila
                  </button>
                ) : null}
                {pending > 0 ? (
                  <button type="button" onClick={start} disabled={running} className="btn-primary !py-2.5 disabled:opacity-60">
                    <Icon name="upload" className="h-4 w-4" />
                    {running ? "Enviando…" : `Enviar ${pending} arquivo${pending === 1 ? "" : "s"}`}
                  </button>
                ) : (
                  <Link href="/painel/acervo?ordem=enviados" className="btn-primary !py-2.5">
                    Ver no acervo
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
            <ul className="max-h-[60vh] divide-y divide-slate-100 overflow-y-auto">
              {items.map((item) => {
                const locked = item.status === "enviando" || item.status === "ok";
                return (
                  <li key={item.key} className="relative grid gap-3 p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
                    {item.status === "enviando" ? (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-green transition-transform" style={{ transform: `scaleX(${item.progress / 100})` }} />
                    ) : null}
                    <FileBadge fileName={item.file.name} size="sm" />
                    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_7rem_6rem]">
                      <input
                        value={item.title}
                        disabled={locked}
                        onChange={(e) => update(item.key, { title: e.target.value })}
                        aria-label="Título"
                        className="input !py-2 text-sm disabled:bg-slate-50"
                      />
                      <input
                        value={item.edition}
                        disabled={locked}
                        onChange={(e) => update(item.key, { edition: e.target.value })}
                        placeholder="Edição"
                        aria-label="Edição"
                        className="input !px-3 !py-2 text-sm disabled:bg-slate-50"
                      />
                      <input
                        value={item.year}
                        disabled={locked}
                        onChange={(e) => update(item.key, { year: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                        placeholder="Ano"
                        inputMode="numeric"
                        aria-label="Ano"
                        className="input !px-3 !py-2 text-sm disabled:bg-slate-50"
                      />
                      <p className="truncate text-xs text-slate-400 sm:col-span-3">
                        {item.file.name} · {formatBytes(item.file.size)}
                        {item.error ? <span className="ml-1 font-semibold text-red-600">— {item.error}</span> : null}
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      {item.status === "ok" ? (
                        <span className="grid h-8 w-8 animate-scale-in place-items-center rounded-full bg-brand-green text-white">
                          <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                        </span>
                      ) : item.status === "enviando" ? (
                        <span className="text-sm font-semibold tabular-nums text-brand-blue">{item.progress}%</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setItems((l) => l.filter((i) => i.key !== item.key))}
                          disabled={running}
                          aria-label="Remover da fila"
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Icon name="close" className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}
