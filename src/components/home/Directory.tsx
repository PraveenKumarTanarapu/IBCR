import { Reveal } from "@/components/motion/Reveal";
import { MemberDirectory } from "@/components/members/MemberDirectory";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Directory() {
  return (
    <Section id="directory" divided>
      <div className="container-page">
        <SectionHeading
          eyebrow="Member directory"
          title="Our business"
          accent="community."
          copy="A working register, not a logo wall — every member company, who represents it and the category they hold."
        />

        <Reveal className="mt-14" y={22}>
          <MemberDirectory initialLimit={6} showAllLink />
        </Reveal>
      </div>
    </Section>
  );
}
