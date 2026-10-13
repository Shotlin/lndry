import Link from "next/link";
import type { BlogCategoryWithCount } from "@/lib/blog/types";

export function CategoryNav({ categories, activeSlug }: { categories: BlogCategoryWithCount[]; activeSlug?: string }) {
  const visible = categories.filter((c) => c.postCount > 0 || c.slug === activeSlug);
  if (visible.length === 0) return null;

  const base = "inline-flex h-11 items-center rounded-full border px-5 font-body text-sm font-semibold whitespace-nowrap transition-colors";

  return (
    <nav aria-label="Blog categories" className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <ul className="flex gap-2 md:flex-wrap">
        <li>
          <Link href="/blog" aria-current={!activeSlug ? "page" : undefined} className={`${base} ${!activeSlug ? "border-violet bg-violet text-white" : "border-hairline bg-white text-ink-soft hover:border-violet hover:text-violet"}`}>
            All
          </Link>
        </li>
        {visible.map((c) => (
          <li key={c.id}>
            <Link href={`/blog/category/${c.slug}`} aria-current={activeSlug === c.slug ? "page" : undefined} className={`${base} ${activeSlug === c.slug ? "border-violet bg-violet text-white" : "border-hairline bg-white text-ink-soft hover:border-violet hover:text-violet"}`}>
              {c.name} <span className="ml-1.5 text-xs opacity-70">{c.postCount}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
