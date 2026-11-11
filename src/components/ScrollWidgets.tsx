"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

/** Floating button that appears after scrolling and returns to the top. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className={`fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-brand-navy text-white shadow-card-hover transition-all duration-500 hover:-translate-y-1 hover:bg-brand-green md:bottom-8 md:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <Icon name="arrowUp" />
    </button>
  );
}

/** Thin bar at the top of the viewport showing reading progress. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-brand-green via-brand-cyan to-brand-blue"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
