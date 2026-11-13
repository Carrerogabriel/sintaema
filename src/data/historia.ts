/**
 * Conteúdo da experiência "Nossa história".
 *
 * Todo o texto vem do histórico oficial "SINTAEMA: 47 anos de sonhos, lutas
 * e conquistas" e das matérias do próprio site (1º Congresso). Nada de nomes,
 * datas ou fatos inventados: onde faltam informações (nomes de fundadores,
 * diretorias), a página mostra espaços reservados para fotos e legendas.
 *
 * FOTOS: salve o arquivo em /public/historia com o nome indicado em `file`
 * (.jpg, .jpeg, .png ou .webp). Ele aparece sozinho no lugar certo.
 */

export const FOUNDED = { year: 1977, month: 10, day: 9 }; // 9/11/1977 (mês 0-based)

/** Anos completos desde a fundação, na data atual. */
export function yearsOfStruggle(now = new Date()) {
  const anniversary = new Date(now.getFullYear(), FOUNDED.month, FOUNDED.day);
  return now.getFullYear() - FOUNDED.year - (now < anniversary ? 1 : 0);
}

/* ───────────────────────────── Fotografias ───────────────────────────── */

export type PhotoSlotInfo = {
  file: string;
  /** O que a foto deve mostrar. */
  label: string;
  /** Por que ela está ali na narrativa. */
  purpose: string;
  alt: string;
  /** Legenda real da foto (do acervo). Aparece sobre a imagem e no PDF. */
  caption?: string;
};

const slot = (file: string, label: string, purpose: string, alt = label, caption?: string): PhotoSlotInfo => ({
  file,
  label,
  purpose,
  alt: caption ?? alt,
  caption,
});

