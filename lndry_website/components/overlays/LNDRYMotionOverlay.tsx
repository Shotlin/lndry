"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type MotionOverlayProps = {
  variant: "marketplace-proof" | "otp-verified" | "service-tags" | "verified-badge";
  className?: string;
};

const ASSET: Record<MotionOverlayProps["variant"], { src: string; width: number; height: number }> = {
  "marketplace-proof": {
    src: "/brand/website-finishing/overlays/marketplace-proof-card-cluster.webp",
    width: 760,
    height: 500,
  },
  "otp-verified": {
    src: "/brand/website-finishing/overlays/otp-verified-handoff-card.webp",
    width: 640,
    height: 390,
  },
  "service-tags": {
    src: "/brand/website-finishing/overlays/service-tag-ribbon.webp",
    width: 1040,
    height: 280,
  },
  "verified-badge": {
    src: "/brand/website-finishing/overlays/verified-partner-badge.webp",
    width: 520,
    height: 300,
  },
};

/** Decorative floating/pulsing proof cards from the finishing kit — reinforces marketplace trust while the user scrolls, never conveys information on its own (aria-hidden, purely atmospheric). */
export function LNDRYMotionOverlay({ variant, className = "" }: MotionOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const asset = ASSET[variant];

  useGSAP(
    () => {
      if (!ref.current || reducedMotion) return;
      const el = ref.current;

      gsap.fromTo(
        el,
        { opacity: 0, y: 22, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power4.out" }
      );

      if (variant === "marketplace-proof" || variant === "service-tags") {
        gsap.to(el, { y: -10, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.6 });
      }

      if (variant === "otp-verified" || variant === "verified-badge") {
        gsap.fromTo(
          el,
          { filter: "saturate(0.92)" },
          { filter: "saturate(1.08)", duration: 0.55, ease: "power2.out", repeat: 1, yoyo: true, delay: 0.8 }
        );
      }
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <div ref={ref} className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <Image src={asset.src} alt="" width={asset.width} height={asset.height} className="h-auto w-full" />
    </div>
  );
}
