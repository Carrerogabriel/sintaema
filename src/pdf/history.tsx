/* eslint-disable jsx-a11y/alt-text -- <Image> do react-pdf não tem atributo alt */
import { Document, Image, Text, View } from "@react-pdf/renderer";
import { site } from "@/data/content";
import {
  battles,
  conquests,
  contextSteps,
  milestones,
  numbers,
  originalText,
  photoSlots,
  waterVictories,
  yearsOfStruggle,
  type PhotoKey,
} from "@/data/historia";
import { loadImage, type PdfImage, type PhotoTone } from "./assets";
import {
  Body,
  Colophon,
  DocPage,
  DropMark,
  Figure,
  Kicker,
  makeTheme,
  MARGIN_X,
  PullQuote,
  Seal,
  Standfirst,
  Title,
  formatLongDate,
  type PdfTheme,
} from "./components";
import { docMeta, type Ctx } from "./documents";

type Era = "chumbo" | "luta" | "agua";

/** Fotos antigas em sépia, anos de greve em preto e branco, presente em cor. */
const toneOf: Record<Era, PhotoTone> = { chumbo: "sepia", luta: "mono", agua: "color" };

const photo = (key: PhotoKey, era: Era) => loadImage(`/historia/${photoSlots[key].file}`, toneOf[era]);

const DARK = "#17130F";
const PARCHMENT = "#E9DFC8";

function ActOpening({
  t,
  number,
  title,
  period,
  intro,
  color,
}: {
  t: PdfTheme;
  number: string;
  title: string;
  period: string;
  intro: string;
  color: string;
}) {
  return (
    <View style={{ borderBottomWidth: 0.6, borderBottomColor: t.rule, paddingBottom: 14, marginBottom: 16 }}>
      <Text style={{ fontFamily: "Display", fontSize: 9, letterSpacing: 3, color }}>
        {`CAPÍTULO ${number} · ${period.toUpperCase()}`}
      </Text>
      <Text
        style={{ fontFamily: "Display", fontWeight: 600, fontSize: 32, color: t.ink, textTransform: "uppercase", marginTop: 4 }}
      >
        {title}
      </Text>
      <Text style={{ fontStyle: "italic", fontSize: 12, lineHeight: 1.5, color: t.muted, marginTop: 6 }}>{intro}</Text>
    </View>
  );
}

function Entry({
  t,
  label,
  title,
  text,
  color,
  image,
  caption,
}: {
  t: PdfTheme;
  label: string;
  title: string;
  text: string;
  color: string;
  image?: PdfImage | null;
  caption?: string;
}) {
  return (
    <View style={{ marginBottom: 14 }} wrap={!image}>
      <View minPresenceAhead={60} style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 4 }}>
        <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 15, color, marginRight: 10 }}>{label}</Text>
        <Text
          style={{
            fontFamily: "Display",
            fontWeight: 500,
            fontSize: 12,
            color: t.ink,
            textTransform: "uppercase",
            flex: 1,
            paddingBottom: 1,
          }}
        >
          {title}
        </Text>
      </View>
      {image ? <Figure t={t} image={image} caption={caption} credit="ACERVO" height={190} /> : null}
      <Text style={{ fontSize: 10.8, lineHeight: 1.6, textAlign: "justify" }}>{text}</Text>
    </View>
  );
}

