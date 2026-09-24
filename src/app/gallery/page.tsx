import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        <span className="eyebrow">THE GOOD STUFF</span>
        <h1>
          Big moments.
          <br />
          <span className="pink-text">Even bigger energy.</span>
        </h1>
        <p>
          A world of color, a little imagination, and so many ways to celebrate.
          These illustrative studies show the possibilities while our real event
          gallery is being prepared.
        </p>
      </div>
      <section className="gallery-page section" aria-label="Event gallery">
        <Gallery />
      </section>
      <section className="gallery-closing section">
        <h2>Your moment belongs here.</h2>
        <Link href="/inquire" className="button button-ink">
          Start Your Party <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
