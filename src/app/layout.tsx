import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/manrope";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { AttributionCapture } from "@/components/attribution";
import { brand } from "@/data/swanky";
const origin = process.env.NEXT_PUBLIC_SITE_URL || brand.website;
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default:
      "Swanky Balloon Co. | Custom Balloons & Event Styling in Nashville",
    template: "%s | Swanky Balloon Co.",
  },
  description: brand.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: "Swanky Balloon Co. | Make the moment impossible to miss.",
    description: brand.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: brand.name,
    description: brand.description,
  },
  robots:
    process.env.NEXT_PUBLIC_DEMO_MODE === "true"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AttributionCapture />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {process.env.NEXT_PUBLIC_DEMO_MODE === "true" && (
          <span className="demo-badge">Concept Preview</span>
        )}
      </body>
    </html>
  );
}
