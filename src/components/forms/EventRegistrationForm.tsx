"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { Field, FormStatus, SelectField, TextareaField } from "@/components/forms/Fields";
import { EVENTS } from "@/lib/content";
import { useFormPost } from "@/lib/forms";

const UPCOMING = EVENTS.filter((e) => e.status === "upcoming").map((e) => e.title);
const PARTY_SIZES = ["1", "2", "3", "4", "5+"] as const;

export function EventRegistrationForm({ defaultEvent }: { defaultEvent?: string }) {
  const { state, message, submit } = useFormPost("/api/events/register");

  return (
    <form onSubmit={submit} className="space-y-5">
      <SelectField
        label="Event"
        name="event"
        required
        options={UPCOMING}
        defaultValue={defaultEvent && UPCOMING.includes(defaultEvent) ? defaultEvent : UPCOMING[0]}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" placeholder="Your full name" />
        <Field label="Company" name="company" required autoComplete="organization" placeholder="Company or organisation" />
        <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="+250 …" />
        <Field label="Position" name="position" autoComplete="organization-title" placeholder="Managing Director" />
        <SelectField label="Attendees" name="attendees" options={PARTY_SIZES} defaultValue="1" />
      </div>

      <TextareaField
        label="Anything we should know?"
        name="notes"
        rows={3}
        placeholder="Dietary requirements, sectors you would like to meet, accessibility needs…"
      />

      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="event-company-website">Company website</label>
        <input id="event-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <FormStatus state={state} message={message} />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="group inline-flex h-[3.25rem] cursor-pointer items-center gap-2.5 rounded-full bg-gold px-7 text-[0.9375rem] font-medium text-navy-950 transition-colors duration-300 hover:bg-gold-400 disabled:opacity-60"
      >
        {state === "submitting" ? <Loader2 className="size-4 animate-spin" strokeWidth={1.75} /> : null}
        {state === "submitting" ? "Registering…" : "Register Now"}
        <ArrowRight
          strokeWidth={1.75}
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
