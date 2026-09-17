import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { EventRegistrationForm } from "@/components/forms/EventRegistrationForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { EventCard } from "@/components/ui/EventCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EVENTS } from "@/lib/content";
import { formatLongDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Forums, delegations, roundtables and networking evenings across Kigali and India — plus registration for upcoming IBCR events.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const flagship = EVENTS.find((e) => e.flagship);
  const upcoming = EVENTS.filter((e) => e.status === "upcoming" && !e.flagship);
  const past = EVENTS.filter((e) => e.status === "past");

  return (
    <>
      <PageHero
        image="/images/heroes/events.jpg"
        eyebrow="Events"
        title="Connect. Meet."
        accent="Collaborate."
        copy="The Chamber's programme is built around rooms where something can actually be agreed — not panels for their own sake."
        crumbs={[{ label: "Events" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#register" withArrow>
            Register for an event
          </ButtonLink>
          <ButtonLink href="#past" variant="outline">
            Past events
          </ButtonLink>
        </div>
      </PageHero>

      {/* -------------------------------------------------------- flagship */}
      {flagship ? (
        <Section id="upcoming" className="pb-12">
          <div className="container-page">
            <Reveal>
              <article className="relative overflow-hidden rounded-[var(--radius-card)] border border-gold/55 bg-white">
                <span className="absolute inset-x-0 top-0 h-[3px] bg-gold" aria-hidden />

                <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <span className="label-mono inline-flex items-center rounded-full border border-gold/50 px-3.5 py-1.5 text-gold-600">
                      Flagship · {flagship.type}
                    </span>
                    <h2 className="mt-6 max-w-2xl text-[clamp(1.7rem,3.6vw,2.75rem)] leading-[1.06] font-semibold">
                      {flagship.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-[1rem] leading-[1.65] text-muted">
                      {flagship.summary}
                    </p>
                    <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-[0.875rem] text-muted">
                      <li className="flex items-center gap-2">
                        <CalendarDays strokeWidth={1.5} className="size-4 text-gold" aria-hidden />
                        {formatLongDate(flagship.date)}
                        {flagship.endDate ? ` – ${formatLongDate(flagship.endDate)}` : ""}
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin strokeWidth={1.5} className="size-4 text-gold" aria-hidden />
                        {flagship.venue}, {flagship.city}
                      </li>
                    </ul>
                  </div>
                  <div className="lg:col-span-4 lg:text-right">
                    <ButtonLink href="#register" size="lg" withArrow>
                      Register Now
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </Section>
      ) : null}

      {/* -------------------------------------------------------- upcoming */}
      <Section className="pt-4">
        <div className="container-page">
          <SectionHeading eyebrow="Upcoming" title="Also in the" accent="diary." />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {upcoming.map((event) => (
              <RevealItem key={event.id}>
                <EventCard event={event} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------------------------------------------------- register */}
      <Section id="register" divided>
        <div className="container-page relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                    eyebrow="Registration"
                title="Reserve your"
                accent="place."
                copy="Members are confirmed first. Non-members are welcome at most events, subject to capacity."
              />
              <Reveal delay={0.12}>
                <ul className="mt-10 space-y-4 border-t border-hairline pt-8 text-[0.875rem] text-muted">
                  <li>Confirmation is sent by email within one working day.</li>
                  <li>Delegation programmes require a short eligibility call.</li>
                  <li>Cancellations are welcome up to 48 hours before an event.</li>
                </ul>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-7" delay={0.08} y={22}>
              <div className="rounded-[var(--radius-card)] border border-hairline bg-white p-7 md:p-10">
                <EventRegistrationForm defaultEvent={flagship?.title} />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ past */}
      <Section id="past" divided>
        <div className="container-page">
          <SectionHeading eyebrow="Past events" title="What we have" accent="already run." />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {past.map((event) => (
              <RevealItem key={event.id}>
                <EventCard event={event} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>
    </>
  );
}
