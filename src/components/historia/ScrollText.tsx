"use client";

import { useRef, type CSSProperties, type ElementType } from "react";
import { createElement } from "react";
import { useScrollVar } from "./motion";

/**
 * Parágrafo que "acende" palavra por palavra conforme a rolagem — o ritmo
 * de leitura acompanha o gesto do visitante.
 */
export function ScrollText({
  text,
  as = "p",
  className = "",
  highlight = [],
  highlightClassName = "",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  highlight?: string[];
  highlightClassName?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollVar(ref, { mode: "view" });
  const words = text.split(" ");
  return createElement(
    as,
    { ref, className, "aria-label": text, style: { "--n": words.length } as CSSProperties },
    words.map((word, i) => (
      <span
        key={i}
        aria-hidden="true"
        className={`scroll-text__word ${highlight.some((h) => word.toLowerCase().includes(h.toLowerCase())) ? highlightClassName : ""}`}
        style={{ "--i": i } as CSSProperties}
      >
        {word}{" "}
      </span>
    )),
  );
}
