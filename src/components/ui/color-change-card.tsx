"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Colour-change cards.
 *
 * A photograph sits desaturated behind each card and resolves to full colour
 * on hover, while the heading rolls over letter by letter and the arrow swings
 * up. On a white page a grid of grey frames stays quiet until a cursor picks
 * one out, which is the whole point of the treatment.
 *
 * Two departures from the snippet this is based on. The image sits on an
 * oversized layer that drifts with scroll, so the grid carries the same
 * parallax as the rest of the site rather than sitting dead still in it; and
 * every card falls back to a drawn corridor plate when its photograph is
 * missing, so an unsupplied asset degrades to something deliberate.
 *
 * Hover on touch devices is a tap away, so the photographs stay in colour
 * below `md` — the desaturation is a pointer affordance, not decoration.
 */

export type ColorChangeCardItem = {
  id: string;
  heading: string;
  description: string;
  /** Small mono label above the heading — an ordinal, usually. */
  index?: string;
  /** Small mono label under the copy — a qualifier, e.g. "Priority sector". */
  meta?: string;
  imgSrc: string;
  alt?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function ColorChangeCards({
  cards,
  className,
}: {
  cards: ColorChangeCardItem[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ card */

function Card({ card }: { card: ColorChangeCardItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The media layer is inset by -7%, so a ±6% drift never exposes an edge.
  // Reduced motion resolves to the resting value rather than dropping the
  // style prop, which would leave the last computed transform painted on.
  const drift = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["-6%", "6%"],
  );

  return (
    <motion.div
      ref={ref}
      whileHover="hover"
      transition={{ staggerChildren: 0.022 }}
      className={cn(
        "group relative h-64 w-full overflow-hidden rounded-[var(--radius-card)] border border-hairline sm:h-72 xl:h-[17rem]",
        failed ? "bg-white" : "bg-navy-950",
      )}
    >
      {/* ------------------------------------------------------- media */}
      <motion.div style={{ y: drift }} className="absolute -inset-[7%] z-0">
        <div className="size-full transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.06]">
          {failed ? (
            <FallbackPlate />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={card.imgSrc}
              alt={card.alt ?? ""}
              loading="lazy"
              onError={() => setFailed(true)}
              className="size-full object-cover transition-[filter] duration-700 ease-[var(--ease-out-quint)] md:saturate-0 md:group-hover:saturate-100"
            />
          )}
        </div>
      </motion.div>

      {/*
        Grade. The copy has to hold against whatever the photograph does, so
        the frame is darkened top and bottom and left alone through the middle.
        A card with no photograph keeps the page's white instead.
      */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 z-10 transition-opacity duration-700",
          failed
            ? "bg-[linear-gradient(to_top,rgba(255,255,255,0.96),rgba(255,255,255,0.72)_58%,rgba(255,255,255,0.86))]"
            : "bg-[linear-gradient(to_top,rgba(11,18,32,0.92),rgba(11,18,32,0.42)_58%,rgba(11,18,32,0.1)),linear-gradient(to_bottom,rgba(11,18,32,0.68),rgba(11,18,32,0)_38%)] group-hover:opacity-85",
        )}
      />

      {/* ------------------------------------------------------ content */}
      <div className="relative z-20 flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-4">
          {card.index ? (
            <span className={cn("label-mono", failed ? "text-gold-600" : "text-gold-400")}>
              {card.index}
            </span>
          ) : null}
          <ArrowRight
            strokeWidth={1.5}
            aria-hidden
            className={cn(
              "size-6 transition-[transform,color] duration-500 ease-[var(--ease-out-quint)] group-hover:-rotate-45",
              failed
                ? "text-navy-900/35 group-hover:text-gold-600"
                : "text-white/60 group-hover:text-gold",
            )}
          />
        </div>

        <div>
          <h3
            className={cn(
              "text-[1.25rem] leading-[1.3] font-semibold tracking-tight",
              failed ? "text-navy-900" : "text-white",
            )}
          >
            <RollingText text={card.heading} reduced={!!reduced} />
          </h3>
          <p
            className={cn(
              "mt-2.5 text-[0.8125rem] leading-[1.6] transition-colors duration-500",
              failed ? "text-muted" : "text-white/70 group-hover:text-white/85",
            )}
          >
            {card.description}
          </p>
          {card.meta ? (
            <p
              className={cn(
                "label-mono mt-4 transition-colors duration-500",
                failed
                  ? "text-navy-900/40 group-hover:text-gold-600"
                  : "text-white/45 group-hover:text-gold-400",
              )}
            >
              {card.meta}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------------- rolling text */

const letterVariants: Variants = { hover: { y: "-50%" } };

/**
 * Each letter is a clipped box holding two stacked copies of itself; the
 * parent's `hover` variant slides the pair up by exactly one copy, staggered
 * across the word. Letters are grouped per word so a heading still wraps at
 * spaces rather than mid-word.
 */
function RollingText({ text, reduced }: { text: string; reduced: boolean }) {
  if (reduced) return <>{text}</>;

  const words = text.split(" ");

  return (
    <>
      {words.map((word, w) => (
        <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((letter, i) => (
            <span
              key={`${letter}-${i}`}
              className="inline-block h-[1.3em] overflow-hidden align-bottom"
            >
              <motion.span
                className="flex flex-col"
                style={{ y: "0%" }}
                variants={letterVariants}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <span className="block leading-[1.3]">{letter}</span>
                <span className="block leading-[1.3]" aria-hidden>
                  {letter}
                </span>
              </motion.span>
            </span>
          ))}
          {w < words.length - 1 ? <span className="inline-block w-[0.3em]" /> : null}
        </span>
      ))}
    </>
  );
}

/* ------------------------------------------------------------- fallback */

/** The corridor motif, drawn — what a card shows until its photograph lands. */
function FallbackPlate() {
  return (
    <div className="size-full bg-white">
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden
        className="size-full text-navy-900/12"
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
          strokeOpacity="0.5"
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
    </div>
  );
}

export default ColorChangeCards;
