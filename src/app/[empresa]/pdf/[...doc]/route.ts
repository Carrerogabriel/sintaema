import { getCompany } from "@/data/companies";
import { buildPdf } from "@/pdf/build";

export const runtime = "nodejs";

/**
 * GET /[empresa]/pdf/<documento>
 *   ?download=1   → força o download (senão abre no visualizador do navegador)
 *   ?categoria=X  → no caderno de notícias, filtra por categoria
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ empresa: string; doc: string[] }> },
) {
  const { empresa, doc } = await params;
  const company = getCompany(empresa);
  if (!company) return new Response("Empresa não encontrada", { status: 404 });

  const url = new URL(request.url);
  const pdf = await buildPdf(company, doc.map(decodeURIComponent), {
    origin: url.origin,
    categoria: url.searchParams.get("categoria"),
  });
  if (!pdf) return new Response("Documento não encontrado", { status: 404 });

  const disposition = url.searchParams.has("download") ? "attachment" : "inline";
  return new Response(new Uint8Array(pdf.buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${pdf.filename}"`,
      "Content-Length": String(pdf.buffer.length),
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
