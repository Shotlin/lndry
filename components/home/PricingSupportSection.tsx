import { Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { Button } from "../ui/Button";
import { company } from "@/lib/data/site";

const PRICES = [
  { service: "Wash & Fold", price: "From ₹99/kg", note: "Daily wear" },
  { service: "Wash & Iron", price: "From ₹99/kg", note: "Office wear" },
  { service: "Dry Cleaning", price: "Starts ₹99/item", note: "Premium garments" },
];

const SUPPORT_OPTIONS = [
  { label: "WhatsApp", detail: company.whatsappPlaceholder, icon: MessageCircle, href: company.whatsappHref },
  { label: "Call", detail: company.phonePlaceholder, icon: Phone, href: company.supportPhoneHref },
  { label: "Email", detail: company.supportEmail, icon: Mail, href: `mailto:${company.supportEmail}` },
];

export function PricingSupportSection() {
  return (
    <section id="pricing" className="bg-lavender-soft py-16 sm:py-20 md:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <SectionEyebrow>Pricing, made clearer</SectionEyebrow>
          <h2 className="mt-3 max-w-xl font-display text-headline text-ink">See the starting price before you decide.</h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft">Final pricing depends on service, garment type, pickup area, and the selected partner. The booking flow should always confirm the applicable estimate before payment.</p>
          <div className="mt-8 grid gap-3">
            {PRICES.map((item) => (
              <article key={item.service} className="flex items-center justify-between gap-4 rounded-lg bg-white p-5 shadow-soft">
                <div><h3 className="font-display text-lg font-semibold text-ink">{item.service}</h3><p className="mt-1 font-body text-sm text-ink-soft">Best for: {item.note}</p></div>
                <p className="shrink-0 font-display text-base font-semibold text-violet-deep">{item.price}</p>
              </article>
            ))}
          </div>
        </div>

        <aside id="contact" className="rounded-xl bg-ink p-6 text-white shadow-elevated sm:p-8">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-teal">Need help?</p>
          <h2 className="mt-3 font-display text-2xl font-semibold">Customer support that stays with your order.</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-white/70">Average reply: within 10 minutes. Support hours: 8:00 AM – 9:00 PM, Monday–Sunday.</p>
          <div className="mt-6 grid gap-3">
            {SUPPORT_OPTIONS.map((option) => {
              const Icon = option.icon;
              return <a key={option.label} href={option.href} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 transition-colors hover:bg-white/[0.1]"><Icon className="size-5 shrink-0 text-teal" aria-hidden="true" /><span><span className="block font-body text-sm font-semibold text-white">{option.label}</span><span className="mt-0.5 block font-body text-xs text-white/65">{option.detail}</span></span></a>;
            })}
          </div>
          <div className="mt-6 flex items-start gap-2 rounded-lg bg-white/8 p-4 font-body text-xs leading-relaxed text-white/75"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />One support path for booking, order updates, and delivery questions.</div>
          <Button href="/contact" variant="secondary" className="mt-6 bg-white">View support details</Button>
        </aside>
      </Container>
    </section>
  );
}
