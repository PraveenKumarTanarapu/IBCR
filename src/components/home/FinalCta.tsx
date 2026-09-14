import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Section } from "@/components/ui/Section";

const ACTIONS = ["Invest", "Expand", "Partner", "Trade", "Connect"];

export function FinalCta() {
  return (
    <Section tone="ink" className="grain overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(26,86,184,0.3),transparent_62%)]"
        aria-hidden
      />
      <div className="dot-veil pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div className="container-page relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow tone="light">Let&rsquo;s begin</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-6 text-[clamp(2rem,5.4vw,4rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-ivory">
              Let&rsquo;s build the next{" "}
              <span className="accent-serif text-gold-400">India–Rwanda</span> business opportunity.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] text-ivory/65">
              Whether you are looking to invest, expand, partner, trade or simply understand the
              market properly — IBCR is here to help.
            </p>
          </Reveal>

          <RevealGroup className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-3">
            {ACTIONS.map((action) => (
              <RevealItem key={action} as="span">
                <span className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-[0.9375rem] text-ivory/80 transition-colors duration-300 hover:border-gold/55 hover:text-gold-200">
                  {action}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-12 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" size="lg" withArrow>
              Talk to IBCR
            </ButtonLink>
            <ButtonLink href="/membership/join" variant="outline-light" size="lg">
              Become a Member
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
