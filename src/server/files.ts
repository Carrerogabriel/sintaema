import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { ARCHIVE_DIR, MEDIA_DIR } from "./db";

export const IMAGE_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export const ARCHIVE_TYPES: Record<string, string> = {
  ...IMAGE_TYPES,
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".ods": "application/vnd.oasis.opendocument.spreadsheet",
  ".txt": "text/plain; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".rtf": "application/rtf",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".zip": "application/zip",
};

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_ARCHIVE_BYTES = 200 * 1024 * 1024;

const STORED_NAME = /^[a-f0-9]{32}\.[a-z0-9]{2,5}$/;

export function extensionOf(fileName: string) {
  return path.extname(fileName).toLowerCase();
}

async function store(file: File, dir: string, allowed: Record<string, string>, maxBytes: number) {
  const ext = extensionOf(file.name);
  if (!allowed[ext]) throw new Error(`Tipo de arquivo não permitido (${ext || "sem extensão"}).`);
  if (file.size > maxBytes) throw new Error(`Arquivo maior que ${Math.round(maxBytes / 1024 / 1024)} MB.`);
  const storedName = `${crypto.randomBytes(16).toString("hex")}${ext}`;
  await fs.promises.writeFile(path.join(dir, storedName), Buffer.from(await file.arrayBuffer()));
  return { storedName, mime: allowed[ext], size: file.size };
}

export const storeImage = (file: File) => store(file, MEDIA_DIR, IMAGE_TYPES, MAX_IMAGE_BYTES);
export const storeArchiveFile = (file: File) => store(file, ARCHIVE_DIR, ARCHIVE_TYPES, MAX_ARCHIVE_BYTES);

function safePath(dir: string, storedName: string) {
  if (!STORED_NAME.test(storedName)) return null;
  return path.join(dir, storedName);
}

export const mediaPath = (name: string) => safePath(MEDIA_DIR, name);
export const archivePath = (name: string) => safePath(ARCHIVE_DIR, name);

export function removeStored(dir: "midia" | "acervo", storedName: string) {
  const file = safePath(dir === "midia" ? MEDIA_DIR : ARCHIVE_DIR, storedName);
  if (file) fs.promises.rm(file, { force: true }).catch(() => undefined);
}

/** "/midia/abc.jpg" → "abc.jpg" when the image was uploaded through the panel. */
export function uploadedMediaName(image: string) {
  const match = /^\/midia\/([a-f0-9]{32}\.[a-z0-9]{2,5})$/.exec(image);
  return match?.[1] ?? null;
}
