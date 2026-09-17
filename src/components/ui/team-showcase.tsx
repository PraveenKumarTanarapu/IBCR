"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * People showcase: a staggered wall of portraits beside a list of names.
 *
 * Pointing at (or tabbing to, or tapping) a name brings that person's portrait
 * up to full colour and swaps their full details into the panel below the
 * list. The panel has a reserved height and cross-fades, so moving down the
 * list never shifts the page under the cursor.
 *
 * Portraits are optional. A missing one falls back to the person's initials on
 * a drawn plate, so the wall is complete before the photography arrives.
 */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  company?: string;
  bio?: string;
  highlights?: string[];
  image?: string;
  linkedin?: string;
};

export function TeamShowcase({
  members,
  className,
}: {
  members: TeamMember[];
  className?: string;
}) {
  // The first person is shown until someone points at another, so the panel is
  // never empty and the section opens on the Chairman.
  const [pointed, setPointed] = useState<string | null>(null);
  const activeId = pointed ?? members[0]?.id;
  const active = members.find((member) => member.id === activeId) ?? members[0];

  const columns = [0, 1, 2].map((c) => members.filter((_, i) => i % 3 === c));
  const sizes = [
    "h-[7.5rem] w-[7rem] sm:h-[9rem] sm:w-[8.25rem] lg:h-[10.25rem] lg:w-[9.5rem]",
    "h-[8.25rem] w-[7.75rem] sm:h-[10rem] sm:w-[9.25rem] lg:h-[11.5rem] lg:w-[10.5rem]",
    "h-[7.75rem] w-[7.25rem] sm:h-[9.5rem] sm:w-[8.75rem] lg:h-[10.75rem] lg:w-[10rem]",
  ];
  const offsets = ["", "mt-10 lg:mt-14", "mt-4 lg:mt-7"];

  if (!active) return null;

  return (
    <div className={cn("grid gap-12 lg:grid-cols-12 lg:gap-14", className)}>
      {/* ------------------------------------------------------ portraits */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 lg:col-span-5 lg:overflow-visible lg:pb-0">
        {columns.map((column, c) => (
          <div key={c} className={cn("flex flex-col gap-2.5", offsets[c])}>
            {column.map((member) => (
              <Portrait
                key={member.id}
                member={member}
                className={sizes[c]}
                active={member.id === activeId}
                onPoint={setPointed}
              />
            ))}
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------- name list */}
      <div className="lg:col-span-7">
        <ul className="border-t border-hairline">
          {members.map((member) => (
            <li key={member.id}>
              <button
                type="button"
                onMouseEnter={() => setPointed(member.id)}
                onFocus={() => setPointed(member.id)}
                onClick={() => setPointed(member.id)}
                aria-current={member.id === activeId}
                className="group flex w-full cursor-pointer items-baseline gap-3 border-b border-hairline py-3 text-left transition-colors duration-300 hover:bg-hover"
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-1 h-[3px] shrink-0 rounded-full transition-all duration-400 ease-[var(--ease-out-quint)]",
                    member.id === activeId ? "w-7 bg-gold" : "w-3.5 bg-navy-900/20",
                  )}
                />
                <span
                  className={cn(
                    "text-[1.0625rem] leading-snug font-semibold tracking-tight transition-colors duration-300",
                    member.id === activeId ? "text-navy-900" : "text-navy-900/60",
                  )}
                >
                  {member.name}
                </span>
                <span className="label-mono ml-auto hidden shrink-0 pl-4 text-right text-[0.625rem] text-muted sm:block">
                  {member.role}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* ---------------------------------------------------- details */}
        <div className="relative mt-8 min-h-[15rem]">
          <AnimatePresence mode="wait" initial={false}>
            <Details key={active.id} member={active} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- details */

function Details({ member }: { member: TeamMember }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="label-mono text-gold-600">{member.role}</p>
      <h3 className="mt-3 text-[1.5rem] leading-tight font-semibold tracking-tight text-navy-900">
        {member.name}
      </h3>
      {member.company ? (
        <p className="mt-1.5 text-[0.9375rem] text-muted">{member.company}</p>
      ) : null}
      {member.bio ? (
        <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.7] text-body/85">{member.bio}</p>
      ) : null}

      {member.highlights?.length ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {member.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full border border-hairline px-3.5 py-1.5 text-[0.75rem] text-muted"
            >
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}

      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] text-navy-900 transition-colors duration-300 hover:text-gold-600"
        >
          <ExternalLink strokeWidth={1.75} aria-hidden className="size-4" />
          LinkedIn profile
        </a>
      ) : null}
    </motion.div>
  );
}

/* --------------------------------------------------------------- portrait */

function Portrait({
  member,
  className,
  active,
  onPoint,
}: {
  member: TeamMember;
  className: string;
  active: boolean;
  onPoint: (id: string) => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => onPoint(member.id)}
      onFocus={() => onPoint(member.id)}
      onClick={() => onPoint(member.id)}
      aria-label={`${member.name}, ${member.role}`}
      aria-current={active}
      className={cn(
        "shrink-0 cursor-pointer overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-white",
        "transition-opacity duration-400",
        className,
        active ? "opacity-100" : "opacity-70",
      )}
    >
      {member.image && !failed ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className={cn(
            "size-full object-cover transition-[filter,transform] duration-500 ease-[var(--ease-out-quint)]",
            active ? "scale-[1.02] grayscale-0 brightness-100" : "grayscale brightness-[0.92]",
          )}
        />
      ) : (
        <InitialsPlate name={member.name} active={active} />
      )}
    </button>
  );
}

/** Initials on the corridor motif — what a portrait slot shows until it is filled. */
function InitialsPlate({ name, active }: { name: string; active: boolean }) {
  const initials = name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="relative size-full bg-white">
      <svg
        viewBox="0 0 160 180"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute inset-0 size-full text-navy-900/10"
      >
        <path
          d="M-10 150 C 40 70, 120 56, 170 96"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M-10 172 C 50 116, 120 100, 170 130"
          fill="none"
          stroke="var(--color-gold)"
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
      </svg>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center text-[1.5rem] font-semibold tracking-tight transition-colors duration-400",
          active ? "text-navy-900/45" : "text-navy-900/25",
        )}
      >
        {initials}
      </span>
    </div>
  );
}

export default TeamShowcase;
