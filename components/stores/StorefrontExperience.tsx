"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  PackageCheck,
  Plus,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import type { Storefront } from "@/lib/data/stores";
import { Container } from "@/components/ui/Container";
import { CareGlyph } from "@/components/stores/CareGlyph";
import { CategoryGlyph } from "@/components/stores/CategoryGlyph";

const POPULAR_IDS = ["wash-fold", "wash-steam-iron", "shirt-tshirt", "saree-plain"];

const JOURNEY = [
  { title: "Schedule pickup", copy: "Choose your preferred route and continue to booking.", icon: Truck },
  { title: "We clean & care", copy: "Your selected care route stays visible throughout the order.", icon: Sparkles },
  { title: "Quality check", copy: "The order progresses through a clear care milestone.", icon: ShieldCheck },
  { title: "Delivered fresh", copy: "Receive updates through the LNDRY order experience.", icon: PackageCheck },
];

const FAQS = [
  ["What does the price shown mean?", "Each service displays its verified starting price and unit. The final item count and applicable estimate are confirmed before booking."],
  ["Can I mix services in one request?", "Yes. Add the care routes you need, then continue to the booking flow where the request can be reviewed."],
  ["How do I know which treatment to choose?", "Use the category descriptions and service notes as a starting point. The booking flow confirms the applicable route for your items."],
];