export async function HistoryDocument({ company, onlineUrl }: Ctx) {
  const t = makeTheme(company);
  const years = yearsOfStruggle();
  const eraColor: Record<Era, string> = { chumbo: t.red, luta: t.primary, agua: t.accent };

  const [cover, battlePhotos, conquestPhotos, milestonePhotos] = await Promise.all([
    // Só foto real do acervo (public/historia); sem ela, a capa é tipográfica.
    loadImage(`/historia/${photoSlots.abertura.file}`, "sepia"),
    Promise.all(battles.map((b) => photo(b.photo, "luta"))),
    Promise.all(conquests.map((c) => photo(c.photo, "luta"))),
    Promise.all(milestones.map((m) => photo(m.photo, m.era))),
  ]);

  // Uma mesma foto não se repete no documento.
  const used = new Set<string>();
  const once = (key: PhotoKey, img: PdfImage | null) => {
    if (!img || used.has(key)) return null;
    used.add(key);
    return img;
  };

  return (
    <Document {...docMeta("Sonhos, lutas e conquistas — a história do SINTAEMA-SC", company)}>
      {/* ───────────── Capa ───────────── */}
      <DocPage t={t} running="" bare style={{ backgroundColor: DARK, color: PARCHMENT }}>
        <View style={{ flex: 1, paddingHorizontal: MARGIN_X, paddingTop: 60, paddingBottom: 56 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <DropMark size={30} />
            <Text
              style={{ fontFamily: "Display", fontWeight: 600, fontSize: 16, letterSpacing: 4, color: PARCHMENT, marginLeft: 10 }}
            >
              SINTAEMA · SC
            </Text>
          </View>
          <Text style={{ fontFamily: "Display", fontSize: 8, letterSpacing: 2.4, color: "#B9A88A", marginTop: 26 }}>
            DOSSIÊ HISTÓRICO · EDIÇÃO COMEMORATIVA
          </Text>
          <Text
            style={{ fontFamily: "Display", fontWeight: 600, fontSize: 150, lineHeight: 0.95, color: "#2C251D", marginTop: 6 }}
          >
            1977
          </Text>
          <Text
            style={{ fontFamily: "Display", fontWeight: 600, fontSize: 40, lineHeight: 1.05, color: "#F6EFE0", marginTop: -40 }}
          >
            {"SONHOS, LUTAS\nE CONQUISTAS"}
          </Text>
          <View style={{ width: 60, height: 2, backgroundColor: "#B33A3A", marginVertical: 14 }} />
          <Text style={{ fontStyle: "italic", fontSize: 13, lineHeight: 1.5, color: "#CFC2A6", maxWidth: 380 }}>
            {`Da clandestinidade nos anos de chumbo à defesa da água pública: ${years} anos de história do sindicato dos trabalhadores em água, esgoto e meio ambiente de Santa Catarina.`}
          </Text>

          {cover ? (
            <View style={{ marginTop: 26, padding: 5, backgroundColor: "#F3EBDA", transform: "rotate(-1.2deg)" }}>
              <Image
                src={{ data: cover.data, format: cover.format }}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
              <Text style={{ fontStyle: "italic", fontSize: 7.5, color: "#5E564B", marginTop: 4 }}>
                {photoSlots.abertura.alt} — acervo SINTAEMA-SC
              </Text>
            </View>
          ) : (
            <View style={{ marginTop: 34, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#4A3F33" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 12 }}>
                {milestones.map((m) => (
                  <View key={`${m.year}-${m.title}`} style={{ alignItems: "center" }}>
                    <View
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 2.5,
                        marginBottom: 6,
                        backgroundColor: m.era === "chumbo" ? "#B33A3A" : m.era === "luta" ? "#C9B994" : "#5FAE7B",
                      }}
                    />
                    <Text style={{ fontFamily: "Display", fontSize: 7.5, letterSpacing: 0.6, color: "#B9A88A" }}>
                      {m.year.replace("Anos ", "").toUpperCase()}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={{ flex: 1 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderTopWidth: 0.5,
              borderTopColor: "#4A3F33",
              paddingTop: 10,
            }}
          >
            <View style={{ maxWidth: 360 }}>
              <Text style={{ fontSize: 8, color: "#B9A88A" }}>{site.fullName}</Text>
              <Text style={{ fontSize: 8, color: "#8C8273", marginTop: 2 }}>
                {`Edição para a categoria ${company.name} · ${formatLongDate(new Date())}`}
              </Text>
            </View>
            <Seal t={t} size={62} color="#C9B994" />
          </View>
        </View>
      </DocPage>

      {/* ───────────── Miolo ───────────── */}
      <DocPage t={t} running="Sonhos, lutas e conquistas · A história do SINTAEMA-SC">
        <Kicker t={t} color={t.red}>Apresentação</Kicker>
        <Title t={t} size={22}>{`${years} anos de organização e resistência`}</Title>
        <Standfirst t={t}>
          Este dossiê reúne a trajetória do SINTAEMA-SC — da organização clandestina na ditadura às greves da
          redemocratização e à defesa da água pública — a partir do histórico oficial da entidade.
        </Standfirst>

        <View
          style={{
            flexDirection: "row",
            marginTop: 18,
            marginBottom: 8,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: t.rule,
          }}
        >
          {numbers.map((item, index) => (
            <View
              key={item.label}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderLeftWidth: index === 0 ? 0 : 0.5,
                borderLeftColor: t.rule,
              }}
            >
              <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 26, color: t.red }}>
                {`${item.value}${item.suffix ?? ""}`}
              </Text>
              <Text style={{ fontSize: 8, lineHeight: 1.35, color: t.muted, marginTop: 2 }}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 9, letterSpacing: 2, color: t.primary, marginBottom: 8 }}>
            SUMÁRIO
          </Text>
          {[
            ["I", "Anos de chumbo", "A organização na clandestinidade"],
            ["II", "As primeiras batalhas", "Greves e resistência após a ditadura"],
            ["III", "Conquistas e transformações", "Direitos, emprego e água pública"],
            ["IV", "O Sindicato ao longo do tempo", "Linha do tempo de 1970 aos dias de hoje"],
            ["—", "Anexo", originalText.title],
          ].map(([n, title, sub]) => (
            <View
              key={title}
              style={{ flexDirection: "row", paddingVertical: 5, borderBottomWidth: 0.4, borderBottomColor: t.rule }}
            >
              <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 11, color: t.red, width: 30 }}>{n}</Text>
              <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 11, color: t.ink, textTransform: "uppercase" }}>
                {title}
              </Text>
              <Text style={{ fontStyle: "italic", fontSize: 9, color: t.faint, marginLeft: 8, paddingTop: 1.5, flex: 1 }}>
                {sub}
              </Text>
            </View>
          ))}
        </View>

        {/* I — Anos de chumbo */}
        <View break>
          <ActOpening
            t={t}
            number="I"
            title="Anos de chumbo"
            period="Década de 1970"
            intro="Lutar por direitos era proibido. Mesmo assim, a categoria decidiu se organizar."
            color={t.red}
          />
          {contextSteps.map((step) => (
            <View key={step.keyword} style={{ marginBottom: 10 }}>
              <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 9, letterSpacing: 1.8, color: t.red }}>
                {step.keyword.toUpperCase()}
              </Text>
              <Text style={{ fontSize: 10.8, lineHeight: 1.6, textAlign: "justify", marginTop: 2 }}>{step.text}</Text>
              {"quote" in step && step.quote ? <PullQuote t={t} color={t.red}>{step.quote}</PullQuote> : null}
            </View>
          ))}
          {milestones
            .filter((m) => m.era === "chumbo")
            .map((m) => {
              const image = once(m.photo, milestonePhotos[milestones.indexOf(m)]);
              return (
                <Entry
                  key={m.year}
                  t={t}
                  label={m.year}
                  title={m.title}
                  text={m.text}
                  color={t.red}
                  image={image}
                  caption={photoSlots[m.photo].alt}
                />
              );
            })}
          <PullQuote t={t} color={t.red}>Ousaram e fundaram o nosso Sindicato.</PullQuote>
        </View>

        {/* II — Primeiras batalhas */}
        <View break>
          <ActOpening
            t={t}
            number="II"
            title="As primeiras batalhas"
            period="1985 — 1989"
            intro="Com o fim da ditadura e impulsionado pelo momento político do país, o Sindicato passa a travar inúmeras batalhas."
            color={t.primary}
          />
          {battles.map((battle, index) => (
            <Entry
              key={battle.title}
              t={t}
              label={battle.date}
              title={battle.title}
              text={battle.text}
              color={t.primary}
              image={once(battle.photo, battlePhotos[index])}
              caption={photoSlots[battle.photo].alt}
            />
          ))}
          <PullQuote t={t} color={t.primary}>
            Trinta e seis dias de greve com salários descontados, culminando com a greve de fome de 5 dias.
          </PullQuote>
        </View>

        {/* III — Conquistas */}
        <View break>
          <ActOpening
            t={t}
            number="III"
            title="Conquistas e transformações"
            period="1985 — hoje"
            intro="Planos de carreira e de saúde, emprego, concurso público e, a partir de 2002, a luta pela água pública."
            color={t.accent}
          />
          {conquests.map((conquest, index) => (
            <Entry
              key={conquest.title}
              t={t}
              label={conquest.period}
              title={conquest.title}
              text={conquest.text}
              color={t.accent}
              image={once(conquest.photo, conquestPhotos[index])}
              caption={photoSlots[conquest.photo].alt}
            />
          ))}
          <View style={{ flexDirection: "row", marginTop: 4 }}>
            {waterVictories.map((victory, index) => (
              <View
                key={victory.title}
                wrap={false}
                style={{
                  flex: 1,
                  marginLeft: index ? 10 : 0,
                  padding: 12,
                  backgroundColor: t.tint,
                  borderTopWidth: 2,
                  borderTopColor: t.accent,
                }}
              >
                <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 11, color: t.primary, textTransform: "uppercase" }}>
                  {victory.title}
                </Text>
                <Text style={{ fontSize: 9.5, lineHeight: 1.5, color: t.muted, marginTop: 3 }}>{victory.text}</Text>
              </View>
            ))}
          </View>
          <PullQuote t={t} color={t.accent}>Hora da onça beber água.</PullQuote>
        </View>

        {/* IV — Linha do tempo */}
        <View break>
          <ActOpening
            t={t}
            number="IV"
            title="O Sindicato ao longo do tempo"
            period={`1970 — ${new Date().getFullYear()}`}
            intro="Os marcos da trajetória do SINTAEMA-SC, dos anos de chumbo aos dias de hoje."
            color={t.red}
          />
          <View style={{ borderLeftWidth: 1, borderLeftColor: t.rule, marginLeft: 6, paddingLeft: 18 }}>
            {milestones.map((m, index) => {
              const image = once(m.photo, milestonePhotos[index]);
              return (
                <View key={`${m.year}-${m.title}`} wrap={false} style={{ marginBottom: 12 }}>
                  <View
                    style={{
                      position: "absolute",
                      left: -22.5,
                      top: 4,
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: eraColor[m.era],
                    }}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 12, color: eraColor[m.era] }}>
                        {m.year.toUpperCase()}
                      </Text>
                      <Text
                        style={{ fontFamily: "Display", fontWeight: 500, fontSize: 11, color: t.ink, textTransform: "uppercase" }}
                      >
                        {m.title}
                      </Text>
                      <Text style={{ fontSize: 9.5, lineHeight: 1.5, color: t.muted, marginTop: 2 }}>{m.text}</Text>
                    </View>
                    {image ? (
                      <View style={{ width: 120, marginLeft: 12, padding: 3, backgroundColor: "#FFFFFF", borderWidth: 0.5, borderColor: t.rule }}>
                        <Image src={{ data: image.data, format: image.format }} style={{ width: "100%", height: 78, objectFit: "cover" }} />
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Anexo */}
        <View break>
          <Kicker t={t} color={t.red}>Anexo · Texto comemorativo na íntegra</Kicker>
          <Title t={t} size={20}>{originalText.title}</Title>
          <View style={{ height: 14 }} />
          <Body t={t} paragraphs={originalText.paragraphs} />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Display",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: 2,
              color: t.red,
              marginTop: 10,
            }}
          >
            A VIDA SEGUE E A LUTA CONTINUA!
          </Text>
          <Colophon
            t={t}
            onlineUrl={onlineUrl}
            note="Dossiê elaborado a partir do histórico oficial do SINTAEMA-SC. Fotografias de arquivo reproduzidas em tons históricos (sépia, preto e branco e cor)."
          />
        </View>
      </DocPage>
    </Document>
  );
}
