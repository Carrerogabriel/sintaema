import { Icon } from "./Icon";

/**
 * Par de ações "Ver em PDF" / "Baixar PDF" para qualquer conteúdo do portal.
 * `href` aponta para a rota /[empresa]/pdf/... (ver src/pdf/build.ts).
 */
export function PdfActions({
  href,
  label = "PDF",
  tone = "dark",
  className = "",
}: {
  href: string;
  /** Nome curto do documento, usado no texto acessível. */
  label?: string;
  /** "dark" para fundos escuros (heros), "light" para fundos claros. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const separator = href.includes("?") ? "&" : "?";
  const view =
    tone === "dark"
      ? "border border-white/30 text-white hover:border-white hover:bg-white/10"
      : "bg-white text-brand-navy shadow-card ring-1 ring-brand-navy/10 hover:shadow-card-hover";
  const download =
    tone === "dark"
      ? "bg-white text-brand-navy shadow-card hover:shadow-card-hover"
      : "bg-brand-navy text-white hover:bg-brand-navy-light";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${view}`}
        aria-label={`Visualizar ${label} em PDF (abre em nova aba)`}
      >
        <Icon name="file" className="h-4 w-4" />
        Ver em PDF
      </a>
      <a
        href={`${href}${separator}download=1`}
        download
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${download}`}
        aria-label={`Baixar ${label} em PDF`}
      >
        <Icon name="download" className="h-4 w-4" />
        Baixar PDF
      </a>
    </div>
  );
}
