import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { EventCard } from "@/components/ui/EventCard";
import { Eyebrow, Section } from "@/components/ui/Section";
import { EVENTS } from "@/lib/content";
import { formatLongDate } from "@/lib/utils";

export function EventsSection() {
  const flagship = EVENTS.find((e) => e.flagship);
  const upcoming = EVENTS.filter((e) => e.status === "upcoming" && !e.flagship).slice(0, 3);

  return (
    <Section id="events" divided>
      <div className="container-page relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Events</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.06] font-semibold text-navy-900">
                Connect. Meet. <span className="accent-serif text-gold-600">Collaborate.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <ButtonLink href="/events" variant="outline" withArrow>
              View all events
            </ButtonLink>
          </Reveal>
        </div>

        {/* --------------------------------------------------- flagship */}
        {flagship ? (
          <Reveal className="mt-14" y={26}>
            <article className="relative overflow-hidden rounded-[var(--radius-card)] border border-gold/55 bg-white">
              <span className="absolute inset-x-0 top-0 h-[3px] bg-gold" aria-hidden />

              <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <span className="label-mono inline-flex items-center gap-2 rounded-full border border-gold/50 px-3.5 py-1.5 text-gold-600">
                    Flagship · {flagship.type}
                  </span>
                  <h3 className="mt-6 max-w-2xl text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.08] font-semibold text-navy-900">
                    {flagship.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[1rem] leading-[1.65] text-muted">
                    {flagship.summary}
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-[0.875rem] text-body/85">
                    <li className="flex items-center gap-2">
                      <CalendarDays
                        strokeWidth={1.5}
                        className="size-4 text-gold-600"
                        aria-hidden
                      />
                      {formatLongDate(flagship.date)}
                      {flagship.endDate ? ` – ${formatLongDate(flagship.endDate)}` : ""}
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin strokeWidth={1.5} className="size-4 text-gold-600" aria-hidden />
                      {flagship.venue}, {flagship.city}
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                  <ButtonLink
                    href="/events#register"
                    size="lg"
                    withArrow
                    className="w-full lg:w-auto"
                  >
                    Register Now
                  </ButtonLink>
                  <Link
                    href="/events"
                    className="link-underline text-[0.875rem] text-muted hover:text-navy-900"
                  >
                    Full programme
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ) : null}

        {/* ------------------------------------------------ upcoming grid */}
        <RevealGroup className="mt-6 grid gap-5 md:grid-cols-3">
          {upcoming.map((event) => (
            <RevealItem key={event.id}>
              <EventCard event={event} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
