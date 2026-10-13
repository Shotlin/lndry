import { getRssPosts } from "@/lib/blog/repository";
import { absoluteUrl } from "@/lib/blog/site";

export const revalidate = 900;

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET() {
  const posts = await getRssPosts();
  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}`);
      const category = Array.isArray(post.blog_categories) ? post.blog_categories[0] : post.blog_categories;
      return `<item>
<title>${esc(post.title)}</title>
<link>${link}</link>
<guid isPermaLink="true">${link}</guid>
<pubDate>${new Date(post.published_at as string).toUTCString()}</pubDate>
<description>${esc(post.excerpt ?? "")}</description>${category?.name ? `\n<category>${esc(category.name)}</category>` : ""}
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>LNDRY Blog</title>
<link>${absoluteUrl("/blog")}</link>
<description>Laundry, dry cleaning and garment-care tips from LNDRY.</description>
<language>en-IN</language>
<atom:link href="${absoluteUrl("/blog/feed.xml")}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" },
  });
}
