import { Document, Text, View } from "@react-pdf/renderer";
import type { Company } from "@/data/companies";
import { site, type Post } from "@/data/content";
import {
  aboutParagraphs,
  aboutTimeline,
  aboutValues,
  joinBenefits,
  joinSteps,
  legalAreas,
  legalSteps,
} from "@/data/institucional";
import { formatDate, formatShortDate, readingTime } from "@/lib/format";
import { loadImage, type PdfImage } from "./assets";
import {
  Body,
  Colophon,
  DocPage,
  Figure,
  InfoBox,
  Kicker,
  makeTheme,
  Masthead,
  NumberedItem,
  Ornament,
  ROMAN,
  Seal,
  SectionTitle,
  Standfirst,
  Title,
  formatLongDate,
  MARGIN_X,
  type PdfTheme,
} from "./components";

export type Ctx = { company: Company; onlineUrl: string };

export const docMeta = (title: string, company: Company) => ({
  title,
  author: site.name,
  subject: `${site.fullName} — categoria ${company.name}`,
  creator: site.name,
  producer: site.name,
  language: "pt-BR",
});

export const todayLabel = () => `${site.city.split(" - ")[0]}, ${formatLongDate(new Date())}`;

/* ------------------------------------------------------------------ */
/* Matéria                                                             */
/* ------------------------------------------------------------------ */

function ArticleBlock({
  t,
  post,
  image,
  imageHeight = 240,
}: {
  t: PdfTheme;
  post: Post;
  image: PdfImage | null;
  imageHeight?: number;
}) {
  return (
    <View>
      <Kicker t={t}>{post.category}</Kicker>
      <Title t={t}>{post.title}</Title>
      <Standfirst t={t}>{post.excerpt}</Standfirst>
      <View
        style={{
          flexDirection: "row",
          marginTop: 12,
          paddingVertical: 6,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: t.rule,
        }}
      >
        <Text style={{ fontFamily: "Display", fontSize: 7.5, letterSpacing: 1.2, color: t.muted }}>
          PUBLICADO EM {formatDate(post.date).toUpperCase()}   ·   {readingTime(post)} MIN DE LEITURA   ·   REDAÇÃO SINTAEMA-SC
        </Text>
      </View>
      {image ? <Figure t={t} image={image} caption={post.imageAlt} height={imageHeight} /> : <View style={{ height: 14 }} />}
      <Body t={t} paragraphs={post.content} />
    </View>
  );
}

export async function ArticleDocument({ company, onlineUrl, post }: Ctx & { post: Post }) {
  const t = makeTheme(company);
  const image = await loadImage(post.image);
  return (
    <Document {...docMeta(post.title, company)}>
      <DocPage t={t} running={post.title}>
        <Masthead t={t} company={company} section={`Notícias · ${post.category}`} dateLabel={todayLabel()} />
        <ArticleBlock t={t} post={post} image={image} />
        <Ornament t={t} />
        <Colophon
          t={t}
          onlineUrl={onlineUrl}
          note="Texto produzido para o portal do SINTAEMA-SC com base nas pautas públicas da entidade. Reprodução livre, desde que citada a fonte."
        />
      </DocPage>
    </Document>
  );
}

/* ------------------------------------------------------------------ */
/* Caderno de notícias                                                 */
/* ------------------------------------------------------------------ */

