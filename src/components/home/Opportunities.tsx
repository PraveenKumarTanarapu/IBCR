import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ColorChangeCards, type ColorChangeCardItem } from "@/components/ui/color-change-card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { OPPORTUNITIES } from "@/lib/content";

const CARDS: ColorChangeCardItem[] = OPPORTUNITIES.map((item, i) => ({
  id: item.id,
  index: String(i + 1).padStart(2, "0"),
  heading: item.title,
  description: item.copy,
  meta: item.metric,
  imgSrc: item.image,
  alt: item.title,
}));

/**
 * The eight sectors as colour-change cards. Shared by the homepage section
 * below and the corridor page, so the two never drift apart.
 */
export function OpportunityGrid({ className }: { className?: string }) {
  return <ColorChangeCards cards={CARDS} className={className} />;
}

export function Opportunities() {
  return (
    <Section id="opportunities" divided>
      <div className="container-page">
        <SectionHeading
          eyebrow="Investment opportunities"
          title="Where opportunity"
          accent="meets ambition."
          copy="Eight sectors where Rwandan demand and Indian capability line up most cleanly today."
        />

        <Reveal className="mt-16" y={26}>
          <OpportunityGrid />
        </Reveal>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/india-rwanda#opportunities" variant="navy" size="lg" withArrow>
            Explore Investment Opportunities
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
