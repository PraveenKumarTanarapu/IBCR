import { EVENTS, SITE } from "@/lib/content";

/**
 * Structured data for the Chamber.
 *
 * Emitted once, in the root layout, so every page carries the organisation and
 * the site's search action; the upcoming events ride along because they are
 * the thing most likely to be surfaced directly in a result. Article schema
 * for insights is emitted by the article page itself.
 *
 * `dateLabel` is display copy, so the machine-readable dates here come from
 * the ISO fields, and an event with no confirmed schedule is left out rather
 * than published with a guess.
 */
export function StructuredData() {
  const organisation = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    slogan: SITE.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    areaServed: [
      { "@type": "Country", name: "Rwanda" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: SITE.social.map((s) => s.href),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.shortName,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
  };

  const events = EVENTS.filter((event) => event.status === "upcoming" && !event.hideSchedule).map(
    (event) => ({
      "@type": "BusinessEvent",
      name: event.title,
      description: event.summary,
      startDate: event.date,
      ...(event.endDate ? { endDate: event.endDate } : {}),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: event.venue,
        address: {
          "@type": "PostalAddress",
          addressLocality: event.city,
          addressCountry: event.city === "Mumbai" ? "IN" : "RW",
        },
      },
      organizer: { "@id": `${SITE.url}/#organization` },
      url: `${SITE.url}/events`,
    }),
  );

  const graph = { "@context": "https://schema.org", "@graph": [organisation, website, ...events] };

  return (
    <script
      type="application/ld+json"
      // The payload is built here from typed content, not from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