export async function NewsDigestDocument({
  company,
  onlineUrl,
  posts,
  category,
}: Ctx & { posts: Post[]; category?: string }) {
  const t = makeTheme(company);
  const images = await Promise.all(posts.map((post) => loadImage(post.image)));
  const lead = posts.find((post) => post.featured) ?? posts[0];
  const leadImage = lead ? await loadImage(lead.image) : null;
  const dates = posts.map((p) => p.date).sort();
  const period =
    dates.length > 0 ? `${formatDate(dates[0])} a ${formatDate(dates[dates.length - 1])}` : "Sem matérias no período";
  const title = category ? `Caderno de ${category}` : "Caderno de Notícias";

  return (
    <Document {...docMeta(`${title} — ${company.name}`, company)}>
      {/* Capa */}
      <DocPage t={t} running={title} bare>
        <View style={{ paddingHorizontal: MARGIN_X, paddingTop: 52, flex: 1 }}>
          <Masthead t={t} company={company} section="Edição compilada" dateLabel={todayLabel()} />
          <Kicker t={t}>Coletânea de matérias</Kicker>
          <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 46, lineHeight: 1.2, color: t.primary }}>
            {title.toUpperCase()}
          </Text>
          <Text style={{ fontStyle: "italic", fontSize: 13, color: t.muted, marginTop: 8 }}>
            Categoria {company.name} · {period}
          </Text>
          {leadImage ? <Figure t={t} image={leadImage} caption={lead?.title} credit="DESTAQUE" height={230} /> : null}

          <View style={{ marginTop: 6 }}>
            <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 9, letterSpacing: 2, color: t.red, marginBottom: 6 }}>
              NESTA EDIÇÃO
            </Text>
            {posts.map((post, index) => (
              <View
                key={post.slug}
                style={{
                  flexDirection: "row",
                  paddingVertical: 4,
                  borderBottomWidth: 0.4,
                  borderBottomColor: t.rule,
                }}
              >
                <Text style={{ fontFamily: "Display", fontSize: 9, color: t.primary, width: 22 }}>
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text style={{ fontSize: 9, flex: 1, color: t.ink }}>{post.title}</Text>
                <Text style={{ fontFamily: "Display", fontSize: 7.5, color: t.faint, marginLeft: 8, letterSpacing: 0.8 }}>
                  {post.category.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </DocPage>

      {/* Matérias */}
      <DocPage t={t} running={`${title} · ${company.name}`}>
        {posts.map((post, index) => (
          <View key={post.slug} break={index > 0}>
            <Text style={{ fontFamily: "Display", fontSize: 8, letterSpacing: 1.6, color: t.faint, marginBottom: 10 }}>
              MATÉRIA {String(index + 1).padStart(2, "0")} DE {String(posts.length).padStart(2, "0")}
            </Text>
            <ArticleBlock t={t} post={post} image={images[index]} imageHeight={170} />
          </View>
        ))}
        <Ornament t={t} />
        <Colophon t={t} onlineUrl={onlineUrl} />
      </DocPage>
    </Document>
  );
}

/* ------------------------------------------------------------------ */
/* Agenda                                                              */
/* ------------------------------------------------------------------ */

type AgendaEvent = { title: string; date: string; place: string; description: string };

export async function AgendaDocument({ company, onlineUrl, events }: Ctx & { events: AgendaEvent[] }) {
  const t = makeTheme(company);
  return (
    <Document {...docMeta(`Agenda — ${company.name}`, company)}>
      <DocPage t={t} running={`Agenda da categoria · ${company.name}`}>
        <Masthead t={t} company={company} section="Agenda" dateLabel={todayLabel()} />
        <Kicker t={t}>Calendário</Kicker>
        <Title t={t}>Agenda da categoria</Title>
        <Standfirst t={t}>{`Atos, assembleias e atendimentos do SINTAEMA-SC para a categoria da ${company.name}.`}</Standfirst>
        <View style={{ height: 16 }} />
        {events.map((event) => {
          const d = formatShortDate(event.date);
          return (
            <View
              key={event.title}
              wrap={false}
              style={{ flexDirection: "row", marginBottom: 12, borderWidth: 0.5, borderColor: t.rule, backgroundColor: "#FFFFFF" }}
            >
              <View style={{ width: 82, backgroundColor: t.primary, alignItems: "center", justifyContent: "center", paddingVertical: 14 }}>
                <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 30, color: "#FFFFFF", lineHeight: 1.2 }}>{d.day}</Text>
                <Text style={{ fontFamily: "Display", fontSize: 9, letterSpacing: 1.6, color: "#FFFFFF", marginTop: 1 }}>
                  {d.month.toUpperCase()} {d.year}
                </Text>
              </View>
              <View style={{ flex: 1, padding: 12 }}>
                <Text style={{ fontFamily: "Display", fontSize: 8, letterSpacing: 1.2, color: t.accent }}>
                  LOCAL · {event.place.toUpperCase()}
                </Text>
                <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 13, color: t.ink, textTransform: "uppercase", marginTop: 3 }}>
                  {event.title}
                </Text>
                <Text style={{ fontSize: 9.5, lineHeight: 1.5, color: t.muted, marginTop: 4 }}>{event.description}</Text>
              </View>
            </View>
          );
        })}
        <Colophon t={t} onlineUrl={onlineUrl} note="Datas e locais sujeitos a alteração. Confirme com a representação de base da sua região." />
      </DocPage>
    </Document>
  );
}

