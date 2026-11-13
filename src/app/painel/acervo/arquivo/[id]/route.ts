import fs from "node:fs";
import { Readable } from "node:stream";
import { currentUser } from "@/server/auth";
import { getDocument } from "@/server/documents";
import { archivePath } from "@/server/files";

/** Streams an archive file to any logged-in user. `?baixar=1` forces download. */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await currentUser();
  if (!user) return new Response("Faça login para acessar o acervo.", { status: 401 });

  const { id } = await params;
  const doc = getDocument(Number(id));
  const file = doc ? archivePath(doc.stored_name) : null;
  if (!doc || !file || !fs.existsSync(file)) return new Response("Arquivo não encontrado.", { status: 404 });

  const download = new URL(request.url).searchParams.has("baixar");
  const encoded = encodeURIComponent(doc.file_name);
  const ascii = doc.file_name.replace(/[^\x20-\x7e]/g, "_").replace(/"/g, "");
  const stat = await fs.promises.stat(file);

  return new Response(Readable.toWeb(fs.createReadStream(file)) as ReadableStream, {
    headers: {
      "Content-Type": doc.mime,
      "Content-Length": String(stat.size),
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${ascii}"; filename*=UTF-8''${encoded}`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
