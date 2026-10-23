import type { Metadata } from "next";
import { Garland } from "@/components/swanky/brand/garland";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { ColorStudio } from "@/components/swanky/studio/color-studio";

export const metadata: Metadata = {
  title: "Palettes",
  description:
    "Try balloon color palettes, build your own and bring it into your Swanky Balloon Co. inquiry.",
  alternates: { canonical: "/palettes" },
};

export default function PalettesPage() {
  return (
    <section className="band band-ivory" aria-labelledby="palettes-title">
      <PageIntro className="band-inner">
        <div className="page-hero-copy studio-head">
          <p className="label" data-load="">
            The color studio
          </p>
          <h1 id="palettes-title" data-load="">
            Every celebration begins <em>with a palette.</em>
          </h1>
          <p className="lede" data-load="">
            A soft neutral? A little pink? Something entirely your own? Try a
            combination and watch the garland change.
          </p>
        </div>
        <div data-load="">
          <ColorStudio garland={<Garland variant="swoosh" interactive />} />
        </div>
      </PageIntro>
    </section>
  );
}
