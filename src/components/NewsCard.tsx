import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data/content";
import { categoryStyles, formatDate, readingTime } from "@/lib/format";
import { Icon } from "./Icon";

export function NewsCard({
  post,
  base,
  variant = "default",
  priority = false,
}: {
  post: Post;
  base: string;
  variant?: "default" | "horizontal";
  priority?: boolean;
}) {
  const horizontal = variant === "horizontal";
  return (
    <article className="card card-hover group h-full overflow-hidden">
      <Link
        href={`${base}/noticias/${post.slug}`}
        className={`flex h-full ${horizontal ? "flex-row" : "flex-col"}`}
      >
        <div
          className={`relative shrink-0 overflow-hidden bg-brand-water ${
            horizontal ? "w-28 sm:w-40" : "aspect-[16/10] w-full"
          }`}
        >
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes={horizontal ? "160px" : "(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {!horizontal ? (
            <span
              className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-md ${categoryStyles[post.category]}`}
            >
              {post.category}
            </span>
          ) : null}
        </div>
        <div className={`flex flex-1 flex-col ${horizontal ? "p-3 sm:p-4" : "p-5"}`}>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            {horizontal ? (
              <span className="font-bold uppercase tracking-wide text-brand-green">{post.category}</span>
            ) : null}
            <span className="inline-flex items-center gap-1">
              <Icon name="calendar" className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            {!horizontal ? (
              <span className="inline-flex items-center gap-1">
                <Icon name="clock" className="h-3.5 w-3.5" />
                {readingTime(post)} min
              </span>
            ) : null}
          </p>
          <h3
            className={`mt-2 font-display font-medium leading-snug text-brand-navy transition-colors group-hover:text-brand-blue ${
              horizontal ? "line-clamp-3 text-base" : "line-clamp-3 text-xl"
            }`}
          >
            {post.title}
          </h3>
          {!horizontal ? (
            <>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
              <span className="link-arrow mt-auto pt-4">
                Ler matéria
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
