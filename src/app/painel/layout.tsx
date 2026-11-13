import { Suspense } from "react";
import { PanelNav, type NavItem } from "@/components/painel/PanelNav";
import { Flash } from "@/components/painel/ui";
import { requireUser, roleLabels, type Role } from "@/server/auth";
import { logoutAction } from "../entrar/actions";

export const metadata = { title: { default: "Painel", template: "%s | Painel SINTAEMA" } };
export const dynamic = "force-dynamic";

const allItems: Array<NavItem & { roles: Role[] }> = [
  {
    href: "/painel/admin",
    label: "Administração",
    icon: "shield",
    description: "Usuários e visão geral",
    roles: ["admin"],
  },
  {
    href: "/painel/conteudo",
    label: "Conteúdo",
    icon: "pencil",
    description: "Notícias, agenda, informativos",
    roles: ["admin", "jornalista"],
  },
  {
    href: "/painel/acervo",
    label: "Acervo",
    icon: "folder",
    description: "Documentos do sindicato",
    roles: ["admin", "jornalista", "diretor"],
  },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const items: NavItem[] = allItems
    .filter((item) => item.roles.includes(user.role))
    .map((item) => ({ href: item.href, label: item.label, icon: item.icon, description: item.description }));

  return (
    <div className="min-h-screen bg-water-pattern lg:flex">
      <PanelNav items={items} user={{ name: user.name, roleLabel: roleLabels[user.role] }} logout={logoutAction} />
      <main id="conteudo" className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        {children}
      </main>
      <Suspense>
        <Flash />
      </Suspense>
    </div>
  );
}
