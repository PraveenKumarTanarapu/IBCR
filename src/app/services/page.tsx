import type { Metadata } from "next";
import {
  BarChart3,
  Check,
  Compass,
  DoorOpen,
  Route,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Market entry, trade facilitation, investment advisory, business delegations, business intelligence and advocacy — practical support for India–Rwanda business.",
  alternates: { canonical: "/services" },
};

const ICONS = {
  door: DoorOpen,
  route: Route,
  chart: BarChart3,
  users: Users,
  compass: Compass,
  shield: ShieldCheck,
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="/images/heroes/services.jpg"
        eyebrow="Services"
        title="What we do,"
        accent="in practice."
        copy="Six services designed to shorten the distance between an intention and an operating business."
        crumbs={[{ label: "Services" }]}
      >
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="inline-flex items-center rounded-full border border-hairline px-4 py-2 text-[0.8125rem] text-muted transition-colors duration-300 hover:border-gold/55 hover:text-gold-600"
            >
              {service.title}
            </a>
          ))}
        </div>
      </PageHero>

      {SERVICES.map((service, index) => {
        const Icon = ICONS[service.icon];
        return (
          <Section
            key={service.id}
            id={service.id}
            divided={index > 0}
            className="py-16 md:py-20"
          >
            <div className="container-page">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-2xl border border-hairline">
                        <Icon strokeWidth={1.2} className="size-5 text-navy-700" aria-hidden />
                      </span>
                      <span className="label-mono text-navy-900/25">{service.number}</span>
                    </div>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h2 className="mt-7 text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.08] font-semibold text-navy-900">
                      {service.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-4 max-w-md text-[1.0625rem] leading-[1.65] text-muted">
                      {service.copy}
                    </p>
                  </Reveal>
                </div>

                <div className="lg:col-span-7">
                  <RevealGroup className="grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-hairline sm:grid-cols-2">
                    {service.detail.map((item) => (
                      <RevealItem noShift
                        key={item}
                        className="flex items-start gap-3 bg-white p-6 transition-colors duration-500 hover:bg-hover"
                      >
                        <Check
                          strokeWidth={2}
                          className="mt-1 size-4 shrink-0 text-gold-600"
                          aria-hidden
                        />
                        <span className="text-[0.9375rem] leading-[1.55] text-body/85">{item}</span>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <Section divided>
        <div className="container-page relative">
          <SectionHeading
            align="center"
            eyebrow="Next step"
            title="Not sure which service"
            accent="you need?"
            copy="Tell us what you are trying to do. The secretariat will point you at the right route — or tell you honestly that IBCR is not it."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" size="lg" withArrow>
              Talk to IBCR
            </ButtonLink>
            <ButtonLink href="/membership" variant="outline" size="lg">
              See membership
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
