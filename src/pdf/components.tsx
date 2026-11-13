/* eslint-disable jsx-a11y/alt-text -- <Image> do react-pdf não tem atributo alt */
import type { ReactNode } from "react";
import {
  Defs,
  Image,
  LinearGradient,
  Page,
  Path,
  Stop,
  Svg,
  Text,
  View,
  Ellipse,
} from "@react-pdf/renderer";
import type { Style } from "@react-pdf/stylesheet";
import type { Company } from "@/data/companies";
import { site } from "@/data/content";
import { FOUNDED, yearsOfStruggle } from "@/data/historia";
import type { PdfImage } from "./assets";

/* ------------------------------------------------------------------ */
/* Paleta                                                              */
/* ------------------------------------------------------------------ */

/**
 * Papel envelhecido, tinta quase preta e filetes em sépia dão o tom de
 * documento de arquivo; as cores da empresa entram como assinatura.
 */
export type PdfTheme = {
  paper: string;
  ink: string;
  muted: string;
  faint: string;
  rule: string;
  tint: string;
  primary: string;
  accent: string;
  secondary: string;
  red: string;
};

export function makeTheme(company: Company): PdfTheme {
  return {
    paper: "#FBF8F1",
    ink: "#1F1B16",
    muted: "#5E564B",
    faint: "#8C8273",
    rule: "#C9B994",
    tint: "#F2EBDB",
    primary: company.colors.primary,
    accent: company.colors.accent,
    secondary: company.colors.secondary,
    red: "#8E2424",
  };
}

export const MARGIN_X = 58;

export const FOUNDED_LABEL = "Fundado em 9 de novembro de 1977";

export function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export function issuedLabel() {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}

/* ------------------------------------------------------------------ */
/* Página-base                                                         */
/* ------------------------------------------------------------------ */

/**
 * Página A4 com moldura fina, cabeçalho corrido (a partir da 2ª página do
 * documento) e rodapé institucional com numeração.
 */
export function DocPage({
  t,
  running,
  children,
  bare = false,
  style,
}: {
  t: PdfTheme;
  /** Texto do cabeçalho corrido (lado direito). */
  running: string;
  children: ReactNode;
  /** Sem cabeçalho/rodapé (capas). */
  bare?: boolean;
  style?: Style;
}) {
  return (
    <Page
      size="A4"
      style={{
        backgroundColor: t.paper,
        color: t.ink,
        fontFamily: "Serif",
        fontSize: 10.5,
        // sem ligaduras: o texto copiado do PDF sai idêntico ao original ("fi", "fl")
        fontFeatureSettings: { liga: false },
        paddingTop: bare ? 0 : 66,
        paddingBottom: bare ? 0 : 70,
        paddingHorizontal: bare ? 0 : MARGIN_X,
        ...style,
      }}
    >
      {/* moldura dupla */}
      <View
        fixed
        style={{ position: "absolute", top: 18, left: 18, right: 18, bottom: 18, borderWidth: 0.6, borderColor: t.rule }}
      />
      <View
        fixed
        style={{ position: "absolute", top: 21, left: 21, right: 21, bottom: 21, borderWidth: 0.3, borderColor: t.rule }}
      />

      {bare ? null : (
        <>
          <View
            fixed
            style={{ position: "absolute", top: 34, left: MARGIN_X, right: MARGIN_X }}
            render={({ pageNumber }) =>
              pageNumber === 1 ? null : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    paddingBottom: 5,
                    borderBottomWidth: 0.5,
                    borderBottomColor: t.rule,
                  }}
                >
                  <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 8, letterSpacing: 2, color: t.primary }}>
                    SINTAEMA · SC
                  </Text>
                  <Text
                    style={{
                      fontStyle: "italic",
                      fontSize: 8,
                      color: t.faint,
                      maxWidth: 360,
                      textAlign: "right",
                      maxLines: 1,
                      textOverflow: "ellipsis",
                    }}
                  >
                    {running}
                  </Text>
                </View>
              )
            }
          />
          <View
            fixed
            style={{
              position: "absolute",
              bottom: 32,
              left: MARGIN_X,
              right: MARGIN_X,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 6,
              borderTopWidth: 0.5,
              borderTopColor: t.rule,
            }}
          >
            <Text style={{ fontSize: 7, color: t.faint, letterSpacing: 0.3 }}>
              {site.name} · {site.address} · {site.city} · CNPJ {site.cnpj}
            </Text>
            <Text
              style={{ fontFamily: "Display", fontSize: 7.5, letterSpacing: 1, color: t.muted }}
              render={({ pageNumber, totalPages }) => `PÁGINA ${pageNumber} DE ${totalPages}`}
            />
          </View>
        </>
      )}

      {children}
    </Page>
  );
}