export const photoSlots = {
  abertura: slot(
    "00-abertura",
    "Imagem de abertura",
    "Uma foto marcante da categoria reunida (ato, assembleia ou greve) que represente a identidade do Sindicato.",
    "A categoria reunida em um momento histórico do SINTAEMA-SC",
    "1985: Assembleia estadual",
  ),
  ditadura: slot(
    "01-anos-de-chumbo",
    "Registro de época — anos 1970",
    "Contexto da ditadura militar: jornais, documentos ou fotos públicas da época.",
    "Registro histórico dos anos da ditadura militar",
    "Greve geral — década de 80",
  ),
  associacao: slot(
    "02-associacao-1975",
    "Associação dos Servidores da Casan (1975)",
    "Primeiros integrantes, primeira sede ou documento da Associação.",
    undefined,
    "1991: Campanha salarial do Sintae",
  ),
  fundacao: slot(
    "02-fundacao-1977",
    "Fundação do Sindicato — 9/11/1977",
    "Assembleia de fundação, ata ou registro do dia da fundação.",
    undefined,
    "1985: Reunião de negociação, o registro mais antigo do acervo",
  ),
  primeiraDiretoria: slot(
    "02-primeira-diretoria",
    "Primeira diretoria",
    "Retrato da primeira diretoria eleita. Incluir nomes na legenda.",
    undefined,
    "1990: Eleição do Sindicato",
  ),
  primeirasReunioes: slot(
    "02-primeiras-reunioes",
    "Primeiras reuniões",
    "Encontros da categoria nos primeiros anos do Sindicato.",
    undefined,
    "1986: Negociação coletiva",
  ),
  greve1985: slot(
    "03-greve-1985",
    "Greve de outubro de 1985",
    "A primeira grande greve após o fim da ditadura.",
    undefined,
    "1985: Negociação coletiva",
  ),
  greves1987: slot(
    "03-greves-1987",
    "As duas greves de 1987",
    "Mobilização da categoria em 1987.",
    undefined,
    "Greve de 1987",
  ),
  demissoes1987: slot(
    "03-lista-demissoes-1987",
    "Contra a lista de demissões (ago/1987)",
    "Ato ou assembleia contra a lista de demissões.",
    undefined,
    "1987: Assembleia estadual",
  ),
  acoes1988: slot(
    "03-acoes-1988",
    "Contra a venda de ações (1988)",
    "Primeira batalha contra a venda de ações da Casan.",
    undefined,
    "1998: Luta contra a venda de ações da Casan",
  ),
  greve1989: slot(
    "03-greve-1989",
    "Greve de 1989 e greve de fome",
    "Os 36 dias de greve e os 5 dias de greve de fome.",
    undefined,
    "1989: Fim da greve de fome",
  ),
  greves1999: slot(
    "04-greves-1999-2005",
    "Greves de 1999 a 2005",
    "Mobilizações em defesa dos empregos e direitos.",
    undefined,
    "Anos 2000: Greve em Criciúma",
  ),
  terceirizacao: slot(
    "04-terceirizacao",
    "Contra a terceirização",
    "A luta pelo fim das terceirizações e por concurso público.",
    undefined,
    "Década de 90: Paralisação contra a terceirização",
  ),
  neoliberalismo: slot(
    "04-neoliberalismo",
    "Contra as políticas neoliberais",
    "Mobilizações nacionais contra a retirada de direitos.",
    undefined,
    "1999: Passeata contra FHC e FMI",
  ),
  assembleia2000: slot(
    "04-assembleia-2000",
    "Assembleia estadual",
    "A categoria reunida para decidir a campanha.",
    undefined,
    "2000: Assembleia estadual",
  ),
  aguaPublica: slot(
    "04-agua-publica-2002",
    "Contra a privatização da água",
    "Atos em defesa da água pública e da Casan a partir de 2002.",
    undefined,
    "2004: Protesto contra a privatização",
  ),
  lista500: slot(
    "04-lista-500-2004",
    "A lista de 500 demissões (2004)",
    "A mobilização que venceu a lista de 500 demissões.",
    undefined,
    "2004: Queima de caixão contra a lista de demissões",
  ),
  acoes2011: slot(
    "04-acoes-2011",
    "Contra a venda de ações (2011)",
    "A nova batalha contra a venda de ações da Casan.",
    undefined,
    "2011: Jornada de lutas",
  ),
  fundadores: slot(
    "05-fundadores",
    "Fundadoras e fundadores",
    "As pessoas que criaram a Associação e o Sindicato.",
    undefined,
    "Ao companheiro Del Rè, nosso carinho e gratidão. Sempre presente!",
  ),
  liderancas: slot(
    "05-liderancas-historicas",
    "Lideranças históricas",
    "Dirigentes que marcaram a trajetória da entidade.",
    undefined,
    "Anos 90: Reunião de diretoria do Sindicato",
  ),
  campo: slot(
    "05-trabalhadores-em-campo",
    "Trabalhadores em campo",
    "A categoria no dia a dia do saneamento.",
    undefined,
    "Anos 2000: Trabalhadores de Criciúma",
  ),
  assembleias: slot(
    "05-assembleias",
    "Assembleias",
    "A base reunida decidindo os rumos da luta.",
    undefined,
    "1995: Assembleia regional em Florianópolis",
  ),
  diretoriaAtual: slot(
    "05-diretoria-atual",
    "Diretoria atual",
    "Quem conduz o Sindicato hoje.",
    undefined,
    "2016: Reunião de negociação",
  ),
  movimentos: slot(
    "05-movimentos-sociais",
    "Com os movimentos sociais",
    "Atos, palestras e debates com a sociedade.",
    undefined,
    "2016: Greve geral por nenhum direito a menos",
  ),
  congresso: slot(
    "07-1-congresso",
    "1º Congresso do SINTAEMA-SC",
    "Delegadas e delegados reunidos em Itapema.",
    undefined,
    "2016: Assembleia estadual",
  ),
  sede: slot(
    "07-sede",
    "Estrutura atual do Sindicato",
    "Sede, atendimento e equipe nos dias de hoje.",
    undefined,
    "Faixa do SINTAEMA-SC, FENATEMA e CTB-SC",
  ),
} satisfies Record<string, PhotoSlotInfo>;

