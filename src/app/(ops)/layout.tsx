import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";

// Internal sample CRM from the original concept (unlinked, noindex). It keeps its own
// root layout and styles so the redesign does not have to carry them.
export const metadata: Metadata = {
  title: "Swanky Ops Preview",
  robots: { index: false, follow: false },
};

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
