import { ArrowLeftRight, Handshake, ShieldCheck, TrendingUp } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow, Section } from "@/components/ui/Section";
import { PILLARS, STATS } from "@/lib/content";

const ICONS = {
  exchange: ArrowLeftRight,
  trending: TrendingUp,
  network: Handshake,
  shield: ShieldCheck,
} as const;

export function Glance() {
  return (
    <Section id="at-a-glance" tone="paper" className="pt-20 md:pt-24">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>IBCR at a glance</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-semibold text-navy-900">
                Building bridges.
                <br />
                <span className="accent-serif text-gold-600">Creating business.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-sm text-[1.0625rem] leading-[1.65] text-muted">
                Four things the Chamber exists to do — and the only four things every programme has
                to serve.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-hairline sm:grid-cols-2 lg:col-span-8">
            {PILLARS.map((pillar) => {
              const Icon = ICONS[pillar.icon];
              return (
                <RevealItem noShift
                  key={pillar.id}
                  className="group relative bg-paper p-8 transition-colors duration-500 hover:bg-ivory-100 lg:p-10"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      strokeWidth={1.25}
                      className="size-7 text-navy-700 transition-colors duration-500 group-hover:text-gold-600"
                      aria-hidden
                    />
                    <span className="label-mono text-navy-900/22">{pillar.number}</span>
                  </div>
                  <h3 className="mt-9 text-[1.375rem] font-semibold tracking-tight text-navy-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted">{pillar.copy}</p>
                  <span
                    className="mt-7 block h-px w-10 origin-left bg-gold transition-transform duration-600 ease-[var(--ease-out-quint)] group-hover:scale-x-[3.2]"
                    aria-hidden
                  />
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        {/* ------------------------------------------------------- stats */}
        <RevealGroup className="mt-20 grid gap-10 border-t border-hairline pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <p className="text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-semibold tracking-[-0.04em] text-navy-900">
                <Counter value={stat.value} suffix={stat.suffix} />
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
