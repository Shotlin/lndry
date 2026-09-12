import type { StoreCategoryId } from "@/lib/data/stores";

/**
 * Deliberately literal category glyphs. The shared base, violet careline and
 * small signature dot form the LNDRY visual language without adding a second,
 * competing logo badge to every control.
 */
export function CategoryGlyph({ categoryId, className = "" }: { categoryId: StoreCategoryId; className?: string }) {
  const line = { fill: "none", stroke: "#664cf0", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return <svg viewBox="0 0 56 56" aria-hidden="true" className={className}>
    <rect x="3" y="3" width="50" height="50" rx="16" fill="#f0edff" />
    <path d="M13 43h19" stroke="#826df7" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="43" cy="43" r="3" fill="#664cf0" />

    {categoryId === "laundry" && <>
      <rect x="15" y="13" width="25" height="27" rx="5" fill="#664cf0" />
      <circle cx="27.5" cy="29" r="7.2" fill="#fff" />
      <path d="M24 29c2.2-2.6 5.5-2.6 7.2 0 1.5 2.3-.4 4.7-3.6 4.7S22.5 31.3 24 29Z" fill="#826df7" />
      <circle cx="20" cy="18" r="1.7" fill="#fff" />
      <path d="M31 18h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </>}

    {categoryId === "mens" && <>
      <path d="M18 16 28 11l10 5 5 9-6 4-2-3v14H21V26l-2 3-6-4 5-9Z" fill="#664cf0" />
      <path d="m23 16 5 7 5-7M28 23v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 11c4-4 12-4 16 0" {...line} />
    </>}

    {categoryId === "womens" && <>
      <path d="M16 16c12-4 12 10 24 8v16c-12 3-12-10-24-8V16Z" fill="#664cf0" />
      <path d="M18 20c8-2 9 7 19 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="m28 12 5 4-2 6h-7l-2-6 6-4Z" fill="#826df7" />
    </>}

    {categoryId === "household" && <>
      <path d="m14 25 14-12 14 12v15H14V25Z" fill="#664cf0" />
      <path d="M19 30h18v7H19z" fill="#fff" />
      <path d="M19 30v7M23 28h7v4" stroke="#826df7" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 25 28 11l16 14" {...line} />
    </>}

    {categoryId === "accessories" && <>
      <path d="M13 34c5 0 7-9 11-9 3 0 4 6 11 7 3 .5 4 3 4 6H13v-4Z" fill="#664cf0" />
      <path d="M30 17h11v15H30z" fill="#826df7" />
      <path d="M33 17c0-6 6-6 6 0" {...line} />
      <path d="M17 36h18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </>}
  </svg>;
}
