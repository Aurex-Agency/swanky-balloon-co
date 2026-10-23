import type { Metadata } from "next";
import { Garland } from "@/components/swanky/brand/garland";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { Band } from "@/components/swanky/ui/band";
import { ButtonLink } from "@/components/swanky/ui/button-link";
import { WorkGallery } from "@/components/swanky/work/work-gallery";
import { brand, categories, portfolio } from "@/data/swanky";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Balloon installations and garlands by Swanky Balloon Co. in Nashville and Middle Tennessee.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section
        className="band band-ivory page-hero"
        aria-labelledby="work-title"
      >
        <PageIntro className="band-inner page-hero-inner">
          <div className="page-hero-copy">
            <p className="label" data-load="">
              Our work
            </p>
            <h1 id="work-title" data-load="">
              It’s all in <em>the details.</em>
            </h1>
            <p className="lede" data-load="">
              Real celebrations, real palettes. Filter by color, open a photo,
              or see the story behind each one.
            </p>
          </div>
          <div className="page-hero-art" data-load="">
            <Garland variant="swoosh" />
          </div>
        </PageIntro>
      </section>
      <Band tone="blue" labelledBy="work-gallery">
        <h2 id="work-gallery" className="sr-only">
          Gallery
        </h2>
        <WorkGallery items={portfolio} categories={categories} />
        <div className="more-note">
          <p>
            More celebrations are on their way. The newest ones land on
            Instagram first.
          </p>
          <a
            className="btn"
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Follow on Instagram{" "}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <ButtonLink href="/inquire" solid>
            Start your inquiry
          </ButtonLink>
        </div>
      </Band>
    </>
  );
}
