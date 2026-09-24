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
    "Search the IBCR business community by company, representative or membership category — the Chamber's working register of member businesses in Kigali.",
  alternates: { canonical: "/members" },
};

export default function MembersPage() {
  return (
    <>
      <PageHero
        eyebrow="Member directory"
        title="Our business"
        accent="community."
        copy={`${MEMBERS.length} member companies, all based in Kigali. Each entry carries the representative the Chamber deals with and their membership category.`}
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
