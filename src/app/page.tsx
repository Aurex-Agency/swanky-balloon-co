import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Plus, Check } from "lucide-react";
import {
  brand,
  copy,
  portfolio,
  services,
  balloonMenu,
  processSteps,
  faqs,
  testimonials,
} from "@/data/swanky";
import { PortfolioArt, BalloonCluster } from "@/components/balloons";
import { PaletteLab } from "@/components/palette-lab";
import { Gallery } from "@/components/gallery";
import { EventLine } from "@/components/event-line";
import { BrandSeal, Wordmark } from "@/components/wordmark";
export default function Home() {
  return (
    <>
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
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">{copy.hero.eyebrow}</span>
          <h1>
            {copy.hero.lines[0]}
            <br />
            <em>{copy.hero.lines[1]}</em>
            <br />
            {copy.hero.lines[2]}
          </h1>
          <p>{copy.hero.description}</p>
          <div className="hero-actions">
            <Link className="button button-ink" href="/inquire">
              {copy.cta}
              <ArrowUpRight size={18} />
            </Link>
            <Link className="text-link" href="/gallery">
              View Our Work <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-area">
            Nashville · Brentwood · Middle Tennessee
          </div>
        </div>
        <div className="hero-collage">
          <div className="hero-main-art">
            <PortfolioArt item={portfolio[0]} priority />
          </div>
          <div className="hero-small-art">
            <PortfolioArt item={portfolio[1]} />
          </div>
          <div className="hero-third-art">
            <PortfolioArt item={portfolio[2]} />
          </div>
          <div className="hero-seal">
            <BrandSeal />
          </div>
          <span className="collage-note">
            Thoughtfully made. Happily celebrated.
          </span>
        </div>
      </section>
      <EventLine />
      <section className="statement section">
        <div className="statement-art">
          <PortfolioArt item={portfolio[1]} />
          <span className="photo-footnote">
            Pink, ivory & a few delicate details.
          </span>
        </div>
        <div className="statement-copy">
          <span className="eyebrow">A CELEBRATION THAT FEELS LIKE YOU</span>
          <h2>{copy.statement.title}</h2>
          <p>{copy.statement.description}</p>
          <Link href="/inquire" className="text-link">
            Tell us what you’re imagining <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="services-section section" id="services">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{copy.services.eyebrow}</span>
            <h2>{copy.services.title}</h2>
          </div>
          <p>{copy.services.description}</p>
        </div>
        <div className="service-grid">
          {services.map((s, i) => (
            <Link
              href={`/inquire?service=${encodeURIComponent(s.title)}`}
              className={`service-card service-${s.color}`}
              key={s.title}
            >
              <div className="service-number">
                <span>0{i + 1}</span>
                <ArrowUpRight size={19} />
              </div>
              <div className={`service-symbol symbol-${i}`} aria-hidden="true">
                {i === 1 ? (
                  <span className="mini-arches">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : (
                  <BalloonCluster
                    colors={
                      i === 0
                        ? ["#8c9aa8", "#f2eee5", "#a7b5a0"]
                        : i === 2
                          ? ["#f2eee5", "#b4a18d", "#d2c5a6"]
                          : ["#d6abb1", "#f2eee5", "#b4a18d"]
                    }
                  />
                )}
              </div>
              <span className="service-tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </Link>
          ))}
        </div>
        <div className="balloon-menu">
          <div className="menu-intro">
            <span className="eyebrow">THE BALLOON MENU</span>
            <h3>
              A little something, <br />
              or the whole room.
            </h3>
            <p>{balloonMenu.note}</p>
          </div>
          <div>
            <h3>Pick up & celebrate</h3>
            <ul>
              {balloonMenu.pickup.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Delivered for your occasion</h3>
            <ul>
              {balloonMenu.delivery.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <PaletteLab />
      <section className="portfolio-section section" id="work">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{copy.gallery.eyebrow}</span>
            <h2>{copy.gallery.title}</h2>
          </div>
          <p>{copy.gallery.description}</p>
        </div>
        <Gallery />
        <div className="center-action">
          <Link className="button button-outline" href="/gallery">
            Explore the Gallery <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="process-section section" id="process">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM THE FIRST IDEA</span>
            <h2>
              A lovely plan,
              <br />
              from start to celebration.
            </h2>
          </div>
          <p>
            Share what you know.
            <br />
            We’ll work through the details together.
          </p>
        </div>
        <div className="process-grid">
          {processSteps.map((s, i) => (
            <article key={s.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="plan-section section">
        <div>
          <span className="eyebrow">ROOM TO ENJOY THE MOMENT</span>
          <h2>
            Your vision.
            <br />A clear way forward.
          </h2>
        </div>
        <div>
          <ul className="benefit-list">
            {copy.benefits.map((b) => (
              <li key={b}>
                <Check size={19} />
                {b}
              </li>
            ))}
          </ul>
          <div className="journey">
            {["Vision", "Design", "Approval", "Event Day"].map((s, i) => (
              <span key={s}>
                {s}
                {i < 3 && <ArrowRight size={17} />}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="about-section section" id="about">
        <div>
          <span className="eyebrow">A LITTLE ABOUT SWANKY</span>
          <h2>{copy.about.title}</h2>
          <p>{copy.about.description}</p>
          <a
            className="text-link"
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Follow along on Instagram <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="about-art">
          {brand.founderImage ? (
            <Image
              src={brand.founderImage}
              fill
              sizes="(max-width:700px) 100vw,50vw"
              alt="The creative behind Swanky Balloon Co."
            />
          ) : (
            <>
              <BrandSeal />
              <Wordmark />
              <p>
                Beautifully personal.
                <br />
                Unmistakably Swanky.
              </p>
            </>
          )}
        </div>
      </section>
      <section className="proof-section section">
        <span className="eyebrow">GATHER. CELEBRATE. REMEMBER.</span>
        <h2>
          For the room.
          <br />
          For the photographs.
          <br />
          <em>For the memories.</em>
        </h2>
        {testimonials.length ? (
          testimonials.map((t) => (
            <blockquote key={t.attribution}>
              {t.quote}
              <cite>{t.attribution}</cite>
            </blockquote>
          ))
        ) : (
          <p>A few of the details from Swanky celebrations.</p>
        )}
        <div className="proof-strip">
          {portfolio.map((p) => (
            <PortfolioArt item={p} key={p.id} />
          ))}
        </div>
      </section>
      <section className="faq-section section" id="faq">
        <div>
          <span className="eyebrow">BEFORE WE BEGIN</span>
          <h2>
            A few things
            <br />
            you may be wondering.
          </h2>
          <p>The details, made a little clearer.</p>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.question}>
              <summary>
                {f.question}
                <Plus size={20} />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="closing section">
        <span className="eyebrow">AN OCCASION IN MIND?</span>
        <h2>{copy.closing.title}</h2>
        <p>{copy.closing.description}</p>
        <Link href="/inquire" className="button button-ink">
          {copy.cta}
          <ArrowUpRight size={18} />
        </Link>
        <div className="closing-seal">
          <BrandSeal />
        </div>
      </section>
    </>
  );
}
