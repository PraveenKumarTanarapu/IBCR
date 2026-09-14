import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TierCard } from "@/components/ui/TierCard";
import { MEMBERSHIP_BENEFITS, MEMBERSHIP_TIERS, WHY_IBCR } from "@/lib/content";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Why join the Indian Business Chamber in Rwanda, what membership includes, and the six categories available — from corporate to startup.",
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
          <ButtonLink href="/members" variant="outline-light">
            Browse the directory
          </ButtonLink>
        </div>
      </PageHero>

      {/* --------------------------------------------------------- why join */}
      <Section id="why" tone="paper">
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
      <Section id="benefits" tone="ink" className="grain">
        <div className="container-page relative">
          <SectionHeading
            tone="light"
            eyebrow="Benefits"
            title="What you actually"
            accent="receive."
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {MEMBERSHIP_BENEFITS.map((benefit, i) => (
              <RevealItem noShift key={benefit.title} className="bg-ink p-8">
                <span className="label-mono text-ivory/25">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-[1.1875rem] font-semibold tracking-tight text-ivory">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ivory/60">{benefit.copy}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------------------------------------------------- categories */}
      <Section id="categories" tone="paper">
        <div className="container-page">
          <SectionHeading
            eyebrow="Categories"
            title="Six ways in,"
            accent="one network."
            copy="Choose the closest fit. The secretariat confirms the category with you before anything is finalised."
          />
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {MEMBERSHIP_TIERS.map((tier, i) => (
              <RevealItem key={tier.id}>
                <TierCard tier={tier} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ----------------------------------------------------------- how to */}
      <Section tone="ivory">
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
