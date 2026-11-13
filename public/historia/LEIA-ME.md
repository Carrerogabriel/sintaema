# Fotos da página "Nossa história"

Salve aqui as fotos reais do acervo do SINTAEMA-SC usando **exatamente** estes
nomes (extensão `.jpg`, `.jpeg`, `.png` ou `.webp`). A foto aparece sozinha
no lugar certo da página — não é preciso mexer no código. Enquanto o arquivo não
existir, a página mostra uma placa "Foto do acervo a inserir" com a descrição.

O prefixo indica o capítulo (00 = abertura, 01 = anos de chumbo, 02 = fundação,
03 = primeiras batalhas, 04 = conquistas, 05 = pessoas, 07 = presente).

| Arquivo | O que mostrar | Função na narrativa |
| ------- | ------------- | ------------------- |
| `00-abertura` | Imagem de abertura | Uma foto marcante da categoria reunida (ato, assembleia ou greve) que represente a identidade do Sindicato. |
| `01-anos-de-chumbo` | Registro de época — anos 1970 | Contexto da ditadura militar: jornais, documentos ou fotos públicas da época. |
| `02-associacao-1975` | Associação dos Servidores da Casan (1975) | Primeiros integrantes, primeira sede ou documento da Associação. |
| `02-fundacao-1977` | Fundação do Sindicato — 9/11/1977 | Assembleia de fundação, ata ou registro do dia da fundação. |
| `02-primeira-diretoria` | Primeira diretoria | Retrato da primeira diretoria eleita. Incluir nomes na legenda. |
| `02-primeiras-reunioes` | Primeiras reuniões | Encontros da categoria nos primeiros anos do Sindicato. |
| `03-greve-1985` | Greve de outubro de 1985 | A primeira grande greve após o fim da ditadura. |
| `03-greves-1987` | As duas greves de 1987 | Mobilização da categoria em 1987. |
| `03-lista-demissoes-1987` | Contra a lista de demissões (ago/1987) | Ato ou assembleia contra a lista de demissões. |
| `03-acoes-1988` | Contra a venda de ações (1988) | Primeira batalha contra a venda de ações da Casan. |
| `03-greve-1989` | Greve de 1989 e greve de fome | Os 36 dias de greve e os 5 dias de greve de fome. |
| `04-greves-1999-2005` | Greves de 1999 a 2005 | Mobilizações em defesa dos empregos e direitos. |
| `04-agua-publica-2002` | Contra a privatização da água | Atos em defesa da água pública e da Casan a partir de 2002. |
| `04-lista-500-2004` | A lista de 500 demissões (2004) | A mobilização que venceu a lista de 500 demissões. |
| `04-acoes-2011` | Contra a venda de ações (2011) | A nova batalha contra a venda de ações da Casan. |
| `05-fundadores` | Fundadoras e fundadores | As pessoas que criaram a Associação e o Sindicato. |
| `05-liderancas-historicas` | Lideranças históricas | Dirigentes que marcaram a trajetória da entidade. |
| `05-trabalhadores-em-campo` | Trabalhadores em campo | A categoria no dia a dia do saneamento. |
| `05-assembleias` | Assembleias | A base reunida decidindo os rumos da luta. |
| `05-diretoria-atual` | Diretoria atual | Quem conduz o Sindicato hoje. |
| `05-movimentos-sociais` | Com os movimentos sociais | Atos, palestras e debates com a sociedade. |
| `07-1-congresso` | 1º Congresso do SINTAEMA-SC | Delegadas e delegados reunidos em Itapema. |
| `07-sede` | Estrutura atual do Sindicato | Sede, atendimento e equipe nos dias de hoje. |

## Dicas

- Formato horizontal, mínimo de 1600 px de largura. A abertura (`00-abertura`)
  ocupa a tela inteira: prefira uma imagem larga e com área escura para o texto.
- Fotos dos capítulos 01 e 02 aparecem em preto e branco com tom sépia; as do
  capítulo 03, levemente desbotadas; a partir de 2002, em cores. É proposital:
  a página ganha cor conforme a história avança. Ao passar o mouse, a foto
  mostra as cores originais.
- Para nomes e legendas (ex.: primeira diretoria), edite o texto do espaço
  correspondente em `src/data/historia.ts` (campos `label` e `alt`).
- Depois de adicionar fotos, reinicie o servidor ou faça um novo deploy.

## Fotos já inseridas (novembro de 2026)

As fotos vieram da apresentação **"SINTAEMA: 40 anos de sonhos, lutas e
conquistas" (2017)**, com as legendas originais de cada slide. Cada foto mostra
a sua legenda na página e no PDF.

- Já preenchidos: `00-abertura`, `03-greve-1985`, `03-greves-1987`,
  `03-lista-demissoes-1987`, `03-greve-1989`, `04-*` (exceto ações 1988) e
  `05-liderancas-historicas`, `05-trabalhadores-em-campo`, `05-assembleias`,
  `05-movimentos-sociais`.
- Ainda faltam (não há fotos dessas épocas na apresentação): `01-anos-de-chumbo`,
  `02-associacao-1975`, `02-fundacao-1977`, `02-primeira-diretoria`,
  `02-primeiras-reunioes`, `03-acoes-1988`, `05-fundadores`,
  `05-diretoria-atual`, `07-1-congresso` e `07-sede`.
- A galeria "Acervo" usa as fotos de `acervo/` (lista e legendas em
  `src/data/historia.ts`, constante `archive`).
