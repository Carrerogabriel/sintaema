import fs from "node:fs";
import { extensionOf, IMAGE_TYPES, mediaPath } from "@/server/files";

/** Serves images uploaded through the panel (public, used by news articles). */
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const file = mediaPath(name);
  const type = IMAGE_TYPES[extensionOf(name)];
  if (!file || !type || !fs.existsSync(file)) return new Response("Não encontrado", { status: 404 });

  const data = await fs.promises.readFile(file);
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
