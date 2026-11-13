import { redirect } from "next/navigation";
import { requireUser, roleHome } from "@/server/auth";

export default async function PanelHome() {
  const user = await requireUser();
  redirect(roleHome[user.role]);
}
