import type { MetadataRoute } from "next";
import { LEGAL_LINKS, NAV_LINKS, SITE_URL } from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();

  const add = (path: string, priority: number) => {
    const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
    entries.set(url, {
      url,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority,
    });
  };

  for (const link of NAV_LINKS) {
    add(link.href, link.href === "/" ? 1 : 0.7);
  }

  for (const page of SERVICE_PAGES) {
    add(`/${page.slug}`, page.slug === "small-business-funding" ? 0.9 : 0.8);
  }

  for (const link of LEGAL_LINKS) {
    add(link.href, 0.3);
  }

  return [...entries.values()];
}
