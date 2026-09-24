"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { MEMBERS, MEMBER_TIERS, type Member } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MemberDirectory({
  initialLimit,
  showAllLink = false,
}: {
  initialLimit?: number;
  showAllLink?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MEMBERS.filter((m) => {
      if (tier && m.tier !== tier) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.representative.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q)
      );
    });
  }, [query, tier]);

  const active = Boolean(query || tier);
  const limit = initialLimit && !expanded && !active ? initialLimit : filtered.length;
  const visible = filtered.slice(0, limit);

  const reset = () => {
    setQuery("");
    setTier(null);
  };

  return (
    <div>
      {/* ------------------------------------------------------ controls */}
      <div className="rounded-[var(--radius-card)] border border-hairline bg-white p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              strokeWidth={1.5}
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-4 size-[1.05rem] -translate-y-1/2 text-muted"
            />
            <label htmlFor="member-search" className="sr-only">
              Search company
            </label>
            <input
              id="member-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company, representative or role…"
              className="h-12 w-full rounded-full border border-hairline-strong bg-white pr-4 pl-11 text-[0.9375rem] text-navy-900 outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted/70 focus:border-navy-700 focus:shadow-[0_0_0_3px_rgba(17,54,112,0.1)]"
            />
          </div>

          <p className="label-mono shrink-0 text-muted lg:w-32 lg:text-right">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>
        </div>

        <div className="mt-5 border-t border-hairline pt-5">
          <FilterRow label="Category" value={tier} onChange={setTier} options={MEMBER_TIERS} />
        </div>

        {active ? (
          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-[0.8125rem] font-medium text-navy-700 transition-colors hover:text-gold-600"
          >
            <X strokeWidth={1.75} className="size-3.5" />
            Clear filters
          </button>
        ) : null}
      </div>

      {/* -------------------------------------------------------- results */}
      {filtered.length === 0 ? (
        <p className="mt-10 rounded-[var(--radius-card)] border border-dashed border-hairline-strong px-6 py-14 text-center text-[0.9375rem] text-muted">
          No members match those filters yet. Try a broader search — or{" "}
          <Link href="/membership/join" className="font-medium text-navy-800 underline">
            add your company to the directory
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((member) => (
              <motion.li
                key={member.id}
                layout={!reduced}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <MemberCard member={member} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {initialLimit && !active && filtered.length > initialLimit ? (
        <div className="mt-10 flex justify-center gap-3">
          {showAllLink ? (
            <Link
              href="/members"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline-strong px-6 text-[0.9375rem] font-medium text-navy-900 transition-colors duration-300 hover:border-hairline-strong hover:bg-hover"
            >
              View the full directory
              <ArrowUpRight strokeWidth={1.75} className="size-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-hairline-strong px-6 text-[0.9375rem] font-medium text-navy-900 transition-colors duration-300 hover:border-hairline-strong hover:bg-hover"
            >
              Show all {filtered.length} members
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function FilterRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
  options: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="label-mono w-24 shrink-0 text-navy-900/40">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(selected ? null : option)}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-[0.8125rem] transition-[background-color,border-color,color] duration-300",
                selected
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-hairline text-muted hover:border-navy-800/35 hover:text-navy-900",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MemberCard({ member }: { member: Member }) {
  const initials = member.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <article className="group flex h-full flex-col rounded-[var(--radius-card)] border border-hairline bg-white p-6 transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:border-hairline-strong hover:bg-hover">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-hairline font-mono text-[0.8125rem] font-medium tracking-tight text-navy-800"
        >
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[1.0625rem] leading-snug font-semibold tracking-tight text-navy-900">
            {member.name}
          </h3>
        </div>
        <span className="label-mono shrink-0 rounded-full border border-hairline px-2.5 py-1 text-[0.5625rem] text-gold-600">
          {member.tier}
        </span>
      </div>

      <div className="mt-5 flex-1 border-t border-hairline pt-4">
        <p className="text-[0.9375rem] leading-snug font-medium text-navy-900">
          {member.representative}
        </p>
        <p className="mt-1 text-[0.8125rem] text-muted">{member.designation}</p>
      </div>
    </article>
  );
}
