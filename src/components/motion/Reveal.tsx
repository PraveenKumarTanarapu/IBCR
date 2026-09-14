"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/** Single element fading up as it enters the viewport. */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 18,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.72, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const itemVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.4 } },
};

/** Parent for a list or grid whose children should cascade in. */
export function RevealGroup({
  children,
  className,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  once?: boolean;
}) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: "-10% 0px -6% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Child of RevealGroup.
 *
 * `noShift` fades without the vertical travel — use it for cells in a
 * hairline-gap grid, where a translated cell would briefly expose the divider
 * colour behind it.
 */
export function RevealItem({
  children,
  className,
  as = "div",
  noShift = false,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  noShift?: boolean;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={reduced || noShift ? itemVariantsReduced : itemVariants}
    >
      {children}
    </MotionTag>
  );
}

/** Headline that reveals line by line behind a mask. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={lineClassName ?? "block"}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: "108%" }}
            whileInView={{ opacity: 1, y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
