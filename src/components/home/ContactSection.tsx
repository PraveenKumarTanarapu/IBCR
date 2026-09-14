import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Eyebrow, Section } from "@/components/ui/Section";
import { SITE } from "@/lib/content";

const MAP_QUERY = encodeURIComponent("Kigali Heights, KG 7 Ave, Kigali, Rwanda");

export function ContactSection() {
  return (
    <Section id="contact" tone="paper">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* --------------------------------------------------- details */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.05] font-semibold text-navy-900">
                Let&rsquo;s start a{" "}
                <span className="accent-serif text-gold-600">conversation.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-[1.65] text-muted">
                Tell us what you are trying to do. If IBCR is not the right route, we will say so and
                point you somewhere better.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <address className="mt-10 space-y-6 not-italic">
                <div className="flex gap-4">
                  <MapPin strokeWidth={1.4} className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  <div>
                    <p className="text-[0.9375rem] font-semibold text-navy-900">{SITE.name}</p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
                      {SITE.address.line1}
                      <br />
                      {SITE.address.line2}
                      <br />
                      {SITE.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone strokeWidth={1.4} className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  <a
                    href={`tel:${SITE.phoneHref}`}
                    className="link-underline text-[0.9375rem] text-navy-900"
                  >
                    {SITE.phone}
                  </a>
                </div>

                <div className="flex gap-4">
                  <Mail strokeWidth={1.4} className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  <div className="space-y-1">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="link-underline block text-[0.9375rem] text-navy-900"
                    >
                      {SITE.email}
                    </a>
                    <a
                      href={`mailto:${SITE.membershipEmail}`}
                      className="link-underline block text-[0.875rem] text-muted"
                    >
                      {SITE.membershipEmail}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MessageCircle
                    strokeWidth={1.4}
                    className="mt-0.5 size-5 shrink-0 text-gold"
                    aria-hidden
                  />
                  <a
                    href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-[0.9375rem] text-navy-900"
                  >
                    WhatsApp the secretariat
                    <ArrowUpRight strokeWidth={1.6} className="size-3.5" />
                  </a>
                </div>
              </address>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline pt-6">
                {SITE.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-[0.8125rem] text-muted transition-colors hover:text-navy-900"
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
            </Reveal>
          </div>

          {/* ------------------------------------------------------ form */}
          <Reveal className="lg:col-span-7" delay={0.08} y={24}>
            <div className="rounded-[var(--radius-card)] border border-hairline bg-ivory-100/60 p-7 md:p-10">
              <h3 className="text-[1.25rem] font-semibold tracking-tight text-navy-900">
                Send an enquiry
              </h3>
              <p className="mt-2 text-[0.875rem] text-muted">
                Typical response time: two working days.
              </p>
              <div className="mt-8">
                <EnquiryForm />
              </div>
            </div>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- map */}
        <Reveal className="mt-14" delay={0.06} y={20}>
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-hairline">
            <iframe
              title="IBCR office location in Kigali, Rwanda"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full grayscale-[0.35] transition-[filter] duration-700 hover:grayscale-0"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
