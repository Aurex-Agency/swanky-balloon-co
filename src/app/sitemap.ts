import type { MetadataRoute } from "next";
import { brand } from "@/data/swanky";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/gallery", "/inquire"].map((path) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL || brand.website}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
