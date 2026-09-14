import { Reveal } from "@/components/motion/Reveal";
import { MemberDirectory } from "@/components/members/MemberDirectory";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Directory() {
  return (
    <Section id="directory" tone="ivory">
      <div className="container-page">
        <SectionHeading
          eyebrow="Member directory"
          title="Our business"
          accent="community."
          copy="A working directory, not a logo wall. Search by company, filter by sector, location or membership type."
        />

        <Reveal className="mt-14" y={22}>
          <MemberDirectory initialLimit={6} showAllLink />
        </Reveal>
      </div>
    </Section>
  );
}
