"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MembershipTier } from "@/lib/content";

/**
 * One membership category.
 *
 * The featured category inverts to navy: on a white page that is the whole
 * hierarchy, so no card needs a coloured ring or a "most popular" claim. A
 * category that splits into more than one kind of member (International)
 * carries those options above its benefits rather than becoming two cards.
 */

const FORMAT = new Intl.NumberFormat("en-US");

export function PricingCard({ tier, className }: { tier: MembershipTier; className?: string }) {
  const dark = !!tier.featured;
  const numeric = typeof tier.price === "number";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border p-6",
        "transition-[border-color,transform] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1",
        dark
          ? "border-navy-900 bg-navy-900 text-white hover:border-navy-700"
          : "border-hairline bg-white text-body hover:border-hairline-strong",
        className,
      )}
    >
      {/* ------------------------------------------------------ category */}
      <h3
        className={cn(
          "text-[1.25rem] leading-none font-semibold tracking-tight",
          dark ? "text-white" : "text-navy-900",
        )}
      >
        {tier.name}
      </h3>
      <p className={cn("mt-2 text-[0.8125rem]", dark ? "text-white/60" : "text-muted")}>
        {tier.label}
      </p>

      {/* --------------------------------------------------------- price */}
      <div className="mt-6 min-h-[3.75rem]">
        {numeric ? (
          <>
            <p
              className={cn(
                "flex items-baseline gap-1.5 text-[1.625rem] leading-none font-semibold tracking-[-0.03em] tabular-nums",
                dark ? "text-white" : "text-navy-900",
              )}
            >
              <span
                className={cn("text-[0.8125rem] font-medium", dark ? "text-white/55" : "text-muted")}
              >
                {tier.currency}
              </span>
              {FORMAT.format(tier.price as number)}
              <span
                className={cn("text-[0.8125rem] font-medium", dark ? "text-white/55" : "text-muted")}
              >
                {tier.period}
              </span>
            </p>
            <p className={cn("mt-2 text-[0.75rem]", dark ? "text-white/50" : "text-muted")}>
              Annual membership fee
            </p>
          </>
        ) : (
          <>
            <p
              className={cn(
                "text-[1.625rem] leading-none font-semibold tracking-[-0.03em]",
                dark ? "text-white" : "text-navy-900",
              )}
            >
              {tier.price}
            </p>
            <p className={cn("mt-2 text-[0.75rem]", dark ? "text-white/50" : "text-muted")}>
              {tier.options ? "Two ways to join" : "Scoped with the Board"}
            </p>
          </>
        )}
      </div>

      {/* ------------------------------------------------------ benefits */}
      <p
        className={cn(
          "mt-5 border-t pt-5 text-[0.8125rem] leading-[1.6]",
          dark ? "border-white/12 text-white/70" : "border-hairline text-muted",
        )}
      >
        {tier.who}
      </p>

      {tier.options?.length ? (
        <ul className="mt-5 space-y-2">
          {tier.options.map((option, i) => (
            <li
              key={option.name}
              className={cn(
                "rounded-[calc(var(--radius-card)-6px)] border p-3",
                dark ? "border-white/15" : "border-hairline bg-hover/60",
              )}
            >
              <p
                className={cn(
                  "flex items-baseline gap-2 text-[0.8125rem] font-semibold tracking-tight",
                  dark ? "text-white" : "text-navy-900",
                )}
              >
                <span className={cn("label-mono", dark ? "text-gold-200" : "text-gold-600")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {option.name}
              </p>
              <p
                className={cn(
                  "mt-1.5 text-[0.75rem] leading-[1.5]",
                  dark ? "text-white/65" : "text-muted",
                )}
              >
                {option.who}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {tier.inherits ? (
        <p
          className={cn(
            "mt-5 text-[0.8125rem] font-medium",
            dark ? "text-gold-200" : "text-gold-600",
          )}
        >
          Everything in {tier.inherits}, plus
        </p>
      ) : null}

      <ul className={cn("flex-1 space-y-2.5", tier.inherits || tier.options ? "mt-3.5" : "mt-5")}>
        {tier.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2.5 text-[0.8125rem] leading-[1.5]">
            <Check
              strokeWidth={2.25}
              aria-hidden
              className={cn("mt-px size-3.5 shrink-0", dark ? "text-gold-200" : "text-gold-600")}
            />
            <span className={dark ? "text-white/80" : "text-body/85"}>{benefit}</span>
          </li>
        ))}
      </ul>

      {/* ----------------------------------------------------------- cta */}
      <Link
        href={`/membership/join?tier=${encodeURIComponent(tier.name)}`}
        className={cn(
          "mt-7 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full",
          "text-[0.875rem] font-medium tracking-tight transition-colors duration-300",
          dark
            ? "bg-gold text-navy-950 hover:bg-gold-400"
            : "border border-hairline-strong bg-white text-navy-900 hover:border-navy-800/40 hover:bg-hover",
        )}
      >
        Join as {tier.name}
        <ArrowRight
          strokeWidth={1.75}
          aria-hidden
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}
