"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { slugify } from "@/lib/blog/text";
import type { BlogCategory } from "@/lib/blog/types";

type Row = BlogCategory & { postCount: number };
type Draft = { id: string | null; name: string; slug: string; description: string; sortOrder: number };

const empty: Draft = { id: null, name: "", slug: "", description: "", sortOrder: 0 };
const inputClass = "h-11 w-full rounded-sm border border-hairline bg-white px-3 font-body text-sm outline-none focus:border-violet";

export function CategoryManager({ initial }: { initial: Row[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(empty);
  const [slugTouched, setSlugTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const response = await fetch(draft.id ? `/api/admin/blog/categories/${draft.id}` : "/api/admin/blog/categories", {
      method: draft.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: draft.name,
        slug: draft.slug || slugify(draft.name, 80),
        description: draft.description,
        sortOrder: draft.sortOrder,
      }),
    });
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    setBusy(false);
    if (!response.ok) {
      setError(data.error ?? "We could not save this category.");
      return;
    }
    setDraft(empty);
    setSlugTouched(false);
    router.refresh();
  }

  async function remove(row: Row) {
    const note = row.postCount ? ` Its ${row.postCount} post(s) will become uncategorised.` : "";
    if (!window.confirm(`Delete “${row.name}”?${note}`)) return;
    const response = await fetch(`/api/admin/blog/categories/${row.id}`, { method: "DELETE" });
    if (response.ok) router.refresh();
    else setError("We could not delete this category.");
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="overflow-x-auto rounded-sm border border-hairline bg-white">
        <table className="w-full min-w-[520px] text-left font-body text-sm">
          <thead className="border-b border-hairline bg-surface-cool text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Order</th>
              <th className="px-4 py-3 text-right font-semibold">Posts</th>
              <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {initial.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-ink-soft">No categories yet.</td></tr>
            )}
            {initial.map((row) => (
              <tr key={row.id} className="border-b border-hairline last:border-0">
                <td className="px-4 py-3.5">
                  <p className="font-semibold text-ink">{row.name}</p>
                  <p className="text-xs text-muted">/blog/category/{row.slug}</p>
                </td>
                <td className="px-4 py-3.5 tabular-nums text-ink-soft">{row.sortOrder}</td>
                <td className="px-4 py-3.5 text-right tabular-nums text-ink-soft">{row.postCount}</td>
                <td className="px-4 py-3.5">
                  <div className="flex justify-end gap-1">
                    <button type="button" aria-label={`Edit ${row.name}`} onClick={() => { setDraft({ id: row.id, name: row.name, slug: row.slug, description: row.description ?? "", sortOrder: row.sortOrder }); setSlugTouched(true); }} className="grid size-9 place-items-center rounded-xs text-ink-soft hover:bg-surface-cool hover:text-violet"><Pencil size={15} /></button>
                    <button type="button" aria-label={`Delete ${row.name}`} onClick={() => remove(row)} className="grid size-9 place-items-center rounded-xs text-ink-soft hover:bg-surface-cool hover:text-error"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={submit} className="grid gap-4 rounded-sm border border-hairline bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-ink">{draft.id ? "Edit category" : "New category"}</h2>
        <div>
          <label htmlFor="cat-name" className="mb-1.5 block font-body text-xs font-semibold text-ink-soft">Name</label>
          <input id="cat-name" required minLength={2} maxLength={60} value={draft.name} className={inputClass}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value, slug: slugTouched ? d.slug : slugify(e.target.value, 80) }))} />
        </div>
        <div>
          <label htmlFor="cat-slug" className="mb-1.5 block font-body text-xs font-semibold text-ink-soft">URL</label>
          <input id="cat-slug" required maxLength={80} value={draft.slug} className={inputClass}
            onChange={(e) => { setSlugTouched(true); setDraft((d) => ({ ...d, slug: slugify(e.target.value, 80) })); }} />
        </div>
        <div>
          <label htmlFor="cat-desc" className="mb-1.5 block font-body text-xs font-semibold text-ink-soft">Description (shown on the category page)</label>
          <textarea id="cat-desc" rows={3} maxLength={300} value={draft.description} className={`${inputClass} h-auto py-2.5`}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="cat-order" className="mb-1.5 block font-body text-xs font-semibold text-ink-soft">Display order (lower first)</label>
          <input id="cat-order" type="number" min={0} max={1000} value={draft.sortOrder} className={inputClass}
            onChange={(e) => setDraft((d) => ({ ...d, sortOrder: Number(e.target.value) || 0 }))} />
        </div>
        {error && <p role="alert" className="font-body text-sm font-semibold text-error">{error}</p>}
        <div className="flex gap-2">
          <button type="submit" disabled={busy} className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-sm bg-violet px-5 font-body text-sm font-semibold text-white hover:bg-violet-deep disabled:opacity-60">
            <Plus size={16} aria-hidden="true" /> {draft.id ? "Save changes" : "Add category"}
          </button>
          {draft.id && (
            <button type="button" onClick={() => { setDraft(empty); setSlugTouched(false); }} className="h-11 rounded-sm border border-hairline px-4 font-body text-sm font-semibold text-ink-soft hover:border-violet">Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
}
