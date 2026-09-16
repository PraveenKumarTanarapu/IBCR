"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Parallax scroll feature section.
 *
 * Each row pins a column of copy against a piece of media; as the row enters
 * the viewport the media wipes in from the left while the copy drifts upward,
 * so the two arrive at rest together. Rows alternate sides.
 *
 * Note on the original snippet this is based on: it called `useScroll` and
 * `useTransform` inside `.map()`, which breaks the rules of hooks the moment
 * the list length changes. Each row is its own component here so the hook
 * order is stable.
 */

export type FeaturePoint = { title: string; copy: string };

export type FeatureMedia =
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "node"; node: ReactNode; caption?: string };

export type ParallaxFeature = {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  copy: string;
  points?: FeaturePoint[];
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  media: FeatureMedia;
  reverse?: boolean;
};

export function ParallaxFeatureSection({
  features,
  className,
}: {
  features: ParallaxFeature[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {features.map((feature) => (
        <FeatureRow key={feature.id} feature={feature} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------- row */

function FeatureRow({ feature }: { feature: ParallaxFeature }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  // Reduced motion resolves every transform to its resting value rather than
  // dropping the `style` prop — removing it would leave the last inline
  // opacity: 0 painted on the element, hiding the media for good.
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.55], reduced ? [1, 1] : [0, 1]);
  const mediaClip = useTransform(
    scrollYProgress,
    [0, 0.55],
    reduced
      ? ["inset(0 0% 0 0)", "inset(0 0% 0 0)"]
      : ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const copyShift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [34, -34]);
  const mediaShift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [14, -14]);

  return (
    <section
      ref={ref}
      id={feature.id}
      className="relative scroll-mt-24 border-t border-hairline bg-white py-20 md:py-24 lg:py-28"
    >
      <div className="container-page">
        <div
          className={cn(
            "grid items-center gap-14 lg:grid-cols-12 lg:gap-16",
            feature.reverse && "lg:[&>*:first-child]:order-2",
          )}
        >
          {/* ------------------------------------------------------ copy */}
          <motion.div style={{ y: copyShift }} className="lg:col-span-5">
            <p className="label-mono inline-flex items-center gap-2.5 text-muted">
              <span className="inline-block h-px w-6 bg-gold" aria-hidden />
              {feature.eyebrow}
            </p>

            <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.05] font-semibold text-navy-900">
              {feature.title}
              {feature.accent ? (
                <>
                  {" "}
                  <span className="accent-serif text-gold-600">{feature.accent}</span>
                </>
              ) : null}
            </h2>

            {feature.lede ? (
              <p className="mt-5 max-w-md text-[1.125rem] leading-[1.6] text-navy-900">
                {feature.lede}
              </p>
            ) : null}

            <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.7] text-muted">
              {feature.copy}
            </p>

            {feature.points?.length ? (
              <dl className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {feature.points.map((point, i) => (
                  <div key={point.title}>
                    <dt className="flex items-baseline gap-3">
                      <span className="label-mono text-gold-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.0625rem] font-semibold tracking-tight text-navy-900">
                        {point.title}
                      </span>
                    </dt>
                    <dd className="mt-2 text-[0.875rem] leading-[1.6] text-muted">{point.copy}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {feature.cta || feature.secondary ? (
              <div className="mt-10 flex flex-wrap gap-3">
                {feature.cta ? (
                  <Link
                    href={feature.cta.href}
                    className="group/btn inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-full bg-gold px-6 text-[0.9375rem] font-medium tracking-tight text-navy-950 transition-colors duration-300 hover:bg-gold-400"
                  >
                    {feature.cta.label}
                    <ArrowRight
                      strokeWidth={1.75}
                      className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover/btn:translate-x-1"
                    />
                  </Link>
                ) : null}
                {feature.secondary ? (
                  <Link
                    href={feature.secondary.href}
                    className="inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-full border border-hairline-strong bg-white px-6 text-[0.9375rem] font-medium tracking-tight text-navy-900 transition-colors duration-300 hover:border-navy-800/40 hover:bg-hover"
                  >
                    {feature.secondary.label}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </motion.div>

          {/* ----------------------------------------------------- media */}
          <motion.div
            style={{ opacity: mediaOpacity, clipPath: mediaClip, y: mediaShift }}
            className="lg:col-span-7"
          >
            <Media media={feature.media} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- media */

function Media({ media }: { media: FeatureMedia }) {
  if (media.type === "node") {
    return (
      <div className="relative">
        {media.node}
        {media.caption ? (
          <p className="label-mono mt-3 text-center text-navy-900/35">{media.caption}</p>
        ) : null}
      </div>
    );
  }
  return <FeatureImage src={media.src} alt={media.alt} caption={media.caption} />;
}

/**
 * Falls back to a drawn corridor plate if the photograph is missing, so a
 * not-yet-supplied asset degrades to something deliberate rather than a
 * broken-image icon.
 */
function FeatureImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="relative">
      <div className="relative aspect-4/3 overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-white">
        {failed ? (
          <>
            <svg
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
              aria-hidden
              className="absolute inset-0 size-full text-navy-900/12"
            >
              <path
                d="M-20 250 C 90 120, 250 96, 420 160"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M-20 282 C 110 180, 260 150, 420 212"
                fill="none"
                stroke="var(--color-gold)"
                strokeOpacity="0.55"
                strokeWidth="1.2"
              />
              <path
                d="M-20 214 C 80 80, 260 44, 420 112"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 9"
              />
            </svg>
          </>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 size-full object-cover"
          />
        )}
      </div>
      {caption ? (
        <figcaption className="label-mono mt-3 text-navy-900/35">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
