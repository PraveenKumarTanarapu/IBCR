"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * What sits behind an inner page's masthead.
 *
 * With a photograph: the image, veiled in white and faded out towards the copy
 * and down into the page, so the page still opens white and the navy headline
 * keeps its contrast. The photograph reads as ground, never as a banner.
 *
 * Without one — or before the file has been supplied — the drawn corridor
 * motif, which is what every masthead showed before. The swap is driven by the
 * image's own load error, so an empty slot is never a blank masthead.
 */
export function PageHeroMedia({
  image,
  align = "left",
}: {
  image?: string;
  align?: "left" | "center";
}) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) return <CorridorMotif />;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        onError={() => setFailed(true)}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-white/78" />
      <div
        className={cn(
          "absolute inset-0",
          align === "center"
            ? "bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(255,255,255,0.93),rgba(255,255,255,0.42))]"
            : "bg-[linear-gradient(to_right,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.86)_42%,rgba(255,255,255,0.3)_100%)]",
        )}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,#ffffff,rgba(255,255,255,0))]" />
    </div>
  );
}

/** Concentric arcs reaching across the masthead. */
function CorridorMotif() {
  return (
    <svg
      viewBox="0 0 420 420"
      aria-hidden
      className="pointer-events-none absolute -top-20 -right-20 hidden h-[30rem] w-[30rem] text-navy-900/8 lg:block"
    >
      {[80, 120, 160, 200].map((r, i) => (
        <circle
          key={r}
          cx="210"
          cy="210"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 1 ? 1.4 : 0.8}
          strokeDasharray={i % 2 ? "2 8" : undefined}
        />
      ))}
      <path
        d="M40 300 C 140 120, 300 120, 392 216"
        fill="none"
        stroke="var(--color-gold)"
        strokeOpacity="0.5"
        strokeWidth="1.4"
      />
      <circle cx="40" cy="300" r="4.5" fill="var(--color-gold)" />
      <circle cx="392" cy="216" r="4.5" fill="var(--color-royal)" />
    </svg>
  );
}
