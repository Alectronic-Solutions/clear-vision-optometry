import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

interface PageSeo {
  title: string;
  description: string;
  /** Route path without leading slash, e.g. `services/dry-eye-treatment`. */
  path: string;
  /** Image path relative to the site root, without leading slash. */
  image?: string;
  imageAlt?: string;
}

/**
 * Per-page canonical + social metadata. URLs are absolute: relative values
 * resolve against the current route, not the site root.
 */
export function pageMetadata({ title, description, path, image = "og-image.jpg", imageAlt }: PageSeo): Metadata {
  const url = `${SITE_URL}/${path ? `${path}/` : ""}`;
  const images = [{ url: `${SITE_URL}/${image}`, alt: imageAlt ?? title }];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Clear Vision Optometry",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}
