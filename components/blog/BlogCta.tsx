import { Button } from "@/components/ui/Button";

export function BlogCta() {
  return (
    <section className="overflow-hidden rounded-xl bg-ink p-8 text-white sm:p-12" aria-labelledby="blog-cta-heading">
      <p className="font-body text-label font-semibold uppercase tracking-[0.14em] text-lavender-electric">LNDRY</p>
      <h2 id="blog-cta-heading" className="mt-3 max-w-2xl font-display text-headline font-bold">
        Skip the laundry day. We&apos;ll pick it up.
      </h2>
      <p className="mt-4 max-w-xl font-body text-body-lg text-white/75">
        Verified local laundry partners, doorstep pickup and delivery, and live order tracking across Pune.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button href="/#early-access">Book pickup</Button>
        <Button href="/services" variant="secondary">See services</Button>
      </div>
    </section>
  );
}
