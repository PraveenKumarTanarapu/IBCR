import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TierCard } from "@/components/ui/TierCard";
import { MEMBERSHIP_TIERS } from "@/lib/content";

export function Membership() {
  return (
    <Section id="membership" tone="paper">
      <div className="container-page">
        <SectionHeading
          eyebrow="Membership"
          title="Become part of the"
          accent="IBCR business community."
          copy="Six ways in, one network. Choose the category that fits — the secretariat will confirm it with you."
          action={
            <ButtonLink href="/membership" variant="outline" withArrow>
              Membership in detail
            </ButtonLink>
          }
        />

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <RevealItem key={tier.id}>
              <TierCard tier={tier} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-14 flex justify-center">
          <ButtonLink href="/membership/join" size="lg" withArrow>
            Become an IBCR Member
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
