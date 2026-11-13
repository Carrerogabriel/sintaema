/**
 * Textos institucionais compartilhados entre as páginas do site e os
 * documentos em PDF (Sobre, Jurídico e Filie-se). Edite aqui e as duas
 * versões ficam iguais.
 */
import type { IconName } from "@/components/Icon";
import { site } from "./content";

export const aboutParagraphs = [
  "Na década de 1970, em plena ditadura militar, um grupo da categoria começou a se organizar de forma clandestina. Em 1975 nasceu a Associação dos Servidores da Casan. Em 9 de novembro de 1977 foi fundado o sindicato que hoje é o SINTAEMA-SC.",
  "Com o fim da ditadura, a entidade enfrentou greves, listas de demissão, disputa por planos de carreira e de saúde, terceirizações e tentativas de venda de ações da CASAN. A partir de 2002, a luta contra a privatização da água e o desmonte da empresa pública passou ao centro da ação sindical.",
  "O SINTAEMA não se limita às pautas corporativas. Atua com movimentos sociais, manifestações, debates e propostas de gestão compartilhada, sempre combinando direitos imediatos da categoria com o interesse da população pelo saneamento público.",
  "A história do sindicato tem a marca de cada trabalhadora e trabalhador que ousou se organizar. A vida segue e a luta continua.",
];

export const aboutTimeline = [
  {
    year: "Anos 1970",
    title: "Organização na clandestinidade",
    text: "Em plena ditadura militar, um grupo da categoria começa a se organizar de forma clandestina.",
  },
  {
    year: "1975",
    title: "Associação dos Servidores da Casan",
    text: "Nasce a associação que daria origem à entidade sindical.",
  },
  {
    year: "1977",
    title: "Fundação do sindicato",
    text: "Em 9 de novembro é fundado o sindicato que hoje é o SINTAEMA-SC.",
  },
  {
    year: "Redemocratização",
    title: "Greves e conquistas",
    text: "Greves, listas de demissão, disputa por planos de carreira e de saúde, terceirizações e tentativas de venda de ações da CASAN.",
  },
  {
    year: "2002",
    title: "Contra a privatização da água",
    text: "A luta contra a privatização e o desmonte da empresa pública passa ao centro da ação sindical.",
  },
  {
    year: "2026",
    title: "1º Congresso do SINTAEMA-SC",
    text: "Estatuto atualizado, tese aprovada e um plano de lutas com 20 pontos para as próximas batalhas.",
  },
];

export const aboutValues: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "drop", title: "Água é direito", text: "Saneamento público, universal e com tarifa justa." },
  { icon: "users", title: "Unidade", text: "Organização de base em todas as regionais do estado." },
  { icon: "shield", title: "Defesa", text: "Direitos imediatos da categoria e interesse da população." },
];

export const legalAreas: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "file",
    title: "Direito do trabalho",
    text: "Orientação sobre verbas, jornada, assédio, estabilidade, acidentes e cumprimento de normas coletivas.",
  },
  {
    icon: "shield",
    title: "Previdência",
    text: "Acompanhamento de aposentadorias, pensões, auxílios e revisão de benefícios, inclusive PPP.",
  },
  {
    icon: "users",
    title: "Interesses coletivos",
    text: "Atuação contra ataques a direitos da categoria e em defesa do saneamento público.",
  },
];

export const legalSteps: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "phone", title: "Entre em contato", text: `Ligue para ${site.phone} ou escreva para ${site.email}.` },
  { icon: "file", title: "Informe os dados", text: "Nome, local de trabalho e o tema da consulta." },
  { icon: "pin", title: "Compareça à sede", text: `Atendimento presencial em ${site.address}.` },
];

export const joinSteps = [
  {
    title: "Preencha a ficha",
    text: "Use o formulário de contato ou procure a representação de base da sua região.",
  },
  {
    title: "Envie ao sindicato",
    text: `Entregue a um representante, envie pelos Correios para ${site.address} ou, no caso da CASAN, use o malote da empresa.`,
  },
  {
    title: "Contribua e participe",
    text: `O desconto mensal é de ${site.contribution}. Filiação é organização, informação e defesa coletiva.`,
  },
];

export const joinBenefits: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "scale",
    title: "Defesa jurídica",
    text: "Acompanhamento de direitos trabalhistas e previdenciários com advogados do sindicato.",
  },
  {
    icon: "megaphone",
    title: "Informação permanente",
    text: "Campanhas, ACTs e condições de trabalho em informativos e canais oficiais.",
  },
  {
    icon: "shield",
    title: "Contra a precarização",
    text: "Organização contra privatização, municipalização e terceirizações.",
  },
  {
    icon: "users",
    title: "Voz ativa",
    text: "Participação nas assembleias, congressos e nos locais de trabalho.",
  },
];
