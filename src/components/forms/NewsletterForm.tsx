"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useFormPost } from "@/lib/forms";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const { state, message, submit } = useFormPost("/api/newsletter");

  return (
    <div className={className}>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="h-12 w-full rounded-full border border-white/18 bg-white/5 px-5 text-[0.9375rem] text-ivory outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ivory/35 focus:border-gold/70 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.16)]"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="group inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-7 text-[0.9375rem] font-medium text-navy-950 transition-colors duration-300 hover:bg-gold-400 disabled:opacity-60"
        >
          {state === "submitting" ? (
            <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
          ) : null}
          Subscribe
          <ArrowRight
            strokeWidth={1.75}
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </form>
      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "mt-3 text-[0.8125rem]",
            state === "success" ? "text-gold-400" : "text-red-300",
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
