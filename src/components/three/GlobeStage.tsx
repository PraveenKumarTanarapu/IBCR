"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CorridorGlobe = dynamic(() => import("./CorridorGlobe"), {
  ssr: false,
  loading: () => null,
});

/**
 * Mounts the WebGL globe only once it is close to the viewport, so the three.js
 * bundle and a GPU context are never paid for above the fold.
 */
export function GlobeStage({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      // No observer available: just mount it, out of the render pass.
      const id = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative aspect-square w-full", className)}>
      {/* Static under-layer: the section still reads correctly without WebGL. */}
      <div
        className="absolute inset-[8%] rounded-full bg-white"
        aria-hidden
      />
      <div
        className="absolute inset-[8%] rounded-full ring-1 ring-hairline"
        aria-hidden
      />
      {visible ? (
        <div className="absolute inset-0">
          <CorridorGlobe />
        </div>
      ) : null}
      <span className="sr-only">
        Interactive globe showing trade corridors between Indian cities and Kigali, Rwanda. Drag to
        rotate.
      </span>
    </div>
  );
}
