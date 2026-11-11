import { Reveal } from "@/components/motion/Reveal";
import { MemberCard } from "@/components/members/MemberDirectory";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { INTERNATIONAL_MEMBERS } from "@/lib/content";

/**
 * The International register, kept apart from the Kigali directory.
 *
 * It is a different category of membership — held from outside Rwanda, priced
 * in USD, and split between Corporate and Individual — so it gets its own
 * section rather than more rows and another filter chip in the directory. The
 * card is the directory's card: same register, different list.
 */
export function InternationalMembers({ divided = true }: { divided?: boolean }) {
  if (INTERNATIONAL_MEMBERS.length === 0) return null;

  return (
    <Section id="international-members" divided={divided}>
      <div className="container-page">
        <SectionHeading
          eyebrow="International members"
          title="Members joining"
          accent="from outside Rwanda."
          copy="The International category is open to companies and professionals who work the corridor without an entity on the ground — Corporate for businesses, Individual in their own name."
          action={
            <ButtonLink href="/membership#categories" variant="outline" withArrow>
              International fees
            </ButtonLink>
          }
        />

        <Reveal className="mt-14" y={22}>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {INTERNATIONAL_MEMBERS.map((member) => (
              <li key={member.id}>
                <MemberCard member={member} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
