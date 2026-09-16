import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import SocialCards, { type CardItem } from "@/components/ui/card-fan-carousel";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SERVICES } from "@/lib/content";

const CARDS: CardItem[] = SERVICES.map((service) => ({
  imgUrl: service.image,
  alt: service.title,
  linkUrl: `/services#${service.id}`,
  index: service.number,
  title: service.title,
  subtitle: service.short,
}));

export function Services() {
  return (
    <Section id="services" divided>
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Six services,"
          accent="one purpose."
          copy="Everything the Chamber offers is designed to shorten the distance between an intention and an operating business."
          action={
            <ButtonLink href="/services" variant="outline" withArrow>
              All services
            </ButtonLink>
          }
        />
      </div>

      {/* The deck fans out on load and lifts card-by-card on hover. */}
      <Reveal className="mt-10" y={18}>
        <SocialCards cards={CARDS} />
      </Reveal>
    </Section>
  );
}
