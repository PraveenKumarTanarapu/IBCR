import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Insight } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

/**
 * Article thumbnails are drawn, not photographed: a white plate with a hairline
 * corridor motif, tinted only by a thin accent rule per category.
 */
const CATEGORY_RULE: Record<Insight["category"], string> = {
  "IBCR News": "bg-royal",
  "Market Intelligence": "bg-gold",
  "India–Rwanda Trade": "bg-saffron",
  Reports: "bg-rw-blue",
};

export function InsightCard({ insight, featured }: { insight: Insight; featured?: boolean }) {
  return (
    <article className="group h-full">
      <Link href={`/insights/${insight.slug}`} className="flex h-full flex-col">
        <div
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-white transition-colors duration-500 group-hover:bg-hover",
            featured ? "aspect-16/10" : "aspect-3/2",
          )}
        >
          <span
            className={cn("absolute inset-x-0 top-0 h-[3px]", CATEGORY_RULE[insight.category])}
            aria-hidden
          />

          <svg
            viewBox="0 0 400 240"
            preserveAspectRatio="none"
            aria-hidden
            className="absolute inset-0 size-full text-navy-900/12 transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.03]"
          >
            <path
              d="M-20 210 C 90 90, 250 70, 420 130"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M-20 235 C 110 140, 260 120, 420 175"
              fill="none"
              stroke="var(--color-gold)"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
            <path
              d="M-20 185 C 80 60, 260 30, 420 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="3 9"
            />
          </svg>

          <span className="label-mono absolute bottom-5 left-5 rounded-full border border-hairline bg-white px-3 py-1.5 text-[0.5625rem] text-muted">
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
