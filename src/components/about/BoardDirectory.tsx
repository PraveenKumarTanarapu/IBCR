"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import type { BoardMember } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The board as a directory: a portrait, who they are, what they bring and the
 * address they take enquiries on — three to a row, all of it on the page at
 * once rather than one member at a time behind a hover.
 *
 * The experience lines are what distinguishes this from a contact list: a
 * reader should be able to tell which member to write to without writing to
 * any of them first.
 *
 * Portraits are optional. A slot with no photograph shows the member's
 * initials on the corridor motif, so the grid is even from the first day.
 */
export function BoardDirectory({ members }: { members: BoardMember[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {members.map((member) => (
        <li key={member.id}>
          <BoardCard member={member} />
        </li>
      ))}
    </ul>
  );
}

function BoardCard({ member }: { member: BoardMember }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-white transition-[border-color,transform] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:border-hairline-strong">
      {/* ------------------------------------------------------- portrait */}
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        {member.image && !failed ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="size-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-quint)] md:group-hover:scale-[1.03]"
          />
        ) : (
          <InitialsPlate name={member.name} />
        )}
      </div>

      {/* ----------------------------------------------------------- name */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.0625rem] leading-snug font-semibold tracking-tight text-navy-900">
          {member.name}
        </h3>
        <p className="mt-1.5 text-[0.875rem] leading-snug font-medium text-gold-600">
          {member.role}
        </p>
        <p className="mt-2 text-[0.8125rem] leading-[1.5] text-muted">{member.company}</p>

        {/* ----------------------------------------------------- experience */}
        <ul className="mt-5 flex-1 space-y-2 border-t border-hairline pt-4">
          {member.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-2.5 text-[0.8125rem] leading-[1.5] text-body/85"
            >
              <span aria-hidden className="mt-[0.5em] h-px w-2.5 shrink-0 bg-gold" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* ---------------------------------------------------------- email */}
        <a
          href={`mailto:${member.email}`}
          className={cn(
            "mt-5 flex items-center gap-2.5 border-t border-hairline pt-4",
            "text-[0.8125rem] break-all text-navy-800 transition-colors duration-300 hover:text-gold-600",
          )}
        >
          <Mail strokeWidth={1.5} aria-hidden className="size-3.5 shrink-0 text-gold" />
          {member.email}
        </a>
      </div>
    </article>
  );
}

/** Initials on the corridor motif — what a portrait slot shows until it is filled. */
function InitialsPlate({ name }: { name: string }) {
  const initials = name
    .replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="relative size-full bg-white">
      <svg
        viewBox="0 0 160 200"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute inset-0 size-full text-navy-900/10"
      >
        <path
          d="M-10 166 C 40 78, 120 62, 170 106"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M-10 190 C 50 128, 120 110, 170 144"
          fill="none"
          stroke="var(--color-gold)"
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[1.75rem] font-semibold tracking-tight text-navy-900/25">
        {initials}
      </span>
    </div>
  );
}

export default BoardDirectory;
