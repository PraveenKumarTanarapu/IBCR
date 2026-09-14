import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description: `Which cookies the ${SITE.name} website uses and how to control them.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookie Notice"
      title="What this site"
      accent="stores on your device."
      intro="A short, honest account of the cookies this website sets and the ones it does not."
      updated="1 January 2026"
      blocks={[
        {
          heading: "The short version",
          paragraphs: [
            "This site sets no advertising cookies and runs no cross-site tracking. The only cookies that can appear come from the embedded map on the contact page, and from your browser remembering ordinary session state.",
          ],
        },
        {
          heading: "Strictly necessary",
          paragraphs: [
            "These keep the site working — serving the right page and protecting form submissions from abuse. They cannot be switched off through the site because nothing would function without them.",
          ],
        },
        {
          heading: "Embedded map",
          paragraphs: [
            "The contact page embeds a Google Maps frame. When it loads, Google may set its own cookies and receive your IP address under its privacy policy. If you would rather it did not, block third-party cookies for this site, or use the written address instead of the map.",
          ],
        },
        {
          heading: "What we do not use",
          paragraphs: ["For clarity, this site does not currently run:"],
          list: [
            "Advertising or retargeting cookies",
            "Social media tracking pixels",
            "Cross-site behavioural profiling",
          ],
        },
        {
          heading: "Controlling cookies",
          paragraphs: [
            "Every major browser lets you view, block and delete cookies from its settings. Blocking all cookies may affect how parts of this and other sites behave.",
          ],
        },
        {
          heading: "Questions",
          paragraphs: [`Write to ${SITE.email} and we will answer plainly.`],
        },
      ]}
    />
  );
}
