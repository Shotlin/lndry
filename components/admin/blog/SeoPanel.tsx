"use client";

import { useMemo } from "react";
import { CheckCircle2, CircleAlert, CircleX } from "lucide-react";
import { analyzeSeo, SEO_DESCRIPTION_RANGE, SEO_TITLE_RANGE, type SeoInput } from "@/lib/blog/seo";

const statusIcon = {
  good: <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" aria-label="Passed" />,
  warn: <CircleAlert size={16} className="mt-0.5 shrink-0 text-warning" aria-label="Could be better" />,
  bad: <CircleX size={16} className="mt-0.5 shrink-0 text-error" aria-label="Needs work" />,
} as const;

const gradeStyle = {
  good: { ring: "var(--color-success)", label: "Good — ready to rank" },
  ok: { ring: "var(--color-warning)", label: "Okay — a few fixes will help" },
  poor: { ring: "var(--color-error)", label: "Needs work before publishing" },
} as const;

export function SeoPanel({ input, siteSlugPrefix }: { input: SeoInput; siteSlugPrefix: string }) {
  const report = useMemo(() => analyzeSeo(input), [input]);
  const grade = gradeStyle[report.grade];
  const ordered = [...report.checks].sort((a, b) => {
    const rank = { bad: 0, warn: 1, good: 2 } as const;
    return rank[a.status] - rank[b.status];
  });

  const title = (input.metaTitle || input.title || "Your article title").trim();
  const description = (input.metaDescription || input.excerpt || "Your meta description will appear here…").trim();
  const [tMin, tMax] = SEO_TITLE_RANGE;
  const [dMin, dMax] = SEO_DESCRIPTION_RANGE;

  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-4">
        <div
          className="grid size-16 shrink-0 place-items-center rounded-full font-display text-xl font-bold text-ink"
          style={{ background: `conic-gradient(${grade.ring} ${report.score * 3.6}deg, var(--color-hairline) 0)` }}
          role="img"
          aria-label={`SEO score ${report.score} out of 100`}
        >
          <span className="grid size-12 place-items-center rounded-full bg-white">{report.score}</span>
        </div>
        <div>
          <p className="font-display text-base font-semibold text-ink">SEO score</p>
          <p className="font-body text-sm text-ink-soft">{grade.label}</p>
          <p className="font-body text-xs text-muted">{report.wordCount} words</p>
        </div>
      </div>

      <div>
        <p className="font-body text-xs font-semibold uppercase tracking-wide text-muted">Google preview</p>
        <div className="mt-2 rounded-sm border border-hairline bg-white p-4">
          <p className="truncate font-body text-xs text-ink-soft">lndry.in › blog › {siteSlugPrefix || "your-url"}</p>
          <p className="mt-1 line-clamp-2 font-body text-lg leading-snug text-[#1a0dab]">{title.length > 62 ? `${title.slice(0, 60)}…` : title}</p>
          <p className="mt-1 line-clamp-2 font-body text-sm leading-snug text-ink-soft">{description.length > 160 ? `${description.slice(0, 158)}…` : description}</p>
        </div>
        <p className="mt-1.5 font-body text-xs text-muted">
          Title {title.length}/{tMax} (best {tMin}–{tMax}) · Description {description.length}/{dMax} (best {dMin}–{dMax})
        </p>
      </div>

      <ul className="grid gap-2.5">
        {ordered.map((check) => (
          <li key={check.id} className="flex gap-2.5">
            {statusIcon[check.status]}
            <div className="min-w-0">
              <p className="font-body text-sm font-semibold text-ink">{check.label}</p>
              <p className="font-body text-xs leading-relaxed text-ink-soft">{check.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
