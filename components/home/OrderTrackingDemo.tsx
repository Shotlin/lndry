import { Check, Circle, MapPin, PackageCheck } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { PhoneFrame } from "../ui/PhoneFrame";
import { Button } from "../ui/Button";

const ORDER_STAGES = ["Book pickup", "Pickup scheduled", "Picked up", "At laundry partner", "Washing", "Ironing", "Quality checked", "Out for delivery", "Delivered"];

export function OrderTrackingDemo() {
  return (
    <section id="order-tracking" className="bg-white py-16 sm:py-20 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionEyebrow>Live order tracking</SectionEyebrow>
          <h2 className="mt-3 max-w-xl font-display text-headline text-ink">Know exactly where your clothes are.</h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink-soft">Every stage is tracked and visible inside LNDRY—from booking to an OTP-verified delivery. You should never have to wonder whether a laundry has received your clothes.</p>
          <ol className="mt-7 grid gap-2">
            {ORDER_STAGES.map((stage, index) => {
              const active = index < 4;
              return <li key={stage} className="flex items-center gap-3 font-body text-sm"><span className={`flex size-6 shrink-0 items-center justify-center rounded-full ${active ? "bg-teal text-white" : "border border-hairline text-muted"}`}>{active ? <Check className="size-3.5" aria-hidden="true" /> : <Circle className="size-2" aria-hidden="true" />}</span><span className={active ? "font-semibold text-ink" : "text-ink-soft"}>{stage}</span>{index === 3 ? <span className="ml-auto rounded-full bg-lavender-soft px-2 py-1 text-xs font-semibold text-violet-deep">In progress</span> : null}</li>;
            })}
          </ol>
          <Button href="/#early-access" className="mt-8">Book pickup</Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-[0.72fr_1.28fr] sm:items-center">
          <PhoneFrame src="/brand/mockups/track-order-v1.png" alt="LNDRY app order tracking screen" label="Customer order tracking" className="mx-auto w-48 sm:w-full" priority />
          <div className="rounded-xl bg-ink p-6 text-white sm:p-7"><PackageCheck className="size-7 text-teal" aria-hidden="true" /><h3 className="mt-6 font-display text-2xl font-semibold">A delivery timeline you can understand at a glance.</h3><p className="mt-4 font-body text-sm leading-relaxed text-white/70">Pickup time, cleaning update, quality check, and delivery ETA live in one calm order story.</p><div className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] p-3 font-body text-sm text-white/80"><MapPin className="size-4 shrink-0 text-teal" /> Your selected partner and delivery commitment remain visible.</div></div>
        </div>
      </Container>
    </section>
  );
}