/* ------------------------------------------------------------------ */
/* Marca                                                               */
/* ------------------------------------------------------------------ */

export function DropMark({ size = 30, mono }: { size?: number; mono?: string }) {
  return (
    <Svg viewBox="0 0 56 72" style={{ width: size * (56 / 72), height: size }}>
      <Defs>
        <LinearGradient id="pdf-drop" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#4ec6f2" />
          <Stop offset="55%" stopColor="#0090d0" />
          <Stop offset="100%" stopColor="#0077b3" />
        </LinearGradient>
      </Defs>
      <Path d="M28 4C16 22 8 34 8 46a20 20 0 0 0 40 0C48 34 40 22 28 4Z" fill={mono ?? "url(#pdf-drop)"} />
      <Path
        d="M18 47c2 7 8 12 16 12 3 0 6-.7 8-2-3 7-10 11-17 8-8-3-11-12-7-18Z"
        fill={mono ? "#ffffff" : "#1aaa4a"}
        opacity={mono ? 0.35 : 0.95}
      />
      <Ellipse cx="21" cy="34" rx="3" ry="6" fill="#fff" opacity={0.35} transform="rotate(20 21 34)" />
    </Svg>
  );
}

/**
 * Cabeçalho de jornal (primeira página): marca, nome completo da entidade,
 * fundação e linha de edição com data, empresa e seção.
 */
export function Masthead({
  t,
  company,
  section,
  dateLabel,
}: {
  t: PdfTheme;
  company: Company;
  section: string;
  dateLabel: string;
}) {
  const years = yearsOfStruggle();
  return (
    <View style={{ marginBottom: 22 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <DropMark size={38} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 28, letterSpacing: 3, color: t.primary, lineHeight: 1.2 }}>
              SINTAEMA
            </Text>
            <Text style={{ fontFamily: "Display", fontSize: 7, letterSpacing: 2.2, color: t.muted, marginTop: 1 }}>
              ÁGUA · ESGOTO · MEIO AMBIENTE · SANTA CATARINA
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontStyle: "italic", fontSize: 8.5, color: t.muted }}>{FOUNDED_LABEL}</Text>
          <Text style={{ fontFamily: "Display", fontSize: 8, letterSpacing: 1.6, color: t.red, marginTop: 3 }}>
            {years} ANOS DE LUTA · {FOUNDED.year}–{new Date().getFullYear()}
          </Text>
        </View>
      </View>

      <Text style={{ fontStyle: "italic", fontSize: 8.5, color: t.muted, marginTop: 8 }}>{site.fullName}</Text>

      {/* filete duplo de jornal */}
      <View style={{ marginTop: 8, height: 2.2, backgroundColor: t.primary }} />
      <View style={{ marginTop: 1.6, height: 0.6, backgroundColor: t.primary }} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 5,
          borderBottomWidth: 0.5,
          borderBottomColor: t.rule,
        }}
      >
        <Text style={metaText(t)}>{dateLabel.toUpperCase()}</Text>
        <Text style={metaText(t)}>CATEGORIA {company.name.toUpperCase()}</Text>
        <Text style={metaText(t)}>{section.toUpperCase()}</Text>
      </View>
    </View>
  );
}

const metaText = (t: PdfTheme): Style => ({
  fontFamily: "Display",
  fontSize: 7.5,
  letterSpacing: 1.4,
  color: t.muted,
});

/* ------------------------------------------------------------------ */
/* Tipografia                                                          */
/* ------------------------------------------------------------------ */

