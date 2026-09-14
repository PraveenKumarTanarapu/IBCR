import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, MapPin } from "lucide-react";
import type { IbcrEvent } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

export function EventCard({ event, tone = "light" }: { event: IbcrEvent; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const day = new Date(event.date + "T00:00:00Z");

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[var(--radius-card)] border p-6 transition-[border-color,transform,background-color] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1",
        dark
          ? "border-white/12 bg-white/[0.035] hover:border-gold/40 hover:bg-white/[0.06]"
          : "border-hairline bg-paper hover:border-navy-800/25",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            "flex size-14 shrink-0 flex-col items-center justify-center rounded-xl",
            dark ? "bg-navy-800" : "bg-navy-950",
          )}
        >
          <span className="text-[1.125rem] leading-none font-semibold text-ivory">
            {day.getUTCDate()}
          </span>
          <span className="label-mono mt-1 text-[0.5625rem] text-gold-400">
            {day.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}
          </span>
        </div>
        <span
          className={cn(
            "label-mono rounded-full border px-3 py-1 text-[0.5625rem]",
            dark ? "border-white/15 text-ivory/60" : "border-hairline text-muted",
          )}
        >
          {event.type}
        </span>
      </div>

      <h3
        className={cn(
          "mt-6 text-[1.125rem] leading-snug font-semibold tracking-tight",
          dark ? "text-ivory" : "text-navy-900",
        )}
      >
        {event.title}
      </h3>
      <p className={cn("mt-3 flex-1 text-[0.875rem] leading-[1.6]", dark ? "text-ivory/60" : "text-muted")}>
        {event.summary}
      </p>

      <ul
        className={cn(
          "mt-5 space-y-1.5 border-t pt-4 text-[0.75rem]",
          dark ? "border-white/10 text-ivory/55" : "border-hairline text-muted",
        )}
      >
        <li className="flex items-center gap-2">
          <CalendarDays strokeWidth={1.5} className="size-3.5 text-gold-600" aria-hidden />
          {formatDate(event.date)}
          {event.endDate ? ` – ${formatDate(event.endDate)}` : ""}
        </li>
        <li className="flex items-center gap-2">
          <Clock strokeWidth={1.5} className="size-3.5 text-gold-600" aria-hidden />
          {event.time}
        </li>
        <li className="flex items-center gap-2">
          <MapPin strokeWidth={1.5} className="size-3.5 text-gold-600" aria-hidden />
          {event.venue}, {event.city}
        </li>
      </ul>

      {event.status === "upcoming" ? (
        <Link
          href={`/events#register`}
          className={cn(
            "mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium transition-colors duration-300",
            dark ? "text-gold-400 hover:text-gold-200" : "text-navy-700 hover:text-gold-600",
          )}
        >
          Register
          <ArrowUpRight
            strokeWidth={1.75}
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      ) : (
        <p
          className={cn(
            "label-mono mt-5 text-[0.5625rem]",
            dark ? "text-ivory/35" : "text-navy-900/35",
          )}
        >
          {event.attendance ?? "Completed"}
        </p>
      )}
    </article>
  );
}
