import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GlobeStage } from "@/components/three/GlobeStage";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { CORRIDOR_FOCUS, OPPORTUNITIES, WHY_INDIA, WHY_RWANDA } from "@/lib/content";

export const metadata: Metadata = {
  title: "India × Rwanda",
  description:
    "Why Rwanda, why India, and where the trade and investment corridor between the two markets is heading.",
  alternates: { canonical: "/india-rwanda" },
};

export default function IndiaRwandaPage() {
  return (
    <>
      <PageHero
        eyebrow="The corridor"
        title="Two markets."
        accent="One growing relationship."
        copy="Indian manufacturing depth, technology and capital meeting Rwandan market access, administrative reform and regional reach."
        crumbs={[{ label: "India × Rwanda" }]}
      >
        <div className="flex flex-wrap gap-2">
          {CORRIDOR_FOCUS.map((focus) => (
            <span
              key={focus}
              className="inline-flex items-center rounded-full border border-hairline px-4 py-2 text-[0.8125rem] text-muted"
            >
              {focus}
            </span>
          ))}
        </div>
      </PageHero>

      {/* ----------------------------------------------------- why rwanda */}
      <Section id="why-rwanda">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Rwanda"
            title="A small market with an"
            accent="outsized position."
            copy="Rwanda's value to an Indian business is rarely its own consumption. It is what a Kigali base makes possible across the region."
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {WHY_RWANDA.map((item, i) => (
              <RevealItem noShift key={item.title} className="bg-white p-8">
                <span className="label-mono text-navy-900/22">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-[1.1875rem] font-semibold tracking-tight text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted">{item.copy}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------------------------------------------------ why india */}
      <Section id="why-india" divided>
        <div className="container-page">
          <SectionHeading
            eyebrow="Why India"
            title="Capability that travels"
            accent="well."
            copy="What Indian enterprise brings to the corridor is not only capital — it is products and processes already proven in comparable markets."
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {WHY_INDIA.map((item, i) => (
              <RevealItem noShift key={item.title} className="bg-white p-8">
                <span className="label-mono text-navy-900/22">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-[1.1875rem] font-semibold tracking-tight text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted">{item.copy}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------------------------------------------------- corridor */}
      <Section id="corridor" divided className="overflow-hidden">
        <div className="container-page relative">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>The trade corridor</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.05] font-semibold text-navy-900">
                  Delhi, Mumbai, Bengaluru{" "}
                  <span className="accent-serif text-gold-600">→ Kigali.</span>
                </h2>
              </Reveal>
              <div className="mt-6 space-y-4 text-[0.9375rem] leading-[1.7] text-muted">
                <Reveal delay={0.1}>
                  <p>
                    Bilateral trade has grown steadily, but volume alone is a poor guide to
                    opportunity. Composition matters more: pharmaceuticals, machinery and vehicles
                    dominate the Indian export basket, while Rwandan exports stay concentrated in a
                    small number of primary commodities.
                  </p>
                </Reveal>
                <Reveal delay={0.14}>
                  <p>
                    The interesting question is where value addition moves next — processing that
                    happens elsewhere today and could credibly happen in Rwanda, given power costs,
                    skills and regional market access.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.18} className="mt-9">
                <ButtonLink href="/insights/india-rwanda-trade-in-review" variant="gold" withArrow>
                  Read the trade review
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-7" delay={0.08} y={28}>
              <div className="mx-auto max-w-[34rem]">
                <GlobeStage />
                <p className="label-mono mt-2 text-center text-navy-900/40">Drag to rotate</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------- opportunities */}
      <Section id="opportunities">
        <div className="container-page">
          <SectionHeading
            eyebrow="Investment opportunities"
            title="Where opportunity"
            accent="meets ambition."
            copy="Eight sectors where Rwandan demand and Indian capability line up most cleanly today."
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {OPPORTUNITIES.map((item, i) => (
              <RevealItem key={item.title}>
                <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-white p-7 transition-[border-color,transform] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:border-navy-800/25">
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-200 transition-transform duration-600 ease-[var(--ease-out-quint)] group-hover:scale-x-100"
                    aria-hidden
                  />
                  <p className="label-mono text-navy-900/22">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-6 text-[1.1875rem] leading-snug font-semibold tracking-tight text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-[1.65] text-muted">{item.copy}</p>
                  <p className="label-mono mt-6 text-gold-600">{item.metric}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-14 flex flex-wrap gap-3" delay={0.06}>
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