/* ------------------------------------------------------------------ */
/* O Sindicato                                                         */
/* ------------------------------------------------------------------ */

export async function AboutDocument({ company, onlineUrl }: Ctx) {
  const t = makeTheme(company);
  const image = await loadImage("/images/assembleia.jpg", "mono");
  return (
    <Document {...docMeta("O Sindicato — SINTAEMA-SC", company)}>
      <DocPage t={t} running="O Sindicato · Perfil institucional">
        <Masthead t={t} company={company} section="Perfil institucional" dateLabel={todayLabel()} />
        <Kicker t={t}>Histórico</Kicker>
        <Title t={t}>Sonhos, lutas e conquistas</Title>
        <Standfirst t={t}>
          Desde 1977 organizando trabalhadoras e trabalhadores em água, esgoto e meio ambiente de Santa Catarina.
        </Standfirst>
        {image ? <Figure t={t} image={image} caption="Assembleia da categoria" height={200} /> : null}
        <Body t={t} paragraphs={aboutParagraphs} />

        <InfoBox t={t} title="Identidade">
          <Text style={{ fontSize: 9.5, lineHeight: 1.5 }}>{site.fullName}</Text>
          <Text style={{ fontSize: 9.5, lineHeight: 1.5 }}>Fundação: 9 de novembro de 1977 · Sede: {site.city}</Text>
          <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 11, color: t.accent, marginTop: 4 }}>
            {site.slogan.toUpperCase()}
          </Text>
        </InfoBox>

        <View style={{ height: 8 }} />
        <SectionTitle t={t} eyebrow="Linha do tempo">Nossa trajetória</SectionTitle>
        <View style={{ borderLeftWidth: 1, borderLeftColor: t.rule, marginLeft: 6, paddingLeft: 16 }}>
          {aboutTimeline.map((item) => (
            <View key={item.year} wrap={false} style={{ marginBottom: 12 }}>
              <View
                style={{
                  position: "absolute",
                  left: -20.5,
                  top: 3,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: t.accent,
                }}
              />
              <Text style={{ fontFamily: "Display", fontSize: 9, letterSpacing: 1.4, color: t.secondary }}>
                {item.year.toUpperCase()}
              </Text>
              <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 12, color: t.ink, textTransform: "uppercase" }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 9.5, lineHeight: 1.5, color: t.muted, marginTop: 2 }}>{item.text}</Text>
            </View>
          ))}
        </View>

        <SectionTitle t={t} eyebrow="Princípios">O que defendemos</SectionTitle>
        <View style={{ flexDirection: "row" }}>
          {aboutValues.map((value, index) => (
            <View
              key={value.title}
              wrap={false}
              style={{ flex: 1, padding: 10, marginLeft: index ? 8 : 0, backgroundColor: t.tint, borderTopWidth: 2, borderTopColor: t.accent }}
            >
              <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 11, color: t.primary, textTransform: "uppercase" }}>
                {value.title}
              </Text>
              <Text style={{ fontSize: 9, lineHeight: 1.45, color: t.muted, marginTop: 3 }}>{value.text}</Text>
            </View>
          ))}
        </View>

        <Colophon t={t} onlineUrl={onlineUrl} />
      </DocPage>
    </Document>
  );
}

/* ------------------------------------------------------------------ */
/* Jurídico                                                            */
/* ------------------------------------------------------------------ */

