import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { company, launchAreas, trustSignals } from "@/lib/data/site";

export function LaunchTrustSection() {
  return (
    <section id="early-access" className="bg-white py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <SectionEyebrow>Launching soon in Pune</SectionEyebrow>
            <h2 className="mt-3 max-w-xl font-display text-headline text-ink">
              Join Pune&apos;s first garment-care marketplace
            </h2>
            <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">
              Join the waitlist and we&apos;ll notify you when LNDRY launches in your area. Get access
              to verified laundry partners, doorstep pickup, live tracking and launch-day offers.
            </p>

            <form
              action={`mailto:${company.supportEmail}`}
              method="post"
              encType="text/plain"
              className="mt-8 grid gap-3 rounded-xl border border-hairline bg-bg-app p-4 shadow-soft sm:grid-cols-[1fr_1fr]"
            >
              <label className="sr-only" htmlFor="lead-name">
                Name
              </label>
              <input
                id="lead-name"
                name="name"
                placeholder="Name"
                required
                className="h-12 rounded-sm border border-hairline bg-white px-4 font-body text-sm text-ink outline-none focus:border-violet"
              />
              <label className="sr-only" htmlFor="lead-mobile">
                Mobile number
              </label>
              <input
                id="lead-mobile"
                name="mobile"
                inputMode="tel"
                placeholder="Mobile number"
                required
                className="h-12 rounded-sm border border-hairline bg-white px-4 font-body text-sm text-ink outline-none focus:border-violet"
              />
              <label className="sr-only" htmlFor="lead-area">
                Area
              </label>
              <select
                id="lead-area"
                name="area"
                required
                className="h-12 rounded-sm border border-hairline bg-white px-4 font-body text-sm text-ink outline-none focus:border-violet sm:col-span-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your area
                </option>
                {launchAreas.map((area) => (
                  <option key={area}>{area}</option>
                ))}
              </select>
              <Button className="sm:col-span-2" type="submit">
                Reserve My Spot
              </Button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-elevated">
              <Image
                src="/brand/website-launch/hero/pune-launch-early-access-hero-v1.png"
                alt="LNDRY Pune launch area storytelling with garment care pickup routes"
                fill
                sizes="(min-width: 1024px) 620px, 94vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trustSignals.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.035}>
              <div className="h-full rounded-lg border border-hairline bg-surface-cool p-6">
                <Pill tone={index === 4 ? "violet" : "teal"}>{item.title}</Pill>
                <p className="mt-4 font-body text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
