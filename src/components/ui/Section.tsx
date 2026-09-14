import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

/* --------------------------------------------------------------- eyebrow */

export function Eyebrow({
  children,
  tone = "navy",
  className,
}: {
  children: ReactNode;
  tone?: "navy" | "light" | "gold";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-2.5",
        tone === "navy" && "text-navy-700/70",
        tone === "light" && "text-ivory/60",
        tone === "gold" && "text-gold",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-px w-6",
          tone === "light" ? "bg-gold-400/70" : "bg-gold/70",
        )}
        aria-hidden
      />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------- section */

export function Section({
  children,
  className,
  id,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "ivory" | "navy" | "ink" | "transparent";
}) {
  const tones = {
    paper: "bg-paper text-body",
    ivory: "bg-ivory-100 text-body",
    navy: "bg-navy-950 text-ivory",
    ink: "bg-ink text-ivory",
    transparent: "",
  } as const;

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 md:py-28 lg:py-32",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------- section heading */

export function SectionHeading({
  eyebrow,
  title,
  accent,
  copy,
  align = "left",
  tone = "navy",
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: string;
  copy?: ReactNode;
  align?: "left" | "center";
  tone?: "navy" | "light";
  action?: ReactNode;
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        action && "lg:flex-row lg:items-end lg:justify-between lg:gap-14",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <Reveal>
            <Eyebrow tone={light ? "light" : "navy"}>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal delay={0.06}>
          <h2
            className={cn(
              "mt-5 text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.06] font-semibold",
              light ? "text-ivory" : "text-navy-900",
            )}
          >
            {title}
            {accent ? (
              <>
                {" "}
                <span className={cn("accent-serif", light ? "text-gold-400" : "text-gold-600")}>
                  {accent}
                </span>
              </>
            ) : null}
          </h2>
        </Reveal>
        {copy ? (
          <Reveal delay={0.12}>
            <p
              className={cn(
                "mt-5 max-w-2xl text-[1.0625rem] leading-[1.65]",
                light ? "text-ivory/70" : "text-muted",
                align === "center" && "mx-auto",
              )}
            >
              {copy}
            </p>
          </Reveal>
        ) : null}
      </div>
      {action ? (
        <Reveal delay={0.16} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------ hairlines */

export function GoldRule({ className }: { className?: string }) {
  return <div className={cn("rule-gold w-full", className)} aria-hidden />;
}