export type PhotoKey = keyof typeof photoSlots;

/* ───────────────────────────── Capítulos ───────────────────────────── */

export const chapters = [
  { id: "abertura", number: "00", title: "Abertura" },
  { id: "anos-de-chumbo", number: "01", title: "Anos de chumbo" },
  { id: "onde-tudo-comecou", number: "02", title: "Onde tudo começou" },
  { id: "primeiras-batalhas", number: "03", title: "As primeiras batalhas" },
  { id: "conquistas", number: "04", title: "Conquistas e transformações" },
  { id: "pessoas", number: "05", title: "Pessoas que fizeram a história" },
  { id: "linha-do-tempo", number: "06", title: "O Sindicato ao longo do tempo" },
  { id: "presente", number: "07", title: "O presente e o futuro" },
  { id: "encerramento", number: "∞", title: "Uma história que continua" },
] as const;

/* Cap. 01 — contexto */
export const contextSteps = [
  {
    keyword: "Anos de chumbo",
    text: "Corria a década de 70, anos de chumbo da ditadura militar. A mando da elite conservadora e do capital internacional, os militares tratavam a ferro e fogo as justas reivindicações do povo brasileiro, como a luta pelas reformas de base.",
  },
  {
    keyword: "Ousadia",
    text: "Mesmo assim, milhares de brasileiras e brasileiros destemidos não se intimidavam. Com bravura e elevada consciência política, ousaram enfrentar as baionetas e os canhões.",
  },
  {
    keyword: "Araguaia",
    text: "Muitos tiveram suas vidas ceifadas, nas praças ou nas florestas, como na guerrilha do Araguaia. Outros milhares foram presos e torturados nos porões da ditadura.",
  },
  {
    keyword: "Proibido lutar",
    text: "Era proibido lutar pelos direitos dos trabalhadores e até pelo legítimo direito de viver em uma nação democrática.",
    quote: "Mas o povo é sábio, ousado e perseverante.",
  },
];

/* Cap. 03 — batalhas pós-ditadura */
export const battles: Array<{ date: string; title: string; text: string; photo: PhotoKey }> = [
  {
    date: "Outubro de 1985",
    title: "A greve de 1985",
    text: "Com o fim da ditadura e impulsionado pelo momento político do país, o Sindicato vai à greve.",
    photo: "greve1985",
  },
  {
    date: "1987",
    title: "Duas greves em um ano",
    text: "A categoria faz duas greves em 1987.",
    photo: "greves1987",
  },
  {
    date: "Agosto de 1987",
    title: "Contra a lista de demissões",
    text: "A batalha contra a lista de demissões de agosto de 1987.",
    photo: "demissoes1987",
  },
  {
    date: "1988",
    title: "Contra a venda de ações",
    text: "A primeira batalha contra a venda de ações da Casan.",
    photo: "acoes1988",
  },
];

/* Cap. 04 — conquistas (lista interativa) */
export const conquests: Array<{ title: string; period: string; text: string; photo: PhotoKey }> = [
  {
    title: "Planos de Carreira e de Saúde",
    period: "Pós-1985",
    text: "A luta pelos Planos de Carreira e de Saúde e pelos Acordos e Dissídios Coletivos da categoria.",
    photo: "assembleia2000",
  },
  {
    title: "Emprego e concurso público",
    period: "Mais de duas décadas",
    text: "Mais de duas décadas de luta pela garantia no emprego, pelo fim das terceirizações e pela contratação através de concurso público.",
    photo: "terceirizacao",
  },
  {
    title: "Contra o neoliberalismo",
    period: "Anos 1990",
    text: "O enfrentamento das políticas neoliberais que tinham como objetivo suprimir direitos e privatizar as estatais e os serviços públicos.",
    photo: "neoliberalismo",
  },
  {
    title: "Greves de 1999 a 2005",
    period: "1999 · 2000 · 2001 · 2002 · 2005",
    text: "Greves que tiveram como objetivo garantir os empregos e os direitos da categoria.",
    photo: "greves1999",
  },
];

