import type { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the Indian Business Chamber in Rwanda — ${SITE.address.line2}, ${SITE.address.country}. Membership, trade, investment and partnership enquiries.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let&rsquo;s start a"
        accent="conversation."
        copy="Membership, market entry, trade, investment or partnership — tell us what you are trying to do and we will point you at the right route."
        crumbs={[{ label: "Contact" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${SITE.email}`} withArrow>
            Email the secretariat
          </ButtonLink>
          <ButtonLink href={`tel:${SITE.phoneHref}`} variant="outline">
            {SITE.phone}
          </ButtonLink>
        </div>
      </PageHero>

      <ContactSection />
    </>
  );
}
