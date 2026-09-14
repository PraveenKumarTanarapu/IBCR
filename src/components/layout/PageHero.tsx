import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Dark masthead used at the top of every inner page. Keeps the header's
 * transparent-on-dark opening state consistent across the whole site.
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
    <section className="grain relative overflow-hidden bg-ink pt-[9.5rem] pb-20 text-ivory md:pt-[11rem] md:pb-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_78%_-10%,rgba(26,86,184,0.4),transparent_58%),radial-gradient(70%_90%_at_8%_110%,rgba(201,162,39,0.18),transparent_60%)]"
        aria-hidden
      />
      <div className="dot-veil pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      {/* Corridor motif — concentric arcs reaching across the masthead. */}
      <svg
        viewBox="0 0 420 420"
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-24 hidden h-[30rem] w-[30rem] text-gold/22 lg:block"
      >
        {[80, 120, 160, 200].map((r, i) => (
          <circle
            key={r}
            cx="210"
            cy="210"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={i === 1 ? 1.4 : 0.7}
            strokeDasharray={i % 2 ? "2 8" : undefined}
          />
        ))}
        <path
          d="M40 300 C 140 120, 300 120, 392 216"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="40" cy="300" r="4.5" fill="currentColor" />
        <circle cx="392" cy="216" r="4.5" className="text-royal-400" fill="#4380d8" />
      </svg>

      <div className="container-page relative">
        {crumbs.length ? (
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-ivory/45">
                <li>
                  <Link href="/" className="transition-colors hover:text-ivory">
                    Home
                  </Link>
                </li>
                {crumbs.map((crumb) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    <ChevronRight strokeWidth={1.5} className="size-3 text-ivory/25" aria-hidden />
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-ivory">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-ivory/70">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        ) : null}

        <div className={cn("mt-8", align === "center" && "mx-auto max-w-3xl text-center")}>
          <Reveal>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,5.6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-ivory">
              {title}
              {accent ? (
                <>
                  {" "}
                  <span className="accent-serif text-gold-400">{accent}</span>
                </>
              ) : null}
            </h1>
          </Reveal>
          {copy ? (
            <Reveal delay={0.12}>
              <p
                className={cn(
                  "mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] text-ivory/68 md:text-[1.125rem]",
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
