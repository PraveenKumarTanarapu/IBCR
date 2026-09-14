import type { Metadata } from "next";
import { Check, Clock, Mail, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { MEMBERSHIP_TIERS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Become a Member",
  description:
    "Apply for IBCR membership. Tell us about your organisation and what you want from the India–Rwanda corridor.",
  alternates: { canonical: "/membership/join" },
};

const ASSURANCES = [
  { icon: Clock, title: "Three working days", copy: "Typical time to a first response from the membership team." },
  { icon: ShieldCheck, title: "No obligation", copy: "An application is a conversation, not a commitment." },
  { icon: Mail, title: "One point of contact", copy: "You deal with a named person, not a queue." },
];

export default async function JoinPage(props: PageProps<"/membership/join">) {
  const params = await props.searchParams;
  const raw = params.tier;
  const requested = Array.isArray(raw) ? raw[0] : raw;
  const tier = MEMBERSHIP_TIERS.find((t) => t.name === requested);

  return (
    <>
      <PageHero
        eyebrow="Become a member"
        title="Join the"
        accent="IBCR network."
        copy={
          tier
            ? `You are applying as a ${tier.name}. ${tier.who}`
            : "Tell us about your organisation and what you are trying to achieve across the India–Rwanda corridor."
        }
        crumbs={[{ label: "Membership", href: "/membership" }, { label: "Become a Member" }]}
      />

      <Section tone="paper">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ----------------------------------------------------- form */}
            <Reveal className="lg:col-span-7" y={22}>
              <div className="rounded-[var(--radius-card)] border border-hairline bg-ivory-100/50 p-7 md:p-10">
                <MembershipForm defaultTier={tier?.name} />
              </div>
            </Reveal>

            {/* ---------------------------------------------------- aside */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-[1.5rem] leading-tight font-semibold tracking-tight text-navy-900">
                  What happens next
                </h2>
              </Reveal>

              <Reveal delay={0.06}>
                <ul className="mt-8 space-y-6">
                  {ASSURANCES.map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy-950">
                        <item.icon strokeWidth={1.3} className="size-4 text-gold-400" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[0.9375rem] font-semibold text-navy-900">{item.title}</p>
                        <p className="mt-1 text-[0.875rem] leading-[1.6] text-muted">{item.copy}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {tier ? (
                <Reveal delay={0.12}>
                  <div className="mt-10 rounded-[var(--radius-card)] border border-gold/35 bg-navy-950 p-7 text-ivory">
                    <p className="label-mono text-gold-400">Selected category</p>
                    <h3 className="mt-4 text-[1.25rem] font-semibold tracking-tight">{tier.name}</h3>
                    <ul className="mt-5 space-y-2.5">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex gap-2.5">
                          <Check
                            strokeWidth={2}
                            className="mt-1 size-3.5 shrink-0 text-gold-400"
                            aria-hidden
                          />
                          <span className="text-[0.875rem] leading-[1.55] text-ivory/78">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={0.16}>
                <p className="mt-10 border-t border-hairline pt-6 text-[0.875rem] leading-relaxed text-muted">
                  Prefer to talk first? Email{" "}
                  <a
                    href={`mailto:${SITE.membershipEmail}`}
                    className="font-medium text-navy-800 underline decoration-gold/60 underline-offset-4"
                  >
                    {SITE.membershipEmail}
                  </a>{" "}
                  or call{" "}
                  <a
                    href={`tel:${SITE.phoneHref}`}
                    className="font-medium text-navy-800 underline decoration-gold/60 underline-offset-4"
                  >
                    {SITE.phone}
                  </a>
                  .
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
