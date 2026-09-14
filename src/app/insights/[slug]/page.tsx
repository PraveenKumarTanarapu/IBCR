import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { InsightCard } from "@/components/ui/InsightCard";
import { Section } from "@/components/ui/Section";
import { INSIGHTS, SITE } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return INSIGHTS.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const insight = INSIGHTS.find((i) => i.slug === slug);
  if (!insight) return { title: "Insight not found" };
  return {
    title: insight.title,
    description: insight.summary,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.summary,
      publishedTime: insight.date,
    },
  };
}

export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const insight = INSIGHTS.find((i) => i.slug === slug);
  if (!insight) notFound();

  const related = INSIGHTS.filter((i) => i.slug !== insight.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.summary,
    datePublished: insight.date,
    articleSection: insight.category,
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={insight.category}
        title={insight.title}
        copy={insight.summary}
        crumbs={[{ label: "Insights", href: "/insights" }, { label: insight.category }]}
      >
        <p className="label-mono text-ivory/45">
          {formatDate(insight.date)} · {insight.readingTime}
        </p>
      </PageHero>

      <Section tone="paper">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <article className="lg:col-span-8">
              <div className="space-y-6">
                {insight.body.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.04}>
                    <p
                      className={
                        i === 0
                          ? "text-[1.1875rem] leading-[1.7] font-medium text-navy-900"
                          : "text-[1.0625rem] leading-[1.8] text-body/85"
                      }
                    >
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal className="mt-12 border-t border-hairline pt-8">
                <Link
                  href="/insights"
                  className="link-underline inline-flex items-center gap-2 text-[0.9375rem] font-medium text-navy-800"
                >
                  <ArrowLeft strokeWidth={1.6} className="size-4" />
                  All insights
                </Link>
              </Reveal>
            </article>

            <aside className="lg:col-span-4">
              <Reveal>
                <div className="rounded-[var(--radius-card)] border border-hairline bg-ivory-100/60 p-7">
                  <p className="label-mono text-gold-600">Members</p>
                  <p className="mt-4 text-[0.9375rem] leading-[1.6] text-body/85">
                    Members can request the underlying data, a sector cut, or a tailored assessment
                    from the secretariat.
                  </p>
                  <ButtonLink href="/membership/join" className="mt-6" withArrow>
                    Become a Member
                  </ButtonLink>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </Section>

      <Section tone="ivory">
        <div className="container-page">
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-tight font-semibold text-navy-900">
            More <span className="accent-serif text-gold-600">insights.</span>
          </h2>
          <RevealGroup className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <RevealItem key={item.id}>
                <InsightCard insight={item} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>
    </>
  );
}
