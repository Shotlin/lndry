import { Search } from "lucide-react";

export function BlogSearchForm({ defaultValue = "", autoFocus = false }: { defaultValue?: string; autoFocus?: boolean }) {
  return (
    <form action="/blog/search" method="get" role="search" aria-label="Search the LNDRY blog" className="relative w-full">
      <label htmlFor="blog-search" className="sr-only">Search articles</label>
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
      <input
        id="blog-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        minLength={2}
        maxLength={80}
        required
        placeholder="Search laundry tips, stain removal, fabric care…"
        className="h-14 w-full rounded-sm border border-hairline bg-white pl-12 pr-28 font-body text-base text-ink shadow-soft outline-none transition-colors placeholder:text-ink-soft focus:border-violet"
      />
      <button type="submit" className="absolute right-2 top-1/2 h-10 -translate-y-1/2 rounded-sm bg-violet px-5 font-display text-sm font-semibold text-white transition-colors hover:bg-violet-deep">
        Search
      </button>
    </form>
  );
}
