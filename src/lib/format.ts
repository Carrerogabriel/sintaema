import type { Category, Post } from "@/data/content";

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

export function formatShortDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  return {
    day: new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("pt-BR", { month: "short" })
      .format(date)
      .replace(".", ""),
    year: String(date.getFullYear()),
  };
}

export function readingTime(post: Post) {
  const words = [post.title, post.excerpt, ...post.content].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const categoryStyles: Record<Category, string> = {
  Notícias: "bg-brand-blue text-white",
  Lutas: "bg-red-600 text-white",
  Eleições: "bg-amber-500 text-brand-navy-dark",
  Jurídico: "bg-violet-600 text-white",
  Agenda: "bg-brand-green text-white",
};
