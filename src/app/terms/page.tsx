import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${SITE.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Use"
      title="The rules of"
      accent="this website."
      intro={`These terms govern your use of the ${SITE.name} website. By using the site, you accept them.`}
      updated="1 January 2026"
      blocks={[
        {
          heading: "Information, not advice",
          paragraphs: [
            "Everything published here — market briefings, sector notes, regulatory summaries — is general information about doing business between India and Rwanda. It is not legal, tax, financial or investment advice, and it is not a substitute for professional advice on your specific circumstances.",
            "Business conditions change. Verify anything time-sensitive with the relevant authority before acting on it.",
          ],
        },
        {
          heading: "Member directory",
          paragraphs: [
            "Directory entries are supplied by member organisations. IBCR presents them in good faith but does not warrant their accuracy, and a listing is not an endorsement or a recommendation to transact.",
            "Conduct your own due diligence before entering into any commercial arrangement with a listed organisation.",
          ],
        },
        {
          heading: "Membership and events",
          paragraphs: [
            "Submitting an application or a registration through this site does not by itself create a membership or guarantee a place at an event. Both are confirmed by the secretariat in writing.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The IBCR name, marks, site design and published content belong to the Chamber or its licensors. You may read, print and share pages for your own business use with attribution. You may not republish substantial extracts commercially without written permission.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: ["You agree not to use this site in ways that damage it or its users."],
          list: [
            "No attempts to gain unauthorised access to any part of the site or its infrastructure",
            "No automated scraping of the member directory",
            "No submission of unlawful, misleading or abusive content through the forms",
          ],
        },
        {
          heading: "Third-party links",
          paragraphs: [
            "Links to external sites are provided for convenience. IBCR is not responsible for their content or their practices.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "To the extent permitted by law, IBCR is not liable for indirect or consequential loss arising from use of this site or reliance on its content. Nothing here limits liability that cannot lawfully be limited.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of the Republic of Rwanda, and the courts of Rwanda have exclusive jurisdiction over any dispute arising from them.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [`Questions about these terms: ${SITE.email}.`],
        },
      ]}
    />
  );
}