export async function LegalDocument({ company, onlineUrl }: Ctx) {
  const t = makeTheme(company);
  return (
    <Document {...docMeta("Assessoria jurídica — SINTAEMA-SC", company)}>
      <DocPage t={t} running="Assessoria jurídica · Guia de atendimento">
        <Masthead t={t} company={company} section="Assessoria jurídica" dateLabel={todayLabel()} />
        <Kicker t={t}>Guia de atendimento</Kicker>
        <Title t={t}>Assessoria jurídica</Title>
        <Standfirst t={t}>
          {`Trabalhador(a) da ${company.name}: o plantão dos advogados no SINTAEMA-SC ocorre ${site.lawyers}. Todos os atendimentos precisam de agendamento.`}
        </Standfirst>

        <InfoBox t={t} title="Plantão jurídico">
          <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 15, color: t.ink }}>SEGUNDAS E QUARTAS · 14H ÀS 17H</Text>
          <Text style={{ fontSize: 9.5, color: t.muted, marginTop: 2 }}>
            Somente com hora marcada · {site.phone} · {site.email}
          </Text>
        </InfoBox>

        <View style={{ height: 8 }} />
        <SectionTitle t={t} eyebrow="Áreas de atuação">Como podemos ajudar</SectionTitle>
        {legalAreas.map((area, index) => (
          <NumberedItem key={area.title} t={t} n={ROMAN[index]} title={area.title} text={area.text} />
        ))}

        <SectionTitle t={t} eyebrow="Agendamento">Como agendar</SectionTitle>
        {legalSteps.map((step, index) => (
          <NumberedItem key={step.title} t={t} n={String(index + 1)} title={step.title} text={step.text} />
        ))}

        <InfoBox t={t} title="Leve ao atendimento">
          <Text style={{ fontSize: 9.5, lineHeight: 1.6, color: t.ink }}>
            Documento de identidade com foto · Carteira de trabalho ou contracheques recentes · Documentos relacionados ao
            caso (comunicados, laudos, PPP, cartas da empresa) · Anotações com datas e nomes envolvidos.
          </Text>
        </InfoBox>

        <Colophon t={t} onlineUrl={onlineUrl} />
      </DocPage>
    </Document>
  );
}

/* ------------------------------------------------------------------ */
/* Filie-se (com ficha de filiação para imprimir)                      */
/* ------------------------------------------------------------------ */

function Field({ t, label, flex = 1, value }: { t: PdfTheme; label: string; flex?: number; value?: string }) {
  return (
    <View style={{ flex, marginRight: 10 }}>
      <Text style={{ fontFamily: "Display", fontSize: 7, letterSpacing: 1.2, color: t.muted }}>{label.toUpperCase()}</Text>
      <View style={{ borderBottomWidth: 0.6, borderBottomColor: t.ink, height: 20, justifyContent: "flex-end", paddingBottom: 2 }}>
        {value ? <Text style={{ fontSize: 10 }}>{value}</Text> : null}
      </View>
    </View>
  );
}

