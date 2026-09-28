import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { LogoCloud, type LogoEntry } from "@/components/ui/logo-clouds";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MEMBERS } from "@/lib/content";

const LOGOS: LogoEntry[] = MEMBERS.map((member) => ({
  id: member.id,
  name: member.name,
  logo: member.logo,
}));

/**
 * The member companies as a logo wall. Shown on the homepage under the
 * partners marquee, and again on the membership page under the sub-committees
 * — in both places the question it answers is "who is already in".
 */
export function MemberLogos({ divided = false }: { divided?: boolean }) {
  return (
    <Section id="member-logos" divided={divided}>
      <div className="container-page">
        <SectionHeading
          eyebrow="Our members"
          title="The companies that"
          accent="make up the Chamber."
          copy={`${MEMBERS.length} member companies across Silver, Gold and Platinum — trading, manufacturing, building and advising in Kigali.`}
          action={
            <ButtonLink href="/members" variant="outline" withArrow>
              The full directory
            </ButtonLink>
          }
        />

        <Reveal className="mt-14" y={24}>
          <LogoCloud logos={LOGOS} />
        </Reveal>
      </div>
    </Section>
  );
}
