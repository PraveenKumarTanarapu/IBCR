import type { MetadataRoute } from "next";
import { INSIGHTS, SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "weekly"],
    ["/about", 0.8, "monthly"],
    ["/membership", 0.9, "monthly"],
    ["/membership/join", 0.9, "monthly"],
    ["/services", 0.8, "monthly"],
    ["/india-rwanda", 0.8, "monthly"],
    ["/events", 0.8, "weekly"],
    ["/insights", 0.7, "weekly"],
    ["/members", 0.7, "weekly"],
    ["/contact", 0.7, "yearly"],
    ["/privacy", 0.2, "yearly"],
    ["/terms", 0.2, "yearly"],
    ["/cookies", 0.2, "yearly"],
  ];

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...INSIGHTS.map((insight) => ({
      url: `${SITE.url}/insights/${insight.slug}`,
      lastModified: new Date(insight.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
