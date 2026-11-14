"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pausa as animações contínuas (bolhas, ondas, cáusticas, flutuações…) das
 * seções que estão fora da tela e as retoma quando voltam a aparecer.
 * O visitante não percebe diferença, mas o navegador deixa de redesenhar o
 * que ninguém está vendo — é o que mais alivia a rolagem em celulares.
 * A regra CSS correspondente (.fx-paused) fica em globals.css.
 */
export function FxPause() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle("fx-paused", !entry.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    const scan = () => document.querySelectorAll("main section, footer").forEach((el) => observer.observe(el));
    scan();
    // Conteúdo que chega depois (streaming) também entra na observação.
    const late = window.setTimeout(scan, 800);
    return () => {
      window.clearTimeout(late);
      observer.disconnect();
      document.querySelectorAll(".fx-paused").forEach((el) => el.classList.remove("fx-paused"));
    };
  }, [pathname]);

  return null;
}
