import type { MetadataRoute } from "next";

// Resolve the canonical origin: explicit env first, then the live
// production domain as the default fallback. Kept in sync with app/layout.tsx.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "https://nattapon-dev.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
