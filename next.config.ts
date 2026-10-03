import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves directories with a trailing slash; matching it keeps
  // same-page hash links (e.g. /#book) as in-page scrolls instead of navigations.
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? "/clear-vision-optometry" : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
