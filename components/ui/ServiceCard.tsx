import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Sparkles } from "lucide-react";
import { Pill } from "./Pill";

export interface ServiceCardData {
  title: string;
  description: string;
  icon: string;
  illustration: string;
  tag?: { label: string; tone: "teal" | "violet" };
  bestFor?: string;
  price?: string;
  delivery?: string;
}

export function ServiceCard({
  title,
  description,
  illustration,
  tag,
  bestFor,
  price = "Starting ₹99",
  delivery = "Partner-led timing",
  className = "",
  compact = false,
}: ServiceCardData & { className?: string; compact?: boolean }) {
  return (
    <article
      className={`service-card group flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-hairline transition-transform duration-500 [transition-timing-function:var(--ease-signature)] hover:-translate-y-1 ${className}`}
    >
      <div className={`relative overflow-hidden bg-[radial-gradient(circle_at_50%_18%,#ffffff_0%,#f2f0ff_54%,#e4e0ff_100%)] ${compact ? "h-44" : "h-52"}`}>
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/70 to-transparent" />
        {tag && (
          <span className="absolute right-4 top-4 z-10">
            <Pill tone={tag.tone === "teal" ? "teal" : "violet"} className="h-7 px-2.5 text-[11px]">
              {tag.label}
            </Pill>
          </span>
        )}
        <Image
          src={illustration}
          alt={`${title} service illustration`}
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
          className="object-contain p-5 transition-transform duration-700 [transition-timing-function:var(--ease-signature)] group-hover:scale-[1.08]"
        />
        <div className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-white shadow-[0_4px_8px_rgba(8,15,20,0.28)]">
          <Sparkles className="size-3 text-teal" aria-hidden="true" />
          <span className="font-body text-xs font-semibold">{price.replace("Starting ", "")}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{description}</p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 rounded-lg bg-surface-cool p-3.5 font-body text-xs">
          <div>
            <dt className="text-muted">Best for</dt>
            <dd className="mt-1 font-semibold text-ink">{bestFor ?? "Everyday care"}</dd>
          </div>
          <div>
            <dt className="text-muted">Starting from</dt>
            <dd className="mt-1 font-semibold text-violet-deep">{price.replace("Starting ", "")}</dd>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 border-t border-hairline pt-2.5 text-ink-soft">
            <Clock3 className="size-3.5 text-teal" aria-hidden="true" />
            Typical turnaround: <span className="font-semibold text-ink">{delivery}</span>
          </div>
        </dl>

        <Link
          href="/marketplace"
          className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-violet transition-[gap] duration-300 hover:gap-2.5"
        >
          Find a suitable partner
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
