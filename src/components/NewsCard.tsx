import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/content";
import { formatDate } from "@/lib/format";

export function NewsCard({ post }: { post: Post }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-card transition hover:-translate-y-0.5">
      <Link href={`/noticias/${post.slug}`} className="block">
        <div className="relative aspect-[16/10]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 320px, 100vw"
          />
          <span className="absolute left-2 top-2 bg-brand-green px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {post.category}
          </span>
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wider text-slate-500">
            {formatDate(post.date)}
          </p>
          <h3 className="mt-2 font-display text-lg leading-snug text-brand-navy">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
