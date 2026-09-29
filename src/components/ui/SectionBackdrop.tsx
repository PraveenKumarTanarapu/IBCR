"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A photograph behind a full-width section, revealed on hover.
 *
 * At rest the frame is desaturated and almost entirely veiled — the page still
 * reads as white, which is the whole design. Pointing at the section lifts the
 * veil, brings the colour back and eases the image in, the same move the
 * investment-opportunity cards make. The section supplies the `group` class.
 *
 * `side` decides which half stays legible under the copy; alternate it down a
 * page and the photography carries the rhythm rather than fighting the text.
 *
 * A missing file removes the layer entirely rather than leaving a broken
 * image, so an unsupplied photograph costs nothing.
 */
export function SectionBackdrop({
  image,
  side = "right",
  className,
}: {
  image?: string;
  side?: "left" | "right";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!image || failed) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className={cn(
          "absolute inset-0 size-full object-cover",
          "transition-[filter,transform] duration-[900ms] ease-[var(--ease-out-quint)]",
          "saturate-[0.35] md:group-hover:scale-[1.04] md:group-hover:saturate-100",
        )}
      />
      {/*
        Veil. Two layers do the work: a flat one that lifts on hover, and a
        fixed gradient that keeps the copy side readable whatever the hover
        state. Between them the photograph is clearly legible at rest and
        comes fully forward under the cursor.
      */}
      <div
        className={cn(
          "absolute inset-0 bg-white/80 transition-opacity duration-[900ms] ease-[var(--ease-out-quint)]",
          "md:group-hover:opacity-[0.58]",
        )}
      />
      <div
        className={cn(
          "absolute inset-0",
          side === "right"
            ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.86)_42%,rgba(255,255,255,0.3)_100%)]"
            : "bg-[linear-gradient(to_left,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.86)_42%,rgba(255,255,255,0.3)_100%)]",
        )}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,#ffffff,rgba(255,255,255,0))]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,#ffffff,rgba(255,255,255,0))]" />
    </div>
  );
}
