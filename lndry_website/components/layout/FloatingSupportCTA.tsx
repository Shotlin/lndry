import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function FloatingSupportCTA() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-5 right-5 z-[70] hidden items-center gap-3 rounded-full border border-teal/20 bg-white px-4 py-3 font-body text-sm font-semibold text-ink shadow-elevated transition-transform duration-300 hover:-translate-y-0.5 md:flex"
      aria-label="Need help? Chat on WhatsApp"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-tint text-teal">
        <MessageCircle size={18} />
      </span>
      <span>
        Need help?
        <span className="block text-xs font-medium text-teal">Chat on WhatsApp</span>
      </span>
    </Link>
  );
}
