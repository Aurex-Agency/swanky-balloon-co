import type { Metadata, Viewport } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/montserrat";
import "lenis/dist/lenis.css";
import "./swanky.css";
import { AttributionCapture } from "@/components/attribution";
import { MotionProvider } from "@/components/swanky/motion/motion-provider";
import { TransitionProvider } from "@/components/swanky/motion/transition-provider";
import { brand } from "@/data/swanky";

// Root layout for the redesigned site (plan/03-BUILD-PLAN.md). Pages move here from
// (concept) as they are rebuilt; navigating between the two groups is a full page load.
const origin = process.env.NEXT_PUBLIC_SITE_URL || brand.website;

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "Swanky Balloon Co. | Custom Balloons & Event Styling in Nashville",
    template: "%s | Swanky Balloon Co.",
  },
  description: brand.description,
  robots:
    process.env.NEXT_PUBLIC_DEMO_MODE === "true"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F7F0E6" };

export default function SwankyLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Lets CSS hide intro states only when scripts actually run. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AttributionCapture />
        <MotionProvider>
          <TransitionProvider>
            <main id="main" data-page="">
              {children}
            </main>
          </TransitionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
