import type { Metadata } from "next";
import { Garland } from "@/components/swanky/brand/garland";
import { Sticker } from "@/components/swanky/brand/sticker";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { Band, SectionHead } from "@/components/swanky/ui/band";
import { ButtonLink } from "@/components/swanky/ui/button-link";
import { brand, copy } from "@/data/swanky";
import type { StickerName } from "@/lib/swanky/stickers";

export const metadata: Metadata = {
  title: "About",
  description:
    "Swanky Balloon Co. creates custom balloon art and event styling across Nashville, Brentwood and Middle Tennessee.",
  alternates: { canonical: "/about" },
};

const VALUES: { sticker: StickerName; title: string; text: string }[] = [
  {
    sticker: "heart-bubble",
    title: "Thoughtful, with a wink",
    text: "Elegant lettering, playful details and a warm, confident presence. The balloons do the smiling.",
  },
  {
    sticker: "bow",
    title: "Your palette, your space",
    text: "Every design starts with your colors, your venue and the moment you want to remember.",
  },
  {
    sticker: "envelope",
    title: "Clear from the first hello",
    text: "One thoughtful inquiry, a recommended direction, then clear next steps through event day.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section
        className="band band-ivory page-hero"
        aria-labelledby="about-title"
      >
        <PageIntro className="band-inner page-hero-inner">
          <div className="page-hero-copy">
            <p className="label" data-load="">
              About Swanky
            </p>
            <h1 id="about-title" data-load="">
              A thoughtful eye. <em>A personal touch.</em>
            </h1>
            <p className="lede" data-load="">
              {copy.about.description}
            </p>
          </div>
          <div className="page-hero-art about-logo" data-load="">
            <Sticker name="logo-primary" label="Swanky Balloon Co. logo" />
          </div>
        </PageIntro>
      </section>
      <Band tone="blush" labelledBy="about-values">
        <SectionHead
          eyebrow="What we care about"
          id="about-values"
          title={
            <>
              A little more <em>celebration.</em>
            </>
          }
        />
        <ul className="value-grid">
          {VALUES.map((v) => (
            <li key={v.title}>
              <Sticker name={v.sticker} />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
      </Band>
      <Band tone="ivory" labelledBy="about-area" className="closing">
        <div className="closing-inner">
          <div className="closing-arch">
            <Garland variant="arch" />
          </div>
          <div className="closing-copy">
            <p className="label">Where we celebrate</p>
            <h2 id="about-area">
              Nashville, Brentwood <em>+ Middle Tennessee.</em>
            </h2>
            <p>
              Share your venue in your inquiry and we’ll confirm travel and
              setup details. Follow along on Instagram for the newest work.
            </p>
            <div className="cta-row">
              <ButtonLink href="/inquire" solid pop dot>
                Start your inquiry
              </ButtonLink>
              <a
                className="btn"
                href={brand.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
