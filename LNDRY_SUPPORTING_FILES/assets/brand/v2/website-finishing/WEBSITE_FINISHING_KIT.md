# LNDRY Website Finishing Kit

Generated on 2026-07-02.

This kit fills the remaining visual layer after the cinematic section assets:

- floating marketplace proof cards
- OTP verified handoff card
- service tag ribbon
- careline thread overlay
- scroll chapter dots
- verified partner badge
- OG/social images for key pages

## Recommended animation use

1. Hero: fade in the careline thread overlay with stroke-dashoffset from 100% to 0.
2. Services: use service-tag-ribbon as a horizontal parallax layer behind service cards.
3. Marketplace: float marketplace-proof-card-cluster over the vendor hero image with a slow y: -8 to +8 loop.
4. How it works: use careline-thread-overlay as the scroll progress path.
5. Trust/CTA: show otp-verified-handoff-card after image reveal, then pulse the teal check once.

## Motion rules

- 180-260ms for UI transitions.
- 700-1100ms for cinematic section reveal.
- Use ease: cubic-bezier(0.16, 1, 0.3, 1).
- Respect prefers-reduced-motion by disabling loops and showing final states.

## Repo placement

Copy this folder to:

`public/brand/website-finishing/`

Then reference, for example:

```tsx
<Image
  src="/brand/website-finishing/overlays/marketplace-proof-card-cluster.webp"
  alt=""
  width={760}
  height={500}
  className="pointer-events-none absolute right-8 top-16 w-[min(42vw,520px)]"
/>
```
