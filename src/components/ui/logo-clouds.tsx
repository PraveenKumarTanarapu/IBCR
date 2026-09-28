"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A wall of logos that wipes over on a timer.
 *
 * Each mark is clipped away left-to-right and back, staggered across the row,
 * so the wall refreshes itself without moving. Hovering lifts one mark and
 * holds it.
 *
 * A logo that has not been supplied falls back to the company's initials on a
 * plate, so the wall is complete and evenly weighted from the first day —
 * which matters more here than anywhere else on the site, since a half-filled
 * logo wall reads as a half-empty chamber.
 *
 * Under reduced motion the wipe never runs; the wall is simply a static grid.
 */

export type LogoEntry = {
  id: string;
  name: string;
  logo?: string;
};

const WIPE_DURATION = 0.92;
const WIPE_TIMES = [0, 0.4, 1];

export function LogoCloud({
  logos,
  interval = 3600,
  stagger = 0.055,
  className,
}: {
  logos: LogoEntry[];
  interval?: number;
  stagger?: number;
  className?: string;
}) {
  const [waving, setWaving] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setWaving(true), interval);
    return () => clearInterval(id);
  }, [interval, reduced]);

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5",
        className,
      )}
    >
      {logos.map((logo, i) => (
        <LogoItem
          key={logo.id}
          logo={logo}
          index={i}
          isWaving={waving && !reduced}
          stagger={stagger}
          total={logos.length}
          onDone={() => setWaving(false)}
        />
      ))}
    </div>
  );
}

function LogoItem({
  logo,
  index,
  isWaving,
  stagger,
  total,
  onDone,
}: {
  logo: LogoEntry;
  index: number;
  isWaving: boolean;
  stagger: number;
  total: number;
  onDone: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const initials = logo.name
    .split(/\s+/)
    .filter((word) => /^[A-Za-z0-9]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return (
    <motion.div
      title={logo.name}
      animate={
        isWaving
          ? {
              clipPath: ["inset(0 0% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)"],
              opacity: [1, 0.25, 1],
            }
          : { clipPath: "inset(0 0% 0 0)", opacity: 1 }
      }
      transition={
        isWaving
          ? {
              clipPath: {
                duration: WIPE_DURATION,
                times: WIPE_TIMES,
                ease: ["easeIn", [0.16, 1, 0.3, 1]],
                delay: index * stagger,
              },
              opacity: {
                duration: WIPE_DURATION * 0.85,
                times: WIPE_TIMES,
                ease: "easeInOut",
                delay: index * stagger,
              },
            }
          : { duration: 0.3, ease: "easeOut" }
      }
      onAnimationComplete={() => {
        if (isWaving && index === total - 1) onDone();
      }}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 340, damping: 24 } }}
      className="flex h-[6.5rem] cursor-default flex-col items-center justify-center gap-2.5 rounded-[var(--radius-card)] border border-hairline bg-white px-4 text-center transition-colors duration-500 hover:border-hairline-strong"
    >
      <span className="flex h-10 items-center justify-center">
        {logo.logo && !failed ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={logo.logo}
            alt={logo.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="max-h-10 max-w-[7.5rem] object-contain"
          />
        ) : (
          <span className="font-mono text-[0.9375rem] font-medium tracking-tight text-navy-800/70">
            {initials}
          </span>
        )}
      </span>
      <span className="line-clamp-2 text-[0.6875rem] leading-tight tracking-tight text-muted">
        {logo.name}
      </span>
    </motion.div>
  );
}

export default LogoCloud;
