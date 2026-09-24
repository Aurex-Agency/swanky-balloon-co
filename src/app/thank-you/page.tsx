import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Confirmation } from "@/components/confirmation";
import { brand, copy } from "@/data/swanky";
export const metadata: Metadata = {
  title: "Your Party Is in Motion",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};
export default function ThankYou() {
  return (
    <section className="thank-you section">
      <span className="eyebrow">YOUR PARTY IS OFFICIALLY IN MOTION.</span>
      <h1>
        Oh, this is
        <br />
        going to be <span className="pink-text">good.</span>
      </h1>
      <p>{copy.confirmation}</p>
      <Confirmation />
      <div className="thank-you-actions">
        <Link className="button button-ink" href="/">
          Return Home
        </Link>
        <Link className="button button-outline" href="/gallery">
          Explore the Gallery <ArrowUpRight size={18} />
        </Link>
      </div>
      <a
        className="text-link"
        href={brand.instagram}
        target="_blank"
        rel="noreferrer"
      >
        Keep the inspiration coming on Instagram <ArrowUpRight size={17} />
      </a>
    </section>
  );
}
