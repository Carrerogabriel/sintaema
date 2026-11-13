/** Conteúdo inicial, gravado no banco apenas na primeira execução. */
import type { Bulletin, Post, SiteEvent } from "@/data/site";

export const seedPosts: Post[] = [
  {
    slug: "vitoria-historica-senado-aprova-fim-da-escala-6x1",
    title:
      "Vitória histórica: Senado aprova fim da escala 6x1 e redução da jornada para 40 horas sem redução de salários",
    excerpt:
      "O Senado aprovou a PEC que encerra a escala 6x1, reduz a jornada máxima para 40 horas semanais e garante dois dias de descanso, sem corte de salário.",
    category: "Lutas",
    date: "2026-10-15",
    featured: true,
    image: "/images/destaque.jpg",
    imageAlt: "Trabalhadores com os punhos erguidos em ato coletivo",
    content: [
      "O Brasil vive um marco para a classe trabalhadora. O Senado aprovou, em dois turnos e com ampla votação, a proposta que acaba com a escala 6x1, reduz a jornada máxima para 40 horas semanais, assegura dois dias de descanso e preserva os salários.",
      "A conquista interrompe quase quatro décadas sem redução oficial da jornada e recoloca o tempo de vida da trabalhadora e do trabalhador no centro do debate público. Menos horas de trabalho significam mais saúde, mais convívio familiar e mais condições de organização coletiva.",
      "Para o SINTAEMA-SC, a aprovação no Senado é resultado de mobilização popular, pressão sindical e persistência de quem enfrenta escalas exaustivas no saneamento, na operação, no comercial e nos serviços essenciais.",
      "A luta agora segue na Câmara e na regulamentação, para que o direito saia do papel com proteção real: sem redução de remuneração, sem precarização disfarçada e com fiscalização sobre jornadas abusivas.",
    ],
  },
  {
    slug: "congresso-aprova-mudancas-no-estatuto",
    title:
      "Congresso aprova mudanças no Estatuto e atualiza a organização do SINTAEMA-SC",
    excerpt:
      "O 1º Congresso do SINTAEMA-SC, em Itapema, atualizou o Estatuto, ampliou a participação da categoria e reforçou regras de proteção democrática da entidade.",
    category: "Notícias",
    date: "2026-10-07",
    image: "/images/congresso.jpg",
    imageAlt: "Auditório com participantes em congresso sindical",
    content: [
      "Realizado nos dias 18 e 19 de setembro na FETIESC, em Itapema, o 1º Congresso do SINTAEMA-SC aprovou alterações no Estatuto do Sindicato. As mudanças atualizam a estrutura da entidade e abrem mais espaço para a participação da base.",
      "Entre os pontos centrais estão regras mais claras de funcionamento democrático, proteção institucional e organização das instâncias de representação. O objetivo é deixar o sindicato mais preparado para os desafios atuais da categoria.",
      "O Congresso também serviu como espaço de formação política. Delegadas e delegados debateram privatização, condições de trabalho, saúde e a defesa da CASAN pública.",
      "Para a diretoria, o Estatuto atualizado não é um documento de gaveta: é instrumento de luta, de transparência e de unidade para as próximas batalhas.",
    ],
  },
  {
    slug: "o-que-esta-em-jogo-nesta-eleicao",
    title:
      "O que está em jogo para os trabalhadores e para o serviço público nesta eleição",
    excerpt:
      "O futuro do saneamento, das empresas públicas e dos direitos trabalhistas passa pelas urnas. Conhecer as propostas é essencial para uma escolha consciente.",
    category: "Eleições",
    date: "2026-10-06",
    image: "/images/obra.jpg",
    imageAlt: "Trabalhadores em obra de saneamento urbano",
    content: [
      "Eleição não é ritual distante da vida cotidiana. Para quem opera estações, redes, atendimento e manutenção, o resultado nas urnas define orçamento, modelo de gestão e o próprio direito à água.",
      "Estão em disputa a manutenção das empresas públicas, o combate às terceirizações, a valorização salarial e o rumo do saneamento em Santa Catarina. Quem defende privatização costuma vender eficiência; a prática, em vários municípios, tem sido tarifa mais cara e serviço pior.",
      "O SINTAEMA-SC chama a categoria a avaliar trajetória, compromissos públicos e posição concreta de cada candidatura diante da CASAN e do saneamento 100% público.",
      "Voto consciente é ferramenta de proteção coletiva. Direitos não se defendem só no acordo coletivo: também se defendem na urna.",
    ],
  },
  {
    slug: "vote-em-quem-defende-o-saneamento-publico",
    title:
      "Neste domingo, vote em quem defende os trabalhadores e o saneamento público",
    excerpt:
      "As escolhas nas urnas impactam diretamente os serviços públicos, as empresas de saneamento e os direitos da categoria. O sindicato reforça o chamado à participação.",
    category: "Eleições",
    date: "2026-10-02",
    image: "/images/uniao.jpg",
    imageAlt: "Grupo de pessoas unidas em ato público",
    content: [
      "As eleições definem o futuro do Brasil e de Santa Catarina. Para a categoria do saneamento, o voto tem efeito direto sobre emprego, jornada, saúde e o caráter público da água.",
      "O SINTAEMA-SC reforça a importância de eleger representantes comprometidos com a defesa dos trabalhadores, das empresas públicas e do saneamento como direito, não como mercadoria.",
      "Participar, conversar com colegas e levar informação à base são tarefas do sindicato e de cada filiado. A omissão favorece quem trata a água como ativo financeiro.",
      "Neste domingo, a orientação é clara: vote em quem defende a classe trabalhadora e o saneamento público.",
    ],
  },
  {
    slug: "candidatos-assinam-carta-compromisso-casan",
    companies: ["casan"],
    title:
      "Eleições 2026: candidatos ao Governo do Estado assinam carta compromisso com a Casan pública",
    excerpt:
      "O SINTAEMA buscou assinaturas dos candidatos ao governo na Carta Compromisso com a CASAN Pública e o Saneamento. Confira quem se posicionou.",
    category: "Eleições",
    date: "2026-10-02",
    image: "/images/agua.jpg",
    imageAlt: "Paisagem de água e natureza em Santa Catarina",
    content: [
      "Há mais de um mês o SINTAEMA-SC recolhe assinaturas da Carta Compromisso com a CASAN Pública e o Saneamento. O documento cobra posição clara contra a privatização e em defesa da água como direito.",
      "A carta não é peça de campanha do sindicato: é instrumento de cobrança pública. Quem assina assume compromisso com a população catarinense e com as trabalhadoras e os trabalhadores da empresa.",
      "A entidade divulga os nomes para que a categoria possa comparar discurso e compromisso escrito. Transparência é parte da luta política.",
      "Depois da eleição, a cobrança continua. Carta assinada vira pauta de mobilização, audiência e fiscalização popular.",
    ],
  },
  {
    slug: "plano-de-lutas-aprovado-no-congresso",
    title:
      "Plano de lutas aprovado no Congresso orienta as próximas batalhas do SINTAEMA-SC",
    excerpt:
      "Documento reúne 20 pontos para defender a CASAN pública, valorizar os trabalhadores e ampliar a mobilização contra as privatizações.",
    category: "Lutas",
    date: "2026-10-01",
    image: "/images/assembleia.jpg",
    imageAlt: "Pessoa falando em assembleia com microfone",
    content: [
      "O debate político do 1º Congresso virou programa de ação. Delegadas e delegados aprovaram um plano de lutas com 20 pontos para orientar a mobilização da categoria.",
      "O documento articula defesa da CASAN pública, valorização salarial, saúde do trabalhador, igualdade de gênero, comunicação de base e enfrentamento às privatizações.",
      "Um plano de lutas só existe se sair do papel. Por isso o sindicato vincula cada ponto a calendário, campanha e organização nos locais de trabalho.",
      "A mensagem do Congresso é direta: a unidade da categoria é a principal ferramenta contra o desmonte do saneamento público.",
    ],
  },
  {
    slug: "tese-aprovada-fortalece-casan-publica",
    companies: ["casan"],
    title: "1º Congresso: tese aprovada fortalece a luta em defesa da CASAN pública",
    excerpt:
      "A defesa da água como direito e da CASAN como patrimônio do povo catarinense ficou no centro da tese aprovada pelo 1º Congresso do SINTAEMA-SC.",
    category: "Notícias",
    date: "2026-09-30",
    image: "/images/natureza.jpg",
    imageAlt: "Pessoas reunidas em mutirão coletivo",
    content: [
      "A tese aprovada no 1º Congresso orienta a ação do SINTAEMA-SC contra privatizações, precarização e ataques a direitos. No centro, a afirmação de que água não é mercadoria.",
      "O documento analisa os efeitos da Lei nº 14.026/2020, aponta a ofensiva sobre empresas públicas e propõe organização de massas como resposta estratégica.",
      "Para o sindicato, defender a CASAN é defender emprego, qualidade do serviço e tarifa justa. Privatizar concentra lucro e socializa o prejuízo.",
      "A tese agora vira bússola política: forma militantes, organiza campanhas e conecta a luta da categoria à defesa da democracia e dos serviços públicos.",
    ],
  },
  {
    slug: "privatizacao-nao-universaliza",
    title:
      "Privatização não universaliza: debate expõe tarifas maiores, serviços piores e trabalho precarizado",
    excerpt:
      "Experiências apresentadas no Congresso mostram que a Lei 14.026/2020 acelerou a entrega do saneamento sem garantir água e esgoto para todos.",
    category: "Lutas",
    date: "2026-09-21",
    image: "/images/trabalho.jpg",
    imageAlt: "Trabalhador em instalação hidráulica",
    content: [
      "A promessa era universalizar o saneamento. O que avançou, em vários territórios, foi a privatização. Essa foi a conclusão da mesa sobre o saneamento no Brasil após a Lei nº 14.026/2020.",
      "Relatos de municípios e estados mostram um padrão: reajuste agressivo de tarifas, corte de quadro, terceirização e piora no atendimento, sobretudo na periferia e no interior.",
      "Universalizar exige investimento público, planejamento e trabalhadores com direitos. Mercado não resolve o que não dá lucro imediato.",
      "O SINTAEMA-SC usa esses dados para informar a população e fortalecer a campanha nacional em defesa da água pública.",
    ],
  },
];

