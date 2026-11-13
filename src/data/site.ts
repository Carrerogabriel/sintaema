/** Constantes e tipos públicos — pode ser importado por componentes do navegador. */

export const categories = ["Notícias", "Lutas", "Eleições", "Jurídico", "Agenda"] as const;

export type Category = (typeof categories)[number];

export type Post = {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: Category;
  date: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  /** Empresas a que a matéria se refere. Vazio = vale para todas. */
  companies?: string[];
};

export const site = {
  name: "SINTAEMA / SC",
  slogan: "Água é vida, privatizá-la é crime",
  fullName:
    "Sindicato dos/as Trabalhadores/as em Água, Esgoto e Meio Ambiente de Santa Catarina",
  phone: "(48) 3224-3868",
  email: "secretaria@sintaema.org.br",
  cnpj: "83.566.729/0001-57",
  address: "Av. Mauro Ramos, 502 - Centro",
  cep: "88020-301",
  city: "Florianópolis - SC",
  hours: "das 8h às 12h e das 14h às 18h",
  lawyers: "segundas e quartas, das 14h às 17h (mediante agendamento)",
  contribution: "1% sobre o salário fixo",
  social: {
    facebook: "https://www.facebook.com/sintaemasc",
    youtube: "https://www.youtube.com/",
    instagram: "https://www.instagram.com/",
  },
};

export type SiteEvent = {
  id?: number;
  title: string;
  date: string;
  place: string;
  description: string;
  companies?: string[];
};

export type Bulletin = {
  id?: number;
  name: string;
  issue: string;
  summary: string;
  companies?: string[];
};