/* Cap. 04 — depois de 2002: resistir e propor */
export const waterVictories = [
  {
    title: "Gestão Compartilhada",
    text: "Diante do desmonte, o Sindicato não só resistiu: elaborou uma nova proposta de modelo de gestão para o saneamento. A Gestão Compartilhada hoje é uma realidade.",
  },
  {
    title: "Água protegida por lei",
    text: "Emendas às leis orgânicas dos municípios para proibir a privatização e a terceirização da água.",
  },
];

/* Cap. 06 — linha do tempo interativa */
export const milestones: Array<{
  year: string;
  title: string;
  text: string;
  photo: PhotoKey;
  era: "chumbo" | "luta" | "agua";
}> = [
  {
    year: "Anos 70",
    title: "Organização clandestina",
    text: "Em plena ditadura militar, um grupo de companheiras e companheiros abnegados começa a se organizar de forma clandestina.",
    photo: "ditadura",
    era: "chumbo",
  },
  {
    year: "1975",
    title: "Associação dos Servidores da Casan",
    text: "Fundada a Associação dos Servidores da Casan, o primeiro passo da organização da categoria.",
    photo: "associacao",
    era: "chumbo",
  },
  {
    year: "1977",
    title: "Fundação do Sindicato",
    text: "Em 9 de novembro de 1977 a categoria ousa e funda o seu Sindicato.",
    photo: "fundacao",
    era: "chumbo",
  },
  {
    year: "1985",
    title: "Greve de outubro",
    text: "Com o fim da ditadura, a greve de outubro de 1985 abre um novo período de lutas.",
    photo: "greve1985",
    era: "luta",
  },
  {
    year: "1987",
    title: "Duas greves e a lista de demissões",
    text: "As duas greves de 1987 e a batalha contra a lista de demissões de agosto.",
    photo: "greves1987",
    era: "luta",
  },
  {
    year: "1988",
    title: "Contra a venda de ações",
    text: "A primeira batalha contra a venda de ações da Casan.",
    photo: "acoes1988",
    era: "luta",
  },
  {
    year: "1989",
    title: "36 dias de greve",
    text: "Trinta e seis dias de greve com salários descontados, culminando com a greve de fome de 5 dias.",
    photo: "greve1989",
    era: "luta",
  },
  {
    year: "1999–2005",
    title: "Greves pelos empregos",
    text: "Greves em 1999, 2000, 2001, 2002 e 2005 para garantir empregos e direitos.",
    photo: "greves1999",
    era: "luta",
  },
  {
    year: "2002",
    title: "Em defesa da água pública",
    text: "Começa a batalha contra a privatização da água e o desmonte da Casan. Nasce a proposta de Gestão Compartilhada.",
    photo: "aguaPublica",
    era: "agua",
  },
  {
    year: "2004",
    title: "A lista de 500 demissões",
    text: "O Sindicato enfrenta a famigerada lista de 500 demissões e vence a batalha.",
    photo: "lista500",
    era: "agua",
  },
  {
    year: "2011",
    title: "De novo, contra a venda de ações",
    text: "Mais uma batalha contra a venda de ações da Casan.",
    photo: "acoes2011",
    era: "agua",
  },
  {
    year: "Hoje",
    title: "1º Congresso do SINTAEMA-SC",
    text: "Estatuto atualizado, tese aprovada e um plano de lutas com 20 pontos para as próximas batalhas.",
    photo: "congresso",
    era: "agua",
  },
];

/* Acervo: fotos reais com as legendas originais da apresentação
   "SINTAEMA: 40 anos de sonhos, lutas e conquistas" (2017). Arquivos em
   /public/historia/acervo. */
export type ArchiveDecade = "80" | "90" | "2000" | "2010";

