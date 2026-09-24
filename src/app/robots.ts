import type { MetadataRoute } from "next";
import { brand } from "@/data/swanky";
export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      process.env.NEXT_PUBLIC_DEMO_MODE === "true"
        ? { userAgent: "*", disallow: "/" }
        : {
            userAgent: "*",
            allow: "/",
            disallow: ["/ops-preview", "/thank-you", "/api/"],
          },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || brand.website}/sitemap.xml`,
  };
}
