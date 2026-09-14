"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { CheckboxField, Field, FormStatus, SelectField, TextareaField } from "@/components/forms/Fields";
import { MEMBERSHIP_TIERS, MEMBER_SECTORS } from "@/lib/content";
import { useFormPost } from "@/lib/forms";

const TIER_NAMES = MEMBERSHIP_TIERS.map((t) => t.name);
const TEAM_SIZES = ["1–10", "11–50", "51–250", "251–1,000", "1,000+"] as const;

export function MembershipForm({ defaultTier }: { defaultTier?: string }) {
  const { state, message, submit } = useFormPost("/api/membership");

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset className="space-y-5">
        <legend className="label-mono mb-4 text-gold-600">01 — Organisation</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Company name" name="company" required autoComplete="organization" placeholder="Registered legal name" />
          <Field label="Website" name="website" type="url" autoComplete="url" placeholder="https://" />
          <SelectField label="Sector" name="sector" options={MEMBER_SECTORS} defaultValue={MEMBER_SECTORS[0]} />
          <SelectField label="Team size" name="employees" options={TEAM_SIZES} defaultValue={TEAM_SIZES[1]} />
          <Field label="Country" name="country" required autoComplete="country-name" placeholder="Rwanda" />
          <Field label="City" name="city" autoComplete="address-level2" placeholder="Kigali" />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="label-mono mb-4 text-gold-600">02 — Primary contact</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Contact name" name="contactName" required autoComplete="name" placeholder="Full name" />
          <Field label="Position" name="position" autoComplete="organization-title" placeholder="Managing Director" />
          <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
          <Field label="Phone" name="phone" type="tel" required autoComplete="tel" placeholder="+250 …" />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="label-mono mb-4 text-gold-600">03 — Membership</legend>
        <SelectField
          label="Membership category"
          name="tier"
          required
          options={TIER_NAMES}
          defaultValue={defaultTier && TIER_NAMES.includes(defaultTier) ? defaultTier : TIER_NAMES[0]}
          hint="Not sure which fits? Choose the closest — the secretariat will confirm."
        />
        <TextareaField
          label="What would you like to get out of membership?"
          name="objectives"
          placeholder="Market entry, distribution partners, investor introductions, policy support…"
        />
      </fieldset>

      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="membership-company-website">Company website</label>
        <input id="membership-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <CheckboxField
        name="consent"
        value="yes"
        required
        label="I confirm the information above is accurate and agree to IBCR processing it to assess this application."
      />

      <FormStatus state={state} message={message} />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="group inline-flex h-[3.25rem] cursor-pointer items-center gap-2.5 rounded-full bg-gold px-7 text-[0.9375rem] font-medium text-navy-950 transition-colors duration-300 hover:bg-gold-400 disabled:opacity-60"
      >
        {state === "submitting" ? <Loader2 className="size-4 animate-spin" strokeWidth={1.75} /> : null}
        {state === "submitting" ? "Submitting…" : "Submit Application"}
        <ArrowRight
          strokeWidth={1.75}
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
