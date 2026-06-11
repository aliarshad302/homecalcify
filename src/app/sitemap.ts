import type { MetadataRoute } from "next";
import { calculators } from "@/config/calculators";
import { hubs } from "@/config/hubs";
import { guides } from "@/config/guides";
import { SITE_URL } from "@/lib/schema";

/** Auto-generated sitemap derived from the content registries. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${SITE_URL}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/calculators/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/categories/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/guides/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/about-us/"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: url("/contact-us/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: url("/our-experts/"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: url("/methodology/"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: url("/editorial-policy/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: url("/privacy-policy/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/disclaimer/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms-conditions/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const calcPages: MetadataRoute.Sitemap = calculators.map((c) => ({
    url: url(`/${c.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const hubPages: MetadataRoute.Sitemap = hubs.map((h) => ({
    url: url(`/${h.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: url(`/guides/${g.slug}/`),
    lastModified: new Date(g.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...calcPages, ...hubPages, ...guidePages];
}
