import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { OPPORTUNITIES } from "@/lib/content";

export function Opportunities() {
  return (
    <Section id="opportunities" tone="ivory">
      <div className="container-page">
        <SectionHeading
          eyebrow="Investment opportunities"
          title="Where opportunity"
          accent="meets ambition."
          copy="Eight sectors where Rwandan demand and Indian capability line up most cleanly today."
        />

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {OPPORTUNITIES.map((item, i) => (
            <RevealItem key={item.title}>
              <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-paper p-7 transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:border-navy-800/25 hover:shadow-[0_22px_50px_-30px_rgba(7,23,48,0.45)]">
                <div
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-200 transition-transform duration-600 ease-[var(--ease-out-quint)] group-hover:scale-x-100"
                  aria-hidden
                />
                <p className="label-mono text-navy-900/22">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-[1.1875rem] leading-snug font-semibold tracking-tight text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-[1.65] text-muted">{item.copy}</p>
                <p className="label-mono mt-6 text-gold-600">{item.metric}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/india-rwanda#opportunities" variant="navy" size="lg" withArrow>
            Explore Investment Opportunities
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
