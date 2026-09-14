import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "navy" | "outline" | "ghost" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex cursor-pointer items-center justify-center gap-2.5 overflow-hidden " +
  "font-medium tracking-tight whitespace-nowrap transition-[color,background-color,border-color,box-shadow] " +
  "duration-300 ease-[var(--ease-out-quint)] disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  gold:
    "rounded-full bg-gold text-navy-950 shadow-[0_1px_0_rgba(255,255,255,0.35)_inset] hover:bg-gold-400",
  navy: "rounded-full bg-navy-900 text-white hover:bg-navy-700",
  // Hover is a neutral light grey — the only surface tint on the site.
  outline:
    "rounded-full border border-hairline-strong bg-white text-navy-900 hover:border-navy-800/40 hover:bg-hover",
  // Reserved for the hero, the one place with footage behind the buttons.
  "outline-light":
    "rounded-full border border-hairline text-white backdrop-blur-[2px] hover:border-white/70 hover:bg-hairline",
  ghost: "rounded-full text-navy-900 hover:bg-hover",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

function Inner({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow ? (
        <ArrowRight
          className="relative z-10 size-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover/btn:translate-x-1"
          strokeWidth={1.75}
          aria-hidden
        />
      ) : null}
    </>
  );
}

export function Button({
  variant = "gold",
  size = "md",
  withArrow,
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "gold",
  size = "md",
  withArrow,
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        <Inner withArrow={withArrow}>{children}</Inner>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </Link>
  );
}