export function Kicker({ t, children, color }: { t: PdfTheme; children: ReactNode; color?: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
      <View style={{ width: 16, height: 1.4, backgroundColor: color ?? t.accent, marginRight: 6 }} />
      <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 8.5, letterSpacing: 2.2, color: color ?? t.accent }}>
        {typeof children === "string" ? children.toUpperCase() : children}
      </Text>
    </View>
  );
}

export function Title({ t, children, size = 25 }: { t: PdfTheme; children: string; size?: number }) {
  return (
    <Text
      style={{
        fontFamily: "Display",
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1.18,
        color: t.primary,
        textTransform: "uppercase",
      }}
    >
      {children}
    </Text>
  );
}

export function Standfirst({ t, children }: { t: PdfTheme; children: string }) {
  return (
    <Text style={{ fontStyle: "italic", fontSize: 12.5, lineHeight: 1.5, color: t.muted, marginTop: 10 }}>
      {children}
    </Text>
  );
}

export function SectionTitle({ t, eyebrow, children }: { t: PdfTheme; eyebrow?: string; children: string }) {
  return (
    <View style={{ marginBottom: 12, marginTop: 6 }} wrap={false} minPresenceAhead={90}>
      {eyebrow ? <Kicker t={t}>{eyebrow}</Kicker> : null}
      <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 16, color: t.primary, textTransform: "uppercase" }}>
        {children}
      </Text>
      <View style={{ marginTop: 6, height: 0.6, width: 60, backgroundColor: t.rule }} />
    </View>
  );
}

const bodyStyle: Style = { fontSize: 10.8, lineHeight: 1.62, textAlign: "justify", marginBottom: 9 };

/**
 * Corpo de texto. O primeiro parágrafo abre com as primeiras palavras em
 * versalete (abertura clássica de jornal).
 */
export function Body({ t, paragraphs, dropCap = true }: { t: PdfTheme; paragraphs: string[]; dropCap?: boolean }) {
  return (
    <View>
      {paragraphs.map((paragraph, index) => {
        if (index === 0 && dropCap) {
          const words = paragraph.split(" ");
          const lead = words.slice(0, 4).join(" ");
          return (
            <Text key={index} style={bodyStyle}>
              <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 11.5, letterSpacing: 0.8, color: t.primary }}>
                {lead.toUpperCase()}
              </Text>
              {` ${words.slice(4).join(" ")}`}
            </Text>
          );
        }
        return (
          <Text key={index} style={bodyStyle}>
            {paragraph}
          </Text>
        );
      })}
    </View>
  );
}

export function PullQuote({ t, children, color }: { t: PdfTheme; children: string; color?: string }) {
  return (
    <View
      wrap={false}
      style={{ marginVertical: 10, paddingLeft: 14, borderLeftWidth: 2.2, borderLeftColor: color ?? t.accent }}
    >
      <Text style={{ fontStyle: "italic", fontWeight: 600, fontSize: 14, lineHeight: 1.4, color: t.ink }}>
        “{children}”
      </Text>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Ornamentos                                                          */
/* ------------------------------------------------------------------ */

/** Filete com losango central — fecho clássico de matéria. */
export function Ornament({ t, marginVertical = 16 }: { t: PdfTheme; marginVertical?: number }) {
  const diamond = (size: number, color: string) => (
    <View style={{ width: size, height: size, backgroundColor: color, transform: "rotate(45deg)", marginHorizontal: 5 }} />
  );
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical }}>
      <View style={{ width: 70, height: 0.6, backgroundColor: t.rule }} />
      {diamond(3, t.rule)}
      {diamond(5, t.primary)}
      {diamond(3, t.rule)}
      <View style={{ width: 70, height: 0.6, backgroundColor: t.rule }} />
    </View>
  );
}

