import type { MetadataRoute } from "next";
import { conference } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // The studio is the chairs' editing page. Nothing links to it, but it
    // should not turn up in a search result either.
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    sitemap: `${conference.origin}/sitemap.xml`,
  };
}
