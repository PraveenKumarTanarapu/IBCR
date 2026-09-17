"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import type { MembershipTier } from "@/lib/content";

/**
 * One membership category.
 *
 * The figure animates between the standard rate and the limited offer when the
 * toggle above the grid changes — a spring on the raw number, formatted on
 * every frame, rather than the upstream snippet's `@number-flow/react`
 * dependency. Under reduced motion it simply prints the number.
 *
 * The featured category inverts to navy: on a white page that is the whole
 * hierarchy, so no card needs a coloured ring or a "most popular" claim.
 */

const FORMAT = new Intl.NumberFormat("en-US");

export function PricingCard({
  tier,
  rate,
  className,
}: {
  tier: MembershipTier;
  rate: string;
  className?: string;
}) {
  const price = tier.price[rate as keyof typeof tier.price];
  const standard = tier.price.standard;
  const discounted = typeof price === "number" && typeof standard === "number" && price < standard;
  const dark = !!tier.featured;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border p-7",
        "transition-[border-color,transform] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1",
        dark
          ? "border-navy-900 bg-navy-900 text-white hover:border-navy-700"
          : "border-hairline bg-white text-body hover:border-hairline-strong",
        className,
      )}
    >
      {/* ------------------------------------------------------ category */}
      <div className="flex items-start justify-between gap-3">
        <h3
          className={cn(
            "text-[1.375rem] leading-none font-semibold tracking-tight",
            dark ? "text-white" : "text-navy-900",
          )}
        >
          {tier.name}
        </h3>
        {discounted ? (
          <span
            className={cn(
              "label-mono rounded-full px-2.5 py-1 text-[0.625rem] whitespace-nowrap",
              dark ? "bg-gold/22 text-gold-200" : "bg-gold/15 text-gold-600",
            )}
          >
            Limited offer
          </span>
        ) : null}
      </div>
      <p className={cn("mt-2 text-[0.8125rem]", dark ? "text-white/60" : "text-muted")}>
        {tier.label}
      </p>

      {/* --------------------------------------------------------- price */}
      <div className="mt-7 min-h-[4.5rem]">
        {typeof price === "number" ? (
          <>
            <p
              className={cn(
                "flex items-baseline gap-1.5 text-[2rem] leading-none font-semibold tracking-[-0.03em] tabular-nums",
                dark ? "text-white" : "text-navy-900",
              )}
            >
              <span className={cn("text-[0.875rem] font-medium", dark ? "text-white/55" : "text-muted")}>
                {tier.currency}
              </span>
              <Figure value={price} />
              <span className={cn("text-[0.875rem] font-medium", dark ? "text-white/55" : "text-muted")}>
                {tier.period}
              </span>
            </p>
            <p className={cn("mt-2 text-[0.75rem]", dark ? "text-white/50" : "text-muted")}>
              {discounted ? (
                <>
                  Standard rate{" "}
                  <span className="line-through">
                    {tier.currency} {FORMAT.format(standard as number)}
                    {tier.period}
                  </span>
                </>
              ) : (
                "Annual membership fee"
              )}
            </p>
          </>
        ) : (
          <>
            <p
              className={cn(
                "text-[2rem] leading-none font-semibold tracking-[-0.03em]",
                dark ? "text-white" : "text-navy-900",
              )}
            >
              {price}
            </p>
            <p className={cn("mt-2 text-[0.75rem]", dark ? "text-white/50" : "text-muted")}>
              Scoped with the Board
            </p>
          </>
        )}
      </div>

      {/* ------------------------------------------------------ benefits */}
      <p
        className={cn(
          "mt-6 border-t pt-6 text-[0.8125rem] leading-[1.6]",
          dark ? "border-white/12 text-white/70" : "border-hairline text-muted",
        )}
      >
        {tier.who}
      </p>

      {tier.inherits ? (
        <p className={cn("mt-5 text-[0.8125rem] font-medium", dark ? "text-gold-200" : "text-gold-600")}>
          Everything in {tier.inherits}, plus
        </p>
      ) : null}

      <ul className={cn("flex-1 space-y-2.5", tier.inherits ? "mt-3.5" : "mt-5")}>
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
          "mt-8 inline-flex h-11 cursor-pointer items-center justify-center gap-2.5 rounded-full",
          "text-[0.9375rem] font-medium tracking-tight transition-colors duration-300",
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

/* ---------------------------------------------------------------- figure */

function Figure({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const spring = useSpring(value, { stiffness: 140, damping: 24, mass: 0.7 });
  const text = useTransform(spring, (v) => FORMAT.format(Math.round(v)));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  if (reduced) return <>{FORMAT.format(value)}</>;
  return <motion.span>{text}</motion.span>;
}
