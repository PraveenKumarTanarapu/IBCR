import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, MapPin } from "lucide-react";
import type { IbcrEvent } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function EventCard({ event }: { event: IbcrEvent }) {
  const day = new Date(event.date + "T00:00:00Z");

  return (
    <article className="group flex h-full flex-col rounded-[var(--radius-card)] border border-hairline bg-white p-6 transition-[border-color,transform,background-color] duration-500 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:border-hairline-strong hover:bg-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl border border-hairline">
          <span className="text-[1.125rem] leading-none font-semibold text-navy-900">
            {day.getUTCDate()}
          </span>
          <span className="label-mono mt-1 text-[0.5625rem] text-gold-600">
            {day.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}
          </span>
        </div>
        <span className="label-mono rounded-full border border-hairline px-3 py-1 text-[0.5625rem] text-muted">
          {event.type}
        </span>
      </div>

      <h3 className="mt-6 text-[1.125rem] leading-snug font-semibold tracking-tight text-navy-900">
        {event.title}
      </h3>
      <p className="mt-3 flex-1 text-[0.875rem] leading-[1.6] text-muted">{event.summary}</p>

      <ul className="mt-5 space-y-1.5 border-t border-hairline pt-4 text-[0.75rem] text-muted">
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
          href="/events#register"
          className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-navy-700 transition-colors duration-300 hover:text-gold-600"
        >
          Register
          <ArrowUpRight
            strokeWidth={1.75}
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      ) : (
        <p className="label-mono mt-5 text-[0.5625rem] text-navy-900/35">
          {event.attendance ?? "Completed"}
        </p>
      )}
    </article>
  );
}
