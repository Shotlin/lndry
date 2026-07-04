import Image from "next/image";
import Link from "next/link";
import { Pill } from "./Pill";

export interface ServiceCardData {
  title: string;
  description: string;
  icon: string;
  illustration: string;
  tag?: { label: string; tone: "teal" | "violet" };
}

export function ServiceCard({
  title,
  description,
  illustration,
  tag,
  className = "",
  compact = false,
}: ServiceCardData & { className?: string; compact?: boolean }) {
  return (
    <div
      className={`service-card group relative flex h-full flex-col rounded-lg border border-hairline bg-white p-6 shadow-soft transition-transform duration-300 [transition-timing-function:var(--ease-signature)] hover:-translate-y-1.5 hover:shadow-elevated ${className}`}
    >
      {tag && (
        <span className="absolute right-5 top-5">
          <Pill tone={tag.tone === "teal" ? "teal" : "violet"} className="h-8 px-3 text-xs">
            {tag.label}
          </Pill>
        </span>
      )}

      <div className={`relative ${compact ? "h-24 w-24" : "h-28 w-28"} shrink-0`}>
        <Image src={illustration} alt="" fill sizes="112px" className="object-contain" />
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 flex-1 font-body text-sm leading-relaxed text-ink-soft">{description}</p>

      <Link
        href="/marketplace"
        className="mt-4 inline-flex items-center gap-1 font-body text-sm font-semibold text-violet group-hover:gap-2 transition-all"
      >
        Get a recommended partner near you
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
