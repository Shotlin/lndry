import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearchForm } from "@/components/blog/BlogSearchForm";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { TrendingPosts } from "@/components/blog/TrendingPosts";
import { Container } from "@/components/ui/Container";
import { getCategoriesWithCounts, getTrendingPosts, searchPosts } from "@/lib/blog/repository";

// Search result pages are thin, infinite-variety pages: keep them out of Google's index.
export const metadata: Metadata = {
  title: "Search the LNDRY Blog",
  robots: { index: false, follow: true },
};

export default async function BlogSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().slice(0, 80);
  const [results, categories, trending] = await Promise.all([
    searchPosts(query),
    getCategoriesWithCounts(),
    getTrendingPosts(5),
  ]);

  return (
    <>
      <section className="bg-gradient-to-b from-lavender-soft/70 to-bg-app pb-10 pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 font-body text-sm text-ink-soft">
            <Link href="/blog" className="hover:text-violet">Blog</Link> <span aria-hidden="true">›</span> <span className="font-semibold text-ink">Search</span>
          </nav>
          <h1 className="font-display text-headline font-bold text-ink">
            {query.length >= 2 ? <>Results for “{query}”</> : "Search the blog"}
          </h1>
          <div className="mt-6 max-w-2xl"><BlogSearchForm defaultValue={query} autoFocus={!query} /></div>
          <div className="mt-6"><CategoryNav categories={categories} /></div>
        </Container>
      </section>

      <Container className="pb-20">
        {query.length < 2 ? (
          <p className="font-body text-ink-soft">Type at least two characters to search.</p>
        ) : results.length === 0 ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="rounded-lg border border-dashed border-hairline bg-white p-10 text-center">
              <h2 className="font-display text-xl font-semibold text-ink">No articles match “{query}”</h2>
              <p className="mt-2 font-body text-ink-soft">Try a shorter word, check the spelling, or browse a category above.</p>
            </div>
            <TrendingPosts posts={trending} title="Popular right now" />
          </div>
        ) : (
          <>
            <p className="mb-6 font-body text-sm text-ink-soft" role="status">{results.length} article{results.length === 1 ? "" : "s"} found</p>
            <h2 className="sr-only">Search results</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{results.map((p) => <BlogCard key={p.id} post={p} />)}</div>
          </>
        )}
      </Container>
    </>
  );
}
