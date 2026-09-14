import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BOARD, PARTNERS, SITE, TEAM, VALUES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About the Chamber",
  description:
    "Who IBCR is, what it stands for, and the people who run it — a business platform connecting India and Rwanda through trade, investment and partnership.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About IBCR"
        title="A bridge built for"
        accent="business, not ceremony."
        copy="The Indian Business Chamber in Rwanda is a dynamic business platform dedicated to strengthening trade, investment and economic collaboration between India and Rwanda."
        crumbs={[{ label: "About" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/membership/join" withArrow>
            Become a Member
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Talk to the secretariat
          </ButtonLink>
        </div>
      </PageHero>

      {/* --------------------------------------------------- who we are */}
      <Section id="who-we-are">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Who we are" title="What the Chamber" accent="actually does." />
            </div>
            <div className="space-y-6 text-[1.0625rem] leading-[1.7] text-body/85 lg:col-span-7">
              <Reveal>
                <p>
                  IBCR brings together Indian and Rwandan businesses, entrepreneurs, investors and
                  industry leaders to create meaningful connections, explore new opportunities and
                  build long-term partnerships.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p>
                  Through business networking, advocacy, knowledge sharing, trade facilitation and
                  strategic engagements, the Chamber supports its members in navigating and expanding
                  within the Rwandan and wider African markets.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>
                  With Rwanda emerging as a strategic gateway to the African continent, IBCR serves as
                  a bridge between Indian expertise, investment, technology and entrepreneurship and
                  Rwanda&rsquo;s growing economic opportunities.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="border-l-2 border-gold pl-6 text-navy-900 italic">
                  &ldquo;{SITE.positioning}&rdquo;
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------- vision & mission */}
      <Section id="vision" divided>
        <div className="container-page relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="rounded-[var(--radius-card)] border border-hairline bg-white p-8 md:p-10">
                <p className="label-mono text-gold-600">Vision</p>
                <p className="mt-6 text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.35] font-medium tracking-tight text-navy-900">
                  A strong, trusted and mutually beneficial India–Rwanda business ecosystem that
                  drives sustainable growth, innovation and prosperity.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-[var(--radius-card)] border border-hairline bg-white p-8 md:p-10">
                <p className="label-mono text-gold-600">Mission</p>
                <p className="mt-6 text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.35] font-medium tracking-tight text-navy-900">
                  To connect, represent and equip businesses on both sides of the corridor — with
                  access, intelligence and a credible collective voice.
                </p>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <RevealItem key={value.title}>
                <p className="label-mono text-navy-900/40">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-[1.125rem] font-semibold tracking-tight text-navy-900">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-muted">{value.copy}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------------------------------------------------ leadership */}
      <Section id="leadership">
        <div className="container-page">
          <SectionHeading
            eyebrow="Leadership"
            title="The board that"
            accent="sets direction."
            copy="IBCR is governed by a board drawn from the Indian and Rwandan business communities. Roles below reflect the Chamber's governance structure."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {BOARD.map((person, i) => (
              <RevealItem noShift key={person.name} className="bg-white p-8">
                <span className="label-mono text-navy-900/22">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-[1.1875rem] font-semibold tracking-tight text-navy-900">
                  {person.name}
                </h3>
                <p className="mt-1 text-[0.8125rem] text-gold-600">{person.role}</p>
                <p className="mt-4 text-[0.875rem] leading-[1.65] text-muted">{person.focus}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------------------------------------------------------ team */}
      <Section id="team" divided>
        <div className="container-page">
          <SectionHeading
            eyebrow="Secretariat"
            title="The team that"
            accent="does the work."
            copy="A small secretariat handling member services, programming, research and communications."
          />

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((unit) => (
              <RevealItem key={unit.name}>
                <div className="h-full rounded-[var(--radius-card)] border border-hairline bg-white p-7">
                  <h3 className="text-[1.125rem] font-semibold tracking-tight text-navy-900">
                    {unit.name}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] text-gold-600">{unit.role}</p>
                  <p className="mt-4 text-[0.875rem] leading-[1.65] text-muted">{unit.focus}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* -------------------------------------------------------- partners */}
      <Section id="partners">
        <div className="container-page">
          <SectionHeading
            eyebrow="Partners"
            title="Institutions we"
            accent="work alongside."
            copy="Diplomatic missions, government agencies, industry bodies and financial institutions in both markets."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-hairline sm:grid-cols-2 lg:grid-cols-5">
            {PARTNERS.map((partner) => (
              <RevealItem noShift
                key={partner.name}
                className="flex min-h-[7.5rem] flex-col justify-center bg-white p-6 transition-colors duration-500 hover:bg-white"
              >
                <p className="text-[0.9375rem] leading-snug font-semibold tracking-tight text-navy-900/85">
                  {partner.name}
                </p>
                <p className="label-mono mt-2 text-[0.5625rem] text-navy-900/35">
                  {partner.category}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-14 flex flex-wrap gap-3" delay={0.06}>
            <ButtonLink href="/membership/join" withArrow>
              Become a Member
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Partner with IBCR
            </ButtonLink>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
