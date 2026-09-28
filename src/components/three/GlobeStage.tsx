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
 *
 * A poster frame of the globe sits underneath and is what you actually see
 * first: it is a still of the same scene, so the map is legible immediately
 * rather than after the bundle, the context and a 2048px texture have all
 * arrived. The canvas fades over it once it has drawn a frame, and the poster
 * stays put if WebGL never starts at all.
 */
export function GlobeStage({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
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
      // Generous: the bundle and texture should be in flight well before the
      // section is on screen.
      { rootMargin: "800px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative aspect-square w-full", className)}>
      {/* Warm the map here rather than in the document head: it is only ever
          wanted on the two pages that carry a globe. */}
      <link rel="preload" as="image" href="/textures/world-map.png" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/globe-poster.png"
        alt="Globe showing trade routes from Kigali to Delhi, Mumbai and Ahmedabad"
        fetchPriority="high"
        className={cn(
          "absolute inset-0 size-full object-contain transition-opacity duration-500",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
      {visible ? (
        <div className={cn("absolute inset-0 transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")}>
          <CorridorGlobe onReady={() => setReady(true)} />
        </div>
      ) : null}
      <span className="sr-only">
        Interactive globe showing trade corridors between Indian cities and Kigali, Rwanda. Drag to
        rotate.
      </span>
    </div>
  );
}
