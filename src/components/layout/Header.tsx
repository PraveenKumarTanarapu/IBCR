"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Globe, Mail, Menu, Search, X } from "lucide-react";
import { IbcrMark } from "@/components/brand/IbcrMark";
import { ScrollProgress } from "@/components/motion/Parallax";
import { NAV, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menu when the route changes. Adjusting state during render
  // (rather than in an effect) avoids a flash of the old menu on the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const solid = scrolled || Boolean(openMenu);
  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-[var(--ease-out-quint)]",
        solid
          ? "border-b border-hairline bg-paper/88 backdrop-blur-xl"
          : "border-b border-white/10 bg-transparent",
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-out-quint)]",
            solid ? "h-[68px]" : "h-[84px]",
          )}
        >
          {/* ------------------------------------------------------ brand */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${SITE.shortName} — home`}
          >
            <IbcrMark
              tone={solid ? "light" : "dark"}
              className={cn(
                "w-[76px] transition-[width,opacity] duration-500 ease-[var(--ease-out-quint)] sm:w-[88px]",
                solid ? "opacity-100" : "opacity-95",
              )}
            />
            <span
              className={cn(
                "hidden max-w-[9.5rem] text-[0.6rem] leading-[1.35] font-semibold tracking-[0.14em] uppercase transition-colors duration-500 lg:block",
                solid ? "text-navy-800/75" : "text-white/70",
              )}
            >
              Indian Business
              <br />
              Chamber in Rwanda
            </span>
          </Link>

          {/* -------------------------------------------------- main nav */}
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {NAV.map((item) => {
              const isOpen = openMenu === item.label;
              return (
                <div
                  key={item.label}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.children ? item.label : null);
                  }}
                  onFocus={() => setOpenMenu(item.children ? item.label : null)}
                >
                  <Link
                    href={item.href}
                    aria-expanded={item.children ? isOpen : undefined}
                    className={cn(
                      "relative flex h-11 items-center px-3.5 text-[0.9375rem] font-medium tracking-tight transition-colors duration-300",
                      solid
                        ? active(item.href)
                          ? "text-navy-900"
                          : "text-navy-900/72 hover:text-navy-900"
                        : active(item.href)
                          ? "text-white"
                          : "text-white/78 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-gold transition-transform duration-400 ease-[var(--ease-out-quint)]",
                        active(item.href) || isOpen ? "scale-x-100" : "scale-x-0",
                      )}
                      aria-hidden
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* ------------------------------------------------ icon rail */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <IconButton solid={solid} label="Language: English" href="/#contact">
              <Globe strokeWidth={1.6} className="size-[1.15rem]" />
            </IconButton>
            <IconButton solid={solid} label="Email the Chamber" href={`mailto:${SITE.email}`}>
              <Mail strokeWidth={1.6} className="size-[1.15rem]" />
            </IconButton>
            <IconButton solid={solid} label="Search the member directory" href="/members">
              <Search strokeWidth={1.6} className="size-[1.15rem]" />
            </IconButton>

            <Link
              href="/membership/join"
              className={cn(
                "ml-1.5 hidden h-10 items-center gap-2 rounded-full px-5 text-[0.875rem] font-medium tracking-tight transition-all duration-300 ease-[var(--ease-out-quint)] md:inline-flex",
                solid
                  ? "bg-navy-900 text-ivory hover:bg-navy-700"
                  : "bg-gold text-navy-950 hover:bg-gold-400",
              )}
            >
              Become a Member
              <ArrowUpRight strokeWidth={1.75} className="size-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={cn(
                "ml-0.5 inline-flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 xl:hidden",
                solid ? "text-navy-900 hover:bg-navy-900/8" : "text-white hover:bg-white/12",
              )}
            >
              <Menu strokeWidth={1.6} className="size-[1.35rem]" />
            </button>
          </div>
        </div>
      </div>

      {solid ? <ScrollProgress /> : null}

      {/* --------------------------------------------------- mega panel */}
      <AnimatePresence>
        {openMenu ? (
          <motion.div
            key={openMenu}
            initial={{ opacity: 0, y: reduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="absolute inset-x-0 top-full hidden border-b border-hairline bg-paper shadow-[0_26px_60px_-34px_rgba(7,23,48,0.45)] xl:block"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            {NAV.filter((n) => n.label === openMenu).map((item) => (
              <div key={item.label} className="container-page py-10">
                <div className="grid grid-cols-12 gap-10">
                  <div className="col-span-4">
                    <p className="label-mono text-gold-600">{item.label}</p>
                    <p className="mt-4 max-w-xs text-[1.0625rem] leading-[1.55] text-navy-900">
                      {item.summary}
                    </p>
                    <Link
                      href={item.href}
                      className="link-underline mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-navy-700"
                    >
                      Overview
                      <ArrowUpRight strokeWidth={1.75} className="size-3.5" />
                    </Link>
                  </div>
                  <ul className="col-span-8 grid grid-cols-2 gap-x-10 gap-y-1">
                    {item.children?.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="group flex items-start justify-between gap-6 rounded-xl px-4 py-3.5 transition-colors duration-300 hover:bg-navy-900/4"
                        >
                          <span>
                            <span className="block text-[0.9375rem] font-medium text-navy-900">
                              {child.label}
                            </span>
                            {child.note ? (
                              <span className="mt-0.5 block text-[0.8125rem] text-muted">
                                {child.note}
                              </span>
                            ) : null}
                          </span>
                          <ArrowUpRight
                            strokeWidth={1.6}
                            className="mt-0.5 size-4 shrink-0 text-navy-900/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ------------------------------------------------- mobile drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed inset-0 z-50 bg-navy-950 text-ivory xl:hidden"
          >
            <div className="container-page flex h-[84px] items-center justify-between">
              <IbcrMark tone="dark" className="w-[84px]" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-ivory transition-colors hover:bg-white/10"
              >
                <X strokeWidth={1.6} className="size-6" />
              </button>
            </div>

            <div className="container-page h-[calc(100dvh-84px)] overflow-y-auto pb-16">
              <nav aria-label="Mobile">
                <ul className="divide-y divide-white/10 border-y border-white/10">
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.05 + i * 0.045, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center justify-between py-5 text-[1.375rem] font-medium tracking-tight"
                      >
                        {item.label}
                        <ArrowUpRight strokeWidth={1.5} className="size-5 text-gold" />
                      </Link>
                      {item.children ? (
                        <ul className="-mt-1 flex flex-wrap gap-x-5 gap-y-2 pb-5">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} className="text-[0.875rem] text-ivory/55">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/membership/join"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gold text-[0.9375rem] font-medium text-navy-950"
                >
                  Become a Member
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 text-[0.9375rem] font-medium text-ivory"
                >
                  Talk to IBCR
                </Link>
              </div>

              <p className="mt-10 text-[0.8125rem] leading-relaxed text-ivory/45">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}, {SITE.address.country}
                <br />
                <a href={`mailto:${SITE.email}`} className="text-gold-400">
                  {SITE.email}
                </a>
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function IconButton({
  children,
  label,
  href,
  solid,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
  solid: boolean;
}) {
  const external = href.startsWith("mailto:");
  const className = cn(
    "hidden size-10 items-center justify-center rounded-full transition-colors duration-300 sm:inline-flex",
    solid ? "text-navy-900/70 hover:bg-navy-900/8 hover:text-navy-900" : "text-white/80 hover:bg-white/12 hover:text-white",
  );
  if (external) {
    return (
      <a href={href} aria-label={label} title={label} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={label} title={label} className={className}>
      {children}
    </Link>
  );
}
