"use client";

import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Field primitives. One appearance only — white field, hairline border, navy
 * focus ring — because every surface on the site is white.
 */
const shell =
  "w-full rounded-xl border border-hairline-strong bg-white px-4 py-3.5 text-[0.9375rem] text-navy-900 " +
  "outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted/60 " +
  "focus:border-navy-700 focus:shadow-[0_0_0_3px_rgba(27,58,107,0.1)]";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.8125rem] font-medium tracking-tight text-navy-900/75"
    >
      {children}
      {required ? (
        <span className="ml-1 text-gold-600" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
}

function Hint({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-[0.75rem] text-muted">{children}</p>;
}

type FieldExtras = { label: string; hint?: string; wrapperClassName?: string };

export function Field({
  label,
  hint,
  wrapperClassName,
  className,
  ...props
}: FieldExtras & ComponentPropsWithoutRef<"input">) {
  const id = useId();
  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id} required={props.required}>
        {label}
      </Label>
      <input id={id} className={cn(shell, className)} {...props} />
      {hint ? <Hint>{hint}</Hint> : null}
    </div>
  );
}

export function TextareaField({
  label,
  hint,
  wrapperClassName,
  className,
  ...props
}: FieldExtras & ComponentPropsWithoutRef<"textarea">) {
  const id = useId();
  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id} required={props.required}>
        {label}
      </Label>
      <textarea id={id} rows={5} className={cn(shell, "resize-y", className)} {...props} />
      {hint ? <Hint>{hint}</Hint> : null}
    </div>
  );
}

export function SelectField({
  label,
  hint,
  wrapperClassName,
  className,
  options,
  ...props
}: FieldExtras & { options: readonly string[] } & ComponentPropsWithoutRef<"select">) {
  const id = useId();
  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id} required={props.required}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          className={cn(shell, "cursor-pointer appearance-none pr-11", className)}
          {...props}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          strokeWidth={1.5}
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
        />
      </div>
      {hint ? <Hint>{hint}</Hint> : null}
    </div>
  );
}

export function CheckboxField({
  label,
  className,
  ...props
}: { label: ReactNode } & ComponentPropsWithoutRef<"input">) {
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
      <label htmlFor={id} className="cursor-pointer text-[0.8125rem] leading-[1.55] text-muted">
        {label}
      </label>
    </div>
  );
}

export function FormStatus({
  state,
  message,
}: {
  state: "idle" | "submitting" | "success" | "error";
  message?: string;
}) {
  if (state === "idle" || state === "submitting" || !message) return null;
  const ok = state === "success";
  return (
    <p
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-xl border bg-white px-4 py-3 text-[0.875rem] leading-relaxed",
        ok ? "border-india-green/35 text-india-green" : "border-red-500/35 text-red-700",
      )}
    >
      {message}
    </p>
  );
}
