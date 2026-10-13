"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, ImagePlus, LoaderCircle, Save, Send, Trash2, X } from "lucide-react";
import type { JSONContent } from "@tiptap/react";
import { RichTextEditor } from "@/components/admin/blog/RichTextEditor";
import { SeoPanel } from "@/components/admin/blog/SeoPanel";
import { slugify } from "@/lib/blog/text";
import type { BlogCategory, BlogPost } from "@/lib/blog/types";

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  contentJson: unknown;
  coverImageUrl: string;
  coverImageAlt: string;
  categoryId: string;
  tags: string[];
  authorName: string;
  status: "draft" | "published";
  publishedAt: string; // datetime-local value, "" = not set
  isFeatured: boolean;
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImageUrl: string;
  noindex: boolean;
}

const isFuture = (value: string) => new Date(value).getTime() > Date.now();

const toLocalInput = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

function initialState(post: BlogPost | null): FormState {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    contentHtml: post?.contentHtml ?? "",
    contentJson: post?.contentJson ?? null,
    coverImageUrl: post?.coverImageUrl ?? "",
    coverImageAlt: post?.coverImageAlt ?? "",
    categoryId: post?.categoryId ?? "",
    tags: post?.tags ?? [],
    authorName: post?.authorName ?? "LNDRY Team",
    status: post?.status ?? "draft",
    publishedAt: toLocalInput(post?.publishedAt ?? null),
    isFeatured: post?.isFeatured ?? false,
    focusKeyword: post?.focusKeyword ?? "",
    metaTitle: post?.metaTitle ?? "",
    metaDescription: post?.metaDescription ?? "",
    canonicalUrl: post?.canonicalUrl ?? "",
    ogImageUrl: post?.ogImageUrl ?? "",
    noindex: post?.noindex ?? false,
  };
}

const inputClass =
  "h-11 w-full rounded-sm border border-hairline bg-white px-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-violet";
const labelClass = "mb-1.5 block font-body text-xs font-semibold text-ink-soft";

function Field({ label, hint, error, children, htmlFor }: { label: string; hint?: string; error?: string; children: React.ReactNode; htmlFor?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>{label}</label>
      {children}
      {hint && !error && <p className="mt-1 font-body text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1 font-body text-xs font-semibold text-error">{error}</p>}
    </div>
  );
}

