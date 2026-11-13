import Image from "next/image";
import type { PhotoSlotInfo } from "@/data/historia";

export type Photos = Record<string, string | null>;

/**
 * Espaço de fotografia com finalidade narrativa.
 * - Com arquivo em /public/historia → mostra a foto real.
 * - Sem arquivo → placa identificada ("Foto do acervo a inserir") dizendo
 *   exatamente qual imagem deve entrar ali.
 */
export function PhotoSlot({
  slot,
  photos,
  tone = "color",
  variant = "frame",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  slot: PhotoSlotInfo;
  photos: Photos;
  tone?: "archive" | "faded" | "color";
  /** frame = moldura com etiqueta; ambient = fundo de tela, etiqueta discreta */
  variant?: "frame" | "ambient";
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = photos[slot.file] ?? null;

  return (
    <figure className={`photo-slot tone-${tone} variant-${variant} ${className}`} data-empty={src ? undefined : "true"}>
      {src ? (
        <Image src={src} alt={slot.alt} fill sizes={sizes} priority={priority} className="photo-slot__img" />
      ) : (
        <div className="photo-slot__placeholder" role="img" aria-label={`Espaço reservado: ${slot.label}`}>
          <span className="photo-slot__tag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
            Foto do acervo a inserir
          </span>
          {variant === "frame" ? (
            <span className="photo-slot__info">
              <span className="photo-slot__label">{slot.label}</span>
              <span className="photo-slot__purpose">{slot.purpose}</span>
              <code className="photo-slot__file">public/historia/{slot.file}.jpg</code>
            </span>
          ) : (
            <span className="photo-slot__label-ambient">{slot.label}</span>
          )}
        </div>
      )}
      <span className="photo-slot__grain" aria-hidden="true" />
    </figure>
  );
}
