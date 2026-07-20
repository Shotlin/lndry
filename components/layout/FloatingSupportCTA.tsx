import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { company } from "@/lib/data/site";

export function FloatingSupportCTA() {
  return (
    <Link
      href={company.whatsappHref}
      className="fixed bottom-4 right-4 z-[70] flex size-12 items-center justify-center rounded-full border border-teal/20 bg-white font-body text-sm font-semibold text-ink shadow-elevated transition-transform duration-300 hover:-translate-y-0.5 sm:bottom-5 sm:right-5 sm:h-auto sm:w-auto sm:gap-3 sm:px-4 sm:py-3"
      aria-label="Need help? Chat on WhatsApp"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-tint text-teal">
        <MessageCircle size={18} />
      </span>
      <span className="hidden sm:block">
        Need help?
        <span className="block text-xs font-medium text-teal">Chat on WhatsApp</span>
      </span>
    </Link>
  );
}