export const archive: Array<{ file: string; caption: string; decade: ArchiveDecade; width: number; height: number }> = [
  { file: "p004", caption: "1985: Assembleia estadual", decade: "80", width: 1600, height: 1092 },
  { file: "p009", caption: "1989: Assembleia da categoria", decade: "80", width: 1600, height: 1033 },
  { file: "p010", caption: "Greve de 1989", decade: "80", width: 1468, height: 603 },
  { file: "p011", caption: "1989: Categoria em greve", decade: "80", width: 1600, height: 1095 },
  { file: "p014", caption: "1989: Greve da categoria em Joinville", decade: "80", width: 1548, height: 1038 },
  { file: "p018", caption: "1990: Ocupação na Eletrosul", decade: "90", width: 1351, height: 876 },
  { file: "p023", caption: "Greve de 1994", decade: "90", width: 1600, height: 977 },
  { file: "p026", caption: "1995: Campanha contra a privatização da Casan", decade: "90", width: 1600, height: 1029 },
  { file: "p034", caption: "Década de 90: Paralisação na Matriz", decade: "90", width: 1600, height: 1075 },
  { file: "p037", caption: "1998: Contra a venda de ações", decade: "90", width: 1600, height: 1034 },
  { file: "p041", caption: "1998: Contra a venda de ações — ocupação na sala do presidente", decade: "90", width: 1600, height: 1013 },
  { file: "p045", caption: "2000: Greve em Videira", decade: "2000", width: 1387, height: 969 },
  { file: "p051", caption: "2000: Greve em Xanxerê", decade: "2000", width: 1600, height: 1096 },
  { file: "p061", caption: "2003: Luta contra a privatização na Alesc", decade: "2000", width: 1600, height: 1028 },
  { file: "p074", caption: "2004: Assembleia contra a lista de demissões", decade: "2000", width: 1600, height: 1063 },
  { file: "p082", caption: "2004: Greve contra a lista de demissões", decade: "2000", width: 1600, height: 1068 },
  { file: "p092", caption: "2005: Trabalhadores de Içara deixam a Casan cantando o Hino Nacional", decade: "2000", width: 1600, height: 1265 },
  { file: "p098", caption: "2007: Trabalhadores de Sombrio", decade: "2000", width: 1600, height: 1200 },
  { file: "p099", caption: "2008: Criciúma na luta em defesa do saneamento público e do emprego", decade: "2000", width: 1600, height: 1338 },
  { file: "p109", caption: "2011: Ato na Matriz", decade: "2010", width: 1600, height: 1200 },
  { file: "p114", caption: "2011: Audiência pública sobre a venda das ações na Alesc", decade: "2010", width: 1600, height: 1200 },
  { file: "p168", caption: "2016: Assembleia estadual", decade: "2010", width: 1600, height: 1069 },
  { file: "p177", caption: "2016: Paralisação nacional", decade: "2010", width: 1600, height: 1068 },
  { file: "p178", caption: "2017: Ato em Florianópolis", decade: "2010", width: 1600, height: 1069 },
  { file: "p190", caption: "2017: Atividade dos 40 anos do SINTAEMA na Grande Florianópolis", decade: "2010", width: 1600, height: 1069 },
];

export const archiveSource = "Acervo SINTAEMA · apresentação “40 anos de sonhos, lutas e conquistas” (2017)";

/* Cap. 07 — números (todos tirados do histórico) */
export const numbers = [
  { value: 36, suffix: "", label: "dias de greve em 1989" },
  { value: 5, suffix: "", label: "dias de greve de fome" },
  { value: 500, suffix: "", label: "demissões enfrentadas em 2004 — e a batalha foi vencida" },
  { value: 9, suffix: "", label: "greves citadas no histórico, de 1985 a 2005" },
];

