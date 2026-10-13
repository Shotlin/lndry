import Link from "next/link";
import { Flame } from "lucide-react";
import { formatBlogDate } from "@/lib/blog/text";
import type { BlogPostSummary } from "@/lib/blog/types";

export function TrendingPosts({ posts, title = "Trending now" }: { posts: BlogPostSummary[]; title?: string }) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="trending-heading" className="rounded-lg border border-hairline bg-white p-6">
      <h2 id="trending-heading" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
        <Flame size={18} className="text-warning" aria-hidden="true" /> {title}
      </h2>
      <ol className="mt-4 grid gap-4">
        {posts.map((post, index) => (
          <li key={post.id} className="flex gap-4">
            <span className="font-display text-3xl font-bold leading-none text-lavender-electric/70" aria-hidden="true">{index + 1}</span>
            <div className="min-w-0">
              <Link href={`/blog/${post.slug}`} className="font-display text-base font-semibold leading-snug text-ink hover:text-violet">
                {post.title}
              </Link>
              <p className="mt-1 font-body text-xs text-ink-soft">
                {post.category?.name ? `${post.category.name} · ` : ""}{formatBlogDate(post.publishedAt)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
