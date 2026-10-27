import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { conference } from "@/content/site";

/**
 * Routes whose pages are built from site.ts and committee.ts rather than from
 * pages.ts, so they have no entry there to derive a slug from.
 */
const standalone = ["call", "contact", "programme", "committee"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...standalone, ...Object.values(pages).map((p) => p.slug)];

  return routes.map((route) => ({
    url: route ? `${conference.origin}/${route}` : conference.origin,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
