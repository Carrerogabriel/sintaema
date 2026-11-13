import fs from "node:fs";
import path from "node:path";
import { Source_Serif_4 } from "next/font/google";
import { Battles } from "@/components/historia/Battles";
import { ChapterNav } from "@/components/historia/ChapterNav";
import { Closing } from "@/components/historia/Closing";
import { Conquests } from "@/components/historia/Conquests";
import { Context } from "@/components/historia/Context";
import { Opening } from "@/components/historia/Opening";
import { Origins } from "@/components/historia/Origins";
import { People } from "@/components/historia/People";
import { Present } from "@/components/historia/Present";
import type { Photos } from "@/components/historia/PhotoSlot";
import { Timeline } from "@/components/historia/Timeline";
import { photoSlots, yearsOfStruggle } from "@/data/historia";
import "./historia.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-story-serif",
  display: "swap",
});

export const metadata = {
  title: "Nossa história",
  description:
    "Da clandestinidade na ditadura à defesa da água pública: a história do SINTAEMA-SC, fundado em 9 de novembro de 1977.",
};

// Recalcula os "anos de história" e procura fotos novas uma vez por dia.
export const revalidate = 86400;

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

/** Para cada espaço de foto, procura o arquivo real em /public/historia. */
function resolvePhotos(): Photos {
  const dir = path.join(process.cwd(), "public", "historia");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return {};
  }
  const photos: Photos = {};
  for (const slot of Object.values(photoSlots)) {
    const match = EXTENSIONS.map((ext) => slot.file + ext).find((name) => files.includes(name));
    photos[slot.file] = match ? `/historia/${match}` : null;
  }
  return photos;
}

export default async function HistoryPage({ params }: { params: Promise<{ empresa: string }> }) {
  const { empresa } = await params;
  const base = `/${empresa}`;
  const years = yearsOfStruggle();
  const photos = resolvePhotos();

  return (
    <div className={`story ${serif.variable}`}>
      <ChapterNav />
      <Opening photos={photos} years={years} />
      <Context photos={photos} />
      <Origins photos={photos} />
      <Battles photos={photos} />
      <Conquests photos={photos} />
      <People photos={photos} base={base} />
      <Timeline photos={photos} />
      <Present photos={photos} years={years} base={base} />
      <Closing base={base} />
    </div>
  );
}
