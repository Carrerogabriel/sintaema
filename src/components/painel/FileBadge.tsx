const styles: Record<string, string> = {
  pdf: "bg-red-100 text-red-700",
  doc: "bg-blue-100 text-blue-700",
  docx: "bg-blue-100 text-blue-700",
  odt: "bg-blue-100 text-blue-700",
  rtf: "bg-blue-100 text-blue-700",
  txt: "bg-slate-100 text-slate-700",
  xls: "bg-emerald-100 text-emerald-700",
  xlsx: "bg-emerald-100 text-emerald-700",
  ods: "bg-emerald-100 text-emerald-700",
  csv: "bg-emerald-100 text-emerald-700",
  ppt: "bg-orange-100 text-orange-700",
  pptx: "bg-orange-100 text-orange-700",
  jpg: "bg-violet-100 text-violet-700",
  jpeg: "bg-violet-100 text-violet-700",
  png: "bg-violet-100 text-violet-700",
  webp: "bg-violet-100 text-violet-700",
  gif: "bg-violet-100 text-violet-700",
  mp3: "bg-pink-100 text-pink-700",
  mp4: "bg-pink-100 text-pink-700",
  zip: "bg-amber-100 text-amber-800",
};

export function FileBadge({ fileName, size = "md" }: { fileName: string; size?: "sm" | "md" }) {
  const ext = (fileName.split(".").pop() ?? "").toLowerCase();
  const box = size === "sm" ? "h-10 w-10 text-[10px]" : "h-14 w-12 text-xs";
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-lg font-bold uppercase ${box} ${styles[ext] ?? "bg-slate-100 text-slate-600"}`}
      aria-hidden="true"
    >
      <span className="absolute right-0 top-0 h-3 w-3 rounded-bl-md bg-white/70" />
      {ext.slice(0, 4) || "?"}
    </span>
  );
}
