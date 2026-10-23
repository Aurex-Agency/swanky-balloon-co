import type { Metadata } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/montserrat";
import "./(swanky)/swanky.css";
import { Garland } from "@/components/swanky/brand/garland";

// The app has two root layouts while the redesign is in progress, so unmatched URLs need a
// global 404 (experimental.globalNotFound in next.config.ts).
export const metadata: Metadata = {
  title: "This one popped | Swanky Balloon Co.",
  description: "We couldn’t find that page.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="band band-ivory popped">
          <div className="band-inner popped-inner">
            <div className="popped-arch">
              <Garland variant="arch" />
            </div>
            <p className="label">404</p>
            <h1>
              This one <em>popped.</em>
            </h1>
            <p>We couldn’t find that page. Let’s get you back to the party.</p>
            {/* A full page load is right here: this page sits outside both root layouts. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className="btn is-solid" href="/">
              Back to the homepage
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
