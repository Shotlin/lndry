import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { BlogImage } from "@/components/blog/BlogImage";
import { formatBlogDate } from "@/lib/blog/text";
import type { BlogPostSummary } from "@/lib/blog/types";

export function BlogCardCover({ post, sizes, priority = false }: { post: BlogPostSummary; sizes: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[1200/630] w-full overflow-hidden bg-lavender-soft">
      {post.coverImageUrl ? (
        <BlogImage
          src={post.coverImageUrl}
          alt={post.coverImageAlt || post.title}
          sizes={sizes}
          priority={priority}
          className="transition-transform duration-500 [transition-timing-function:var(--ease-signature)] group-hover:scale-[1.03]"
        />
      ) : (
        <div className="grid h-full place-items-center bg-gradient-to-br from-lavender-soft to-teal-tint">
          <Image src="/brand/logos/lndry-primary-app-icon.png" alt="" width={72} height={72} className="size-16 opacity-80" />
        </div>
      )}
    </div>
  );
}

export function BlogCard({ post, priority = false }: { post: BlogPostSummary; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-white transition-shadow duration-300 hover:shadow-elevated">
      <Link href={`/blog/${post.slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <BlogCardCover post={post} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" priority={priority} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {post.category && (
          <Link href={`/blog/category/${post.category.slug}`} className="font-body text-label font-semibold uppercase tracking-[0.12em] text-violet hover:text-violet-deep">
            {post.category.name}
          </Link>
        )}
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
          <Link href={`/blog/${post.slug}`} className="hover:text-violet focus-visible:outline-2 focus-visible:outline-violet">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>}
        <div className="mt-auto flex items-center gap-3 pt-5 font-body text-xs text-ink-soft">
          <time dateTime={post.publishedAt ?? undefined}>{formatBlogDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden="true" />{post.readingMinutes} min read</span>
        </div>
      </div>
    </article>
  );
}
