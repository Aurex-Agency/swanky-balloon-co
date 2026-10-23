import Image from "next/image";
import { BalloonTrio } from "@/components/swanky/brand/balloon-trio";
import { Garland } from "@/components/swanky/brand/garland";
import { HeroStage } from "@/components/swanky/brand/hero-stage";
import { PaletteChips } from "@/components/swanky/brand/palette-chips";
import { PopCounter } from "@/components/swanky/brand/pop-counter";
import { Sticker } from "@/components/swanky/brand/sticker";
import { Marquee } from "@/components/swanky/motion/marquee";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { CardReveal } from "@/components/swanky/motion/reveal";
import { RotatingWord } from "@/components/swanky/motion/rotating-word";
import { StackingSlider } from "@/components/swanky/motion/stacking-slider";
import { TransitionLink } from "@/components/swanky/motion/transition-link";
import { Band, SectionHead } from "@/components/swanky/ui/band";
import { ButtonLink } from "@/components/swanky/ui/button-link";
import { ServiceCard } from "@/components/swanky/ui/service-card";
import {
  copy,
  portfolio,
  processSteps,
  services,
  swatches,
  vibes,
} from "@/data/swanky";
import type { StickerName } from "@/lib/swanky/stickers";

const colorName = (hex: string) =>
  swatches.find((s) => s.hex === hex)?.name ?? hex;
const paletteHref = (v: { name: string; colors: string[] }) =>
  `/inquire?${new URLSearchParams({ vibe: v.name, colors: v.colors.join(",") })}`;
const BENEFIT_STICKERS: StickerName[] = ["envelope", "heart-bubble", "cake"];

