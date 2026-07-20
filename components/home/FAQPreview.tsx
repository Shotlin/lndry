import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { faqs } from "@/lib/data/site";

export function FAQPreview() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24">
      <Container className="grid gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <SectionEyebrow>Frequently asked questions</SectionEyebrow>
          <h2 className="mt-3 font-display text-headline text-ink">Clear answers before your first booking.</h2>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink-soft">Who washes your clothes, how delivery works, and what happens if you need help—answered plainly.</p>
          <Link href="/faq" className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-violet hover:text-violet-deep">Explore all FAQs <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid gap-3">
          {faqs.slice(1, 5).map((item) => <article key={item.q} className="rounded-lg border border-hairline bg-surface-cool p-5"><h3 className="font-display text-lg font-semibold text-ink">{item.q}</h3><p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{item.a}</p></article>)}
        </div>
      </Container>
    </section>
  );
}
