import type { MetadataRoute } from "next";
import { BASE_PATH } from "@/lib/basePath";

export const dynamic = "force-static";

const SITE_URL = "https://alectronic-solutions.github.io" + BASE_PATH;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
