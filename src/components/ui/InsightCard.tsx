import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Insight } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

const CATEGORY_TINT: Record<Insight["category"], string> = {
  "IBCR News": "from-royal/55 via-navy-800 to-navy-950",
  "Market Intelligence": "from-gold/45 via-navy-800 to-navy-950",
  "India–Rwanda Trade": "from-saffron/40 via-navy-800 to-navy-950",
  Reports: "from-rw-blue/45 via-navy-800 to-navy-950",
};

export function InsightCard({ insight, featured }: { insight: Insight; featured?: boolean }) {
  return (
    <article className="group h-full">
      <Link href={`/insights/${insight.slug}`} className="flex h-full flex-col">
        <div
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-card)] bg-navy-950",
            featured ? "aspect-16/10" : "aspect-3/2",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.04]",
              CATEGORY_TINT[insight.category],
            )}
            aria-hidden
          />
          <div className="dot-veil absolute inset-0 opacity-30" aria-hidden />
          <div
            className="absolute inset-0 bg-[radial-gradient(90%_70%_at_18%_12%,rgba(255,255,255,0.14),transparent_60%)]"
            aria-hidden
          />
          {/* Corridor arcs, so each card reads as part of one system. */}
          <svg
            viewBox="0 0 400 240"
            preserveAspectRatio="none"
            aria-hidden
            className="absolute inset-0 size-full text-gold-200/35"
          >
            <path d="M-20 210 C 90 90, 250 70, 420 130" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M-20 235 C 110 140, 260 120, 420 175" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 9" />
            <path d="M-20 185 C 80 60, 260 30, 420 90" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
          </svg>
          <span className="label-mono absolute top-5 left-5 rounded-full bg-navy-950/70 px-3 py-1.5 text-[0.5625rem] text-gold-200 backdrop-blur-sm">
            {insight.category}
          </span>
        </div>

        <div className={cn("flex flex-1 flex-col", featured ? "mt-7" : "mt-5")}>
          <p className="label-mono text-navy-900/35">
            {formatDate(insight.date)} · {insight.readingTime}
          </p>
          <h3
            className={cn(
              "mt-3 leading-snug font-semibold tracking-tight text-navy-900 transition-colors duration-300 group-hover:text-navy-700",
              featured ? "text-[clamp(1.35rem,2.4vw,1.85rem)]" : "text-[1.125rem]",
            )}
          >
            {insight.title}
          </h3>
          <p
            className={cn(
              "mt-3 flex-1 leading-[1.65] text-muted",
              featured ? "text-[1rem]" : "text-[0.875rem]",
            )}
          >
            {insight.summary}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-navy-700 transition-colors duration-300 group-hover:text-gold-600">
            Read more
            <ArrowUpRight
              strokeWidth={1.75}
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