export const originalText = {
  title: "SINTAEMA: 47 anos de sonhos, lutas e conquistas",
  paragraphs: [
    "Corria a década de 70, anos de chumbo da ditadura militar. A mando da elite conservadora e do capital internacional, os milicos tratavam a ferro e fogo as justas reivindicações do povo brasileiro, como a luta pela implantação das reformas de base para fazer avançar a nação brasileira.",
    "Mesmo assim, milhares de brasileiros (as) destemidos (as) não se intimidavam. Com bravura e elevada consciência política, ousaram enfrentar as baionetas e os canhões dos militares.",
    "Muitos tiveram suas vidas ceifadas, nas praças ou nas florestas, como na guerrilha do Araguaia, outros (as) milhares foram presos e torturados nos porões da ditadura militar.",
    "Época em que era proibido lutar pelos direitos dos trabalhadores e mesmo pelo legítimo direito de viver em uma nação democrática.",
    "Mas o povo é sábio, ousado e perseverante. Afinal, a luta de classes continuava a existir e aprofundava as desigualdades sociais.",
    "Nossa categoria também sentia na carne as mazelas do sistema. Um grupo de abnegados (as) companheiros (as), de forma clandestina, começaram a se organizar. Em 1975 fundaram a Associação dos Servidores da Casan. Em 9 de novembro de 1977 ousaram e fundaram o nosso Sindicato, que passo-a-passo foi constituindo-se numa Entidade combativa e respeitada, travando inúmeras batalhas em defesa dos direitos imediatos de nossos trabalhadores (as) e nas lutas gerais do povo brasileiro.",
    "Com o fim da ditadura militar, em 1985, e impulsionado pelo momento político vivido no país, o Sindicato passa a travar inúmeras batalhas: a greve de outubro de 1985; as duas greves de 1987; a batalha contra a lista de demissões de agosto de 1987; a greve de 1989 – trinta e seis dias de greve com salários descontados e culminando com a greve de fome de 5 dias; a luta pelos Planos de Carreira e de Saúde, dos Acordos e Dissídios Coletivos; a luta de mais de duas décadas pela garantia no emprego, pelo fim das terceirizações e pela contratação através de concurso público; no enfrentamento das políticas neoliberais que tem como objetivo suprimir nossos direitos, privatizar as estatais e os serviços públicos; as batalhas contra a venda de ações da Casan, em 1988 e 2011; as greves de 1999, 2000, 2001, 2002 e 2005 que tiveram como objetivo garantir nossos empregos e direitos.",
    "Já a partir de 2002, nosso Sindicato entra na dura batalha contra a privatização da água e contra o desmonte da Casan com a política de privatização/municipalização. Hora da onça beber água, de resistir contra o desmonte da Casan e elaborar uma nova proposta de modelo de gestão para o saneamento.",
    "Apresenta a Gestão Compartilhada, hoje uma realidade e as emendas às leis orgânicas dos municípios para proibir a privatização/terceirização da água.",
    "Paralelamente, vai à luta contra os ataques dos governos e, em 2004, enfrenta com valentia e sabedoria a famigerada lista de 500 demissões e vence a batalha. Da mesma forma as reformas administrativas que tinham como objetivo desmontar a Casan. Em nossa luta diária, o objetivo maior é defender os direitos dos trabalhadores, fiscalizar as condições de trabalho e cobrar dos empregadores mais valorização do quadro funcional.",
    "A atuação do SINTAEMA-SC não se restringe apenas às questões corporativas.",
    "Como entidade de classe, busca interagir com os movimentos sociais, populares e institucionais, através de atos, manifestações públicas, palestras, oficinas e debates, combinando os interesses mais imediatos com os interesses gerais da sociedade.",
    "Nesses 47 anos o SINTAEMA enfrentou todos os tipos de obstáculos, com disposição de luta, unidade, paciência e, com a experiência acumulada, fomos superando as dificuldades e desafios.",
    "A história do SINTAEMA-SC certamente tem a impressão digital de cada trabalhador (a) que, de forma altiva, teve a ousadia de quebrar as algemas e lutar.",
    "Valeu companheiros (as), são 47 anos de sonhos, lutas e conquistas.",
    "A vida segue e a luta continua!",
    "Um abraço fraterno a todos (as).",
  ],
};
