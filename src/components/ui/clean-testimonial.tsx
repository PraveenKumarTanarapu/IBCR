"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * One testimonial at a time, advanced by clicking anywhere in the panel.
 *
 * The cursor is replaced inside the panel by a magnetic "Next" disc, which is
 * the point of the component — but only where a real pointer exists. Coarse
 * pointers keep their own affordances, and the whole thing is also a focusable
 * button, so it works from the keyboard without a mouse at all.
 *
 * Members have no portraits, so the avatar stack is initials on a plate, the
 * same fallback the board section uses.
 */

export type TestimonialItem = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function initialsOf(name: string) {
  return name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function SplitText({ text, reduced }: { text: string; reduced: boolean }) {
  if (reduced) return <>{text}</>;
  return (
    <>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.42, delay: i * 0.028, ease: EASE }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export function Testimonial({
  items,
  className,
}: {
  items: TestimonialItem[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { damping: 26, stiffness: 170 });
  const cursorY = useSpring(mouseY, { damping: 26, stiffness: 170 });

  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const node = container.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);

  const current = items[index];
  if (!current) return null;

  return (
    <div
      ref={container}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={next}
      className={cn(
        "relative w-full rounded-[var(--radius-card)] border border-hairline bg-white p-8 md:p-12",
        "[@media(pointer:fine)]:cursor-none",
        className,
      )}
    >
      {/* Magnetic cursor — pointer devices only. */}
      <motion.div
        aria-hidden
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none absolute z-30 hidden [@media(pointer:fine)]:block"
      >
        <motion.div
          className="flex items-center justify-center rounded-full bg-navy-900"
          animate={{
            width: hovered ? 76 : 0,
            height: hovered ? 76 : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={reduced ? { duration: 0 } : { type: "spring", damping: 22, stiffness: 210 }}
        >
          <motion.span
            className="label-mono text-[0.5625rem] text-white"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ delay: 0.08 }}
          >
            Next
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Counter */}
      <div className="absolute top-8 right-8 flex items-baseline gap-1">
        <motion.span
          key={index}
          initial={reduced ? false : { y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-[1.5rem] leading-none font-light text-navy-900"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        <span className="font-mono text-[0.75rem] text-muted">
          / {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {/* Avatar rail */}
      <div className="flex -space-x-2">
        {items.map((item, i) => (
          <span
            key={item.id}
            className={cn(
              "grid size-7 place-items-center rounded-full border-2 border-white font-mono text-[0.5rem] transition-all duration-300",
              i === index
                ? "bg-navy-900 text-white"
                : "bg-hover text-navy-900/45 ring-1 ring-hairline",
            )}
          >
            {initialsOf(item.author)}
          </span>
        ))}
      </div>

      {/* Quote */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            className="max-w-2xl text-[clamp(1.125rem,2.2vw,1.625rem)] leading-[1.45] font-light tracking-tight text-navy-900"
          >
            <SplitText text={current.quote} reduced={!!reduced} />
          </motion.blockquote>
        </AnimatePresence>

        {/* Attribution */}
        <div className="mt-10 flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-hairline font-mono text-[0.8125rem] text-navy-800">
            {initialsOf(current.author)}
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: 8 }}
              transition={{ duration: 0.28 }}
              className="relative pl-4"
            >
              <motion.span
                aria-hidden
                className="absolute top-0 bottom-0 left-0 w-px bg-gold"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
                style={{ originY: 0 }}
              />
              <span className="block text-[0.9375rem] font-medium tracking-tight text-navy-900">
                {current.author}
              </span>
              <span className="label-mono mt-1 block text-[0.5625rem] text-muted">
                {current.role} — {current.company}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress */}
        <div className="relative mt-10 h-px overflow-hidden bg-hairline">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gold"
            initial={false}
            animate={{ width: `${((index + 1) / items.length) * 100}%` }}
            transition={{ duration: 0.45, ease: EASE }}
          />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="label-mono text-[0.5625rem] text-navy-900/35">
            Click anywhere to advance
          </span>
          {/* The same action, reachable without a pointer. */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            className="label-mono cursor-pointer rounded-full border border-hairline px-4 py-2 text-[0.5625rem] text-navy-900 transition-colors duration-300 hover:bg-hover [@media(pointer:fine)]:cursor-none"
          >
            Next testimonial
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
