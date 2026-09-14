"use client";

import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

const shell =
  "w-full rounded-xl border bg-transparent px-4 py-3.5 text-[0.9375rem] transition-[border-color,box-shadow,background-color] duration-300 outline-none placeholder:text-muted/60";

const tones: Record<Tone, string> = {
  light:
    "border-hairline-strong bg-white text-navy-900 focus:border-navy-700 focus:shadow-[0_0_0_3px_rgba(17,54,112,0.1)]",
  dark: "border-white/18 bg-white/5 text-ivory placeholder:text-ivory/40 focus:border-gold/70 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.16)]",
};

function Label({
  htmlFor,
  children,
  required,
  tone,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  tone: Tone;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "mb-2 block text-[0.8125rem] font-medium tracking-tight",
        tone === "dark" ? "text-ivory/70" : "text-navy-900/75",
      )}
    >
      {children}
      {required ? (
        <span className="ml-1 text-gold" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
}

function Hint({ children, tone }: { children: ReactNode; tone: Tone }) {
  return (
    <p className={cn("mt-1.5 text-[0.75rem]", tone === "dark" ? "text-ivory/45" : "text-muted")}>
      {children}
    </p>
  );
}

type FieldExtras = { label: string; hint?: string; tone?: Tone; wrapperClassName?: string };

export function Field({
  label,
  hint,
  tone = "light",
  wrapperClassName,
  className,
  ...props
}: FieldExtras & ComponentPropsWithoutRef<"input">) {
  const id = useId();
  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id} required={props.required} tone={tone}>
        {label}
      </Label>
      <input id={id} className={cn(shell, tones[tone], className)} {...props} />
      {hint ? <Hint tone={tone}>{hint}</Hint> : null}
    </div>
  );
}

export function TextareaField({
  label,
  hint,
  tone = "light",
  wrapperClassName,
  className,
  ...props
}: FieldExtras & ComponentPropsWithoutRef<"textarea">) {
  const id = useId();
  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id} required={props.required} tone={tone}>
        {label}
      </Label>
      <textarea id={id} rows={5} className={cn(shell, tones[tone], "resize-y", className)} {...props} />
      {hint ? <Hint tone={tone}>{hint}</Hint> : null}
    </div>
  );
}

export function SelectField({
  label,
  hint,
  tone = "light",
  wrapperClassName,
  className,
  options,
  ...props
}: FieldExtras & { options: readonly string[] } & ComponentPropsWithoutRef<"select">) {
  const id = useId();
  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id} required={props.required} tone={tone}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          className={cn(shell, tones[tone], "cursor-pointer appearance-none pr-11", className)}
          {...props}
        >
          {options.map((option) => (
            <option key={option} value={option} className="text-navy-900">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          strokeWidth={1.5}
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2",
            tone === "dark" ? "text-ivory/50" : "text-muted",
          )}
        />
      </div>
      {hint ? <Hint tone={tone}>{hint}</Hint> : null}
    </div>
  );
}

export function CheckboxField({
  label,
  tone = "light",
  className,
  ...props
}: { label: ReactNode; tone?: Tone } & ComponentPropsWithoutRef<"input">) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        className={cn(
          "mt-0.5 size-4 shrink-0 cursor-pointer rounded-[4px] accent-[var(--color-navy-800)]",
          className,
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "cursor-pointer text-[0.8125rem] leading-[1.55]",
          tone === "dark" ? "text-ivory/65" : "text-muted",
        )}
      >
        {label}
      </label>
    </div>
  );
}

export function FormStatus({
  state,
  message,
  tone = "light",
}: {
  state: "idle" | "submitting" | "success" | "error";
  message?: string;
  tone?: Tone;
}) {
  if (state === "idle" || state === "submitting" || !message) return null;
  const ok = state === "success";
  return (
    <p
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-xl border px-4 py-3 text-[0.875rem] leading-relaxed",
        ok
          ? tone === "dark"
            ? "border-gold/35 bg-gold/10 text-gold-200"
            : "border-india-green/25 bg-india-green/8 text-india-green"
          : tone === "dark"
            ? "border-red-400/35 bg-red-400/10 text-red-200"
            : "border-red-500/25 bg-red-500/8 text-red-700",
      )}
    >
      {message}
    </p>
  );
}
