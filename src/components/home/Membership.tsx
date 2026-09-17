import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PricingSection } from "@/components/ui/pricing-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MEMBERSHIP_TIERS } from "@/lib/content";

export function Membership() {
  return (
    <Section id="membership">
      <div className="container-page">
        <SectionHeading
          eyebrow="Membership"
          title="Four ways in,"
          accent="one chamber."
          copy="Silver to Corporate — each category builds on the one before it. The secretariat will confirm the right fit with you before anything is finalised."
          action={
            <ButtonLink href="/membership" variant="outline" withArrow>
              Membership in detail
            </ButtonLink>
          }
        />

        <Reveal className="mt-16" y={26}>
          <PricingSection tiers={MEMBERSHIP_TIERS} />
        </Reveal>

        <div className="mt-14 flex justify-center">
          <ButtonLink href="/membership/join" size="lg" withArrow>
            Become an IBCR Member
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
