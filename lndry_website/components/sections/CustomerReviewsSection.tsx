import { customerReviews } from "@/lib/data/site";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

export function CustomerReviewsSection({ compact = false }: { compact?: boolean }) {
  const [featured, ...rest] = customerReviews;

  return (
    <section className={`${compact ? "bg-white py-16" : "bg-ink py-20 md:py-24"}`}>
      <Container>
        <div className={`grid gap-10 ${compact ? "lg:grid-cols-[0.78fr_1.22fr]" : "lg:grid-cols-[0.82fr_1.18fr]"} lg:items-start`}>
          <Reveal>
            <p className={`font-body text-sm font-semibold ${compact ? "text-violet" : "text-lavender-electric"}`}>
              Launch review format
            </p>
            <h2 className={`mt-3 max-w-xl font-display text-headline ${compact ? "text-ink" : "text-white"}`}>
              Trust should sound like a customer, not a marketing claim.
            </h2>
            <p className={`mt-5 max-w-lg font-body text-base leading-relaxed ${compact ? "text-ink-soft" : "text-white/70"}`}>
              These demo-format reviews show the kind of proof LNDRY should collect during launch:
              clear booking, less decision load, visible status, and secure handover.
            </p>
            <p className={`mt-5 max-w-md font-body text-xs leading-relaxed ${compact ? "text-muted" : "text-white/45"}`}>
              Replace these with verified customer reviews once real orders are complete.
            </p>
          </Reveal>

          <div className="grid gap-5">
            <Reveal delay={0.08}>
              <article className={`relative overflow-hidden rounded-xl p-6 md:p-8 ${compact ? "border border-hairline bg-bg-app" : "bg-white text-ink"}`}>
                <div className="absolute right-6 top-6 rounded-full bg-teal-tint px-3 py-1 font-body text-xs font-semibold text-teal">
                  {featured.signal}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet font-display text-sm font-bold text-white">
                  {featured.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <blockquote className="mt-6 max-w-2xl font-display text-2xl font-semibold leading-tight text-ink">
                  “{featured.quote}”
                </blockquote>
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-sm">
                  <span className="font-semibold text-ink">{featured.name}</span>
                  <span className="text-ink-soft">{featured.area}</span>
                  <span className="text-ink-soft">{featured.context}</span>
                </div>
              </article>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-3">
              {rest.map((review, index) => (
                <Reveal key={review.name} delay={0.12 + index * 0.04}>
                  <article className={`h-full rounded-lg p-5 ${compact ? "border border-hairline bg-white" : "bg-white/8 text-white ring-1 ring-white/10"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-xs font-bold ${compact ? "bg-lavender-soft text-violet" : "bg-white text-violet"}`}>
                        {review.name.split(" ").map((part) => part[0]).join("")}
                      </div>
                      <span className={`rounded-full px-3 py-1 font-body text-[11px] font-semibold ${compact ? "bg-teal-tint text-teal" : "bg-white/10 text-white/75"}`}>
                        {review.signal}
                      </span>
                    </div>
                    <p className={`mt-5 font-body text-sm leading-relaxed ${compact ? "text-ink-soft" : "text-white/72"}`}>
                      “{review.quote}”
                    </p>
                    <div className="mt-5 font-body text-xs">
                      <p className={`font-semibold ${compact ? "text-ink" : "text-white"}`}>{review.name}</p>
                      <p className={compact ? "text-muted" : "text-white/50"}>
                        {review.area}, {review.context}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
