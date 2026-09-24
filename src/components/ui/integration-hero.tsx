"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Two rows of circular tiles drifting in opposite directions.
 *
 * The upstream snippet scrolled app icons and animated them with styled-jsx;
 * the keyframes here live in globals.css as `--animate-marquee` and its
 * reverse, alongside the ones the rest of the site uses. Each row is doubled
 * and travels exactly half its width, so the loop has no seam.
 *
 * Tiles take a logo when one has been supplied and fall back to the
 * institution's initials, so the row is complete before the artwork is.
 */

export type MarqueeItem = {
  name: string;
  category: string;
  logo?: string;
};

export function LogoMarquee({
  items,
  className,
}: {
  items: MarqueeItem[];
  className?: string;
}) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <div className={cn("relative", className)}>
      {/* Dotted ground — the one place on the site with a visible grid. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,34,66,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_45%,transparent_100%)]"
      />

      <div className="relative space-y-4 overflow-hidden py-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className={cn(
              "group flex w-max gap-4 hover:[animation-play-state:paused]",
              i === 0
                ? "animate-[var(--animate-marquee)]"
                : "animate-[var(--animate-marquee-reverse)]",
            )}
          >
            {[...row, ...row].map((item, j) => (
              <Tile key={`${item.name}-${j}`} item={item} />
            ))}
          </div>
        ))}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-[linear-gradient(to_right,#ffffff,rgba(255,255,255,0))] md:w-36"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-[linear-gradient(to_left,#ffffff,rgba(255,255,255,0))] md:w-36"
        />
      </div>
    </div>
  );
}

function Tile({ item }: { item: MarqueeItem }) {
  const [failed, setFailed] = useState(false);
  const initials = item.name
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word))
    .slice(0, 3)
    .map((word) => word[0])
    .join("");

  return (
    <div className="flex shrink-0 items-center gap-3.5 rounded-full border border-hairline bg-white py-2.5 pr-6 pl-2.5 transition-[border-color,transform] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-hairline-strong">
      <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border border-hairline bg-white">
        {item.logo && !failed ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.logo}
            alt=""
            loading="lazy"
            onError={() => setFailed(true)}
            className="size-9 object-contain"
          />
        ) : (
          <span className="font-mono text-[0.75rem] font-medium tracking-tight text-navy-800">
            {initials}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap">
        <span className="block text-[0.9375rem] font-medium tracking-tight text-navy-900">
          {item.name}
        </span>
        <span className="label-mono block text-[0.5625rem] text-navy-900/40">{item.category}</span>
      </span>
    </div>
  );
}

export default LogoMarquee;
