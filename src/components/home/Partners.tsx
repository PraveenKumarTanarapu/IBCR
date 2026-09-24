import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMarquee, type MarqueeItem } from "@/components/ui/integration-hero";
import { Section } from "@/components/ui/Section";
import { PARTNERS } from "@/lib/content";

const ITEMS: MarqueeItem[] = PARTNERS.map((partner) => ({
  name: partner.name,
  category: partner.category,
  logo: partner.logo,
}));

export function Partners() {
  return (
    <Section className="overflow-hidden py-16 md:py-20">
      <div className="container-page">
        <Reveal className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-3.5 py-1.5 text-[0.75rem] text-muted">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden />
            Our strategic partners
          </span>
          <h2 className="mt-6 max-w-2xl text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.08] font-semibold tracking-tight text-navy-900">
            The institutions <span className="accent-serif text-gold-600">behind the corridor.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
            The Chamber works alongside diplomatic missions, government agencies, industry bodies and
            financial institutions in both markets.
          </p>
          <ButtonLink href="/contact" variant="outline" className="mt-8" withArrow>
            Partner with IBCR
          </ButtonLink>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-14">
        <LogoMarquee items={ITEMS} />
      </Reveal>
    </Section>
  );
}
