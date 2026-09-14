import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GlobeStage } from "@/components/three/GlobeStage";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section } from "@/components/ui/Section";
import { CORRIDOR_FOCUS } from "@/lib/content";

export function IndiaRwanda() {
  return (
    <Section id="india-rwanda" divided className="overflow-hidden">
      <div className="container-page relative">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>The corridor</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.02] font-semibold text-navy-900">
                India <span className="accent-serif text-gold-600">×</span> Rwanda
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[1.125rem] leading-[1.6] text-navy-900">
                Two markets. One growing relationship.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.7] text-muted">
                Indian manufacturing depth, technology and capital meeting Rwandan market access,
                administrative reform and regional reach. The Chamber works the practical space in
                between.
              </p>
            </Reveal>

            <RevealGroup className="mt-9 flex flex-wrap gap-2">
              {CORRIDOR_FOCUS.map((focus) => (
                <RevealItem key={focus} as="span">
                  <span className="inline-flex items-center rounded-full border border-hairline px-4 py-2 text-[0.8125rem] text-muted transition-colors duration-300 hover:border-hairline-strong hover:bg-hover hover:text-navy-900">
                    {focus}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/india-rwanda" variant="gold" withArrow>
                Explore the corridor
              </ButtonLink>
              <ButtonLink href="/india-rwanda#opportunities" variant="outline">
                Investment opportunities
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.08} y={30}>
            <div className="relative mx-auto max-w-[34rem]">
              <GlobeStage />
              <p className="label-mono mt-2 text-center text-navy-900/35">Drag to rotate</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
