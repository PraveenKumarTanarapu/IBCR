"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HERO } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      {/* ------------------------------------------------------- footage */}
      <div className="absolute inset-0 -z-10">
        <HeroVideo />

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
      <div className="container-page relative flex flex-1 flex-col justify-end pt-32 pb-16 md:pb-24">
        <div className="max-w-[52rem]">
          <motion.span
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="accent-serif inline-flex items-center bg-navy-800/85 px-3.5 py-1.5 text-[0.9375rem] text-gold-200 backdrop-blur-sm"
          >
            {HERO.eyebrow}
          </motion.span>

          <h1 className="mt-6 text-[clamp(2.35rem,6.6vw,5.25rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-white">
            {[HERO.title, HERO.accent].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
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
            {HERO.copy}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href={HERO.cta.href}
              className="group inline-flex h-[3.25rem] cursor-pointer items-center gap-2.5 rounded-full bg-gold px-7 text-[0.9375rem] font-medium tracking-tight text-navy-950 transition-colors duration-300 hover:bg-gold-400"
            >
              {HERO.cta.label}
              <ArrowRight
                strokeWidth={1.75}
                className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={HERO.secondary.href}
              className="group inline-flex h-[3.25rem] cursor-pointer items-center gap-2.5 rounded-full border border-white/25 px-7 text-[0.9375rem] font-medium tracking-tight text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/8"
            >
              {HERO.secondary.label}
              <ArrowRight
                strokeWidth={1.75}
                className="size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- video */

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const p = video.play();
    if (p) p.catch(() => undefined);
  }, []);

  return (
    <>
      {/* Poster underneath means there is never a blank frame while decoding. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO.poster}
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
        poster={HERO.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={() => setCanPlay(true)}
        aria-hidden
      >
        <source src={HERO.video} type="video/mp4" />
      </video>
    </>
  );
}
