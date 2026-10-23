import type { Metadata } from "next";
import { Sticker } from "@/components/swanky/brand/sticker";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { CardReveal } from "@/components/swanky/motion/reveal";
import { Band, SectionHead } from "@/components/swanky/ui/band";
import { ButtonLink } from "@/components/swanky/ui/button-link";
import { ServiceCard } from "@/components/swanky/ui/service-card";
import { balloonMenu, services } from "@/data/swanky";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom balloon installations, garlands and backdrops, helium arrangements and pickup balloons in Nashville and Middle Tennessee.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section
        className="band band-ivory page-hero"
        aria-labelledby="services-title"
      >
        <PageIntro className="band-inner page-hero-inner">
          <div className="page-hero-copy">
            <p className="label" data-load="">
              Services
            </p>
            <h1 id="services-title" data-load="">
              A little something, <em>or a whole moment.</em>
            </h1>
            <p className="lede" data-load="">
              Four ways to celebrate, from a bundle to bring along to an
              installation that fills the room.
            </p>
          </div>
          <div className="page-hero-art page-hero-sticker" data-load="">
            <Sticker name="balloon-dog" />
          </div>
        </PageIntro>
      </section>
      <Band tone="blush" labelledBy="collections">
        <h2 id="collections" className="sr-only">
          The four collections
        </h2>
        <CardReveal className="service-cards">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </CardReveal>
      </Band>
      <Band tone="ivory" labelledBy="menu">
        <SectionHead
          eyebrow="The balloon menu"
          id="menu"
          title={
            <>
              Everything we make, <em>in one place.</em>
            </>
          }
        >
          {balloonMenu.note}
        </SectionHead>
        <div className="menu-cols">
          <div className="menu-col">
            <h3>Pick up</h3>
            <ul>
              {balloonMenu.pickup.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <ButtonLink href="/pickup">Order a pickup</ButtonLink>
          </div>
          <div className="menu-col">
            <h3>Delivery + setup</h3>
            <ul>
              {balloonMenu.delivery.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <ButtonLink href="/inquire" solid>
              Start your inquiry
            </ButtonLink>
          </div>
        </div>
      </Band>
    </>
  );
}
