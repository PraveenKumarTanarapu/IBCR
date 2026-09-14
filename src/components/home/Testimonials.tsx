"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const go = useCallback((delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, reduced, go]);

  const item = TESTIMONIALS[index];

  return (
    <Section tone="ivory">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Testimonials</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-semibold text-navy-900">
                Trusted by
                <br />
                <span className="accent-serif text-gold-600">business leaders.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-9 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-hairline-strong text-navy-800 transition-colors duration-300 hover:border-navy-800 hover:bg-navy-900 hover:text-ivory"
                >
                  <ArrowLeft strokeWidth={1.6} className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-hairline-strong text-navy-800 transition-colors duration-300 hover:border-navy-800 hover:bg-navy-900 hover:text-ivory"
                >
                  <ArrowRight strokeWidth={1.6} className="size-4" />
                </button>
                <span className="label-mono ml-2 text-muted tabular-nums">
                  {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal
            className="lg:col-span-8"
            y={22}
          >
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
              className="relative overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-paper p-8 md:p-12"
            >
              <Quote
                strokeWidth={1}
                className="absolute -top-2 right-6 size-24 text-navy-900/4"
                aria-hidden
              />

              <div className="relative min-h-[15rem] sm:min-h-[13rem]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.blockquote
                    key={index}
                    initial={{ opacity: 0, x: reduced ? 0 : direction * 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduced ? 0 : direction * -28 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex h-full flex-col justify-between"
                  >
                    <p className="text-[clamp(1.125rem,2.1vw,1.5rem)] leading-[1.5] font-medium tracking-tight text-navy-900">
                      “{item.quote}”
                    </p>
                    <footer className="mt-8 flex items-center gap-4 border-t border-hairline pt-6">
                      <span
                        aria-hidden
                        className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-950 font-mono text-[0.75rem] text-gold-200"
                      >
                        {item.name
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <div>
                        <p className="text-[0.9375rem] font-semibold text-navy-900">{item.name}</p>
                        <p className="text-[0.8125rem] text-muted">
                          {item.role} · {item.company}
                        </p>
                      </div>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex gap-2">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.quote}
                    type="button"
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    className="h-6 flex-1 cursor-pointer"
                  >
                    <span
                      className={cn(
                        "block h-[2px] w-full rounded-full transition-colors duration-500",
                        i === index ? "bg-gold" : "bg-hairline-strong",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