/** Selo circular da entidade. */
export function Seal({ t, size = 78, color }: { t: PdfTheme; size?: number; color?: string }) {
  const c = color ?? t.primary;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.4,
        borderColor: c,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: size - 8,
          height: size - 8,
          borderRadius: (size - 8) / 2,
          borderWidth: 0.5,
          borderColor: c,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: "Display", fontSize: size * 0.085, letterSpacing: 1.2, color: c }}>SINTAEMA·SC</Text>
        <View style={{ width: size * 0.42, height: 0.5, backgroundColor: c, marginTop: 2 }} />
        <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: size * 0.24, color: c, lineHeight: 1.15 }}>
          1977
        </Text>
        <View style={{ width: size * 0.42, height: 0.5, backgroundColor: c, marginBottom: 2 }} />
        <Text style={{ fontFamily: "Display", fontSize: size * 0.075, letterSpacing: 1.2, color: c }}>FUNDAÇÃO</Text>
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Imagem com legenda                                                  */
/* ------------------------------------------------------------------ */

export function Figure({
  t,
  image,
  caption,
  height = 250,
  credit,
}: {
  t: PdfTheme;
  image: PdfImage;
  caption?: string;
  height?: number;
  credit?: string;
}) {
  return (
    <View wrap={false} style={{ marginVertical: 12 }}>
      <View style={{ padding: 4, backgroundColor: "#FFFFFF", borderWidth: 0.5, borderColor: t.rule }}>
        <Image src={{ data: image.data, format: image.format }} style={{ width: "100%", height, objectFit: "cover" }} />
      </View>
      {caption ? (
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Text style={{ fontFamily: "Display", fontSize: 7, letterSpacing: 1.2, color: t.accent, marginRight: 6 }}>
            {credit ?? "FOTO"}
          </Text>
          <Text style={{ fontStyle: "italic", fontSize: 8, color: t.muted, flex: 1 }}>{caption}</Text>
        </View>
      ) : null}
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Colofão                                                             */
/* ------------------------------------------------------------------ */

/** Bloco final com selo, origem do documento e contatos da entidade. */
export function Colophon({ t, onlineUrl, note }: { t: PdfTheme; onlineUrl: string; note?: string }) {
  return (
    <View wrap={false} style={{ marginTop: 18 }}>
      <View style={{ height: 0.6, backgroundColor: t.primary }} />
      <View style={{ marginTop: 1.6, height: 2, backgroundColor: t.primary }} />
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 14 }}>
        <Seal t={t} size={74} />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 9, letterSpacing: 1.6, color: t.primary }}>
            {site.name.toUpperCase()} · {site.slogan.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 8.5, lineHeight: 1.5, color: t.muted, marginTop: 4 }}>
            {note ??
              "Documento gerado a partir do portal oficial do sindicato. Reprodução livre, desde que citada a fonte."}
          </Text>
          <Text style={{ fontSize: 8, lineHeight: 1.5, color: t.muted, marginTop: 4 }}>
            Sede: {site.address}, CEP {site.cep}, {site.city} · Tel. {site.phone} · {site.email}
          </Text>
          <Text style={{ fontSize: 8, color: t.faint, marginTop: 4 }}>
            Versão online: <Text style={{ color: t.secondary }}>{onlineUrl}</Text> · Emitido em {issuedLabel()}
          </Text>
        </View>
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* Caixas                                                              */
/* ------------------------------------------------------------------ */

export function InfoBox({ t, title, children }: { t: PdfTheme; title: string; children: ReactNode }) {
  return (
    <View
      wrap={false}
      style={{ backgroundColor: t.tint, borderLeftWidth: 2.4, borderLeftColor: t.accent, padding: 12, marginVertical: 10 }}
    >
      <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 9, letterSpacing: 1.6, color: t.primary, marginBottom: 4 }}>
        {title.toUpperCase()}
      </Text>
      {children}
    </View>
  );
}

/** Item numerado (passos, áreas de atuação). */
export function NumberedItem({ t, n, title, text }: { t: PdfTheme; n: string; title: string; text: string }) {
  return (
    <View wrap={false} style={{ flexDirection: "row", marginBottom: 12 }}>
      <View
        style={{
          width: 26,
          height: 26,
          borderRadius: 13,
          borderWidth: 1,
          borderColor: t.primary,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        <Text style={{ fontFamily: "Display", fontWeight: 600, fontSize: 10, color: t.primary }}>{n}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "Display", fontWeight: 500, fontSize: 11, color: t.ink, textTransform: "uppercase" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 10, lineHeight: 1.5, color: t.muted, marginTop: 2 }}>{text}</Text>
      </View>
    </View>
  );
}

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
