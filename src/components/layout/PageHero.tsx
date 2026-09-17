import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeroMedia } from "@/components/layout/PageHeroMedia";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Masthead at the top of every inner page.
 *
 * White ground. `image` puts a photograph behind the masthead — see
 * PageHeroMedia for the treatment, and for the drawn corridor motif that
 * stands in until the file is supplied.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  copy,
  crumbs = [],
  children,
  align = "left",
  image,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  copy?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  align?: "left" | "center";
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-white pt-[8.5rem] pb-16 md:pt-[10rem] md:pb-20">
      <PageHeroMedia image={image} align={align} />

      <div className="container-page relative">
        {crumbs.length ? (
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-muted">
                <li>
                  <Link href="/" className="transition-colors hover:text-navy-900">
                    Home
                  </Link>
                </li>
                {crumbs.map((crumb) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    <ChevronRight
                      strokeWidth={1.5}
                      className="size-3 text-navy-900/25"
                      aria-hidden
                    />
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-navy-900">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-navy-900">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        ) : null}

        <div className={cn("mt-8", align === "center" && "mx-auto max-w-3xl text-center")}>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,5.6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-navy-900">
              {title}
              {accent ? (
                <>
                  {" "}
                  <span className="accent-serif text-gold-600">{accent}</span>
                </>
              ) : null}
            </h1>
          </Reveal>
          {copy ? (
            <Reveal delay={0.12}>
              <p
                className={cn(
                  "mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] text-muted md:text-[1.125rem]",
                  align === "center" && "mx-auto",
                )}
              >
                {copy}
              </p>
            </Reveal>
          ) : null}
          {children ? (
            <Reveal delay={0.18} className="mt-9">
              {children}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
