import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { MemberDirectory } from "@/components/members/MemberDirectory";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { MEMBERS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Member Directory",
  description:
    "Search the IBCR business community by company, sector, location and membership type — a working directory of India–Rwanda businesses.",
  alternates: { canonical: "/members" },
};

export default function MembersPage() {
  return (
    <>
      <PageHero
        eyebrow="Member directory"
        title="Our business"
        accent="community."
        copy={`A working directory of ${MEMBERS.length} member organisations across Rwanda, India and the wider region — searchable by company, sector, location and membership type.`}
        crumbs={[{ label: "Members" }]}
      >
        <ButtonLink href="/membership/join" withArrow>
          Add your company
        </ButtonLink>
      </PageHero>

      <Section>
        <div className="container-page">
          <Reveal y={18}>
            <MemberDirectory />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
