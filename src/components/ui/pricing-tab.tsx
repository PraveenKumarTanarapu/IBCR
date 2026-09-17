"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * One segment of the rate toggle above the pricing cards. The selected pill is
 * a shared layout element, so it slides between segments rather than blinking
 * from one to the other.
 */
export function Tab({
  text,
  selected,
  setSelected,
  badge,
  layoutId,
}: {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
  /** Small label riding alongside the segment, e.g. a discount. */
  badge?: string;
  layoutId: string;
}) {
  const reduced = useReducedMotion();

  return (
    <button
      type="button"
      onClick={() => setSelected(text)}
      aria-pressed={selected}
      className={cn(
        "relative flex h-10 w-fit cursor-pointer items-center justify-center gap-2 rounded-full px-5",
        "text-[0.875rem] font-medium tracking-tight capitalize transition-colors duration-300",
        selected ? "text-navy-900" : "text-muted hover:text-navy-900",
      )}
    >
      {selected ? (
        <motion.span
          layoutId={layoutId}
          transition={
            reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
          }
          className="absolute inset-0 z-0 rounded-full border border-hairline bg-white shadow-[0_1px_2px_rgba(11,18,32,0.06)]"
        />
      ) : null}
      <span className="relative z-10">{text}</span>
      {badge ? (
        <span
          className={cn(
            "label-mono relative z-10 rounded-full px-2 py-0.5 text-[0.625rem] whitespace-nowrap transition-colors duration-300",
            selected ? "bg-gold/18 text-gold-600" : "bg-navy-900/6 text-muted",
          )}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
}
