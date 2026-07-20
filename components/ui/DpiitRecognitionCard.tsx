import Image from "next/image";

export function DpiitRecognitionCard({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="/brand/certificates/dpiit-startup-recognition.pdf"
      target="_blank"
      rel="noreferrer"
      className={`group relative block overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#bdb5ff_0%,#6a52ee_28%,#16152d_58%,#281b5f_100%)] p-px shadow-[0_18px_50px_rgba(58,37,150,0.24)] transition-transform duration-500 hover:-translate-y-1 ${compact ? "max-w-sm" : "max-w-xl"}`}
      aria-label="View LNDRY DPIIT Startup Recognition certificate PDF"
    >
      <span className="pointer-events-none absolute -left-14 -top-16 size-48 rounded-full bg-white/20 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 right-2 size-44 rounded-full bg-teal/20 blur-3xl" />
      <span className="pointer-events-none absolute inset-x-10 top-px h-px bg-white/70" />

      <span className={`relative flex rounded-[15px] border border-white/10 bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(135deg,#202044_0%,#111222_56%,#21134f_100%)] ${compact ? "items-center gap-3 p-3" : "flex-col gap-6 p-5 sm:flex-row sm:gap-7 sm:p-7"}`}>
        <span className={`flex shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#fffdfa,#e9e4d9)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_20px_rgba(0,0,0,0.22)] ${compact ? "size-12" : "size-20"}`}>
          <span className={`relative ${compact ? "h-9 w-6" : "h-14 w-10"}`}>
            <Image src="/brand/certificates/ashoka-emblem-from-certificate.png" alt="State Emblem of India shown on LNDRY's official certificate" fill sizes={compact ? "24px" : "40px"} className="object-contain" />
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className={`block font-body font-semibold uppercase tracking-[0.16em] text-[#f2cf82] ${compact ? "text-[9px]" : "text-[10px]"}`}>DPIIT recognised startup</span>
          <span className={`mt-1 block font-display font-semibold text-white ${compact ? "text-sm" : "text-2xl"}`}>Certificate of Recognition</span>
          {!compact ? <span className="mt-3 block max-w-sm font-body text-sm leading-relaxed text-white/68">LNDRY CARE TECHNOLOGIES PRIVATE LIMITED is recognised as a startup in the Laundry sector.</span> : null}
          <span className={`mt-3 flex items-center justify-between gap-3 font-body ${compact ? "text-[10px]" : "text-xs"}`}><span className="text-white/55">DIPP269393</span><span className="font-semibold text-white/85 group-hover:text-[#f2cf82]">View official PDF ↗</span></span>
        </span>
      </span>
    </a>
  );
}
