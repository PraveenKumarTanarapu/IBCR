import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { IbcrMark } from "@/components/brand/IbcrMark";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SITE } from "@/lib/content";

const EXPLORE = [
  { label: "About", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Insights", href: "/insights" },
];

const OPPORTUNITY_LINKS = [
  { label: "Invest in Rwanda", href: "/india-rwanda#opportunities" },
  { label: "Market Entry", href: "/services#market-entry" },
  { label: "Trade Facilitation", href: "/services#trade-facilitation" },
  { label: "Business Delegations", href: "/services#business-delegations" },
  { label: "Member Directory", href: "/members" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-white text-body">

      <div className="container-page relative">
        {/* ---------------------------------------------------- masthead */}
        <div className="grid gap-12 border-b border-hairline py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-5">
            <IbcrMark className="w-[132px]" />
            <p className="mt-7 max-w-sm text-[1.0625rem] leading-[1.6] text-muted">
              Connecting India and Rwanda through trade, investment, partnerships and opportunity.
            </p>
            <p className="label-mono mt-6 text-gold-600">{SITE.tagline}</p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="label-mono text-navy-900/45">Explore</h3>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-[0.9375rem] text-body hover:text-navy-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="label-mono text-navy-900/45">Opportunities</h3>
            <ul className="mt-5 space-y-3">
              {OPPORTUNITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-[0.9375rem] text-body hover:text-navy-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ----------------------------------------------------- connect */}
        <div className="grid gap-12 border-b border-hairline py-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h3 className="label-mono text-navy-900/45">Connect</h3>
            <ul className="mt-5 space-y-4 text-[0.9375rem]">
              <li className="flex gap-3 text-body">
                <MapPin strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                  <br />
                  {SITE.address.country}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="inline-flex items-center gap-3 text-body hover:text-navy-900"
                >
                  <Phone strokeWidth={1.5} className="size-4 text-gold" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-3 text-body hover:text-navy-900"
                >
                  <Mail strokeWidth={1.5} className="size-4 text-gold" />
                  {SITE.email}
                </a>
              </li>
            </ul>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {SITE.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-[0.8125rem] text-muted transition-colors hover:text-gold-600"
                  >
                    {s.label}
                    <ArrowUpRight
                      strokeWidth={1.5}
                      className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h3 className="text-[1.5rem] leading-tight font-semibold text-navy-900">
              The India–Rwanda business brief,{" "}
              <span className="accent-serif text-gold-600">monthly.</span>
            </h3>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
              Sector intelligence, policy movement and Chamber programming. No noise.
            </p>
            <NewsletterForm className="mt-6" />
          </div>
        </div>

        {/* ------------------------------------------------------ bottom */}
        <div className="flex flex-col gap-4 py-8 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-navy-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-navy-900">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="transition-colors hover:text-navy-900">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
