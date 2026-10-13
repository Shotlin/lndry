import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { BlogCard, BlogCardCover } from "@/components/blog/BlogCard";
import { BlogCta } from "@/components/blog/BlogCta";
import { BlogSearchForm } from "@/components/blog/BlogSearchForm";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { Pagination } from "@/components/blog/Pagination";
import { TrendingPosts } from "@/components/blog/TrendingPosts";
import Link from "next/link";
import { BLOG_PAGE_SIZE, getCategoriesWithCounts, getFeaturedPost, getLivePosts, getTrendingPosts } from "@/lib/blog/repository";
import { formatBlogDate } from "@/lib/blog/text";

export async function BlogIndexView({ page }: { page: number }) {
  const [{ posts, total }, categories, trending, featured] = await Promise.all([
    getLivePosts({ page }),
    getCategoriesWithCounts(),
    getTrendingPosts(5),
    page === 1 ? getFeaturedPost() : Promise.resolve(null),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
  const grid = featured ? posts.filter((p) => p.id !== featured.id) : posts;

  return (
    <>
      <section className="bg-gradient-to-b from-lavender-soft/70 to-bg-app pb-10 pt-12 sm:pt-16">
        <Container>
          <SectionEyebrow>The LNDRY Blog</SectionEyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-hero font-bold text-ink">
            {page === 1 ? "Laundry & garment-care know-how" : `Latest articles — page ${page}`}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-body-lg text-ink-soft">
            Practical guides from the LNDRY team on washing, stain removal, fabric care and getting your clothes picked up and delivered in Pune.
          </p>
          <div className="mt-8 max-w-2xl"><BlogSearchForm /></div>
          <div className="mt-6"><CategoryNav categories={categories} /></div>
        </Container>
      </section>

      <Container className="pb-20">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-hairline bg-white p-12 text-center">
            <h2 className="font-display text-2xl font-semibold text-ink">Fresh articles are on the way</h2>
            <p className="mt-2 font-body text-ink-soft">We&apos;re preparing our first guides. Meanwhile, explore what LNDRY can do for you.</p>
            <Link href="/services" className="mt-6 inline-flex h-11 items-center rounded-sm bg-violet px-6 font-display text-sm font-semibold text-white hover:bg-violet-deep">View services</Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="grid gap-10">
              {featured && (
                <article className="group overflow-hidden rounded-xl border border-hairline bg-white shadow-soft md:grid md:grid-cols-2">
                  <Link href={`/blog/${featured.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                    <BlogCardCover post={featured} sizes="(min-width: 1024px) 480px, 100vw" priority />
                  </Link>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-[#0a7a70]">Featured{featured.category ? ` · ${featured.category.name}` : ""}</p>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                      <Link href={`/blog/${featured.slug}`} className="hover:text-violet">{featured.title}</Link>
                    </h2>
                    {featured.excerpt && <p className="mt-3 line-clamp-4 font-body text-ink-soft">{featured.excerpt}</p>}
                    <p className="mt-5 font-body text-sm text-ink-soft">
                      {formatBlogDate(featured.publishedAt)} · {featured.readingMinutes} min read
                    </p>
                  </div>
                </article>
              )}

              <section aria-labelledby="latest-heading">
                <h2 id="latest-heading" className="mb-5 font-display text-2xl font-semibold text-ink">Latest articles</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {grid.map((post, i) => <BlogCard key={post.id} post={post} priority={i < 2 && !featured} />)}
                </div>
              </section>
              <Pagination page={page} totalPages={totalPages} />
            </div>

            <aside className="grid content-start gap-6">
              <TrendingPosts posts={trending} />
            </aside>
          </div>
        )}

        <div className="mt-16"><BlogCta /></div>
      </Container>
    </>
  );
}
