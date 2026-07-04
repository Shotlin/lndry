import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalSection } from "@/lib/data/legal";

export function LegalPage({
  eyebrow = "Legal",
  title,
  description,
  sections,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <article className="bg-[linear-gradient(135deg,#ffffff_0%,#f4f3fb_62%,#eae8ff_100%)] py-20 md:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h1 className="mt-3 font-display text-hero text-ink">{title}</h1>
          <p className="mt-6 font-body text-body-lg text-ink-soft">{description}</p>
          <p className="mt-4 font-body text-sm text-muted">Last updated: July 4, 2026</p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 rounded-lg border border-hairline bg-white p-5" aria-label={`${title} contents`}>
              <p className="font-body text-xs font-semibold text-muted">Contents</p>
              <div className="mt-4 flex flex-col gap-2">
                {sections.map((section) => (
                  <a
                    key={section.title}
                    href={`#${section.title.toLowerCase().replaceAll(" ", "-").replaceAll(",", "")}`}
                    className="rounded-sm px-3 py-2 font-body text-sm font-semibold text-ink-soft hover:bg-lavender-soft hover:text-violet"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          <div className="rounded-xl border border-hairline bg-white p-6 shadow-soft md:p-10">
            {sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 0.02}>
                <section
                  id={section.title.toLowerCase().replaceAll(" ", "-").replaceAll(",", "")}
                  className="border-b border-hairline py-8 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <p className="font-body text-xs font-semibold text-violet">Section {String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{section.title}</h2>
                  {section.body?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 font-body text-sm leading-relaxed text-ink-soft">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-4 grid gap-3">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-3 font-body text-sm leading-relaxed text-ink-soft">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-3">
          <Link href="/privacy" className="rounded-full border border-hairline bg-white px-4 py-2 font-body text-sm font-semibold text-ink-soft hover:text-violet">
            Privacy Policy
          </Link>
          <Link href="/terms" className="rounded-full border border-hairline bg-white px-4 py-2 font-body text-sm font-semibold text-ink-soft hover:text-violet">
            Terms & Conditions
          </Link>
          <Link href="/refund-cancellation-policy" className="rounded-full border border-hairline bg-white px-4 py-2 font-body text-sm font-semibold text-ink-soft hover:text-violet">
            Refund & Cancellation
          </Link>
          <Link href="/delivery-policy" className="rounded-full border border-hairline bg-white px-4 py-2 font-body text-sm font-semibold text-ink-soft hover:text-violet">
            Delivery Policy
          </Link>
        </div>
      </Container>
    </article>
  );
}
