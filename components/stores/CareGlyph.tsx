import type { StoreCategoryId } from "@/lib/data/stores";

type GlyphKind =
  | "wash" | "iron" | "linen" | "shirt" | "trouser" | "jeans" | "kurta" | "pyjama" | "blazer" | "jacket" | "dhoti" | "sweater" | "cap"
  | "top" | "blouse" | "salwar" | "petticoat" | "dupatta" | "saree" | "lehenga" | "dress" | "skirt"
  | "sheet" | "pillow" | "towel" | "blanket" | "rug" | "curtain" | "shoe" | "bag" | "toy";

function resolveGlyph(serviceId: string, categoryId: StoreCategoryId): GlyphKind {
  const id = serviceId.toLowerCase();
  if (id === "laundry") return "wash";
  if (id === "mens") return "blazer";
  if (id === "womens") return "saree";
  if (id === "household") return "sheet";
  if (id === "accessories") return "bag";
  if (id.includes("household-wash")) return "linen";
  if (id.includes("wash-fold")) return "wash";
  if (id.includes("steam") || id === "steam-iron") return "iron";
  if (id.includes("shirt")) return "shirt";
  if (id.includes("trouser") || id.includes("pant")) return "trouser";
  if (id.includes("jeans")) return "jeans";
  if (id.includes("kurta") || id.includes("kurti")) return "kurta";
  if (id.includes("pyjama")) return "pyjama";
  if (id.includes("blazer") || id.includes("coat") || id.includes("safari") || id.includes("suit")) return "blazer";
  if (id.includes("jacket") || id.includes("hoodie")) return "jacket";
  if (id.includes("dhoti")) return "dhoti";
  if (id.includes("sweater")) return "sweater";
  if (id.includes("cap")) return "cap";
  if (id.includes("top")) return "top";
  if (id.includes("blouse")) return "blouse";
  if (id.includes("salwar")) return "salwar";
  if (id.includes("petticoat")) return "petticoat";
  if (id.includes("dupatta")) return "dupatta";
  if (id.includes("saree")) return "saree";
  if (id.includes("lehenga")) return "lehenga";
  if (id.includes("gown") || id.includes("dress")) return "dress";
  if (id.includes("skirt")) return "skirt";
  if (id.includes("bed")) return "sheet";
  if (id.includes("pillow")) return "pillow";
  if (id.includes("towel")) return "towel";
  if (id.includes("blanket") || id.includes("quilt")) return "blanket";
  if (id.includes("carpet")) return "rug";
  if (id.includes("curtain")) return "curtain";
  if (id.includes("shoe")) return "shoe";
  if (id.includes("bag")) return "bag";
  if (id.includes("toy")) return "toy";
  return categoryId === "laundry" ? "wash" : categoryId === "mens" ? "blazer" : categoryId === "womens" ? "saree" : categoryId === "household" ? "sheet" : "bag";
}

