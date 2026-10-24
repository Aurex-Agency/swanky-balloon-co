import type { Metadata, Viewport } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/montserrat";
import "lenis/dist/lenis.css";
import "./swanky.css";
import { AttributionCapture } from "@/components/attribution";
import { Sticker } from "@/components/swanky/brand/sticker";
import { SiteFooter } from "@/components/swanky/chrome/site-footer";
import { SiteNav } from "@/components/swanky/chrome/site-nav";
import { INTRO_BOOT } from "@/lib/swanky/intro-boot";
import { Ticker } from "@/components/swanky/chrome/ticker";
import { MotionProvider } from "@/components/swanky/motion/motion-provider";
import { TransitionProvider } from "@/components/swanky/motion/transition-provider";
import { LocalBusinessJsonLd } from "@/components/swanky/seo/json-ld";
import { brand } from "@/data/swanky";

const origin = process.env.NEXT_PUBLIC_SITE_URL || brand.website;
const demo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

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
    title: "Swanky Balloon Co. | A little more celebration.",
    description: brand.description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Swanky Balloon Co. with a cartoon balloon garland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
    images: ["/og.png"],
  },
  robots: demo
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F7F0E6" };

export default function SwankyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Lets CSS hide intro states only when scripts actually run. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AttributionCapture />
        <LocalBusinessJsonLd />
        <MotionProvider>
          <TransitionProvider>
            <Ticker />
            <SiteNav seal={<Sticker name="seal-blush" />} />
            <div className="page-shell" data-shell="">
              <div className="page" data-page="">
                <main id="main">{children}</main>
                <SiteFooter />
              </div>
            </div>
          </TransitionProvider>
        </MotionProvider>
        {demo && <span className="demo-badge">Concept preview</span>}
        {/* Plays the first-load intro before hydration (see intro-boot.ts). */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT }} />
      </body>
    </html>
  );
}
