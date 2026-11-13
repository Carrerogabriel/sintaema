import { permanentRedirect } from "next/navigation";
import { resolveCompany, type CompanyParams } from "@/lib/company";

/**
 * "O Sindicato" agora é a experiência "Nossa história".
 * O endereço antigo /[empresa]/sobre continua funcionando e redireciona.
 * O perfil institucional segue disponível em PDF (/[empresa]/pdf/sobre),
 * com download no fim da história.
 */
export default async function AboutPage({ params }: CompanyParams) {
  const { base } = await resolveCompany(params);
  permanentRedirect(`${base}/historia`);
}
