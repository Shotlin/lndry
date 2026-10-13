# LNDRY Blog

SEO-friendly blog for https://lndry.in with a rich-text editor in the existing `/admin` dashboard.

- Public: `/blog`, `/blog/<slug>`, `/blog/category/<slug>`, `/blog/search?q=`, `/blog/page/<n>`, `/blog/feed.xml`, plus a site-wide `/sitemap.xml` and `/robots.txt` (the site had neither).
- Dashboard: `/admin/blog` (posts), `/admin/blog/new`, `/admin/blog/<id>`, `/admin/blog/categories`. Same login and access rules as the vendor-lead dashboard (`admin_users`).
- Editor: [Tiptap](https://tiptap.dev) (MIT, built on ProseMirror). Stores clean HTML; the server sanitises it on every save.

## One-time setup

1. **Run the migration** in the Supabase SQL editor (after the vendor-leads migration, because it reuses `admin_users`):
   [`supabase/migrations/20261013000000_blog_system.sql`](../supabase/migrations/20261013000000_blog_system.sql).
   It is safe to re-run. It creates the tables, search/trending functions, security rules, the public `blog-images` storage bucket, and five starter categories.
2. **No new environment variables.** The blog uses the same ones as the vendor-lead system (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL`). Note that the code reads `…_PUBLISHABLE_KEY`; `.env.example` still lists the older `…_ANON_KEY` name.
3. Deploy. Until the migration is applied, `/blog` shows the empty state and `/admin/blog` shows a "not set up yet" notice; nothing else on the site is affected.
4. Submit `https://lndry.in/sitemap.xml` in Google Search Console.

If your Supabase project uses a custom domain instead of `*.supabase.co`, add it to `images.remotePatterns` in `next.config.ts` so cover images are optimised.

## Writing a post

1. `/admin/blog` → **New post**. Type a title (the URL is generated; you can edit it).
2. Write in the editor. Toolbar: H2/H3/H4, bold, italic, underline, strike, code, bullet/numbered lists, quote, divider, alignment, links, images, tables, undo/redo. Images can be uploaded, dragged in, or pasted; click an image to set its alt text.
3. **Post tab**: category, tags, cover image (+ alt text), short summary, author, publish date, "Featured".
4. **SEO tab**: focus keyword, SEO title, meta description, share image, canonical, "hide from search engines". A live **SEO score** and Google preview update as you type.
5. **Save draft**, **Publish**, or set a future date and press **Schedule**. `Ctrl/Cmd+S` saves.

Only H2–H4 are available in the body on purpose: the post title is the page's single H1.

### What the SEO score checks
Title length (30–60), meta description (120–160), short URL, article length (300 / 600+ words), H2 subheadings, and — when a focus keyword is set — keyword in title, description, URL, first 100 words, a subheading, and healthy density (0.5–2.5%). Also: cover image with alt, alt text on every image, an internal link, an external link, and sentence length. 80+ is "good".

### What is added to every post page automatically
Unique `<title>` and description, canonical URL, `robots`, Open Graph + Twitter cards, `BlogPosting` + `BreadcrumbList` structured data, a table of contents, related posts, share links (WhatsApp, Facebook, X, LinkedIn), and reading time. Search results pages are `noindex`; drafts, scheduled posts and "hidden" posts never appear in the sitemap or RSS.

## Search, categories, trending

- **Search** (`/blog/search`): Postgres full-text search over title, summary, tags and keyword, plus a title/body substring match.
- **Categories**: managed at `/admin/blog/categories`; each becomes an indexable page. Deleting one keeps its posts (they become uncategorised).
- **Trending**: ranked by views in the last 14 days (then lifetime views). A view is counted once per browser session, 3 seconds after the page opens. It is a light signal, not bot-proof analytics.

## Caching
Public blog pages are cached and refresh at most every 5 minutes; saving in the dashboard refreshes them immediately. A **scheduled** post goes live within about 5 minutes of its time (the sitemap can take up to an hour to list it).

## Security notes
- All dashboard writes require a signed-in active admin, a same-origin request, and validated input.
- HTML is sanitised server-side on every save (allow-list only; scripts, iframes, event handlers and `javascript:`/`data:` links are removed).
- Uploads are checked by file signature (JPG/PNG/WebP/GIF/AVIF only, max 5 MB); SVG is refused.
- Visitors can only read live posts (row-level security); the view counter cannot read anything.

## Not included (ideas for later)
Comments, newsletter sign-up, multiple authors with profiles, revision history, auto-save, per-post FAQ schema, and translated posts.
