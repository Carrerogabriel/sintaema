import Link from "next/link";
import { Icon } from "@/components/Icon";
import { companies } from "@/data/companies";
import { requireUser } from "@/server/auth";
import { PostForm } from "../PostForm";

export const metadata = { title: "Nova notícia" };

export default async function NewPostPage() {
  await requireUser("jornalista");
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 animate-fade-up">
        <Link href="/painel/conteudo" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-navy">
          <Icon name="arrowLeft" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Notícias
        </Link>
        <h1 className="mt-2 font-display text-4xl font-semibold uppercase text-brand-navy">Nova notícia</h1>
      </header>
      <PostForm
        companies={companies}
        values={{
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "Notícias",
          date: today,
          image: "",
          imageAlt: "",
          featured: false,
          companies: [],
          status: "publicado",
        }}
      />
    </div>
  );
}
