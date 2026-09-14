import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { MembershipTier } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TierCard({ tier, index }: { tier: MembershipTier; index: number }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[var(--radius-card)] border p-8 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1",
        tier.featured
          ? "border-gold/45 bg-navy-950 text-ivory shadow-[0_24px_60px_-34px_rgba(7,23,48,0.7)]"
          : "border-hairline bg-paper hover:border-navy-800/25 hover:shadow-[0_22px_50px_-30px_rgba(7,23,48,0.4)]",
      )}
    >
      {tier.featured ? (
        <span className="label-mono absolute -top-2.5 left-8 rounded-full bg-gold px-3 py-1 text-[0.625rem] text-navy-950">
          Most requested
        </span>
      ) : null}

      <div className="flex items-start justify-between">
        <span
          className={cn(
            "label-mono",
            tier.featured ? "text-ivory/35" : "text-navy-900/22",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3
        className={cn(
          "mt-6 text-[1.3125rem] font-semibold tracking-tight",
          tier.featured ? "text-ivory" : "text-navy-900",
        )}
      >
        {tier.name}
      </h3>
      <p
        className={cn(
          "mt-3 text-[0.9375rem] leading-[1.6]",
          tier.featured ? "text-ivory/65" : "text-muted",
        )}
      >
        {tier.who}
      </p>

      <ul className="mt-7 flex-1 space-y-2.5">
        {tier.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2.5">
            <Check
              strokeWidth={2}
              className={cn("mt-1 size-3.5 shrink-0", tier.featured ? "text-gold-400" : "text-gold-600")}
              aria-hidden
            />
            <span
              className={cn(
                "text-[0.875rem] leading-[1.55]",
                tier.featured ? "text-ivory/78" : "text-body/85",
              )}
            >
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "mt-7 border-t pt-5",
          tier.featured ? "border-white/12" : "border-hairline",
        )}
      >
        <p
          className={cn(
            "text-[0.75rem] leading-relaxed",
            tier.featured ? "text-ivory/45" : "text-muted",
          )}
        >
          <span className="label-mono mr-2 text-[0.625rem]">Eligibility</span>
          {tier.eligibility}
        </p>
        <Link
          href={`/membership/join?tier=${encodeURIComponent(tier.name)}`}
          className={cn(
            "mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium transition-colors duration-300",
            tier.featured ? "text-gold-400 hover:text-gold-200" : "text-navy-700 hover:text-gold-600",
          )}
        >
          Apply as {tier.name.replace(" Member", "").replace(" Partner", "")}
          <ArrowUpRight
            strokeWidth={1.75}
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
