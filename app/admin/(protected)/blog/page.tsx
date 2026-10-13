import Link from "next/link";
import { redirect } from "next/navigation";
import { Eye, FilePlus2, FileText, PenLine, Search, CalendarClock } from "lucide-react";
import { getAdminAccess } from "@/lib/auth/require-admin";
import { getBlogStats, listAdminCategories, listAdminPosts } from "@/lib/blog/admin-repository";
import { formatBlogDate } from "@/lib/blog/text";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const isFuture = (value: string) => new Date(value).getTime() > Date.now();

type Search = { status?: string; q?: string; category?: string };

export default async function AdminBlogPage({ searchParams }: { searchParams: Promise<Search> }) {
  const [access, query] = await Promise.all([getAdminAccess(), searchParams]);
  if (access.kind !== "authorized") redirect("/admin/login?next=/admin/blog");

  const status = query.status === "draft" || query.status === "published" ? query.status : "";
  const result = await Promise.all([
    listAdminPosts(access.supabase, { status, q: query.q?.trim(), categoryId: query.category }),
    getBlogStats(access.supabase),
    listAdminCategories(access.supabase),
  ]).catch(() => null);

  if (!result) {
    return (
      <section className="rounded-md border border-hairline bg-white p-6 sm:p-8">
        <p className="font-body text-sm font-semibold text-error">The blog is not set up yet</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink">We could not load blog posts</h1>
        <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
          Run the migration <code className="rounded bg-surface-cool px-1.5 py-0.5">supabase/migrations/20261013000000_blog_system.sql</code> in the Supabase SQL editor, then reload this page.
        </p>
      </section>
    );
  }

  const [posts, stats, categories] = result;

  const cards = [
    ["Published", stats.published, FileText],
    ["Scheduled", stats.scheduled, CalendarClock],
    ["Drafts", stats.drafts, PenLine],
    ["Total views", stats.views.toLocaleString("en-IN"), Eye],
  ] as const;

  return (
    <div className="grid gap-7">
      <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-body text-sm font-semibold text-violet-deep">Content</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Blog posts</h1>
          <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ink-soft">
            Write, schedule and publish articles that bring new customers to LNDRY from Google.
          </p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-violet px-5 font-body text-sm font-semibold text-white transition-colors hover:bg-violet-deep">
          <FilePlus2 size={16} aria-hidden="true" /> New post
        </Link>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map(([label, value, Icon]) => (
          <div key={label} className="rounded-sm border border-hairline bg-white p-4">
            <Icon size={18} className="text-violet" aria-hidden="true" />
            <p className="mt-3 font-display text-2xl font-semibold text-ink">{value}</p>
            <p className="font-body text-xs text-ink-soft">{label}</p>
          </div>
        ))}
      </div>

      <form className="flex flex-col gap-3 rounded-sm border border-hairline bg-white p-4 md:flex-row" role="search" aria-label="Filter posts">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input name="q" defaultValue={query.q ?? ""} placeholder="Search by title or URL" className="h-11 w-full rounded-sm border border-hairline pl-9 pr-3 font-body text-sm outline-none focus:border-violet" />
        </div>
        <select name="status" defaultValue={status} aria-label="Status" className="h-11 rounded-sm border border-hairline bg-white px-3 font-body text-sm outline-none focus:border-violet">
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
        <select name="category" defaultValue={query.category ?? ""} aria-label="Category" className="h-11 rounded-sm border border-hairline bg-white px-3 font-body text-sm outline-none focus:border-violet">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button type="submit" className="h-11 rounded-sm border border-hairline px-5 font-body text-sm font-semibold text-violet hover:border-violet">Filter</button>
      </form>

      {posts.length === 0 ? (
        <div className="rounded-sm border border-dashed border-hairline bg-white p-10 text-center">
          <p className="font-display text-lg font-semibold text-ink">No posts found</p>
          <p className="mt-1 font-body text-sm text-ink-soft">Write your first article to start ranking on Google.</p>
          <Link href="/admin/blog/new" className="mt-5 inline-flex h-11 items-center rounded-sm bg-violet px-5 font-body text-sm font-semibold text-white hover:bg-violet-deep">New post</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-hairline bg-white">
          <table className="w-full min-w-[820px] text-left font-body text-sm">
            <thead className="border-b border-hairline bg-surface-cool text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Length · keyword</th>
                <th className="px-4 py-3 text-right font-semibold">Views</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const scheduled = post.status === "published" && post.publishedAt && isFuture(post.publishedAt);
                const live = post.status === "published" && !scheduled;
                return (
                  <tr key={post.id} className="border-b border-hairline last:border-0 hover:bg-surface-cool/60">
                    <td className="max-w-md px-4 py-3.5">
                      <Link href={`/admin/blog/${post.id}`} className="font-semibold text-ink hover:text-violet">{post.title}</Link>
                      <p className="mt-0.5 truncate text-xs text-muted">/blog/{post.slug}{post.isFeatured ? " · Featured" : ""}{post.noindex ? " · Hidden from search" : ""}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${scheduled ? "bg-lavender-soft text-violet-deep" : live ? "bg-teal-tint text-[#0a7a70]" : "bg-surface-cool text-ink-soft"}`}>
                        {scheduled ? "Scheduled" : live ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-ink-soft">{post.category?.name ?? "—"}</td>
                    <td className="px-4 py-3.5 text-ink-soft">{post.wordCount} words{post.focusKeyword ? ` · “${post.focusKeyword}”` : ""}</td>
                    <td className="px-4 py-3.5 text-right tabular-nums text-ink-soft">{post.viewCount.toLocaleString("en-IN")}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-ink-soft">{formatBlogDate(post.publishedAt ?? post.updatedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
