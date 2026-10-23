import type { Metadata } from "next";
import { Sticker } from "@/components/swanky/brand/sticker";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { FaqJsonLd } from "@/components/swanky/seo/json-ld";
import { FaqTabs } from "@/components/swanky/studio/faq-tabs";
import { Band } from "@/components/swanky/ui/band";
import { ButtonLink } from "@/components/swanky/ui/button-link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about booking, design, pickup and delivery with Swanky Balloon Co.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />
      <section
        className="band band-ivory page-hero"
        aria-labelledby="faq-title"
      >
        <PageIntro className="band-inner page-hero-inner">
          <div className="page-hero-copy">
            <p className="label" data-load="">
              FAQ
            </p>
            <h1 id="faq-title" data-load="">
              Good questions. <em>Happy answers.</em>
            </h1>
            <p className="lede" data-load="">
              Booking, colors, pickup and delivery. If you don’t see your
              question, ask it in your inquiry.
            </p>
          </div>
          <div className="page-hero-art page-hero-sticker" data-load="">
            <Sticker name="heart-bubble" />
          </div>
        </PageIntro>
      </section>
      <Band tone="blue" labelledBy="faq-list">
        <h2 id="faq-list" className="sr-only">
          Questions
        </h2>
        <FaqTabs />
        <div className="cta-row left faq-cta">
          <ButtonLink href="/inquire" solid pop dot>
            Tell us what you’re celebrating
          </ButtonLink>
        </div>
      </Band>
    </>
  );
}
