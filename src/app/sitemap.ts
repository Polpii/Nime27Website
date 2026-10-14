import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { conference } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "call", "contact", ...Object.values(pages).map((p) => p.slug)];

  return routes.map((route) => ({
    url: route ? `${conference.origin}/${route}` : conference.origin,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
