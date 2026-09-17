import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PricingSection } from "@/components/ui/pricing-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TeamShowcase } from "@/components/ui/team-showcase";
import {
  BOARD,
  INDUSTRY_LEADERSHIP,
  MEMBERSHIP_BENEFITS,
  MEMBERSHIP_TIERS,
  SUB_COMMITTEES,
  WHY_IBCR,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Why join the Indian Business Chamber in Rwanda, what membership includes, the four categories and their annual fees, and the board that governs the Chamber.",
  alternates: { canonical: "/membership" },
};

const STEPS = [
  { title: "Apply", copy: "Submit the online application with your company details and objectives." },
  { title: "Review", copy: "The secretariat confirms eligibility and the right category, usually within three working days." },
  { title: "Onboard", copy: "Directory listing, introductions and an orientation call with the team." },
  { title: "Participate", copy: "Events, delegations, briefings and the advocacy agenda." },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        image="/images/heroes/membership.jpg"
        eyebrow="Membership"
        title="Access, visibility and a"
        accent="collective voice."
        copy="Membership is not a subscription to a newsletter. It is access to rooms, relationships and representation that are difficult to build alone."
        crumbs={[{ label: "Membership" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/membership/join" withArrow>
            Become a Member
          </ButtonLink>
          <ButtonLink href="/members" variant="outline">
            Browse the directory
          </ButtonLink>
        </div>
      </PageHero>

      {/* --------------------------------------------------------- why join */}
      <Section id="why">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Why become a member"
                title="Four things membership"
                accent="reliably delivers."
                copy="The Chamber measures itself on whether members can point to something concrete a year in."
              />
            </div>
            <RevealGroup className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7">
              {WHY_IBCR.map((item, i) => (
                <RevealItem key={item.title}>
                  <div className="flex items-baseline gap-3">
                    <span className="label-mono text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[1.1875rem] font-semibold tracking-tight text-navy-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-muted">{item.copy}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- benefits */}
      <Section id="benefits" divided>
        <div className="container-page relative">
          <SectionHeading
            eyebrow="Benefits"
            title="What you actually"
            accent="receive."
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {MEMBERSHIP_BENEFITS.map((benefit, i) => (
              <RevealItem noShift key={benefit.title} className="bg-white p-8 transition-colors duration-500 hover:bg-hover">
                <span className="label-mono text-navy-900/25">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-[1.1875rem] font-semibold tracking-tight text-navy-900">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted">{benefit.copy}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------------------------------------------------- categories */}
      <Section id="categories">
        <div className="container-page">
          <SectionHeading
            eyebrow="Categories & fees"
            title="Four ways in,"
            accent="one chamber."
            copy="Each category carries everything in the one before it. Fees are annual; the limited offer rate is open for a defined period, and the secretariat confirms the category with you before anything is finalised."
          />
          <Reveal className="mt-14" y={26}>
            <PricingSection tiers={MEMBERSHIP_TIERS} />
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------ board */}
      <Section id="board" divided>
        <div className="container-page">
          <SectionHeading
            eyebrow="Board members"
            title="The seven people who"
            accent="govern the Chamber."
            copy="Point at a name to see that member in full. Membership at every category carries representative participation in the Board."
          />
          <Reveal className="mt-14" y={26}>
            <TeamShowcase members={[...BOARD]} />
          </Reveal>
        </div>
      </Section>

      {/* --------------------------------------------------- sub-committees */}
      <Section id="committees">
        <div className="container-page">
          <SectionHeading
            eyebrow="Sub-committees"
            title="Where members take"
            accent="a leadership role."
            copy="Focused committees that expand leadership participation among active members and turn plans into execution."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-hairline sm:grid-cols-3">
            {SUB_COMMITTEES.map((committee, i) => (
              <RevealItem noShift key={committee.title} className="bg-white p-8">
                <span className="label-mono text-navy-900/22">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-[1.1875rem] font-semibold tracking-tight text-navy-900">
                  {committee.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted">{committee.copy}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12" delay={0.06}>
            <p className="text-[0.9375rem] leading-[1.65] text-muted">
              Sector teams sit under the committees, each led by members from that industry —
              representing its opportunities, challenges and collaborations.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {INDUSTRY_LEADERSHIP.map((sector) => (
                <span
                  key={sector}
                  className="inline-flex items-center rounded-full border border-hairline px-4 py-2 text-[0.8125rem] text-muted transition-colors duration-300 hover:border-hairline-strong hover:bg-hover"
                >
                  {sector}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ----------------------------------------------------------- how to */}
      <Section divided>
        <div className="container-page">
          <SectionHeading eyebrow="Process" title="How joining" accent="works." />
          <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <RevealItem key={step.title}>
                <div className="relative">
                  <span className="text-[3rem] leading-none font-semibold tracking-tight text-navy-900/12">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.1875rem] font-semibold tracking-tight text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-muted">{step.copy}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-14" delay={0.06}>
            <ButtonLink href="/membership/join" size="lg" withArrow>
              Start your application
            </ButtonLink>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