export function CareGlyph({ serviceId, categoryId, className = "" }: { serviceId: string; categoryId: StoreCategoryId; className?: string }) {
  const kind = resolveGlyph(serviceId, categoryId);
  const stroke = { fill: "none", stroke: "#664cf0", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
    <rect x="2" y="2" width="44" height="44" rx="14" fill="#f0edff" />
    <circle cx="38" cy="10" r="3" fill="#826df7" />
    {kind === "wash" && <><path d="M14 18h20l-2 18H16l-2-18Z" fill="#664cf0" /><path d="M18 17c0-3 2-5 6-5s6 2 6 5" {...stroke} /><path d="M19 26c3-3 7-3 10 0s-1 6-5 6-8-3-5-6Z" fill="#fff" /></>}
    {kind === "iron" && <><path d="M13 30h22c0-7-4-12-12-12h-4l-6 12Z" fill="#664cf0" /><path d="M14 32h22" {...stroke} /><path d="M21 22h7" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></>}
    {kind === "linen" && <><rect x="11" y="17" width="26" height="18" rx="4" fill="#664cf0" /><path d="M15 22h18M15 27h18M15 32h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></>}
    {kind === "shirt" && <path d="m17 15 7-4 7 4 6 7-5 4-2-3v14H18V23l-2 3-5-4 6-7Z" fill="#664cf0" />}
    {kind === "trouser" && <path d="M16 12h16l-2 25h-5l-1-12-1 12h-5l-2-25Z" fill="#664cf0" />}
    {kind === "jeans" && <><path d="M16 12h16l-2 25h-5l-1-12-1 12h-5l-2-25Z" fill="#664cf0" /><path d="M19 15h10M24 15v7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></>}
    {kind === "kurta" && <><path d="m17 14 7-3 7 3 5 7-5 4v12H17V25l-5-4 5-7Z" fill="#664cf0" /><path d="M24 14v13" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></>}
    {kind === "pyjama" && <path d="M16 14h16v23h-6l-2-10-2 10h-6V14Z" fill="#664cf0" />}
    {kind === "blazer" && <><path d="m17 13 7-3 7 3 5 10-5 3v11H17V26l-5-3 5-10Z" fill="#664cf0" /><path d="m20 15 4 8 4-8M24 23v11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>}
    {kind === "jacket" && <><path d="m16 15 8-4 8 4 4 9-5 3v10H17V27l-5-3 4-9Z" fill="#664cf0" /><path d="M24 15v22M19 25h10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></>}
    {kind === "dhoti" && <><path d="M14 15h20v20H14z" fill="#664cf0" /><path d="M24 16v19M17 20h14" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></>}
    {kind === "sweater" && <><path d="m17 16 7-4 7 4 5 8-5 3v10H17V27l-5-3 5-8Z" fill="#664cf0" /><path d="M20 17c1 2 7 2 8 0M20 30h8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></>}
    {kind === "cap" && <><path d="M15 27c1-9 16-11 19 0H15Z" fill="#664cf0" /><path d="M12 29h25" {...stroke} /></>}
    {kind === "top" && <path d="m17 15 7-4 7 4 5 8-5 3v11H17V26l-5-3 5-8Z" fill="#664cf0" />}
    {kind === "blouse" && <><path d="m18 16 6-4 6 4 5 8-5 3v10H18V27l-5-3 5-8Z" fill="#664cf0" /><circle cx="24" cy="22" r="2" fill="#fff" /></>}
    {kind === "salwar" && <path d="M17 13h14l2 24h-7l-2-10-2 10h-7l2-24Z" fill="#664cf0" />}
    {kind === "petticoat" && <path d="M18 15h12l5 22H13l5-22Z" fill="#664cf0" />}
    {kind === "dupatta" && <path d="M14 15c9-5 11 7 20 2v15c-9 5-11-7-20-2V15Z" fill="#664cf0" />}
    {kind === "saree" && <><path d="M15 14c13 0 9 12 19 12v10c-12 0-8-12-19-12V14Z" fill="#664cf0" /><path d="M16 17c8 0 6 8 16 8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></>}
    {kind === "lehenga" && <><path d="M20 13h8v9l7 15H13l7-15v-9Z" fill="#664cf0" /><path d="M16 33h16" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></>}
    {kind === "dress" && <path d="m20 12 4-2 4 2v11l8 14H12l8-14V12Z" fill="#664cf0" />}
    {kind === "skirt" && <path d="M19 15h10l6 22H13l6-22Z" fill="#664cf0" />}
    {kind === "sheet" && <><rect x="11" y="17" width="26" height="18" rx="4" fill="#664cf0" /><path d="M15 22h18M15 30h18" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></>}
    {kind === "pillow" && <rect x="11" y="17" width="26" height="17" rx="6" fill="#664cf0" />}
    {kind === "towel" && <><rect x="15" y="12" width="18" height="25" rx="3" fill="#664cf0" /><path d="M19 18h10M19 31h10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></>}
    {kind === "blanket" && <><rect x="11" y="16" width="26" height="21" rx="4" fill="#664cf0" /><path d="M15 21h18M15 27h18M15 33h18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></>}
    {kind === "rug" && <><path d="M14 16h20v20H14z" fill="#664cf0" /><path d="M18 20h12v12H18z" fill="none" stroke="#fff" strokeWidth="1.8" /></>}
    {kind === "curtain" && <><path d="M14 14h8v23h-8zM26 14h8v23h-8z" fill="#664cf0" /><path d="M18 14v23M30 14v23" stroke="#fff" strokeWidth="1.5" /></>}
    {kind === "shoe" && <path d="M14 28c6 0 6-8 10-8 3 0 4 6 10 7 2 1 3 3 3 6H13c0-3 0-5 1-5Z" fill="#664cf0" />}
    {kind === "bag" && <><rect x="13" y="18" width="22" height="19" rx="4" fill="#664cf0" /><path d="M19 18c0-7 10-7 10 0" {...stroke} /><path d="M18 27h12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></>}
    {kind === "toy" && <><circle cx="18" cy="21" r="5" fill="#664cf0" /><circle cx="30" cy="21" r="5" fill="#664cf0" /><circle cx="24" cy="27" r="9" fill="#664cf0" /><circle cx="21" cy="27" r="1.4" fill="#fff" /><circle cx="27" cy="27" r="1.4" fill="#fff" /></>}
  </svg>;
}