export async function JoinDocument({ company, onlineUrl }: Ctx) {
  const t = makeTheme(company);
  const image = await loadImage("/images/uniao.jpg");
  const row = { flexDirection: "row" as const, marginBottom: 12 };
  return (
    <Document {...docMeta("Filie-se ao SINTAEMA-SC", company)}>
      <DocPage t={t} running="Filie-se · Campanha de filiação">
        <Masthead t={t} company={company} section="Campanha de filiação" dateLabel={todayLabel()} />
        <Kicker t={t}>Campanha de filiação</Kicker>
        <Title t={t}>Filie-se ao Sintaema</Title>
        <Standfirst t={t}>
          {`Trabalhadora e trabalhador da ${company.name}: cada direito conquistado foi fruto de muita luta. Faça parte desta história.`}
        </Standfirst>
        {image ? <Figure t={t} image={image} caption="Grupo de pessoas unidas em ato público" height={190} /> : null}

        <SectionTitle t={t} eyebrow="Passo a passo">Como se filiar</SectionTitle>
        {joinSteps.map((step, index) => (
          <NumberedItem key={step.title} t={t} n={String(index + 1)} title={step.title} text={step.text} />
        ))}

        <SectionTitle t={t} eyebrow="Vantagens">Por que se filiar?</SectionTitle>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {joinBenefits.map((benefit, index) => (
            <View
              key={benefit.title}
              wrap={false}
              style={{
                width: "48.5%",
                marginRight: index % 2 === 0 ? "3%" : 0,
                marginBottom: 8,
                padding: 10,
                backgroundColor: t.tint,
                borderTopWidth: 2,
                borderTopColor: t.accent,
              }}
            >
              <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 11, color: t.primary, textTransform: "uppercase" }}>
                {benefit.title}
              </Text>
              <Text style={{ fontSize: 9, lineHeight: 1.45, color: t.muted, marginTop: 3 }}>{benefit.text}</Text>
            </View>
          ))}
        </View>

        <Colophon t={t} onlineUrl={onlineUrl} note="Para se filiar, preencha a ficha da página seguinte, assine e entregue a um representante de base ou envie à sede do sindicato." />

        {/* Ficha */}
        <View break>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View style={{ flex: 1 }}>
              <Kicker t={t}>Documento para preenchimento</Kicker>
              <Title t={t} size={22}>Ficha de filiação</Title>
              <Text style={{ fontStyle: "italic", fontSize: 9.5, color: t.muted, marginTop: 8 }}>
                Preencha com letra legível, assine e entregue a um representante ou envie para {site.address}, {site.city}.
              </Text>
            </View>
            <Seal t={t} size={64} />
          </View>

          <View style={{ marginTop: 18 }}>
            <Text style={formHeading(t)}>DADOS PESSOAIS</Text>
            <View style={row}>
              <Field t={t} label="Nome completo" flex={3} />
              <Field t={t} label="Data de nascimento" />
            </View>
            <View style={row}>
              <Field t={t} label="CPF" />
              <Field t={t} label="RG / órgão emissor" />
              <Field t={t} label="Telefone / WhatsApp" />
            </View>
            <View style={row}>
              <Field t={t} label="E-mail" />
            </View>
            <View style={row}>
              <Field t={t} label="Endereço" flex={3} />
              <Field t={t} label="Nº" flex={0.6} />
            </View>
            <View style={row}>
              <Field t={t} label="Bairro" />
              <Field t={t} label="Cidade / UF" />
              <Field t={t} label="CEP" flex={0.7} />
            </View>

            <Text style={[formHeading(t), { marginTop: 8 }]}>DADOS FUNCIONAIS</Text>
            <View style={row}>
              <Field t={t} label="Empresa" flex={2} value={company.fullName} />
              <Field t={t} label="Matrícula" />
            </View>
            <View style={row}>
              <Field t={t} label="Cargo / função" />
              <Field t={t} label="Local de trabalho / lotação" />
              <Field t={t} label="Data de admissão" flex={0.8} />
            </View>
          </View>

          <View style={{ marginTop: 8, padding: 12, borderWidth: 0.6, borderColor: t.rule, backgroundColor: "#FFFFFF" }}>
            <Text style={formHeading(t)}>AUTORIZAÇÃO</Text>
            <Text style={{ fontSize: 9.5, lineHeight: 1.6, textAlign: "justify" }}>
              {`Declaro minha filiação ao ${site.fullName} — ${site.name}, CNPJ ${site.cnpj}, e autorizo a ${company.name} a descontar mensalmente em folha de pagamento a contribuição associativa de ${site.contribution}, a ser repassada à entidade, até manifestação em contrário por escrito.`}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 40 }}>
            <View style={{ flex: 1, marginRight: 30 }}>
              <View style={{ borderBottomWidth: 0.6, borderBottomColor: t.ink, height: 18 }} />
              <Text style={signLabel(t)}>LOCAL E DATA</Text>
            </View>
            <View style={{ flex: 1.4 }}>
              <View style={{ borderBottomWidth: 0.6, borderBottomColor: t.ink, height: 18 }} />
              <Text style={signLabel(t)}>ASSINATURA DO(A) TRABALHADOR(A)</Text>
            </View>
          </View>

          <View style={{ marginTop: 24, padding: 10, borderWidth: 0.6, borderStyle: "dashed", borderColor: t.faint }}>
            <Text style={{ fontFamily: "Display", fontSize: 7, letterSpacing: 1.2, color: t.faint }}>
              USO DO SINDICATO · RECEBIDO POR ____________________________  EM ____/____/________  Nº DE REGISTRO ____________
            </Text>
          </View>
        </View>

      </DocPage>
    </Document>
  );
}

const formHeading = (t: PdfTheme) => ({
  fontFamily: "Display",
  fontWeight: 500 as const,
  fontSize: 8.5,
  letterSpacing: 2,
  color: t.primary,
  marginBottom: 8,
});

const signLabel = (t: PdfTheme) => ({
  fontFamily: "Display",
  fontSize: 7,
  letterSpacing: 1.2,
  color: t.muted,
  marginTop: 4,
  textAlign: "center" as const,
});
