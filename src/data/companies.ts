/**
 * Empresas em que o SINTAEMA-SC representa a categoria.
 *
 * Para cada empresa:
 * - `logo`: caminho de um arquivo em /public (ex.: "/empresas/casan.svg").
 *   Enquanto não houver arquivo, o site mostra um selo com `logoLines`.
 * - `colors`: cores-base do tema (referências aproximadas das identidades
 *   visuais de cada empresa). Os tons claros/escuros são calculados
 *   automaticamente em `src/lib/theme.ts`.
 *   · primary   → fundos escuros, cabeçalhos e títulos
 *   · accent    → botões e chamadas para ação (precisa contrastar com texto branco)
 *   · secondary → links, ícones e detalhes
 */

export type CompanyColors = {
  primary: string;
  accent: string;
  secondary: string;
};

export type Company = {
  slug: string;
  name: string;
  /** Linhas do selo exibido quando não há arquivo de logo. */
  logoLines: string[];
  fullName: string;
  tagline: string;
  description: string;
  region: string;
  logo?: string;
  colors: CompanyColors;
  highlights: string[];
};

const highlightsFor = (name: string) => [
  `Acompanhamento das negociações coletivas com a ${name}`,
  "Fiscalização das condições de trabalho e de segurança",
  "Plantão jurídico para questões trabalhistas e previdenciárias",
  "Informação permanente nos locais de trabalho",
];

const descriptionFor = (name: string) =>
  `O SINTAEMA-SC representa as trabalhadoras e os trabalhadores da ${name}, acompanhando as condições de trabalho, as negociações coletivas e os direitos da categoria.`;

export const companies: Company[] = [
  {
    slug: "casan",
    name: "CASAN",
    logoLines: ["CASAN"],
    fullName: "Companhia Catarinense de Águas e Saneamento",
    tagline: "CASAN pública, água para todos",
    description:
      "O SINTAEMA-SC representa as trabalhadoras e os trabalhadores da CASAN e organiza a categoria em defesa da empresa pública de saneamento de Santa Catarina.",
    region: "Santa Catarina",
    logo: "/empresas/casan-logo.jpg",
    colors: { primary: "#252376", accent: "#009B8E", secondary: "#AAA9A9" },
    highlights: highlightsFor("CASAN"),
  },
  {
    slug: "brk-blumenau",
    name: "BRK Ambiental Blumenau",
    logoLines: ["BRK Ambiental", "Blumenau"],
    fullName: "BRK Ambiental — Blumenau",
    tagline: "Direitos garantidos em Blumenau",
    description: descriptionFor("BRK Ambiental Blumenau"),
    region: "Blumenau - SC",
    logo: "/empresas/brk-logo.jpg",
    colors: { primary: "#003087", accent: "#3B62F1", secondary: "#42EEDC" },
    highlights: highlightsFor("BRK Ambiental Blumenau"),
  },
  {
    slug: "brk-cacador",
    name: "BRK Ambiental Caçador",
    logoLines: ["BRK Ambiental", "Caçador"],
    fullName: "BRK Ambiental — Caçador",
    tagline: "Direitos garantidos em Caçador",
    description: descriptionFor("BRK Ambiental Caçador"),
    region: "Caçador - SC",
    logo: "/empresas/brk-logo.jpg",
    colors: { primary: "#003087", accent: "#3B62F1", secondary: "#42EEDC" },
    highlights: highlightsFor("BRK Ambiental Caçador"),
  },
  {
    slug: "tubarao",
    name: "Tubarão Saneamento",
    logoLines: ["Tubarão", "Saneamento"],
    fullName: "Tubarão Saneamento",
    tagline: "Organização e direitos em Tubarão",
    description: descriptionFor("Tubarão Saneamento"),
    region: "Tubarão - SC",
    logo: "/empresas/tubarao-logo.jpg",
    colors: { primary: "#123B65", accent: "#0879B9", secondary: "#35B9A5" },
    highlights: highlightsFor("Tubarão Saneamento"),
  },
  {
    slug: "itapoa",
    name: "Itapoá Saneamento",
    logoLines: ["Itapoá", "Saneamento"],
    fullName: "Itapoá Saneamento",
    tagline: "Organização e direitos em Itapoá",
    description: descriptionFor("Itapoá Saneamento"),
    region: "Itapoá - SC",
    logo: "/empresas/itapoa-logo.png",
    colors: { primary: "#063B63", accent: "#F28C28", secondary: "#43A9C7" },
    highlights: highlightsFor("Itapoá Saneamento"),
  },
  {
    slug: "hydrobrasil",
    name: "Hydrobrasil",
    logoLines: ["Hydrobrasil"],
    fullName: "Hydrobrasil",
    tagline: "Unidade na defesa da categoria",
    description: descriptionFor("Hydrobrasil"),
    region: "Santa Catarina",
    logo: "/empresas/hydrobrasil-logo.jpg",
    colors: { primary: "#174A70", accent: "#1687B8", secondary: "#39A66B" },
    highlights: highlightsFor("Hydrobrasil"),
  },
  {
    slug: "serrana-ebs",
    name: "Serrana EBS",
    logoLines: ["Serrana", "EBS"],
    fullName: "Serrana EBS",
    tagline: "Trabalhadores unidos na serra",
    description: descriptionFor("Serrana EBS"),
    region: "Santa Catarina",
    logo: "/empresas/serrana-ebs-logo.png",
    colors: { primary: "#174477", accent: "#2879B9", secondary: "#36A66A" },
    highlights: highlightsFor("Serrana EBS"),
  },
  {
    slug: "aegea",
    name: "AEGEA",
    logoLines: ["AEGEA"],
    fullName: "AEGEA Saneamento",
    tagline: "Trabalhadores unidos na AEGEA",
    description: descriptionFor("AEGEA"),
    region: "Santa Catarina",
    logo: "/empresas/aegea-logo.jpg",
    colors: { primary: "#003B70", accent: "#0079B8", secondary: "#00A99D" },
    highlights: highlightsFor("AEGEA"),
  },
];

export function getCompany(slug: string) {
  return companies.find((company) => company.slug === slug);
}
