import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Masthead at the top of every inner page. White ground; the only decoration
 * is a hairline corridor motif, so the page opens the same way the rest of the
 * site reads.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  copy,
  crumbs = [],
  children,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  copy?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-white pt-[8.5rem] pb-16 md:pt-[10rem] md:pb-20">
      {/* Corridor motif — concentric arcs reaching across the masthead. */}
      <svg
        viewBox="0 0 420 420"
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 hidden h-[30rem] w-[30rem] text-navy-900/8 lg:block"
      >
        {[80, 120, 160, 200].map((r, i) => (
          <circle
            key={r}
            cx="210"
            cy="210"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={i === 1 ? 1.4 : 0.8}
            strokeDasharray={i % 2 ? "2 8" : undefined}
          />
        ))}
        <path
          d="M40 300 C 140 120, 300 120, 392 216"
          fill="none"
          stroke="var(--color-gold)"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
        <circle cx="40" cy="300" r="4.5" fill="var(--color-gold)" />
        <circle cx="392" cy="216" r="4.5" fill="var(--color-royal)" />
      </svg>

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
