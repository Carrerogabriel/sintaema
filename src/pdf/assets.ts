import fs from "node:fs";
import path from "node:path";
import { Font } from "@react-pdf/renderer";
import sharp from "sharp";

/* ------------------------------------------------------------------ */
/* Fontes                                                              */
/* ------------------------------------------------------------------ */

const fontDir = (pkg: string) => path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files");

let fontsReady = false;

/** Registra as fontes uma única vez (Oswald para títulos, Source Serif para o texto). */
export function registerFonts() {
  if (fontsReady) return;
  const serif = fontDir("source-serif-4");
  const oswald = fontDir("oswald");

  Font.register({
    family: "Serif",
    fonts: [
      { src: path.join(serif, "source-serif-4-latin-400-normal.woff"), fontWeight: 400 },
      { src: path.join(serif, "source-serif-4-latin-400-italic.woff"), fontWeight: 400, fontStyle: "italic" },
      { src: path.join(serif, "source-serif-4-latin-600-normal.woff"), fontWeight: 600 },
      { src: path.join(serif, "source-serif-4-latin-600-italic.woff"), fontWeight: 600, fontStyle: "italic" },
      { src: path.join(serif, "source-serif-4-latin-700-normal.woff"), fontWeight: 700 },
    ],
  });
  Font.register({
    family: "Display",
    fonts: [
      { src: path.join(oswald, "oswald-latin-400-normal.woff"), fontWeight: 400 },
      { src: path.join(oswald, "oswald-latin-500-normal.woff"), fontWeight: 500 },
      { src: path.join(oswald, "oswald-latin-600-normal.woff"), fontWeight: 600 },
    ],
  });
  // Sem hifenização automática (o padrão é para inglês e quebra mal o português).
  Font.registerHyphenationCallback((word) => [word]);
  fontsReady = true;
}

/* ------------------------------------------------------------------ */
/* Imagens                                                             */
/* ------------------------------------------------------------------ */

/** Tratamento aplicado à foto: cor natural, preto e branco ou sépia (arquivo). */
export type PhotoTone = "color" | "mono" | "sepia";

export type PdfImage = { data: Buffer; format: "jpg"; width: number; height: number };

const cache = new Map<string, Promise<PdfImage | null>>();

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

/** Resolve um caminho público ("/images/x.jpg" ou "/historia/nome" sem extensão). */
function resolvePublic(publicPath: string) {
  const base = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (path.extname(base) && fs.existsSync(base)) return base;
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(base + ext)) return base + ext;
  }
  return null;
}

/**
 * Carrega uma imagem de /public, reduz para resolução de impressão
 * (~1600 px) e aplica o tom pedido. Retorna null se o arquivo não existir.
 */
export function loadImage(publicPath: string, tone: PhotoTone = "color"): Promise<PdfImage | null> {
  const key = `${publicPath}|${tone}`;
  let pending = cache.get(key);
  if (!pending) {
    pending = (async () => {
      const file = resolvePublic(publicPath);
      if (!file) return null;
      let pipeline = sharp(file).rotate().resize({ width: 1600, withoutEnlargement: true });
      if (tone === "mono") pipeline = pipeline.grayscale().modulate({ brightness: 1.02 });
      if (tone === "sepia") pipeline = pipeline.grayscale().tint({ r: 150, g: 118, b: 82 });
      const { data, info } = await pipeline
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer({ resolveWithObject: true });
      return { data, format: "jpg" as const, width: info.width, height: info.height };
    })().catch(() => null);
    cache.set(key, pending);
  }
  return pending;
}
