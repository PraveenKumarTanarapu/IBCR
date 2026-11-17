"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { KEY_EVENTS } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Key events hosted in Rwanda — one event to a slide, four photographs across.
 *
 * The slide advances on its own every eight seconds, which is long enough to
 * read the caption and short enough that the set is seen. It stops the moment
 * anyone touches it: hovering, focusing a control, pressing an arrow or
 * swiping all hand control over and keep it. Under reduced motion it never
 * advances by itself and the change between slides is a plain fade.
 *
 * Photographs that have not been supplied fall back to a drawn plate rather
 * than a broken tile, so the section is presentable before the set is complete.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 8000;
const SWIPE_THRESHOLD = 48;

export function KeyEvents({ divided = false }: { divided?: boolean }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [held, setHeld] = useState(false);
  const touchStart = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const total = KEY_EVENTS.length;
  const event = KEY_EVENTS[index];

  const go = useCallback(
    (next: number, from: number) => {
      setDirection(from);
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (reduced || held || total < 2) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % total);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced, held, total]);

  const shift = reduced ? 0 : 28;

  return (
    <Section id="key-events" divided={divided}>
      <div className="container-page">
        <SectionHeading
          eyebrow="Key events"
          title="Key events hosted"
          accent="in Rwanda."
          copy="Launches, institutional meetings and the rooms in between — the Chamber's record of what it has actually held."
        />

        <Reveal className="mt-12" y={22}>
          <div
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            onFocusCapture={() => setHeld(true)}
            onBlurCapture={() => setHeld(false)}
            onTouchStart={(e) => {
              touchStart.current = e.touches[0].clientX;
              setHeld(true);
            }}
            onTouchEnd={(e) => {
              const start = touchStart.current;
              touchStart.current = null;
              if (start === null) return;
              const travelled = e.changedTouches[0].clientX - start;
              if (Math.abs(travelled) < SWIPE_THRESHOLD) return;
              go(index + (travelled < 0 ? 1 : -1), travelled < 0 ? 1 : -1);
            }}
          >
            {/* ------------------------------------------------ photographs */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.ul
                  key={event.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * shift }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -shift }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
                >
                  {event.images.map((src, i) => (
                    <li key={src}>
                      <Photo src={src} alt={`${event.title} — photograph ${i + 1}`} />
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* ---------------------------------------------------- caption */}
            <div className="mt-8 flex flex-col gap-6 border-t border-hairline pt-6 md:flex-row md:items-end md:justify-between md:gap-10">
              <div className="min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <h3 className="text-[clamp(1.15rem,2.4vw,1.6rem)] leading-tight font-semibold tracking-tight text-navy-900">
                      {event.title}
                    </h3>
                    <p className="label-mono mt-2 text-gold-600">{event.year}</p>
                    <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.6] text-muted">
                      {event.summary}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* --------------------------------------------------- controls */}
              <div className="flex shrink-0 items-center gap-5">
                <ul className="flex items-center gap-1.5">
                  {KEY_EVENTS.map((item, i) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => go(i, i > index ? 1 : -1)}
                        aria-label={`Show ${item.title}`}
                        aria-current={i === index}
                        className={cn(
                          "h-1.5 cursor-pointer rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-out-quint)]",
                          i === index ? "w-8 bg-gold" : "w-1.5 bg-navy-900/20 hover:bg-navy-900/40",
                        )}
                      />
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2">
                  <Arrow label="Previous event" onClick={() => go(index - 1, -1)}>
                    <ChevronLeft strokeWidth={1.75} className="size-4.5" aria-hidden />
                  </Arrow>
                  <Arrow label="Next event" onClick={() => go(index + 1, 1)}>
                    <ChevronRight strokeWidth={1.75} className="size-4.5" aria-hidden />
                  </Arrow>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Arrow({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 cursor-pointer place-items-center rounded-full border border-hairline-strong text-navy-900 transition-[background-color,border-color,color] duration-300 hover:border-navy-800/40 hover:bg-hover hover:text-gold-600"
    >
      {children}
    </button>
  );
}

function Photo({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-white">
      {failed ? (
        <svg
          viewBox="0 0 200 150"
          preserveAspectRatio="none"
          aria-hidden
          className="absolute inset-0 size-full text-navy-900/12"
        >
          <path
            d="M-10 112 C 50 74, 140 64, 210 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M-10 128 C 60 96, 140 86, 210 102"
            fill="none"
            stroke="var(--color-gold)"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          <path
            d="M-10 96 C 50 54, 140 44, 210 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 9"
          />
        </svg>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] md:hover:scale-[1.03]"
        />
      )}
    </div>
  );
}
