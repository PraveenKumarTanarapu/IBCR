import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { InsightCard } from "@/components/ui/InsightCard";
import { Section } from "@/components/ui/Section";
import { INSIGHTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Business Insights",
  description:
    "News, market intelligence, India–Rwanda trade analysis and publications from the Indian Business Chamber in Rwanda.",
  alternates: { canonical: "/insights" },
};

const CATEGORIES = ["All", "IBCR News", "Market Intelligence", "India–Rwanda Trade", "Reports"];

export default async function InsightsPage(props: PageProps<"/insights">) {
  const params = await props.searchParams;
  const raw = params.category;
  const selected = (Array.isArray(raw) ? raw[0] : raw) ?? "All";
  const active = CATEGORIES.includes(selected) ? selected : "All";

  const list = active === "All" ? INSIGHTS : INSIGHTS.filter((i) => i.category === active);
  const [lead, ...rest] = list;

  return (
    <>
      <PageHero
        eyebrow="Business insights"
        title="Written for people who have to"
        accent="decide something."
        copy="Sector research, policy movement and Chamber news — without the filler."
        crumbs={[{ label: "Insights" }]}
      />

      <Section>
        <div className="container-page">
          <Reveal>
            <nav aria-label="Insight categories" className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category}
                  href={category === "All" ? "/insights" : `/insights?category=${encodeURIComponent(category)}`}
                  aria-current={category === active ? "page" : undefined}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[0.8125rem] transition-[background-color,border-color,color] duration-300",
                    category === active
                      ? "border-navy-900 bg-navy-900 text-white"
                      : "border-hairline text-muted hover:border-navy-800/35 hover:text-navy-900",
                  )}
                >
                  {category}
                </Link>
              ))}
            </nav>
          </Reveal>

          {list.length === 0 ? (
            <p className="mt-14 rounded-[var(--radius-card)] border border-dashed border-hairline-strong px-6 py-16 text-center text-[0.9375rem] text-muted">
              Nothing published in this category yet.
            </p>
          ) : (
            <>
              <Reveal className="mt-12" y={22}>
                <InsightCard insight={lead} featured />
              </Reveal>

              {rest.length ? (
                <RevealGroup className="mt-16 grid gap-10 border-t border-hairline pt-16 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((insight) => (
                    <RevealItem key={insight.id}>
                      <InsightCard insight={insight} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              ) : null}
            </>
          )}
        </div>
      </Section>
    </>
  );
}
