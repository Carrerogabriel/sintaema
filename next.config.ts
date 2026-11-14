import type { NextConfig } from "next";

// Old URLs (before the per-company portal) send visitors to the company picker.
const legacyPaths = ["sobre", "noticias", "agenda", "juridico", "filie-se", "contato", "busca"];

const nextConfig: NextConfig = {
  // Geração de PDF roda no Node, fora do bundle.
  serverExternalPackages: ["@react-pdf/renderer", "sharp"],
  // Os PDFs leem do disco as fontes (src/pdf/fonts) e as fotos (public/).
  // A Vercel só leva para a função os arquivos importados no código, então
  // esses precisam ser incluídos aqui, senão todo PDF dá erro 500.
  outputFileTracingIncludes: {
    "/[empresa]/pdf/[...doc]": [
      "./src/pdf/fonts/*.woff",
      "./public/historia/**/*.{jpg,jpeg,png,webp}",
      "./public/images/**/*",
      "./public/empresas/**/*",
    ],
  },
  // Envio de imagens das matérias pelo painel (os documentos do acervo usam rota própria).
  experimental: {
    serverActions: { bodySizeLimit: "12mb" },
  },
  async redirects() {
    return legacyPaths.flatMap((path) => [
      { source: `/${path}`, destination: "/", permanent: false },
      { source: `/${path}/:rest*`, destination: "/", permanent: false },
    ]);
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
