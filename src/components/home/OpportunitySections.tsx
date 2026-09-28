import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Section } from "@/components/ui/Section";
import { OPPORTUNITIES } from "@/lib/content";

/**
 * The eight sectors given the same room the services get: one full-width
 * section each, with that sector's photograph behind it, veiled in white and
 * alternating side down the page.
 *
 * The homepage keeps the compact card grid; this is the long form, so the two
 * read as preview and detail rather than as the same thing twice.
 */
export function OpportunitySections() {
  return (
    <>
      {OPPORTUNITIES.map((item, index) => (
        <Section
          key={item.id}
          id={item.id}
          divided={index > 0}
          className="group overflow-hidden py-14 md:py-16"
        >
          <SectionBackdrop image={item.image} side={index % 2 === 0 ? "right" : "left"} />

          <div className="container-page relative">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="label-mono inline-flex items-center gap-2.5 text-muted">
                    <span className="inline-block h-px w-6 bg-gold" aria-hidden />
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h3 className="mt-5 text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.08] font-semibold tracking-tight text-navy-900">
                    {item.title}
                  </h3>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.65] text-muted">
                    {item.copy}
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-5 lg:justify-self-end">
                <Reveal delay={0.14}>
                  <div className="inline-flex flex-col items-start rounded-[var(--radius-card)] border border-hairline bg-white/90 px-6 py-5 backdrop-blur-[2px]">
                    <span className="label-mono text-navy-900/40">Why now</span>
                    <span className="mt-2 text-[1.0625rem] font-semibold tracking-tight text-gold-600">
                      {item.metric}
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section divided>
        <div className="container-page">
          <Reveal className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg" withArrow>
              Discuss an opportunity
            </ButtonLink>
            <ButtonLink href="/services#investment-advisory" variant="outline" size="lg">
              Investment advisory
            </ButtonLink>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
