import type { MetadataRoute } from "next";
import { BASE_PATH } from "@/lib/basePath";

export const dynamic = "force-static";

const SITE_URL = "https://alectronic-solutions.github.io" + BASE_PATH;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/accessibility`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/hipaa`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