export const seedEvents: SiteEvent[] = [
  {
    title: "Dia nacional de luta em defesa do saneamento público",
    date: "2026-10-22",
    place: "Florianópolis e regionais",
    description:
      "Atos em defesa das empresas públicas e contra a privatização da água, em articulação com sindicatos de saneamento de todo o país.",
  },
  {
    title: "Assembleias de prestação de contas",
    date: "2026-07-10",
    place: "Criciúma, Caçador e demais bases",
    description:
      "Prestação de contas do sindicato nas regionais. Consulte horário específico com a representação de base da sua cidade.",
  },
  {
    title: "Plantão jurídico",
    date: "2026-10-20",
    place: "Sede — Av. Mauro Ramos, 502",
    description:
      "Atendimento com advogados às segundas e quartas, das 14h às 17h, somente com agendamento prévio.",
  },
];

export const seedBulletins: Bulletin[] = [
  {
    name: "Bomba d'Água",
    issue: "Edição 880",
    summary: "Informativo da categoria com as principais lutas da semana.",
  },
  {
    name: "Conexão",
    issue: "Reestruturação da Casan",
    companies: ["casan"],
    summary: "Quase 19 milhões ao ano em debate na reestruturação da empresa.",
  },
  {
    name: "Boletim do Conselheiro",
    issue: "Setembro/2026",
    summary: "Acompanhamento dos conselhos e da gestão compartilhada.",
  },
];
