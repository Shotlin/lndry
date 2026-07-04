"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type MotionOverlayProps = {
  variant: "marketplace-proof" | "otp-verified" | "careline-thread" | "service-tags" | "verified-badge";
  className?: string;
};

const ASSET: Record<MotionOverlayProps["variant"], { src: string; width: number; height: number; alt: string }> = {
  "marketplace-proof": {
    src: "/brand/website-finishing/overlays/marketplace-proof-card-cluster.webp",
    width: 760,
    height: 500,
    alt: "",
  },
  "otp-verified": {
    src: "/brand/website-finishing/overlays/otp-verified-handoff-card.webp",
    width: 640,
    height: 390,
    alt: "",
  },
  "careline-thread": {
    src: "/brand/website-finishing/overlays/careline-thread-overlay.svg",
    width: 1440,
    height: 420,
    alt: "",
  },
  "service-tags": {
    src: "/brand/website-finishing/overlays/service-tag-ribbon.webp",
    width: 1040,
    height: 280,
    alt: "",
  },
  "verified-badge": {
    src: "/brand/website-finishing/overlays/verified-partner-badge.webp",
    width: 520,
    height: 300,
    alt: "",
  },
};

export function LNDRYMotionOverlay({ variant, className = "" }: MotionOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const asset = ASSET[variant];

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 22, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power4.out" });

      if (variant === "marketplace-proof" || variant === "service-tags") {
        gsap.to(el, { y: -10, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.6 });
      }

      if (variant === "otp-verified" || variant === "verified-badge") {
        gsap.fromTo(el, { filter: "saturate(0.92)" }, { filter: "saturate(1.08)", duration: 0.55, ease: "power2.out", repeat: 1, yoyo: true, delay: 0.8 });
      }
    }, el);

    return () => ctx.revert();
  }, [variant, reducedMotion]);

  return (
    <div ref={ref} className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} className="h-auto w-full" />
    </div>
  );
}
