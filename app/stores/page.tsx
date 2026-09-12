import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, ChevronRight, Sparkles } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Container } from "@/components/ui/Container";
import { CategoryGlyph } from "@/components/stores/CategoryGlyph";
import { LNDRY_STORE } from "@/lib/data/stores";

export const metadata: Metadata = {
  title: "Stores | LNDRY",
  description: "Explore the official LNDRY House storefront and curated garment-care collections.",
  alternates: { canonical: "/stores" },
};

const SHOP_DETAILS = [
  "Official price-list catalog",
  "Everyday, occasion & home care",
  "Pickup booking through LNDRY",
];

export default function StoresPage() {
  return (
    <div className="overflow-hidden bg-[#f4f3fb]">
      <section className="relative isolate bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(102,76,240,0.34),transparent_30%),radial-gradient(circle_at_92%_85%,rgba(15,181,166,0.2),transparent_24%)]" />
        <Container className="relative py-10 sm:py-14 lg:py-18">
          <div className="mb-9 flex flex-wrap items-center justify-between gap-4 border-b border-white/13 pb-6">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full border border-teal/35 bg-teal/10 text-teal"><Sparkles className="size-5" aria-hidden="true" /></span><div><p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-teal">The official shop</p><p className="font-body text-sm text-white/60">Made for considered garment care</p></div></div>
            <Link href="/stores/lndry" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/20 px-4 font-display text-sm font-semibold text-white transition-colors hover:border-teal hover:bg-white/8">Enter LNDRY House <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="flex min-h-[30rem] flex-col rounded-[1.7rem] border border-white/14 bg-[linear-gradient(145deg,rgba(19,29,42,0.96),rgba(8,15,20,0.96))] p-7 shadow-[0_22px_56px_rgba(0,0,0,0.27)] sm:p-9">
              <Image src="/brand/logos/lndry-white-horizontal.png" alt="LNDRY" width={198} height={64} priority className="h-auto w-38 sm:w-45" />
              <div className="mt-auto">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.13em] text-teal"><BadgeCheck className="size-3.5" aria-hidden="true" />Official in-house store</span>
                <h1 className="mt-5 font-display text-[clamp(2.55rem,5.3vw,5rem)] font-semibold leading-[0.94] tracking-[-0.045em]">A better home<br />for <span className="text-teal">everyday care.</span></h1>
                <p className="mt-5 max-w-md font-body text-base leading-relaxed text-white/67">The LNDRY House is the flagship storefront for a complete, item-level garment-care catalog—built with the same clarity, service language, and visual identity as the platform.</p>
                <div className="mt-7 flex flex-wrap gap-3"><Link href="/stores/lndry" className="inline-flex min-h-13 items-center gap-2 rounded-sm bg-teal px-5 font-display text-base font-semibold text-ink shadow-[0_10px_24px_rgba(15,181,166,0.18)] transition-transform hover:-translate-y-0.5">Shop the catalog <ArrowRight className="size-4" aria-hidden="true" /></Link><Link href="/stores/lndry#catalog" className="inline-flex min-h-13 items-center gap-2 rounded-sm border border-white/20 px-5 font-display text-base font-semibold text-white transition-colors hover:bg-white/9">Browse departments <ChevronRight className="size-4" aria-hidden="true" /></Link></div>
              </div>
            </div>

            <div className="group relative min-h-[30rem] overflow-hidden rounded-[1.7rem] border border-white/12 bg-[#101b2a] shadow-[0_22px_56px_rgba(0,0,0,0.27)]">
              <Image src="/brand/store/lndry-store-atelier-v1.webp" alt="LNDRY House garment-care atelier with curated clothing and premium fabric textures" fill priority sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover object-right transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,20,0.86)_0%,rgba(8,15,20,0.4)_45%,rgba(8,15,20,0.04)_76%)]" />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 sm:inset-x-7 sm:top-7"><span className="rounded-full border border-white/20 bg-ink/40 px-3 py-2 font-body text-[10px] font-bold uppercase tracking-[0.13em] text-white backdrop-blur-md">LNDRY House / Pune</span><span className="rounded-full bg-white/90 px-3 py-2 font-body text-[10px] font-bold uppercase tracking-[0.13em] text-violet">Care catalog 01</span></div>
              <div className="absolute inset-x-5 bottom-5 max-w-md rounded-xl border border-white/15 bg-[#0a121c]/74 p-5 backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-6"><p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-teal">The house edit</p><p className="mt-2 font-display text-2xl font-semibold leading-tight">A shop experience, not another vendor card.</p><p className="mt-2 font-body text-sm leading-relaxed text-white/65">Explore 52 listed services across five care departments.</p></div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-b border-hairline bg-white py-6"><Container><div className="grid gap-3 md:grid-cols-3">{SHOP_DETAILS.map((detail, index) => <div key={detail} className="flex items-center gap-3 border-hairline px-2 md:border-r md:last:border-0"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-tint font-display text-xs font-bold text-teal">0{index + 1}</span><p className="font-body text-sm font-semibold text-ink">{detail}</p></div>)}</div></Container></section>

      <section className="py-16 md:py-22"><Container><div className="grid gap-6 lg:grid-cols-[0.67fr_1.33fr] lg:items-end"><div><p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-violet">Shop by care department</p><h2 className="mt-3 font-display text-headline text-ink">A place for every piece in your wardrobe.</h2></div><p className="max-w-xl font-body text-base leading-relaxed text-ink-soft lg:justify-self-end">LNDRY House keeps the catalog structured like a thoughtful boutique: start with the item, understand the care route, and see the applicable listed price.</p></div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{LNDRY_STORE.categories.map((category) => <Link key={category.id} href="/stores/lndry#catalog" className="group relative flex min-h-64 flex-col overflow-hidden rounded-xl border border-hairline bg-ink p-5 text-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-violet/70 hover:shadow-elevated"><Image src={category.artwork} alt="" fill sizes="(min-width: 1280px) 260px, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-110" /><span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,20,0.05)_5%,rgba(8,15,20,0.9)_92%)]" /><Image src="/brand/logos/lndry-white-horizontal.png" alt="" width={82} height={27} className="relative h-auto w-20 opacity-95" /><span className="absolute right-4 top-4 flex size-13 items-center justify-center overflow-hidden rounded-md border border-white/20 bg-white/94 shadow-soft">{category.iconArtwork ? <Image src={category.iconArtwork} alt="" fill sizes="52px" className="object-contain" /> : <CategoryGlyph categoryId={category.id} className="size-12" />}</span><p className="relative mt-auto font-display text-lg font-semibold">{category.label}</p><p className="relative mt-2 font-body text-sm leading-relaxed text-white/68">{category.description}</p><span className="relative mt-5 inline-flex items-center gap-1.5 font-body text-xs font-bold text-lavender-electric">Explore <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link>)}</div></Container></section>

      <section className="bg-[linear-gradient(135deg,#eae8ff_0%,#f4f3fb_48%,#ddf7f3_100%)] py-16 md:py-20"><Container className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"><article className="relative overflow-hidden rounded-xl bg-ink p-7 text-white shadow-elevated sm:p-9"><div className="absolute -right-12 -top-10 size-52 rounded-full bg-violet/45 blur-3xl" /><div className="relative"><p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-teal">The flagship collection</p><h2 className="mt-3 max-w-xl font-display text-headline">The full LNDRY catalog is ready when your wardrobe is.</h2><p className="mt-4 max-w-lg font-body leading-relaxed text-white/70">From ₹80/kg everyday laundry to bridal lehenga care, each service appears with a visible price basis and a focused path to pickup.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/stores/lndry" className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-white px-5 font-display text-sm font-semibold text-violet transition-transform hover:-translate-y-0.5">Visit LNDRY House <ArrowRight className="size-4" aria-hidden="true" /></Link><a href={LNDRY_STORE.socials?.instagram} target="_blank" rel="noreferrer" aria-label="Follow LNDRY on Instagram" className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-white/20 px-5 font-display text-sm font-semibold text-white transition-colors hover:bg-white/9"><FaInstagram className="size-4" aria-hidden="true" />Follow @lndry.in</a></div></div></article>
        <article className="rounded-xl border border-white/80 bg-white/80 p-7 shadow-soft sm:p-9"><p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-violet">At a glance</p><dl className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-1"><div><dt className="font-display text-3xl font-semibold text-ink">52</dt><dd className="mt-1 font-body text-sm text-ink-soft">listed care services</dd></div><div><dt className="font-display text-3xl font-semibold text-ink">5</dt><dd className="mt-1 font-body text-sm text-ink-soft">shop departments</dd></div><div><dt className="font-display text-3xl font-semibold text-ink">₹80/kg</dt><dd className="mt-1 font-body text-sm text-ink-soft">wash &amp; fold listed rate</dd></div></dl><div className="mt-7 border-t border-hairline pt-5"><p className="flex items-start gap-2 font-body text-sm leading-relaxed text-ink-soft"><Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />Official LNDRY catalog, designed as a natural part of the marketplace.</p></div></article>
      </Container></section>

      <section className="bg-white py-16 md:py-20"><Container><div className="flex flex-col gap-4 border-b border-hairline pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-violet">Other stores, next</p><h2 className="mt-3 font-display text-headline text-ink">The first house on a scalable street.</h2></div><p className="max-w-xl font-body text-sm leading-relaxed text-ink-soft">LNDRY House establishes a reusable in-house store pattern while leaving room for future curated storefronts.</p></div><div className="mt-7 grid gap-4 sm:grid-cols-3"><div className="rounded-xl bg-bg-app p-5"><p className="font-display text-lg font-semibold text-ink">Official collections</p><p className="mt-2 font-body text-sm text-ink-soft">The LNDRY House experience.</p></div><div className="rounded-xl bg-bg-app p-5"><p className="font-display text-lg font-semibold text-ink">Partner storefronts</p><p className="mt-2 font-body text-sm text-ink-soft">A future marketplace-ready format.</p></div><div className="rounded-xl bg-bg-app p-5"><p className="font-display text-lg font-semibold text-ink">Curated care edits</p><p className="mt-2 font-body text-sm text-ink-soft">Seasonal or specialist collections.</p></div></div></Container></section>
    </div>
  );
}
