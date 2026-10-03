import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { services } from "@/data/services";

export const dynamic = "force-static";


export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/accessibility/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/hipaa/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