export default function Home() {
  return (
    <>
      <section className="band band-ivory hero" aria-labelledby="home-title">
        <PageIntro className="band-inner">
          <p className="label hero-tag" data-load="">
            <span>Custom balloons · Nashville, Tennessee</span>
            <PopCounter />
          </p>
          <HeroStage
            word="Swanky"
            id="home-title"
            garland={<Garland variant="hero" interactive />}
            stickers={
              <>
                <div
                  className="hero-sticker hs-dog"
                  data-hero-sticker=""
                  data-drag=""
                >
                  <div data-float="">
                    <Sticker name="balloon-dog" />
                  </div>
                </div>
                <div
                  className="hero-sticker hs-star"
                  data-hero-sticker=""
                  data-drag=""
                >
                  <div data-float="">
                    <Sticker name="sparkle" />
                  </div>
                </div>
                <div
                  className="hero-sticker hs-seal"
                  data-hero-sticker=""
                  data-drag=""
                >
                  <div data-float="">
                    <Sticker name="seal-blush" />
                  </div>
                </div>
                <div
                  className="hero-sticker hs-cake"
                  data-hero-sticker=""
                  data-drag=""
                >
                  <div data-float="">
                    <Sticker name="cake" />
                  </div>
                </div>
              </>
            }
          />
          <div className="hero-copy">
            <p className="tagline" data-load="">
              <span className="sr-only">
                A little more celebration, for every occasion.
              </span>
              <span aria-hidden="true">
                A little more celebration <br className="br-sm" />
                for your{" "}
              </span>
              <RotatingWord
                words={[
                  "birthday.",
                  "wedding.",
                  "baby shower.",
                  "grand opening.",
                  "Tuesday.",
                ]}
              />
            </p>
            <p className="lede" data-load="">
              Custom balloon installations, garlands and helium arrangements for
              Nashville, Brentwood and Middle Tennessee.
            </p>
            <div className="cta-row" data-load="">
              <ButtonLink href="/inquire" solid pop dot>
                Tell us what you’re celebrating
              </ButtonLink>
              <ButtonLink href="/work">See the work</ButtonLink>
            </div>
            <div data-load="">
              <PaletteChips />
            </div>
          </div>
        </PageIntro>
      </section>

      <Band tone="blush" labelledBy="home-details">
        <div className="split">
          <SectionHead
            eyebrow="Thoughtful, with a wink"
            id="home-details"
            title={
              <>
                The details <em>make it yours.</em>
              </>
            }
          >
            {copy.statement.description}
          </SectionHead>
          <ul className="benefits">
            {copy.benefits.map((b, i) => (
              <li key={b}>
                <Sticker name={BENEFIT_STICKERS[i]} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      <Band tone="ivory" labelledBy="home-services">
        <SectionHead
          eyebrow="The balloon collection"
          id="home-services"
          title={
            <>
              Balloons for the moments <em>you want to remember.</em>
            </>
          }
        >
          From a bundle to bring along to an installation that fills the room.
        </SectionHead>
        <CardReveal className="service-cards">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </CardReveal>
      </Band>

      <Band tone="blue" labelledBy="home-work">
        <div className="head-row">
          <SectionHead
            eyebrow="A few Swanky moments"
            id="home-work"
            title={
              <>
                It’s all in <em>the details.</em>
              </>
            }
          >
            Real installations, personal palettes and everything in between.
          </SectionHead>
          <ButtonLink href="/work">See all work</ButtonLink>
        </div>
        <CardReveal className="photo-row">
          {portfolio.map((item) => (
            <TransitionLink
              key={item.id}
              href={`/work/${item.id}`}
              className="photo-card"
              data-card=""
            >
              <Image
                src={item.image!}
                alt={item.alt}
                width={900}
                height={1150}
                sizes="(max-width: 760px) 92vw, 30vw"
              />
              <span className="photo-caption">
                <span className="dots" aria-hidden="true">
                  {item.colors.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </span>
                {item.title}
              </span>
            </TransitionLink>
          ))}
        </CardReveal>
      </Band>

      <Band tone="ivory" labelledBy="home-palettes">
        <div className="head-row">
          <SectionHead
            eyebrow="The color studio"
            id="home-palettes"
            title={
              <>
                Every celebration begins <em>with a palette.</em>
              </>
            }
          >
            Drag through a few favorites, then bring one into your inquiry.
            Final colors are confirmed during design.
          </SectionHead>
          <ButtonLink href="/palettes">Open the color studio</ButtonLink>
        </div>
        <StackingSlider label="Palettes">
          {vibes.map((v) => (
            <div className="palette-card" key={v.name}>
              <BalloonTrio colors={v.colors} />
              <div>
                <h3>{v.name}</h3>
                <p className="label">{v.colors.map(colorName).join(" · ")}</p>
              </div>
              <TransitionLink href={paletteHref(v)} className="pill">
                Use this palette <span className="sr-only">({v.name})</span>
              </TransitionLink>
            </div>
          ))}
        </StackingSlider>
      </Band>

      <Band tone="blush" labelledBy="home-process">
        <SectionHead
          eyebrow="How it works"
          id="home-process"
          title={
            <>
              From first idea <em>to party time.</em>
            </>
          }
        />
        <ol className="steps">
          {processSteps.map((step, i) => (
            <li key={step.title}>
              <span className="step-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </Band>

      <section
        className="band band-olive scallop-top marquee-band"
        aria-label="Get Swanky"
      >
        <p className="sr-only">Get Swanky. Celebrate beautifully.</p>
        <div className="mq-sticker mq-dog" aria-hidden="true">
          <Sticker name="balloon-dog" />
        </div>
        <div className="mq-sticker mq-seal" aria-hidden="true">
          <Sticker name="seal-blush" />
        </div>
        <Marquee
          rows={[
            { text: "Get Swanky", dir: -1, speed: 26 },
            { text: "Celebrate beautifully", dir: 1, speed: 30 },
          ]}
        />
      </section>

      <Band tone="ivory" labelledBy="home-close" className="closing">
        <div className="closing-inner">
          <div className="closing-arch">
            <Garland variant="arch" />
          </div>
          <div className="closing-copy">
            <p className="label">Something lovely starts here</p>
            <h2 id="home-close">
              Tell us what <em>you’re celebrating.</em>
            </h2>
            <p>{copy.closing.description}</p>
            <div className="cta-row">
              <ButtonLink href="/inquire" solid pop dot>
                Start your inquiry
              </ButtonLink>
              <ButtonLink href="/pickup">Order a pickup</ButtonLink>
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
