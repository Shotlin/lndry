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
      <div className="relative aspect-[9/19.5] w-full rounded-[30px] bg-[linear-gradient(145deg,#a79aff_0%,#5f4be8_18%,#191b30_48%,#826df7_100%)] p-[2px] shadow-[0_18px_42px_rgba(79,54,207,0.24)] ring-1 ring-white/60">
        <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#141629] p-[2px]">
          <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-white">
            <Image src={src} alt={alt} fill sizes="320px" className="object-cover object-top" priority={priority} />
          </div>
        </div>
        <div className="absolute left-1/2 top-2.5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-white/45 shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
      </div>
      {label && <p className="font-body text-xs font-semibold text-ink-soft">{label}</p>}
    </div>
  );
}
