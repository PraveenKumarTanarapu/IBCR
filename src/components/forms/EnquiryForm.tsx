"use client";

import { Loader2, Send } from "lucide-react";
import { CheckboxField, Field, FormStatus, SelectField, TextareaField } from "@/components/forms/Fields";
import { AREAS_OF_INTEREST } from "@/lib/content";
import { useFormPost } from "@/lib/forms";

export function EnquiryForm() {
  const { state, message, submit } = useFormPost("/api/enquiry");

  return (
    <form onSubmit={submit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" placeholder="Your full name" />
        <Field label="Company" name="company" autoComplete="organization" placeholder="Company or organisation" />
        <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="+250 …" />
      </div>

      <SelectField
       
        label="Area of interest"
        name="interest"
        options={AREAS_OF_INTEREST}
        defaultValue={AREAS_OF_INTEREST[0]}
      />

      <TextareaField
       
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
       
        name="consent"
        value="yes"
        required
        label="I agree that IBCR may store these details in order to respond to my enquiry."
      />

      <FormStatus state={state} message={message} />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="group inline-flex h-[3.25rem] cursor-pointer items-center gap-2.5 rounded-full bg-navy-900 px-7 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-navy-700 disabled:opacity-60"
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
