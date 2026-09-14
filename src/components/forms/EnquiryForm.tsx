"use client";

import { Loader2, Send } from "lucide-react";
import { CheckboxField, Field, FormStatus, SelectField, TextareaField } from "@/components/forms/Fields";
import { AREAS_OF_INTEREST } from "@/lib/content";
import { useFormPost } from "@/lib/forms";
import { cn } from "@/lib/utils";

export function EnquiryForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { state, message, submit } = useFormPost("/api/enquiry");

  return (
    <form onSubmit={submit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field tone={tone} label="Name" name="name" required autoComplete="name" placeholder="Your full name" />
        <Field tone={tone} label="Company" name="company" autoComplete="organization" placeholder="Company or organisation" />
        <Field tone={tone} label="Email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        <Field tone={tone} label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="+250 …" />
      </div>

      <SelectField
        tone={tone}
        label="Area of interest"
        name="interest"
        options={AREAS_OF_INTEREST}
        defaultValue={AREAS_OF_INTEREST[0]}
      />

      <TextareaField
        tone={tone}
        label="Message"
        name="message"
        required
        placeholder="Tell us what you are trying to do, and where you are in the process."
      />

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="enquiry-company-website">Company website</label>
        <input id="enquiry-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <CheckboxField
        tone={tone}
        name="consent"
        value="yes"
        required
        label="I agree that IBCR may store these details in order to respond to my enquiry."
      />

      <FormStatus state={state} message={message} tone={tone} />

      <button
        type="submit"
        disabled={state === "submitting"}
        className={cn(
          "group inline-flex h-[3.25rem] cursor-pointer items-center gap-2.5 rounded-full px-7 text-[0.9375rem] font-medium transition-colors duration-300 disabled:opacity-60",
          tone === "dark"
            ? "bg-gold text-navy-950 hover:bg-gold-400"
            : "bg-navy-900 text-ivory hover:bg-navy-700",
        )}
      >
        {state === "submitting" ? (
          <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
        ) : (
          <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.6} />
        )}
        {state === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
