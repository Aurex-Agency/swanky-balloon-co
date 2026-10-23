import Link from "next/link";
import { ArrowUpRight, ArrowRight, ArrowDown, Plus } from "lucide-react";
import {
  brand,
  copy,
  portfolio,
  services,
  balloonMenu,
  processSteps,
  faqs,
} from "@/data/swanky";
import { PortfolioArt } from "@/components/balloons";
import { PaletteLab } from "@/components/palette-lab";
import { Gallery } from "@/components/gallery";
import { EventLine } from "@/components/event-line";
import { BrandSeal } from "@/components/wordmark";
import { HeroGallery } from "@/components/hero-gallery";
import styles from "./home.module.css";

function Ribbon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 520"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M361 -20C305 95 57 33 81 151C101 250 307 182 282 302C262 398 56 325 22 475C17 497 21 521 38 540"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M372 -20C316 95 68 33 92 151C112 250 318 182 293 302C273 398 67 325 33 475C28 497 32 521 49 540"
        stroke="currentColor"
        strokeWidth=".6"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className={styles.home}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: brand.name,
            url: brand.website,
            description: brand.description,
            sameAs: [brand.instagram],
            areaServed: ["Nashville", "Brentwood", "Middle Tennessee"],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className={`hero ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow">BALLOONS & GOOD TIMES / NASHVILLE, TN</span>
          <h1>
            <span>Life’s a party.</span>Make it <em>Swanky.</em>
          </h1>
          <p>{copy.hero.description}</p>
          <div className={styles.heroActions}>
            <Link className="button button-ink" href="/inquire">
              {copy.cta}
              <ArrowUpRight size={18} />
            </Link>
            <Link className="text-link" href="/gallery">
              View Our Work
              <ArrowRight size={17} />
            </Link>
          </div>
          <a href="#services" className={styles.heroFoot}>
            <span className={styles.scrollCircle}>
              <ArrowDown size={16} />
            </span>
            <span>A little extra. A lot to celebrate.</span>
          </a>
        </div>
        <HeroGallery />
        <span className={styles.heroIndex} aria-hidden="true">
          THERE’S ALWAYS A REASON.
        </span>
      </section>
      <div className={styles.eventLine}>
        <EventLine />
      </div>

      <section className={styles.introduction}>
        <span className="eyebrow">FOR THE HOSTS WHO THINK OF EVERYTHING</span>
        <h2>
          Some call it extra.
          <br />
          We call it <em>the occasion.</em>
        </h2>
        <div className={styles.introBottom}>
          <span className={styles.introNote}>
            The first “wow.” <br />
            The last photo.
          </span>
          <p>
            A birthday at home. A room full of your favorite people. A brand
            with something to celebrate. We make the balloons feel like they
            belong to you.
          </p>
          <Link
            href="/inquire"
            className={styles.roundLink}
            aria-label="Tell us about your occasion"
          >
            <ArrowUpRight size={30} />
          </Link>
        </div>
        <Ribbon className={styles.introRibbon} />
      </section>

      <section className={styles.collection} id="services">
        <div className={styles.collectionHeading}>
          <span className="eyebrow">01 / THE BALLOON COLLECTION</span>
          <h2>
            A little something.
            <br />
            <em>Or a whole moment.</em>
          </h2>
        </div>
        <div className={styles.collectionLayout}>
          <div className={styles.collectionPhoto}>
            <PortfolioArt item={portfolio[1]} />
            <span className={styles.photoCaption}>Made to be remembered.</span>
            <div className={styles.paletteTag}>
              <span>THE PALETTE</span>
              <i style={{ background: "#d6abb1" }} />
              <i style={{ background: "#f2eee5" }} />
              <i style={{ background: "#b4a18d" }} />
            </div>
          </div>
          <div className={styles.serviceList}>
            {services.map((service, i) => (
              <Link
                href={`/inquire?service=${encodeURIComponent(service.title)}`}
                className={styles.serviceRow}
                key={service.title}
              >
                <span className={styles.serviceNumber}>0{i + 1}</span>
                <div>
                  <span className={styles.serviceTag}>{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <ArrowUpRight size={23} />
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.menu}>
          <div>
            <span className="eyebrow">SOMETHING IN MIND?</span>
            <h3>The balloon menu.</h3>
            <p>{balloonMenu.note}</p>
          </div>
          <div className={styles.menuOptions}>
            {[
              { title: "Pick up & celebrate", items: balloonMenu.pickup },
              {
                title: "Delivered for your occasion",
                items: balloonMenu.delivery,
              },
            ].map((group) => (
              <details key={group.title}>
                <summary>
                  {group.title}
                  <Plus size={22} />
                </summary>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href="/inquire" className="text-link">
                  Ask about your favorites
                  <ArrowUpRight size={16} />
                </Link>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.colorStudio}>
        <PaletteLab />
      </div>

      <section className={styles.work} id="work">
        <div className={styles.workHeading}>
          <div>
            <span className="eyebrow">02 / OUT IN THE WORLD</span>
            <h2>
              A very good
              <br />
              <em>reason to gather.</em>
            </h2>
          </div>
          <p>
            Real celebrations. <br />A few of our favorite details.
          </p>
        </div>
        <Gallery showFilters={false} />
        <div className={styles.workFooter}>
          <span>Your occasion could be next.</span>
          <Link href="/gallery" className="text-link">
            More Swanky moments
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className={styles.process} id="process">
        <div className={styles.processIntro}>
          <span className="eyebrow">03 / FROM IDEA TO OCCASION</span>
          <h2>
            You bring the reason.
            <br />
            <em>We’ll bring the balloons.</em>
          </h2>
          <p>
            No fully formed vision required. Start with your date, your space
            and a few things you love.
          </p>
        </div>
        <div className={styles.processSteps}>
          {processSteps.map((step, i) => (
            <article key={step.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.about} id="about">
        <div className={styles.aboutHeading}>
          <BrandSeal />
          <span className="eyebrow">
            NASHVILLE, BRENTWOOD & MIDDLE TENNESSEE
          </span>
        </div>
        <h2>
          A little more color.
          <br />A little more <em>Swanky.</em>
        </h2>
        <div className={styles.aboutBottom}>
          <span>Personal by design.</span>
          <p>{copy.about.description}</p>
          <a
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Follow the celebrations
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section className={styles.faq} id="faq">
        <div>
          <span className="eyebrow">THE LITTLE DETAILS</span>
          <h2>
            Before the
            <br />
            <em>celebration.</em>
          </h2>
          <p>A few answers to get things started.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <Plus size={20} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finale}>
        <Ribbon className={styles.finaleRibbon} />
        <span className="eyebrow">YOUR OCCASION. OUR NEXT CREATION.</span>
        <h2>
          Let’s make
          <br />
          <em>a scene.</em>
        </h2>
        <div className={styles.finaleBottom}>
          <p>
            Tell us what you’re celebrating.
            <br />
            We’ll take it from there, together.
          </p>
          <Link href="/inquire" className="button">
            {copy.cta}
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <span className={styles.finaleNote}>With love, Swanky.</span>
      </section>
    </div>
  );
}
