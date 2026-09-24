import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/data/swanky";
import { Gallery } from "@/components/gallery";
export const metadata: Metadata = {
  title: "The Gallery",
  description:
    "Explore color and styling possibilities for custom Nashville balloon decor and event backdrops.",
  alternates: { canonical: "/gallery" },
};
export default function GalleryPage() {
  return (
    <>
      <div className="page-heading">
        <span className="eyebrow">THE SWANKY GALLERY</span>
        <h1>
          Every occasion.
          <br />
          <em>Its own kind of lovely.</em>
        </h1>
        <p>
          Explore Swanky’s custom balloon installations. A few different
          palettes, each made for its own space and celebration.
        </p>
      </div>
      <section className="gallery-page section" aria-label="Event gallery">
        <Gallery />
      </section>
      <section className="gallery-closing section">
        <h2>What will your celebration look like?</h2>
        <Link href="/inquire" className="button button-ink">
          {copy.cta} <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
