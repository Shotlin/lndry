# LNDRY Website Cinematic Story Asset Manifest

Generated on 2026-07-02 after reviewing the deployed LNDRY website structure and the `Shotlin/lndry_website` repository.

## Purpose

These are website-specific storytelling assets, not app mockups and not a coded website. They are intended to make the live LNDRY website feel more cinematic, premium, Indian-context, and informative while staying aligned with the approved marketplace workflow.

## Final assets

| Section | Recommended asset | Intended placement |
| --- | --- | --- |
| Homepage hero | `website-home-hero-indian-handoff-v1.png` | Replace or A/B test the current object-only hero visual in `components/home/Hero.tsx`. |
| Services hero | `website-services-hero-care-specialist-v1.png` | Use in `app/services/page.tsx` hero or spotlight panel. |
| Marketplace hero | `website-marketplace-hero-vendor-order-v1.png` | Replace the current marketplace hero banner in `app/marketplace/page.tsx`. |
| How it works | `website-how-it-works-careline-journey-v1.png` | Use as the top hero or supporting banner in `app/how-it-works/page.tsx`. |
| Partners & operations | `website-partners-operations-system-v1.png` | Use in `app/partners/page.tsx` hero or operations overview. |
| Closing CTA | `website-closing-trust-cta-v1.png` | Use near `components/home/CloseCTA.tsx` or final CTA sections. |

## Export folders

- PNG masters: `assets/brand/v2/website-story/finals/`
- WebP derivatives: `assets/brand/v2/website-story/webp/1920/`, `1280/`, `768/`
- Preview sheet: `assets/brand/v2/website-story/website-story-contact-sheet.png`

## Art-direction rules followed

- Indian urban service context, not generic global laundry stock imagery.
- LNDRY violet, soft lavender, deep violet, white, near-black ink, and sparse teal status cues.
- Careline branding through garment-bag seams, tags, aprons, and subtle thread paths.
- Human/vendor/rider/admin visual storytelling tied to real website sections.
- No unsupported subscriptions, loyalty, surge pricing, continuous live tracking, or guarantee claims.
- No random bubbles, washing-machine clip art, blue stock gradients, zodiac/muscle/off-context imagery, or checkerboard backgrounds.

## Suggested Next.js usage

For the deployed repository, copy the pack folder into:

`public/brand/website-story/`

Then reference assets like:

```tsx
<Image
  src="/brand/website-story/finals/website-marketplace-hero-vendor-order-v1.png"
  alt="LNDRY partner vendor reviewing a new garment-care order"
  fill
  sizes="(min-width: 1024px) 560px, 90vw"
  className="object-cover"
/>
```

Prefer WebP derivatives when wiring manual `<picture>` sources or CSS backgrounds.
