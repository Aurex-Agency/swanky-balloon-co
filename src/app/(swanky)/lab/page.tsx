import type { Metadata } from "next";
import Link from "next/link";
import { Garland } from "@/components/swanky/brand/garland";
import { HeroStage } from "@/components/swanky/brand/hero-stage";
import { PaletteChips } from "@/components/swanky/brand/palette-chips";
import { PopCounter } from "@/components/swanky/brand/pop-counter";
import { Sticker } from "@/components/swanky/brand/sticker";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { CardReveal } from "@/components/swanky/motion/reveal";
import { Band, SectionHead } from "@/components/swanky/ui/band";
import { ButtonLink } from "@/components/swanky/ui/button-link";
import type { StickerName } from "@/lib/swanky/stickers";
import styles from "./lab.module.css";

// Phase 1 foundation lab: proves tokens, fonts, motion core, transitions, stickers and the
// garland before real pages are rebuilt. Unlinked and noindex.
export const metadata: Metadata = {
  title: "Foundation lab",
  robots: { index: false, follow: false },
};

const LIBRARY: [StickerName, string][] = [
  ["logo-primary", "Primary logo"],
  ["seal-blush", "Celebration seal"],
  ["seal-blue", "Wave seal"],
  ["monogram", "Monogram"],
  ["balloon-dog", "Balloon dog"],
  ["balloon", "Balloon"],
  ["cake", "Cake"],
  ["rings", "Rings"],
  ["bow", "Bow"],
  ["heart-bubble", "Heart note"],
  ["envelope", "Envelope"],
  ["sparkle", "Sparkle"],
  ["swoosh", "Garland swoosh"],
  ["scallop-label", "Scallop label"],
];

const SERVICES: { title: string; tag: string; sticker: StickerName; bg: string }[] = [
  { title: "Custom Installations", tag: "Made for your space", sticker: "swoosh", bg: "var(--blush)" },
  { title: "Garlands + Backdrops", tag: "Set the scene", sticker: "bow", bg: "var(--blue)" },
  { title: "Helium Moments", tag: "A little lift", sticker: "balloon", bg: "var(--gold)" },
  { title: "Pick Up + Celebrate", tag: "Your celebration, your way", sticker: "balloon-dog", bg: "var(--sand)" },
];

export default function FoundationLab() {
  return (
    <>
      <section className="band band-ivory hero" aria-label="Foundation lab hero">
        <PageIntro className="band-inner">
          <p className="label hero-tag" data-load="">
            <span>Phase 1 · Foundation lab</span>
            <PopCounter />
          </p>
          <HeroStage
            word="Swanky"
            garland={<Garland variant="hero" interactive />}
            stickers={
              <>
                <div className={`hero-sticker ${styles.dog}`} data-hero-sticker="" data-drag="">
                  <div data-float=""><Sticker name="balloon-dog" /></div>
                </div>
                <div className={`hero-sticker ${styles.star}`} data-hero-sticker="" data-drag="">
                  <div data-float=""><Sticker name="sparkle" /></div>
                </div>
                <div className={`hero-sticker ${styles.seal}`} data-hero-sticker="" data-drag="">
                  <div data-float=""><Sticker name="seal-blush" /></div>
                </div>
                <div className={`hero-sticker ${styles.cake}`} data-hero-sticker="" data-drag="">
                  <div data-float=""><Sticker name="cake" /></div>
                </div>
              </>
            }
          />
          <div className="hero-copy">
            <p className="tagline" data-load="">
              A little more <em>celebration.</em>
            </p>
            <p className="lede" data-load="">
              Tokens, fonts, motion core, page transitions, stickers and the garland, working together before the real pages are rebuilt.
            </p>
            <div className="cta-row" data-load="">
              <ButtonLink href="/lab/transition" solid pop dot>
                Play the page transition
              </ButtonLink>
              {/* The concept site uses the other root layout, so this is a plain full-page link. */}
              <Link className="btn" href="/">
                Current concept site
              </Link>
            </div>
            <div data-load="">
              <PaletteChips />
            </div>
          </div>
        </PageIntro>
      </section>

      <Band tone="blush" labelledBy="lab-stickers">
        <SectionHead eyebrow="Brand library" id="lab-stickers" title={<>Jenn’s logo, <em>our stickers.</em></>}>
          Logo marks are built from the master file in public/swanky/brand/logo. Stickers are drawn in code.
        </SectionHead>
        <div className={styles.stickers}>
          {LIBRARY.map(([name, label]) => (
            <div className={styles.stickerCard} key={name}>
              <Sticker name={name} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </Band>

      <Band tone="ivory" labelledBy="lab-cards">
        <SectionHead eyebrow="Card reveal" id="lab-cards" title={<>Balloons for the moments <em>you want to remember.</em></>} />
        <CardReveal className={styles.cards}>
          {SERVICES.map((s) => (
            <article className={styles.card} style={{ background: s.bg }} data-card="" key={s.title}>
              <span className="label">{s.tag}</span>
              <Sticker name={s.sticker} />
              <h3>{s.title}</h3>
            </article>
          ))}
        </CardReveal>
      </Band>

      <Band tone="olive" scallop labelledBy="lab-next">
        <div className={styles.next}>
          <p className="label">Page transition</p>
          <h2 id="lab-next">
            Watch the page <em>swing.</em>
          </h2>
          <div className={styles.row}>
            <ButtonLink href="/lab/transition" pop>
              Go to page two
            </ButtonLink>
          </div>
        </div>
      </Band>
    </>
  );
}
