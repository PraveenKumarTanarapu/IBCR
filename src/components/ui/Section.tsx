import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

/* --------------------------------------------------------------- eyebrow */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("label-mono inline-flex items-center gap-2.5 text-muted", className)}>
      <span className="inline-block h-px w-6 bg-gold" aria-hidden />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------- section */

/**
 * Every section sits on white. `divided` adds a hairline at the top, which is
 * how the page gets its rhythm now that there are no tinted bands.
 */
export function Section({
  children,
  className,
  id,
  divided = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  divided?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 bg-white py-16 text-body md:py-20 lg:py-24",
        divided && "border-t border-hairline",
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
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: string;
  copy?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}) {
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
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal delay={0.06}>
          <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.06] font-semibold text-navy-900">
            {title}
            {accent ? (
              <>
                {" "}
                <span className="accent-serif text-gold-600">{accent}</span>
              </>
            ) : null}
          </h2>
        </Reveal>
        {copy ? (
          <Reveal delay={0.12}>
            <p
              className={cn(
                "mt-5 max-w-2xl text-[1.0625rem] leading-[1.65] text-muted",
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
