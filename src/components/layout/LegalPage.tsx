import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";

export type LegalBlock = { heading: string; paragraphs: string[]; list?: string[] };

export function LegalPage({
  eyebrow,
  title,
  accent,
  intro,
  updated,
  blocks,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro: string;
  updated: string;
  blocks: LegalBlock[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        copy={intro}
        crumbs={[{ label: eyebrow }]}
      >
        <p className="label-mono text-muted">Last updated: {updated}</p>
      </PageHero>

      <Section>
        <div className="container-page">
          <div className="max-w-3xl space-y-12">
            {blocks.map((block, i) => (
              <Reveal key={block.heading} delay={i * 0.03}>
                <section>
                  <h2 className="text-[1.375rem] font-semibold tracking-tight text-navy-900">
                    {block.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {block.paragraphs.map((paragraph, j) => (
                      <p key={j} className="text-[1rem] leading-[1.75] text-body/85">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {block.list ? (
                    <ul className="mt-5 space-y-2.5 border-l border-gold/40 pl-5">
                      {block.list.map((item) => (
                        <li key={item} className="text-[0.9375rem] leading-[1.65] text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
