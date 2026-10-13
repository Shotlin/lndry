import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { CopyLinkButton } from "@/components/blog/CopyLinkButton";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: FaWhatsapp },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FaFacebookF },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`, Icon: FaXTwitter },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: FaLinkedinIn },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-body text-sm font-semibold text-ink-soft">Share</span>
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-sm border border-hairline bg-white text-violet transition-colors hover:border-violet hover:bg-lavender-soft">
          <Icon className="size-4" aria-hidden="true" />
        </a>
      ))}
      <CopyLinkButton url={url} />
    </div>
  );
}