export function StorefrontExperience({ store }: { store: Storefront }) {
  const [activeCategory, setActiveCategory] = useState<Storefront["categories"][number]["id"]>("laundry");
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const popular = useMemo(() => store.services.filter((item) => POPULAR_IDS.includes(item.id)), [store.services]);
  const selectedCount = Object.values(basket).reduce((sum, amount) => sum + amount, 0);
  const currentCategory = store.categories.find((category) => category.id === activeCategory) ?? store.categories[0];
  const catalog = store.services.filter((item) => item.categoryId === activeCategory);

  function addService(id: string) {
    setBasket((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }

  function chooseCategory(categoryId: typeof activeCategory) {
    setActiveCategory(categoryId);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-bg-app pb-28 md:pb-0">
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={store.heroImage} alt={store.heroAlt} fill priority sizes="100vw" className="-z-20 object-cover object-[68%_center] opacity-85" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#080f14_0%,rgba(8,15,20,0.97)_36%,rgba(8,15,20,0.68)_62%,rgba(8,15,20,0.14)_100%)]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-80 rounded-full bg-violet/35 blur-3xl" />
        <Container className="relative py-15 sm:py-20 lg:py-26">
          <div className="max-w-2xl">
            <Image src="/brand/logos/lndry-primary-horizontal.png" alt="LNDRY" width={184} height={60} priority className="h-auto w-42 rounded-sm bg-white/96 p-2.5 shadow-[0_10px_24px_rgba(0,0,0,0.22)]" />
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet/55 bg-violet/20 px-3 py-2 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-lavender-electric backdrop-blur-md">
              <BadgeCheck className="size-4" aria-hidden="true" /> Official LNDRY store
            </div>
            <h1 className="mt-5 font-display text-hero text-white">Care, curated by <span className="text-lavender-electric">LNDRY.</span></h1>
            <p className="mt-5 max-w-xl font-body text-body-lg leading-relaxed text-white/76">{store.shortDescription}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#catalog" className="inline-flex min-h-13 items-center gap-2 rounded-sm bg-violet px-6 font-display text-base font-semibold text-white shadow-[0_12px_28px_rgba(102,76,240,0.3)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-violet-deep focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-3">Explore services <ArrowRight className="size-4" aria-hidden="true" /></Link>
              <Link href={store.bookingHref} className="inline-flex min-h-13 items-center gap-2 rounded-sm border border-white/25 bg-white/8 px-6 font-display text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/16 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-3">Start a pickup <ChevronRight className="size-4" aria-hidden="true" /></Link>
              {store.socials?.instagram ? <a href={store.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center gap-2 rounded-sm px-2 font-body text-sm font-semibold text-white/80 transition-colors hover:text-lavender-electric focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-3"><FaInstagram className="size-5" aria-hidden="true" />Follow @lndry.in</a> : null}
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/15 pt-5 font-body text-sm text-white/72">
              <span className="inline-flex items-center gap-2"><BadgeCheck className="size-4 text-lavender-electric" aria-hidden="true" />In-house collection</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-lavender-electric" aria-hidden="true" />Visible price basis</span>
              <span className="inline-flex items-center gap-2"><Store className="size-4 text-lavender-electric" aria-hidden="true" />Part of the LNDRY marketplace</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline bg-white py-6">
        <Container>
          <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
            {store.categories.map((category) => (
              <button key={category.id} type="button" onClick={() => chooseCategory(category.id)} className="group flex min-h-16 min-w-41 shrink-0 items-center gap-3 rounded-lg border border-hairline bg-surface-cool px-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-white hover:shadow-soft focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-2 sm:min-w-48">
                <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-lavender-soft shadow-[0_3px_10px_rgba(102,76,240,0.12)]">{category.iconArtwork ? <Image src={category.iconArtwork} alt="" fill sizes="48px" className="object-contain p-0.5" /> : <CategoryGlyph categoryId={category.id} className="size-11" />}</span>
                <span><span className="block font-display text-sm font-semibold text-ink">{category.shortLabel}</span><span className="mt-0.5 block font-body text-xs text-ink-soft">{category.label}</span></span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <SectionLead eyebrow="Most requested" title="Your regular care, one thoughtful edit." copy="The LNDRY store brings the most frequently selected routes together without making you work through a long vendor list." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {popular.map((service) => <ServiceCard key={service.id} service={service} quantity={basket[service.id] ?? 0} onAdd={() => addService(service.id)} />)}
          </div>
        </Container>
      </section>

      <section id="catalog" className="scroll-mt-24 bg-white py-16 md:py-20">
        <Container>
          <div className="flex flex-col gap-6 border-b border-hairline pb-7 lg:flex-row lg:items-end lg:justify-between">
            <SectionLead eyebrow="The complete LNDRY price catalog" title="Choose the care route. Keep the price unit in view." copy={store.serviceNote} />
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-tint px-3 py-2 font-body text-xs font-semibold text-teal"><BadgeCheck className="size-4" aria-hidden="true" />Official store collection</div>
          </div>
          <div role="tablist" aria-label="LNDRY service categories" className="mt-7 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {store.categories.map((category) => (
              <button key={category.id} type="button" role="tab" aria-selected={activeCategory === category.id} onClick={() => setActiveCategory(category.id)} className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full px-3.5 font-body text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-2 ${activeCategory === category.id ? "bg-ink text-white shadow-[0_8px_16px_rgba(8,15,20,0.16)]" : "bg-bg-app text-ink-soft hover:bg-lavender-soft hover:text-ink"}`}><span className="relative size-7 shrink-0 overflow-hidden rounded-full bg-lavender-soft">{category.iconArtwork ? <Image src={category.iconArtwork} alt="" fill sizes="28px" className="object-contain" /> : <CategoryGlyph categoryId={category.id} className="size-7" />}</span>{category.label}</button>
            ))}
          </div>
          <div role="tabpanel" aria-live="polite" className="mt-8">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className="font-display text-subhead text-ink">{currentCategory.label}</h2><p className="mt-1 font-body text-sm text-ink-soft">{currentCategory.description}</p></div><p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-violet">{catalog.length} care routes</p></div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{catalog.map((service) => <CatalogRow key={service.id} service={service} quantity={basket[service.id] ?? 0} onAdd={() => addService(service.id)} />)}</div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-lavender-soft py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="rounded-xl bg-ink p-6 text-white shadow-elevated sm:p-8"><p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-teal">Premium garment care</p><h2 className="mt-3 font-display text-headline">For the pieces that need a more considered route.</h2><p className="mt-4 font-body leading-relaxed text-white/68">Men’s and women’s dry cleaning are organized by garment, so sarees, suits, occasion wear, and everyday items retain their own visible price basis.</p><button type="button" onClick={() => chooseCategory("womens")} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm bg-white px-4 font-display text-sm font-semibold text-violet transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-3">View women’s care <ArrowRight className="size-4" aria-hidden="true" /></button></div>
          <div className="grid gap-3 sm:grid-cols-2">{store.services.filter((service) => ["mens", "womens"].includes(service.categoryId)).filter((service) => ["shirt-tshirt", "suit-2-piece", "saree-plain", "bridal-lehenga"].includes(service.id)).map((service) => <div key={service.id} className="flex min-h-28 items-center gap-4 rounded-xl border border-white/80 bg-white/82 p-4 shadow-soft"><CareGlyph serviceId={service.id} categoryId={service.categoryId} className="size-11 shrink-0" /><div><p className="font-display font-semibold text-ink">{service.title}</p><p className="mt-1 font-body text-xs text-ink-soft">{service.price}</p></div></div>)}</div>
        </Container>
      </section>

      <section className="bg-ink py-16 text-white md:py-20"><Container><div className="flex flex-col gap-4 border-b border-white/15 pb-7 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-teal">Subscription models</p><h2 className="mt-3 font-display text-headline text-white">A launch-price ladder, clearly shown.</h2><p className="mt-4 font-body text-base leading-relaxed text-white/68">The official LNDRY price list includes these subscription models and their stated discounts.</p></div><p className="font-body text-xs leading-relaxed text-white/55 lg:max-w-xs">Subscription scope and availability are confirmed during booking.</p></div><div className="mt-8 grid gap-4 md:grid-cols-3">{store.subscriptions.map((plan, index) => <article key={plan.name} className={`rounded-xl border p-6 ${index === 2 ? "border-teal bg-teal text-ink" : "border-white/15 bg-white/7"}`}><p className={`font-body text-xs font-semibold uppercase tracking-[0.14em] ${index === 2 ? "text-ink/65" : "text-teal"}`}>LNDRY {plan.name}</p><p className="mt-4 font-display text-3xl font-semibold">{plan.price}</p><p className={`mt-2 font-body text-sm ${index === 2 ? "text-ink/75" : "text-white/65"}`}>{plan.discount}</p></article>)}</div></Container></section>

      <section className="py-16 md:py-20"><Container><SectionLead eyebrow="How LNDRY works" title="A clear care journey from door to door." copy="The store collection stays inside the same accountable LNDRY booking and order experience." /><ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{JOURNEY.map((step, index) => { const Icon = step.icon; return <li key={step.title} className="relative rounded-xl border border-hairline bg-white p-5 shadow-soft"><span className="flex size-10 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-teal">0{index + 1}</span><Icon className="absolute right-5 top-5 size-5 text-violet" aria-hidden="true" /><h3 className="mt-7 font-display text-lg font-semibold text-ink">{step.title}</h3><p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{step.copy}</p></li>})}</ol></Container></section>

      <section className="bg-white py-16 md:py-20"><Container className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]"><div><SectionLead eyebrow="Helpful before you book" title="The useful details, kept close." copy="Quick answers from the current LNDRY service catalog, so the care route is easier to choose before booking." /></div><div className="divide-y divide-hairline rounded-xl border border-hairline bg-surface px-5 sm:px-7">{FAQS.map(([question, answer], index) => <div key={question} className="py-1"><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex min-h-16 w-full items-center justify-between gap-4 text-left font-display text-base font-semibold text-ink focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-3"><span>{question}</span><CircleHelp className={`size-5 shrink-0 text-violet transition-transform ${openFaq === index ? "rotate-180" : ""}`} aria-hidden="true" /></button>{openFaq === index ? <p className="pb-5 font-body text-sm leading-relaxed text-ink-soft">{answer}</p> : null}</div>)}</div></Container></section>

      <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-hairline bg-white/95 p-3 shadow-[0_-8px_24px_rgba(8,15,20,0.10)] backdrop-blur-xl md:hidden"><Container className="flex items-center gap-3 px-0"><div className="min-w-0 flex-1"><p className="font-display text-sm font-semibold text-ink">{selectedCount ? `${selectedCount} service${selectedCount > 1 ? "s" : ""} selected` : "Build your care request"}</p><p className="font-body text-xs text-ink-soft">Price basis stays visible</p></div><Link href={store.bookingHref} className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-sm bg-violet px-4 font-display text-sm font-semibold text-white">Continue <ArrowRight className="size-4" aria-hidden="true" /></Link></Container></div>
      <div className="sr-only" aria-live="polite">{selectedCount ? `${selectedCount} services selected` : "No services selected"}</div>
    </div>
  );
}

function SectionLead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="max-w-2xl"><p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-violet">{eyebrow}</p><h2 className="mt-3 font-display text-headline text-ink">{title}</h2><p className="mt-4 font-body text-base leading-relaxed text-ink-soft">{copy}</p></div>;
}

function ServiceCard({ service, quantity, onAdd }: { service: Storefront["services"][number]; quantity: number; onAdd: () => void }) {
  return <article className="group relative min-h-90 overflow-hidden rounded-xl bg-ink p-4 text-white shadow-soft"><Image src={service.featuredImage ?? service.illustration} alt="" fill sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 92vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-105" /><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,20,0.16)_5%,rgba(8,15,20,0.1)_38%,rgba(8,15,20,0.94)_92%)]" /><div className="relative flex items-start justify-between gap-3"><Image src="/brand/logos/lndry-white-horizontal.png" alt="LNDRY" width={68} height={22} className="h-auto w-17 rounded-sm bg-ink/35 px-1.5 py-1 backdrop-blur-sm" /><span className="rounded-full bg-violet px-2.5 py-1 font-body text-xs font-bold text-white">{service.price?.replace("Starting ", "")}</span></div><div className="absolute inset-x-4 bottom-4"><span className="rounded-full bg-white/12 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90">{service.tag.label}</span><h3 className="mt-3 font-display text-xl font-semibold">{service.title}</h3><p className="mt-1 font-body text-sm text-white/70">{service.description}</p><div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3"><span className="inline-flex items-center gap-1.5 font-body text-xs text-white/65"><Clock3 className="size-3.5 text-lavender-electric" aria-hidden="true" />{service.delivery}</span><button type="button" onClick={onAdd} className="inline-flex min-h-9 items-center gap-1 rounded-sm bg-white px-3 font-body text-xs font-bold text-violet transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-lavender-electric focus-visible:outline-offset-2">{quantity ? <><Check className="size-3.5" aria-hidden="true" />Added {quantity}</> : <><Plus className="size-3.5" aria-hidden="true" />Add</>}</button></div></div></article>;
}

function CatalogRow({ service, quantity, onAdd }: { service: Storefront["services"][number]; quantity: number; onAdd: () => void }) {
  return <article className="flex min-h-36 items-center gap-4 rounded-xl border border-hairline bg-surface-cool p-4 transition-all hover:-translate-y-0.5 hover:border-violet/40 hover:bg-white hover:shadow-soft"><span className="relative flex size-13 shrink-0 items-center justify-center rounded-lg bg-white shadow-[0_3px_10px_rgba(67,55,145,0.07)]"><CareGlyph serviceId={service.id} categoryId={service.categoryId} className="size-11" /><Image src="/brand/logos/lndry-primary-app-icon.png" alt="" width={14} height={14} className="absolute -bottom-1 -right-1 size-3.5 rounded-[4px] ring-2 ring-white" /></span><div className="min-w-0 flex-1"><h3 className="font-display text-base font-semibold text-ink">{service.title}</h3><p className="mt-1 font-body text-sm leading-snug text-ink-soft">{service.description}</p><p className="mt-2 font-body text-xs font-semibold text-violet">{service.delivery}</p></div><div className="flex shrink-0 flex-col items-end gap-2"><p className="font-display text-price text-ink">{service.price?.replace("Starting ", "")}</p><button type="button" onClick={onAdd} className={`inline-flex min-h-9 items-center gap-1 rounded-sm border px-3 font-body text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-violet focus-visible:outline-offset-2 ${quantity ? "border-teal bg-teal-tint text-teal" : "border-violet bg-white text-violet hover:bg-lavender-soft"}`}>{quantity ? <><Check className="size-3.5" aria-hidden="true" />{quantity}</> : <><Plus className="size-3.5" aria-hidden="true" />Add</>}</button></div></article>;
}
