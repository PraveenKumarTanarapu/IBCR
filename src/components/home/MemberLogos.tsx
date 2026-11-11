import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { LogoCloud, type LogoEntry } from "@/components/ui/logo-clouds";
import { Section, SectionHeading } from "@/components/ui/Section";
import { INTERNATIONAL_MEMBERS, MEMBERS } from "@/lib/content";

const LOGOS: LogoEntry[] = MEMBERS.map((member) => ({
  id: member.id,
  name: member.name,
  logo: member.logo,
}));

const INTERNATIONAL_LOGOS: LogoEntry[] = INTERNATIONAL_MEMBERS.map((member) => ({
  id: member.id,
  name: member.name,
  logo: member.logo,
}));

/**
 * The member companies as a logo wall. Shown on the homepage under the
 * partners marquee, and again on the membership page under the sub-committees
 * — in both places the question it answers is "who is already in".
 *
 * The international members sit in their own row beneath, under a label: they
 * are members, but of a separate category, and the Kigali wall should not
 * quietly absorb them.
 */
export function MemberLogos({ divided = false }: { divided?: boolean }) {
  return (
    <Section id="member-logos" divided={divided}>
      <div className="container-page">
        <SectionHeading
          eyebrow="Our members"
          title="The companies that"
          accent="make up the Chamber."
          copy={`${MEMBERS.length} member companies across Silver, Gold and Platinum — trading, manufacturing, building and advising in Kigali — and ${INTERNATIONAL_MEMBERS.length} more holding the International category from abroad.`}
          action={
            <ButtonLink href="/members" variant="outline" withArrow>
              The full directory
            </ButtonLink>
          }
        />

        <Reveal className="mt-14" y={24}>
          <LogoCloud logos={LOGOS} />
        </Reveal>

        {INTERNATIONAL_LOGOS.length ? (
          <Reveal className="mt-10" y={20}>
            <div className="flex items-center gap-4">
              <span className="label-mono shrink-0 text-muted">International members</span>
              <span aria-hidden className="h-px flex-1 bg-hairline" />
            </div>
            <LogoCloud logos={INTERNATIONAL_LOGOS} className="mt-5" interval={4800} />
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
