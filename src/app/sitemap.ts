import type { MetadataRoute } from "next";
import { conference } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: conference.origin,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
