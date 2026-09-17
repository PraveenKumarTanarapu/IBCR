import { GLANCE_ICONS } from "@/components/brand/GlanceIcons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow, Section } from "@/components/ui/Section";
import { PILLARS, STATS } from "@/lib/content";

export function Glance() {
  return (
    <Section id="at-a-glance" className="pt-20 md:pt-24">
      <div className="container-page">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>IBCR at a glance</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.05] font-semibold text-navy-900">
              Building bridges.{" "}
              <span className="accent-serif text-gold-600">Creating business.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.65] text-muted">
              Three words carry everything the Chamber does — and every programme has to serve at
              least one of them.
            </p>
          </Reveal>
        </div>

        {/* ------------------------------------------- connect · collaborate · grow */}
        <RevealGroup className="mt-16 grid border-t border-hairline md:grid-cols-3">
          {PILLARS.map((pillar) => {
            const Icon = GLANCE_ICONS[pillar.icon];
            return (
              <RevealItem
                noShift
                key={pillar.id}
                className="group cursor-default border-b border-hairline px-0 py-10 transition-colors duration-500 md:border-b-0 md:border-l md:px-9 md:py-12 md:first:border-l-0 md:first:pl-0 md:hover:bg-hover"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-12 text-navy-700 transition-colors duration-500 group-hover:text-navy-900" />
                  <span className="label-mono text-navy-900/20">{pillar.number}</span>
                </div>

                <h3 className="mt-8 text-[clamp(1.5rem,2.6vw,2rem)] leading-none font-semibold tracking-[-0.03em] text-navy-900 uppercase">
                  {pillar.title}
                </h3>

                <span
                  className="mt-5 block h-px w-12 origin-left bg-gold transition-transform duration-600 ease-[var(--ease-out-quint)] group-hover:scale-x-[2.4]"
                  aria-hidden
                />

                <p className="mt-6 max-w-xs text-[0.9375rem] leading-[1.65] text-muted">
                  {pillar.copy}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* ------------------------------------------------------------- stats */}
        <RevealGroup className="mt-20 grid gap-10 border-t border-hairline pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <p className="text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-semibold tracking-[-0.04em] text-navy-900">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-3 max-w-[13rem] text-[0.875rem] leading-[1.5] text-muted">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
