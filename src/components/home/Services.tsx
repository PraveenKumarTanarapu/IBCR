import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Compass,
  DoorOpen,
  Route,
  ShieldCheck,
  Users,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SERVICES } from "@/lib/content";

const ICONS = {
  door: DoorOpen,
  route: Route,
  chart: BarChart3,
  users: Users,
  compass: Compass,
  shield: ShieldCheck,
} as const;

export function Services() {
  return (
    <Section id="services" tone="paper">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Six services,"
          accent="one purpose."
          copy="Everything the Chamber offers is designed to shorten the distance between an intention and an operating business."
          action={
            <ButtonLink href="/services" variant="outline" withArrow>
              All services
            </ButtonLink>
          }
        />

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-hairline md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <RevealItem noShift key={service.id}>
                <Link
                  href={`/services#${service.id}`}
                  className="group relative flex h-full flex-col bg-paper p-8 transition-colors duration-500 hover:bg-navy-950 lg:p-10"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      strokeWidth={1.2}
                      className="size-7 text-navy-700 transition-colors duration-500 group-hover:text-gold-400"
                      aria-hidden
                    />
                    <span className="label-mono text-navy-900/22 transition-colors duration-500 group-hover:text-ivory/30">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-10 text-[1.3125rem] font-semibold tracking-tight text-navy-900 transition-colors duration-500 group-hover:text-ivory">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.65] text-muted transition-colors duration-500 group-hover:text-ivory/65">
                    {service.copy}
                  </p>

                  <span className="mt-8 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-navy-700 transition-colors duration-500 group-hover:text-gold-400">
                    Explore
                    <ArrowUpRight
                      strokeWidth={1.75}
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