export function BlogEditor({ post, categories }: { post: BlogPost | null; categories: BlogCategory[] }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => initialState(post));
  const [postId, setPostId] = useState<string | null>(post?.id ?? null);
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [tab, setTab] = useState<"post" | "seo">("post");
  const [saving, setSaving] = useState<null | "draft" | "publish">(null);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [tagInput, setTagInput] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(initialState(post)));
  const coverInput = useRef<HTMLInputElement>(null);

  const dirty = useMemo(() => JSON.stringify(form) !== savedSnapshot, [form, savedSnapshot]);

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function uploadCover(file: File) {
    setCoverUploading(true);
    setMessage(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/blog/upload", { method: "POST", body });
      const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error ?? "Upload failed.");
      update("coverImageUrl", data.url);
    } catch (error) {
      setMessage({ kind: "error", text: error instanceof Error ? error.message : "Upload failed." });
    } finally {
      setCoverUploading(false);
    }
  }

  const save = useCallback(
    async (nextStatus: "draft" | "publish") => {
      setSaving(nextStatus);
      setMessage(null);
      setFieldErrors({});

      const status = nextStatus === "publish" ? "published" : "draft";
      const slug = form.slug || slugify(form.title);
      const payload = {
        title: form.title,
        slug,
        excerpt: form.excerpt,
        contentHtml: form.contentHtml,
        contentJson: form.contentJson,
        coverImageUrl: form.coverImageUrl,
        coverImageAlt: form.coverImageAlt,
        categoryId: form.categoryId || null,
        tags: form.tags,
        authorName: form.authorName,
        status,
        publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
        isFeatured: form.isFeatured,
        focusKeyword: form.focusKeyword,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        canonicalUrl: form.canonicalUrl,
        ogImageUrl: form.ogImageUrl,
        noindex: form.noindex,
      };

      try {
        const response = await fetch(postId ? `/api/admin/blog/posts/${postId}` : "/api/admin/blog/posts", {
          method: postId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await response.json().catch(() => ({}))) as {
          post?: { id: string; slug: string; published_at: string | null };
          error?: string;
          fieldErrors?: Record<string, string[]>;
        };

        if (!response.ok || !data.post) {
          setFieldErrors(data.fieldErrors ?? {});
          setMessage({ kind: "error", text: data.error ?? "We could not save this post." });
          return;
        }

        const next: FormState = {
          ...form,
          slug: data.post.slug,
          status,
          publishedAt: status === "published" ? toLocalInput(data.post.published_at) : form.publishedAt,
        };
        setForm(next);
        setSavedSnapshot(JSON.stringify(next));
        setSlugTouched(true);

        const scheduled = status === "published" && data.post.published_at && isFuture(data.post.published_at);
        setMessage({
          kind: "ok",
          text: status === "draft" ? "Draft saved." : scheduled ? "Scheduled — it will go live automatically." : "Published. It is live on the website.",
        });

        if (!postId) {
          setPostId(data.post.id);
          router.replace(`/admin/blog/${data.post.id}`);
        } else {
          router.refresh();
        }
      } catch {
        setMessage({ kind: "error", text: "Network problem. Your changes are still here — try again." });
      } finally {
        setSaving(null);
      }
    },
    [form, postId, router],
  );

  // Ctrl/Cmd + S saves.
  const saveRef = useRef(save);
  const statusRef = useRef(form.status);
  useEffect(() => {
    saveRef.current = save;
    statusRef.current = form.status;
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void saveRef.current(statusRef.current === "published" ? "publish" : "draft");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function remove() {
    if (!postId || !window.confirm("Delete this post permanently? This cannot be undone.")) return;
    setDeleting(true);
    const response = await fetch(`/api/admin/blog/posts/${postId}`, { method: "DELETE" });
    if (response.ok) {
      setSavedSnapshot(JSON.stringify(form));
      router.replace("/admin/blog");
      router.refresh();
    } else {
      setDeleting(false);
      setMessage({ kind: "error", text: "We could not delete this post." });
    }
  }

  // Accepts one tag or several (e.g. pasted "silk, saree, care") and merges them in one update.
  function addTags(raws: string[]) {
    const cleaned = raws.map((raw) => raw.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 40)).filter(Boolean);
    if (cleaned.length === 0) return;
    setForm((prev) => {
      const merged = [...prev.tags];
      for (const tag of cleaned) {
        if (merged.length >= 12) break;
        if (!merged.includes(tag)) merged.push(tag);
      }
      return { ...prev, tags: merged };
    });
  }

  const err = (key: string) => fieldErrors[key]?.[0];
  const isLive = form.status === "published" && postId;
  const scheduledFuture = form.status === "published" && form.publishedAt && isFuture(form.publishedAt);

  return (
    <div className="grid gap-5">
      <div className="sticky top-0 z-30 -mx-5 flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-bg-app/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/admin/blog" className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink-soft hover:text-violet">
            <ArrowLeft size={16} aria-hidden="true" /> Posts
          </Link>
          <span
            className={`rounded-full px-2.5 py-1 font-body text-xs font-semibold ${
              scheduledFuture ? "bg-lavender-soft text-violet-deep" : form.status === "published" ? "bg-teal-tint text-[#0a7a70]" : "bg-surface-cool text-ink-soft"
            }`}
          >
            {scheduledFuture ? "Scheduled" : form.status === "published" ? "Published" : "Draft"}
          </span>
          {dirty && <span className="font-body text-xs text-warning">Unsaved changes</span>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isLive && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-1.5 px-3 font-body text-sm font-semibold text-violet hover:underline">
              View <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
          {postId && (
            <button type="button" onClick={remove} disabled={deleting} className="inline-flex h-10 items-center gap-1.5 rounded-sm px-3 font-body text-sm font-semibold text-error hover:bg-white" aria-label="Delete post">
              <Trash2 size={15} aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={() => save("draft")}
            disabled={saving !== null}
            className="inline-flex h-10 items-center gap-2 rounded-sm border border-hairline bg-white px-4 font-body text-sm font-semibold text-violet transition-colors hover:border-violet disabled:opacity-60"
          >
            {saving === "draft" ? <LoaderCircle size={15} className="animate-spin" /> : <Save size={15} aria-hidden="true" />}
            {form.status === "published" ? "Revert to draft" : "Save draft"}
          </button>
          <button
            type="button"
            onClick={() => save("publish")}
            disabled={saving !== null}
            className="inline-flex h-10 items-center gap-2 rounded-sm bg-violet px-5 font-body text-sm font-semibold text-white transition-colors hover:bg-violet-deep disabled:opacity-60"
          >
            {saving === "publish" ? <LoaderCircle size={15} className="animate-spin" /> : <Send size={15} aria-hidden="true" />}
            {form.status === "published" ? "Update" : form.publishedAt && isFuture(form.publishedAt) ? "Schedule" : "Publish"}
          </button>
        </div>
      </div>

      {message && (
        <p
          role="status"
          className={`rounded-sm border px-4 py-3 font-body text-sm font-semibold ${
            message.kind === "ok" ? "border-teal/30 bg-teal-tint text-[#0a7a70]" : "border-error/30 bg-error/5 text-error"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid min-w-0 gap-4">
          <div>
            <label htmlFor="post-title" className="sr-only">Post title</label>
            <textarea
              id="post-title"
              rows={2}
              value={form.title}
              maxLength={160}
              onChange={(e) => {
                update("title", e.target.value);
                if (!slugTouched) update("slug", slugify(e.target.value));
              }}
              placeholder="Post title"
              className="w-full resize-none rounded-sm border border-transparent bg-transparent px-1 font-display text-3xl font-bold leading-tight tracking-tight text-ink outline-none placeholder:text-muted/60 focus:border-hairline focus:bg-white sm:text-4xl"
            />
            {err("title") && <p className="font-body text-xs font-semibold text-error">{err("title")}</p>}
            <div className="mt-1 flex items-center gap-1 px-1 font-body text-sm text-ink-soft">
              <span className="shrink-0 text-muted">lndry.in/blog/</span>
              <input
                aria-label="URL slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", slugify(e.target.value, 120));
                }}
                placeholder="url-slug"
                className="min-w-0 flex-1 border-b border-dashed border-hairline bg-transparent py-1 font-semibold text-ink outline-none focus:border-violet"
              />
            </div>
            {err("slug") && <p className="px-1 font-body text-xs font-semibold text-error">{err("slug")}</p>}
          </div>

          <RichTextEditor
            initialHtml={form.contentHtml}
            initialJson={form.contentJson}
            onChange={(html, json) => setForm((prev) => ({ ...prev, contentHtml: html, contentJson: json }))}
            onError={(text) => setMessage({ kind: "error", text })}
          />
        </div>

        <aside className="rounded-sm border border-hairline bg-white xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto">
          <div className="grid grid-cols-2 border-b border-hairline" role="tablist" aria-label="Post settings">
            {(["post", "seo"] as const).map((key) => (
              <button
                key={key}
                role="tab"
                type="button"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`h-12 font-body text-sm font-semibold transition-colors ${tab === key ? "border-b-2 border-violet text-violet" : "text-ink-soft hover:text-ink"}`}
              >
                {key === "post" ? "Post" : "SEO"}
              </button>
            ))}
          </div>

          <div className="grid gap-5 p-5">
            {tab === "post" ? (
              <>
                <Field label="Publish date & time" htmlFor="post-date" hint="Leave empty to publish immediately. A future date schedules the post." error={err("publishedAt")}>
                  <input id="post-date" type="datetime-local" value={form.publishedAt} onChange={(e) => update("publishedAt", e.target.value)} className={inputClass} />
                </Field>

                <Field label="Category" htmlFor="post-category" hint="Manage categories from the Categories page.">
                  <select id="post-category" value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} className={inputClass}>
                    <option value="">No category</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </Field>

                <Field label={`Tags (${form.tags.length}/12)`} htmlFor="post-tags" hint="Press Enter or comma to add.">
                  <div className="flex flex-wrap gap-1.5 rounded-sm border border-hairline p-2 focus-within:border-violet">
                    {form.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-lavender-soft px-2.5 py-1 font-body text-xs font-semibold text-violet-deep">
                        {tag}
                        <button type="button" aria-label={`Remove tag ${tag}`} onClick={() => update("tags", form.tags.filter((t) => t !== tag))}><X size={12} /></button>
                      </span>
                    ))}
                    <input
                      id="post-tags"
                      value={tagInput}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v.includes(",")) {
                          addTags(v.split(","));
                          setTagInput("");
                        } else setTagInput(v);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTags([tagInput]);
                          setTagInput("");
                        } else if (e.key === "Backspace" && !tagInput && form.tags.length) {
                          update("tags", form.tags.slice(0, -1));
                        }
                      }}
                      onBlur={() => {
                        addTags([tagInput]);
                        setTagInput("");
                      }}
                      className="min-w-24 flex-1 bg-transparent px-1 py-1 font-body text-sm outline-none"
                      placeholder={form.tags.length ? "" : "e.g. silk, saree"}
                    />
                  </div>
                </Field>

                <Field label="Cover image" hint="Shown on cards and used for social sharing. 1200×630 works best.">
                  {form.coverImageUrl ? (
                    <div className="relative overflow-hidden rounded-sm border border-hairline">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.coverImageUrl} alt="" className="aspect-[1200/630] w-full object-cover" />
                      <button type="button" onClick={() => update("coverImageUrl", "")} className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-ink/80 text-white hover:bg-ink" aria-label="Remove cover image"><X size={15} /></button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => coverInput.current?.click()}
                      disabled={coverUploading}
                      className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-hairline bg-surface-cool font-body text-sm font-semibold text-ink-soft transition-colors hover:border-violet hover:text-violet"
                    >
                      {coverUploading ? <LoaderCircle className="animate-spin" size={20} /> : <ImagePlus size={20} aria-hidden="true" />}
                      {coverUploading ? "Uploading…" : "Upload cover image"}
                    </button>
                  )}
                  <input ref={coverInput} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="sr-only" tabIndex={-1}
                    onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) void uploadCover(f); }} />
                  <input aria-label="Cover image alt text" value={form.coverImageAlt} onChange={(e) => update("coverImageAlt", e.target.value)} placeholder="Describe the cover image (alt text)" className={`${inputClass} mt-2`} maxLength={200} />
                </Field>

                <Field label="Short summary" htmlFor="post-excerpt" hint="Shown on cards and used if there is no meta description. Left empty, it is generated from the article." error={err("excerpt")}>
                  <textarea id="post-excerpt" rows={3} maxLength={400} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} className={`${inputClass} h-auto py-2.5`} />
                </Field>

                <Field label="Author name" htmlFor="post-author">
                  <input id="post-author" value={form.authorName} onChange={(e) => update("authorName", e.target.value)} className={inputClass} maxLength={80} />
                </Field>

                <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-hairline p-3">
                  <input type="checkbox" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} className="mt-0.5 size-4 accent-violet" />
                  <span>
                    <span className="block font-body text-sm font-semibold text-ink">Featured post</span>
                    <span className="block font-body text-xs text-ink-soft">Shown large at the top of the blog (the newest featured post wins).</span>
                  </span>
                </label>
              </>
            ) : (
              <>
                <Field label="Focus keyword" htmlFor="seo-keyword" hint="The one phrase this article should rank for — e.g. “dry cleaning in Pune”.">
                  <input id="seo-keyword" value={form.focusKeyword} onChange={(e) => update("focusKeyword", e.target.value)} className={inputClass} maxLength={80} />
                </Field>
                <Field label="SEO title" htmlFor="seo-title" hint="Leave empty to use the post title. Best 30–60 characters.">
                  <input id="seo-title" value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} placeholder={form.title} className={inputClass} maxLength={120} />
                </Field>
                <Field label="Meta description" htmlFor="seo-description" hint="The text under your title in Google. Best 120–160 characters.">
                  <textarea id="seo-description" rows={3} value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} placeholder={form.excerpt} className={`${inputClass} h-auto py-2.5`} maxLength={320} />
                </Field>
                <Field label="Social share image URL" htmlFor="seo-og" hint="Optional. Defaults to the cover image." error={err("ogImageUrl")}>
                  <input id="seo-og" value={form.ogImageUrl} onChange={(e) => update("ogImageUrl", e.target.value)} placeholder="https://…" className={inputClass} />
                </Field>
                <Field label="Canonical URL" htmlFor="seo-canonical" hint="Only set this if the article was first published elsewhere." error={err("canonicalUrl")}>
                  <input id="seo-canonical" value={form.canonicalUrl} onChange={(e) => update("canonicalUrl", e.target.value)} placeholder="https://…" className={inputClass} />
                </Field>
                <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-hairline p-3">
                  <input type="checkbox" checked={form.noindex} onChange={(e) => update("noindex", e.target.checked)} className="mt-0.5 size-4 accent-violet" />
                  <span>
                    <span className="block font-body text-sm font-semibold text-ink">Hide from search engines</span>
                    <span className="block font-body text-xs text-ink-soft">Adds “noindex” and removes it from the sitemap.</span>
                  </span>
                </label>
                <hr className="border-hairline" />
                <SeoPanel
                  siteSlugPrefix={form.slug}
                  input={{
                    title: form.title,
                    slug: form.slug,
                    excerpt: form.excerpt,
                    contentHtml: form.contentHtml,
                    focusKeyword: form.focusKeyword,
                    metaTitle: form.metaTitle,
                    metaDescription: form.metaDescription,
                    coverImageUrl: form.coverImageUrl,
                    coverImageAlt: form.coverImageAlt,
                  }}
                />
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
