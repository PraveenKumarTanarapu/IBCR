import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { InsightCard } from "@/components/ui/InsightCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { INSIGHTS } from "@/lib/content";

export function InsightsSection() {
  const featured = INSIGHTS.find((i) => i.featured) ?? INSIGHTS[0];
  const rest = INSIGHTS.filter((i) => i.slug !== featured.slug).slice(0, 3);

  return (
    <Section id="insights">
      <div className="container-page">
        <SectionHeading
          eyebrow="Business insights"
          title="Written for people who have to"
          accent="decide something."
          copy="News, market intelligence and publications from the Chamber and its members."
          action={
            <ButtonLink href="/insights" variant="outline" withArrow>
              Explore all insights
            </ButtonLink>
          }
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7" y={24}>
            <InsightCard insight={featured} featured />
          </Reveal>

          <RevealGroup className="flex flex-col gap-8 lg:col-span-5">
            {rest.map((insight) => (
              <RevealItem key={insight.id}>
                <article className="group border-b border-hairline pb-8 last:border-0 last:pb-0">
                  <a href={`/insights/${insight.slug}`} className="block">
                    <p className="label-mono text-gold-600">{insight.category}</p>
                    <h3 className="mt-3 text-[1.125rem] leading-snug font-semibold tracking-tight text-navy-900 transition-colors duration-300 group-hover:text-navy-700">
                      {insight.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[0.875rem] leading-[1.6] text-muted">
                      {insight.summary}
                    </p>
                  </a>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
