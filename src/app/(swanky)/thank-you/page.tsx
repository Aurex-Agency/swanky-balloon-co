import type { Metadata } from "next";
import { Garland } from "@/components/swanky/brand/garland";
import { Confirmation } from "@/components/swanky/inquiry/confirmation";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { ButtonLink } from "@/components/swanky/ui/button-link";
import { brand, copy } from "@/data/swanky";

export const metadata: Metadata = {
  title: "Here’s to Something Lovely",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYou() {
  return (
    <section
      className="band band-ivory thank-you"
      aria-labelledby="thanks-title"
    >
      <PageIntro className="band-inner thank-you-inner">
        <div className="closing-arch" data-load="">
          <Garland variant="arch" />
        </div>
        <p className="label" data-load="">
          Your inquiry is in good hands
        </p>
        <h1 id="thanks-title" data-load="">
          Here’s to <em>something lovely.</em>
        </h1>
        <p className="lede" data-load="">
          {copy.confirmation}
        </p>
        <div data-load="">
          <Confirmation />
        </div>
        <div className="cta-row" data-load="">
          <ButtonLink href="/" solid>
            Return home
          </ButtonLink>
          <ButtonLink href="/work">Explore the work</ButtonLink>
          <a
            className="btn"
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Instagram <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </PageIntro>
    </section>
  );
}
