import type { MetadataRoute } from "next";
import { conference } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${conference.origin}/sitemap.xml`,
  };
}
