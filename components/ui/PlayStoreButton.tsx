import { FaGooglePlay } from "react-icons/fa";
import { company } from "@/lib/data/site";

interface PlayStoreButtonProps {
  className?: string;
  /** "dark" is the standard store look; "light" is for dark backgrounds. */
  tone?: "dark" | "light";
  /** Where the click came from, kept for the accessible label only. */
  placement?: string;
}

/**
 * "Get it on Google Play" button that opens the live LNDRY app listing.
 * Plain link (no script), so it works before the page finishes loading.
 */
export function PlayStoreButton({ className = "", tone = "dark", placement }: PlayStoreButtonProps) {
  const colors =
    tone === "dark"
      ? "bg-ink text-white border-ink hover:bg-ink/90"
      : "bg-white text-ink border-white hover:bg-white/90";
  return (
    <a
      href={company.playStoreHref}
      target="_blank"
      rel="noopener noreferrer"
      data-placement={placement}
      aria-label="Get the LNDRY app on Google Play"
      className={`inline-flex h-13 items-center gap-3 rounded-sm border px-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender-electric ${colors} ${className}`}
    >
      <FaGooglePlay className="size-6 shrink-0" aria-hidden="true" />
      <span className="flex flex-col text-left leading-none">
        <span className="font-body text-[0.6rem] font-semibold uppercase tracking-[0.14em] opacity-75">Get it on</span>
        <span className="mt-1 font-display text-lg font-semibold">Google Play</span>
      </span>
    </a>
  );
}
