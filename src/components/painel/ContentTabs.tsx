import Link from "next/link";
import { Icon, type IconName } from "../Icon";

const tabs: Array<{ key: string; href: string; label: string; icon: IconName }> = [
  { key: "noticias", href: "/painel/conteudo", label: "Notícias", icon: "file" },
  { key: "agenda", href: "/painel/conteudo/agenda", label: "Agenda", icon: "calendar" },
  { key: "informativos", href: "/painel/conteudo/informativos", label: "Informativos", icon: "megaphone" },
];

export function ContentHeader({
  active,
  title,
  description,
  action,
}: {
  active: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-brand-green">Conteúdo do portal</p>
          <h1 className="mt-2 font-display text-4xl font-semibold uppercase text-brand-navy">{title}</h1>
          <p className="mt-1 text-slate-600">{description}</p>
        </div>
        {action}
      </div>
      <nav aria-label="Tipo de conteúdo" className="no-scrollbar mt-6 flex gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-card ring-1 ring-brand-navy/5 sm:w-fit">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isActive ? "bg-brand-navy text-white shadow-md" : "text-brand-navy hover:bg-brand-sand"
              }`}
            >
              <Icon name={tab.icon} className="h-4 w-4" />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
