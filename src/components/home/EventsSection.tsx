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
    <Section id="events" tone="ink" className="grain">
      <div className="container-page relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tone="light">Events</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.06] font-semibold text-ivory">
                Connect. Meet.{" "}
                <span className="accent-serif text-gold-400">Collaborate.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <ButtonLink href="/events" variant="outline-light" withArrow>
              View all events
            </ButtonLink>
          </Reveal>
        </div>

        {/* --------------------------------------------------- flagship */}
        {flagship ? (
          <Reveal className="mt-14" y={26}>
            <article className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/12 bg-[linear-gradient(120deg,rgba(13,42,88,0.92),rgba(6,15,34,0.92))]">
              <div
                className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.24),transparent_65%)] blur-xl"
                aria-hidden
              />
              <div className="dot-veil absolute inset-0 opacity-25" aria-hidden />

              <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <span className="label-mono inline-flex items-center gap-2 rounded-full border border-gold/40 px-3.5 py-1.5 text-gold-200">
                    Flagship · {flagship.type}
                  </span>
                  <h3 className="mt-6 max-w-2xl text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.08] font-semibold text-ivory">
                    {flagship.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[1rem] leading-[1.65] text-ivory/65">
                    {flagship.summary}
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-[0.875rem] text-ivory/75">
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

                <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                  <ButtonLink href="/events#register" size="lg" withArrow className="w-full lg:w-auto">
                    Register Now
                  </ButtonLink>
                  <Link
                    href="/events"
                    className="link-underline text-[0.875rem] text-ivory/60 hover:text-ivory"
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
              <EventCard event={event} tone="dark" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
