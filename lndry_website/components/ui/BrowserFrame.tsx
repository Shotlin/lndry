import Image from "next/image";

interface BrowserFrameProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}

export function BrowserFrame({ src, alt, label = "lndry.app", className = "" }: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden rounded-lg border border-hairline bg-white shadow-elevated ${className}`}>
      <div className="flex items-center gap-2 border-b border-hairline bg-surface-cool px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-error" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning" />
        <span className="h-2.5 w-2.5 rounded-full bg-success" />
        <span className="ml-3 truncate rounded-full border border-hairline bg-white px-3 py-1 font-body text-xs text-muted">
          {label}
        </span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes="480px" className="object-cover object-top" />
      </div>
    </div>
  );
}
