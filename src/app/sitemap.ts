import type { MetadataRoute } from "next";
import { brand, portfolio, services } from "@/data/swanky";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || brand.website;
  const pages = [
    "/",
    "/work",
    ...portfolio.map((p) => `/work/${p.id}`),
    "/services",
    ...services
      .filter((s) => s.href.startsWith("/services/"))
      .map((s) => s.href),
    "/pickup",
    "/palettes",
    "/about",
    "/faq",
    "/inquire",
    "/privacy",
    "/terms",
  ];
  return pages.map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/inquire"
          ? 0.9
          : path === "/privacy" || path === "/terms"
            ? 0.3
            : 0.7,
  }));
}
