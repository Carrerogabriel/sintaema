import type { CSSProperties } from "react";
import type { CompanyColors } from "@/data/companies";

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: RGB, b: RGB, amount: number): RGB {
  return a.map((v, i) => Math.round(v + (b[i] - v) * amount)) as RGB;
}

const WHITE: RGB = [255, 255, 255];
const BLACK: RGB = [0, 0, 0];
const channels = (c: RGB) => c.join(" ");

function luminance(c: RGB) {
  const [r, g, b] = c.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastWithWhite(c: RGB) {
  return 1.05 / (luminance(c) + 0.05);
}

/** Darkens a color step by step until it reaches `min` contrast against white. */
function readableOnWhite(c: RGB, min: number): RGB {
  let out = c;
  for (let step = 1; step <= 20 && contrastWithWhite(out) < min; step++) {
    out = mix(c, BLACK, step * 0.04);
  }
  return out;
}

/** Builds the CSS custom properties consumed by the Tailwind `brand-*` colors. */
export function themeVars(colors: CompanyColors): CSSProperties {
  const primary = hexToRgb(colors.primary);
  // Buttons carry white bold text; links/icons sit on white. Light brand
  // colors are darkened just enough to stay legible there. The original
  // secondary is still used for highlights on dark backgrounds and tints.
  const accent = readableOnWhite(hexToRgb(colors.accent), 3);
  const brandSecondary = hexToRgb(colors.secondary);
  const secondary = readableOnWhite(brandSecondary, 4.5);

  return {
    "--c-primary": channels(primary),
    "--c-primary-dark": channels(mix(primary, BLACK, 0.4)),
    "--c-primary-light": channels(mix(primary, WHITE, 0.15)),
    "--c-accent": channels(accent),
    "--c-accent-dark": channels(mix(accent, BLACK, 0.18)),
    "--c-accent-light": channels(mix(accent, WHITE, 0.9)),
    "--c-secondary": channels(secondary),
    "--c-highlight": channels(mix(brandSecondary, WHITE, 0.2)),
    "--c-tint": channels(mix(brandSecondary, WHITE, 0.85)),
    "--c-surface": channels(mix(brandSecondary, WHITE, 0.95)),
    "--c-ink": channels(mix(primary, BLACK, 0.1)),
  } as CSSProperties;
}
