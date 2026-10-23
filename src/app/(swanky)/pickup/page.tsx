import type { Metadata } from "next";
import { Garland } from "@/components/swanky/brand/garland";
import { Sticker } from "@/components/swanky/brand/sticker";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { CardReveal } from "@/components/swanky/motion/reveal";
import { Band, SectionHead } from "@/components/swanky/ui/band";
import { ButtonLink } from "@/components/swanky/ui/button-link";
import { balloonMenu, services } from "@/data/swanky";
import type { StickerName } from "@/lib/swanky/stickers";

export const metadata: Metadata = {
  title: "Pick Up",
  description:
    "Pickup balloon garlands, oversized helium balloons, bundles and balloon kits from Swanky Balloon Co. in Nashville.",
  alternates: { canonical: "/pickup" },
};

const pickup = services.find((s) => s.slug === "pick-up")!;
const ART: StickerName[] = [
  "swoosh",
  "swoosh",
  "balloon",
  "sparkle",
  "bow",
  "cake",
];
const STEPS = [
  {
    title: "Choose your pieces",
    text: "Pick from the menu below and tell us your colors.",
  },
  {
    title: "Send a pickup request",
    text: "Share the date you need them and a little about the party.",
  },
  {
    title: "We confirm the details",
    text: "We follow up to confirm colors, timing and where to pick up.",
  },
  {
    title: "Pick up and celebrate",
    text: "Bring them home and make the party yours.",
  },
];

export default function PickupPage() {
  const inquire = `/inquire?${new URLSearchParams({ service: pickup.title })}`;
  return (
    <>
      <section
        className="band band-ivory page-hero"
        aria-labelledby="pickup-title"
      >
        <PageIntro className="band-inner page-hero-inner">
          <div className="page-hero-copy">
            <p className="label" data-load="">
              Pick up
            </p>
            <h1 id="pickup-title" data-load="">
              Pick up <em>+ celebrate.</em>
            </h1>
            <p className="lede" data-load="">
              {pickup.lead}
            </p>
            <div className="cta-row" data-load="">
              <ButtonLink href={inquire} solid pop dot>
                Request a pickup
              </ButtonLink>
            </div>
          </div>
          <div className="page-hero-art" data-load="">
            <Garland variant="swoosh" />
          </div>
        </PageIntro>
      </section>
      <Band tone="blue" labelledBy="pickup-menu">
        <SectionHead
          eyebrow="The pickup menu"
          id="pickup-menu"
          title={
            <>
              Ready to <em>bring along.</em>
            </>
          }
        >
          {pickup.note}
        </SectionHead>
        <CardReveal className="pickup-grid">
          {balloonMenu.pickup.map((item, i) => (
            <div className="pickup-card" data-card="" key={item}>
              <Sticker name={ART[i] ?? "balloon"} />
              <h3>{item}</h3>
            </div>
          ))}
        </CardReveal>
      </Band>
      <Band tone="blush" labelledBy="pickup-steps">
        <SectionHead
          eyebrow="How pickup works"
          id="pickup-steps"
          title={
            <>
              Simple, <em>start to finish.</em>
            </>
          }
        />
        <ol className="steps">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="step-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="cta-row left">
          <ButtonLink href={inquire} solid>
            Request a pickup
          </ButtonLink>
          <ButtonLink href="/palettes">Choose colors first</ButtonLink>
        </div>
      </Band>
    </>
  );
}
