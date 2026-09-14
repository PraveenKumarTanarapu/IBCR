"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronsDown, Pause, Play } from "lucide-react";
import { HERO_SLIDES } from "@/lib/content";
import { cn } from "@/lib/utils";

const DURATION = 8200; // ms per slide
const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const startedAt = useRef<number>(0);
  const elapsed = useRef<number>(0);

  const slide = HERO_SLIDES[index];

  const goTo = useCallback((next: number) => {
    elapsed.current = 0;
    startedAt.current = performance.now();
    setProgress(0);
    setIndex(((next % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Slide timer, driven by rAF so the progress bar and the advance stay in sync.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    startedAt.current = performance.now() - elapsed.current;

    const tick = (now: number) => {
      const spent = now - startedAt.current;
      elapsed.current = spent;
      const ratio = Math.min(1, spent / DURATION);
      setProgress(ratio);
      if (ratio >= 1) {
        elapsed.current = 0;
        setProgress(0);
        setIndex((i) => (i + 1) % HERO_SLIDES.length);
        startedAt.current = now;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, index]);

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
      aria-roledescription="carousel"
      aria-label="IBCR highlights"
    >
      {/* ------------------------------------------------------- footage */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: reduced ? 1 : 1.045 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.15, ease: EASE },
              scale: { duration: 9, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <HeroVideo slide={slide} active playing={playing} />
          </motion.div>
        </AnimatePresence>

        {/* Grade: darken for legibility, then a halftone veil for texture. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,24,0.86)_0%,rgba(4,10,24,0.42)_34%,rgba(4,10,24,0.58)_68%,rgba(4,10,24,0.94)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(94deg,rgba(4,10,24,0.86)_0%,rgba(4,10,24,0.34)_46%,rgba(4,10,24,0)_72%)]"
          aria-hidden
        />
        <div className="dot-veil absolute inset-0 opacity-45 mix-blend-overlay" aria-hidden />
      </div>

      {/* ------------------------------------------------------ content */}
      <div className="container-page relative flex flex-1 flex-col justify-end pt-32 pb-10 md:pb-14">
        <div className="max-w-[52rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <motion.span
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
                className="accent-serif inline-flex items-center bg-navy-800/85 px-3.5 py-1.5 text-[0.9375rem] text-gold-200 backdrop-blur-sm"
              >
                {slide.eyebrow}
              </motion.span>

              <h1 className="mt-6 text-[clamp(2.35rem,6.6vw,5.25rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-white">
                {[slide.title, slide.accent].filter(Boolean).map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="block"
                      initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ duration: 0.95, delay: 0.1 + i * 0.085, ease: EASE }}
                    >
                      {i === 1 ? <span className="text-gold-200">{line}</span> : line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
                className="mt-6 max-w-xl text-[1.0625rem] leading-[1.62] text-white/78 md:text-[1.125rem]"
              >
                {slide.copy}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Link
                  href={slide.cta.href}
                  className="group inline-flex h-[3.25rem] cursor-pointer items-center gap-2.5 rounded-full bg-gold px-7 text-[0.9375rem] font-medium tracking-tight text-navy-950 transition-colors duration-300 hover:bg-gold-400"
                >
                  {slide.cta.label}
                  <ArrowRight
                    strokeWidth={1.75}
                    className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href={slide.secondary.href}
                  className="group inline-flex h-[3.25rem] cursor-pointer items-center gap-2.5 rounded-full border border-white/25 px-7 text-[0.9375rem] font-medium tracking-tight text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/8"
                >
                  {slide.secondary.label}
                  <ArrowRight
                    strokeWidth={1.75}
                    className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --------------------------------------------------- controls */}
        <div className="mt-14 flex items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-white/65 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              {playing ? (
                <Pause strokeWidth={1.5} className="size-4" />
              ) : (
                <Play strokeWidth={1.5} className="size-4" />
              )}
            </button>

            <p className="label-mono w-14 text-white/70 tabular-nums">
              {index + 1} / {HERO_SLIDES.length}
            </p>

            <div className="flex items-center gap-3">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
                  aria-current={i === index}
                  className="group h-6 w-16 cursor-pointer md:w-28"
                >
                  <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/25 transition-colors duration-300 group-hover:bg-white/40">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-gold"
                      style={{
                        width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
                      }}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <a
            href="#at-a-glance"
            aria-label="Scroll to content"
            className="group hidden shrink-0 flex-col items-center gap-1 text-white/45 transition-colors duration-300 hover:text-white md:flex"
          >
            <ChevronsDown strokeWidth={1.25} className="size-7 animate-[var(--animate-shimmer)]" />
          </a>
        </div>
      </div>

      {/* Slim vertical scroll cue on the right edge, as in the reference. */}
      <div
        className="pointer-events-none absolute top-1/2 right-5 hidden h-40 w-px -translate-y-1/2 bg-white/15 lg:block"
        aria-hidden
      >
        <span className="absolute inset-x-0 top-0 h-12 bg-gold/80" />
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- video */

function HeroVideo({
  slide,
  active,
  playing,
}: {
  slide: (typeof HERO_SLIDES)[number];
  active: boolean;
  playing: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active && playing) {
      const p = video.play();
      if (p) p.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [active, playing]);

  return (
    <>
      {/* Poster underneath means there is never a blank frame while decoding. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.poster}
        alt=""
        aria-hidden
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-700",
          canPlay ? "opacity-0" : "opacity-100",
        )}
      />
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover"
        poster={slide.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={() => setCanPlay(true)}
        aria-hidden
      >
        <source src={`/video/${slide.video}.mp4`} type="video/mp4" />
      </video>
    </>
  );
}
