import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { MembershipTier } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TierCard({ tier, index }: { tier: MembershipTier; index: number }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[var(--radius-card)] border bg-white p-8 transition-[transform,box-shadow,border-color,background-color] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:bg-hover",
        // The featured tier is marked with a gold rule, not a tinted panel.
        tier.featured
          ? "border-gold/55 shadow-[0_22px_50px_-34px_rgba(11,18,32,0.3)]"
          : "border-hairline hover:border-hairline-strong",
      )}
    >
      {tier.featured ? (
        <span className="label-mono absolute -top-2.5 left-8 rounded-full bg-gold px-3 py-1 text-[0.625rem] text-navy-950">
          Most requested
        </span>
      ) : null}

      <span className="label-mono text-navy-900/25">{String(index + 1).padStart(2, "0")}</span>

      <h3 className="mt-6 text-[1.3125rem] font-semibold tracking-tight text-navy-900">
        {tier.name}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-[1.6] text-muted">{tier.who}</p>

      <ul className="mt-7 flex-1 space-y-2.5">
        {tier.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2.5">
            <Check strokeWidth={2} className="mt-1 size-3.5 shrink-0 text-gold-600" aria-hidden />
            <span className="text-[0.875rem] leading-[1.55] text-body/85">{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 border-t border-hairline pt-5">
        <p className="text-[0.75rem] leading-relaxed text-muted">
          <span className="label-mono mr-2 text-[0.625rem]">Eligibility</span>
          {tier.eligibility}
        </p>
        <Link
          href={`/membership/join?tier=${encodeURIComponent(tier.name)}`}
          className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-navy-700 transition-colors duration-300 hover:text-gold-600"
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
