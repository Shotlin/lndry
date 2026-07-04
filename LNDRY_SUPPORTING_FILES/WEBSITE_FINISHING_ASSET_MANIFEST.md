# LNDRY Website Finishing Asset Manifest

Generated on 2026-07-02.

## Executive recommendation

The cinematic section heroes are now enough. The remaining high-impact gap was the motion and interaction layer: small visual assets that can float, draw, pulse, and reinforce marketplace proof while the user scrolls.

## Included assets

### Overlay and motion assets

- `careline-thread-overlay.svg/png/webp`
- `marketplace-proof-card-cluster.svg/png/webp`
- `otp-verified-handoff-card.svg/png/webp`
- `service-tag-ribbon.svg/png/webp`
- `scroll-chapter-dots.svg/png/webp`
- `verified-partner-badge.svg/png/webp`

### OG/social assets

- `home-og-1200x630.png`
- `services-og-1200x630.png`
- `marketplace-og-1200x630.png`
- `journey-og-1200x630.png`
- `partners-og-1200x630.png`

### Motion source

- `motion/LNDRYMotionOverlay.tsx`
- `WEBSITE_FINISHING_KIT.md`

## Best places to use them

- Homepage hero: `careline-thread-overlay` behind the hero image.
- Services section: `service-tag-ribbon` as a slow parallax layer.
- Marketplace section: `marketplace-proof-card-cluster` floating above the vendor hero.
- How it works: `careline-thread-overlay` as scroll-drawn journey progress.
- Trust/CTA section: `otp-verified-handoff-card` or `verified-partner-badge` after the human handoff image reveals.
- Social sharing: OG images in Next metadata for each route.

## Motion guidance

- Use 700-1100ms section reveals.
- Use 180-260ms UI micro-interactions.
- Use `cubic-bezier(0.16, 1, 0.3, 1)`.
- Respect `prefers-reduced-motion`.

## Scope guard

No new unsupported product claims were added. The kit stays inside approved LNDRY behavior: recommendation-led marketplace flow, service eligibility, pickup, processing, OTP handover, and operational trust.
