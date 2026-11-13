import type { NextConfig } from "next";

// Old URLs (before the per-company portal) send visitors to the company picker.
const legacyPaths = ["sobre", "noticias", "agenda", "juridico", "filie-se", "contato", "busca"];

const nextConfig: NextConfig = {
  // Geração de PDF roda no Node, fora do bundle.
  serverExternalPackages: ["@react-pdf/renderer", "sharp"],
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
