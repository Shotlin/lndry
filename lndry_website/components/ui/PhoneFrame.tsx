import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
}

export function PhoneFrame({ src, alt, label, className = "", priority = false }: PhoneFrameProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[28px] bg-[#10131b] p-2 shadow-elevated">
        <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-white">
          <Image src={src} alt={alt} fill sizes="320px" className="object-cover object-top" priority={priority} />
        </div>
        <div className="absolute left-1/2 top-3 h-1.5 w-10 -translate-x-1/2 rounded-full bg-white/25" />
      </div>
      {label && <p className="font-body text-xs font-semibold text-ink-soft">{label}</p>}
    </div>
  );
}
