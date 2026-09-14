import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How the ${SITE.name} collects, uses and protects personal information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="How we handle"
      accent="your information."
      intro={`This policy explains what the ${SITE.name} collects through this website, why, and what you can ask us to do about it.`}
      updated="1 January 2026"
      blocks={[
        {
          heading: "What we collect",
          paragraphs: [
            "We collect only the information you choose to give us through the forms on this site, together with basic technical information that any web server records.",
          ],
          list: [
            "Contact details you submit: name, company, email, phone and position",
            "Membership application details: organisation, sector, location and objectives",
            "Event registration details, including any accessibility or dietary requirements you tell us about",
            "Newsletter subscriptions: your email address",
            "Standard server logs: IP address, browser type and pages requested",
          ],
        },
        {
          heading: "Why we use it",
          paragraphs: [
            "We use your information to respond to enquiries, assess membership applications, administer events, send the material you asked for, and to understand which parts of the site are useful.",
            "We do not sell personal information, and we do not share it with third parties for their own marketing.",
          ],
        },
        {
          heading: "Legal basis",
          paragraphs: [
            "Where you submit a form, we process your information on the basis of your consent and, where a membership or event relationship exists, on the basis of that agreement. Server logs are processed on the basis of our legitimate interest in operating a secure website.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "Enquiry records are retained for two years. Membership records are retained for the duration of membership and for seven years afterwards, in line with normal record-keeping obligations. Newsletter subscriptions are retained until you unsubscribe.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can ask us to show you what we hold, correct it, delete it, or stop using it. Write to the address below and we will respond within thirty days.",
          ],
          list: [
            `Email: ${SITE.email}`,
            `Post: ${SITE.name}, ${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.country}`,
          ],
        },
        {
          heading: "Third-party services",
          paragraphs: [
            "This site embeds a map from Google Maps on the contact page. When that map loads, Google may set cookies and receive your IP address under its own privacy policy. No other third-party tracking is embedded in these pages.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "If this policy changes materially, we will update the date at the top of this page and, where the change affects existing members, notify them directly.",
          ],
        },
      ]}
    />
  );
}
