import Link from "next/link";

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const href = (n: number) => (n === 1 ? "/blog" : `/blog/page/${n}`);
  const cell = "inline-flex h-11 min-w-11 items-center justify-center rounded-sm border px-3 font-body text-sm font-semibold transition-colors";
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1);

  return (
    <nav aria-label="Blog pages" className="flex flex-wrap items-center justify-center gap-2">
      {page > 1 && <Link href={href(page - 1)} rel="prev" className={`${cell} border-hairline bg-white text-violet hover:border-violet`}>Previous</Link>}
      {pages.map((n, i) => (
        <span key={n} className="contents">
          {i > 0 && n - pages[i - 1] > 1 && <span className="px-1 text-ink-soft" aria-hidden="true">…</span>}
          <Link href={href(n)} aria-current={n === page ? "page" : undefined} className={`${cell} ${n === page ? "border-violet bg-violet text-white" : "border-hairline bg-white text-ink-soft hover:border-violet hover:text-violet"}`}>{n}</Link>
        </span>
      ))}
      {page < totalPages && <Link href={href(page + 1)} rel="next" className={`${cell} border-hairline bg-white text-violet hover:border-violet`}>Next</Link>}
    </nav>
  );
}
