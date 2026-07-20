import { ArrowDown, BadgeCheck, CreditCard, Headphones, MapPinned, ShieldCheck } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";

const PROBLEMS = [
  ["Don't know which laundry to trust", "Verified partners"],
  ["Have to call multiple shops", "One booking platform"],
  ["No order visibility", "Live tracking"],
  ["Inconsistent pricing", "Transparent pricing"],
  ["Delayed delivery", "Clear delivery timeline"],
];

const TRADITIONAL = ["Call shop", "Manual booking", "No tracking", "Cash payment"];
const LNDRY_FLOW = ["Open LNDRY", "Choose service", "Verified partner", "Track order", "Digital payment"];
const FUTURE_BUSINESS = ["Corporate laundry", "PGs", "Hostels", "Co-living", "Hotels", "Restaurants"];
const TRUST_SUMMARY = [
  { label: "Verified partners", icon: BadgeCheck },
  { label: "Secure payments", icon: CreditCard },
  { label: "Order tracking", icon: MapPinned },
  { label: "Dedicated support", icon: Headphones },
];

function FlowList({ items, tone }: { items: string[]; tone: "muted" | "brand" }) {
  return (
    <ol className="mt-5 grid gap-2">
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-3">
          <span className={`flex size-7 shrink-0 items-center justify-center rounded-full font-body text-xs font-bold ${tone === "brand" ? "bg-violet text-white" : "bg-white text-ink-soft"}`}>{index + 1}</span>
          <span className={`font-body text-sm font-semibold ${tone === "brand" ? "text-ink" : "text-ink-soft"}`}>{item}</span>
          {index < items.length - 1 ? <ArrowDown className="ml-auto size-4 text-muted" aria-hidden="true" /> : null}
        </li>
      ))}
    </ol>
  );
}

export function Operations() {
  return (
    <section id="why-lndy" className="bg-white py-16 sm:py-20 md:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionEyebrow>Why choose LNDRY?</SectionEyebrow>
          <h2 className="mt-3 font-display text-headline text-ink">Everything you need for garment care, from one trusted platform.</h2>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">LNDRY is built around the everyday questions customers have before they hand over their garments.</p>
        </Reveal>

        <div className="mt-9 overflow-hidden rounded-xl border border-hairline">
          <div className="grid grid-cols-[1.15fr_0.85fr] bg-ink px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/70 sm:px-6">
            <span>Customer problem</span><span>LNDRY solution</span>
          </div>
          {PROBLEMS.map(([problem, solution], index) => (
            <Reveal key={problem} delay={index * 0.035}>
              <div className="grid grid-cols-[1.15fr_0.85fr] gap-3 border-t border-hairline bg-white px-4 py-4 sm:px-6">
                <p className="font-body text-sm leading-relaxed text-ink-soft">{problem}</p>
                <p className="font-body text-sm font-semibold leading-relaxed text-violet-deep">{solution}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-xl border border-hairline bg-surface-cool p-6 sm:p-7">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-muted">Traditional laundry</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">A series of uncertain calls.</h3>
              <FlowList items={TRADITIONAL} tone="muted" />
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="h-full rounded-xl bg-lavender-soft p-6 sm:p-7">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-violet">LNDRY marketplace</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">A single, visible booking journey.</h3>
              <FlowList items={LNDRY_FLOW} tone="brand" />
            </article>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_SUMMARY.map((item, index) => {
            const Icon = item.icon;
            return <Reveal key={item.label} delay={index * 0.04}><article className="h-full rounded-lg border border-hairline bg-white p-5 shadow-soft"><Icon className="size-5 text-teal" aria-hidden="true" /><p className="mt-5 font-display text-lg font-semibold text-ink">{item.label}</p></article></Reveal>;
          })}
        </div>

        <Reveal className="mt-12 rounded-xl bg-ink p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-teal">For businesses</p><h3 className="mt-3 font-display text-2xl font-semibold">Future opportunity, built into the marketplace.</h3></div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 font-body text-xs font-semibold text-white/75"><ShieldCheck className="size-4 text-teal" /> Coming soon</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">{FUTURE_BUSINESS.map((item) => <span key={item} className="rounded-full bg-white/10 px-3 py-2 font-body text-sm text-white/80">{item}</span>)}</div>
          <Button href="/partners" variant="secondary" className="mt-6 bg-white">Partner With LNDRY</Button>
        </Reveal>
      </Container>
    </section>
  );
}
