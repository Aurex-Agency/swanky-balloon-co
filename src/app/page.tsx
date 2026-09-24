import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Plus, Check } from "lucide-react";
import {
  brand,
  copy,
  portfolio,
  services,
  processSteps,
  faqs,
  testimonials,
} from "@/data/swanky";
import { PortfolioArt, BalloonCluster } from "@/components/balloons";
import { PaletteLab } from "@/components/palette-lab";
import { Gallery } from "@/components/gallery";
import { EventLine } from "@/components/event-line";
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
            Make the
            <br />
            moment
            <br />
            <span className="hero-pink">impossible</span>
            <br />
            to miss<span className="pink-text">.</span>
          </h1>
          <p>{copy.hero.description}</p>
          <div className="hero-actions">
            <Link className="button button-ink" href="/inquire">
              Start Your Party <ArrowUpRight size={20} />
            </Link>
            <Link className="text-link" href="/gallery">
              Explore the Gallery <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-area">
            <span className="tiny-star">✳</span> Nashville · Brentwood · Middle
            Tennessee
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
          <Image
            className="hero-sticker"
            src="/swanky/brand/party.png"
            alt=""
            width={190}
            height={190}
          />
          <Image
            className="hero-sparkle"
            src="/swanky/brand/sparkle.png"
            alt=""
            width={115}
            height={140}
          />
          <span className="collage-note">a little extra. a lot of you.</span>
        </div>
      </section>
      <EventLine />
      <section className="statement section">
        <div className="statement-art">
          <PortfolioArt item={portfolio[4]} />
          <Image
            src="/swanky/brand/smiley.png"
            width={120}
            height={120}
            alt=""
            className="statement-sticker"
          />
        </div>
        <div className="statement-copy">
          <span className="eyebrow">MORE THAN A PRETTY PARTY</span>
          <h2>
            Not your
            <br />
            average
            <br />
            party backdrop<span className="pink-text">.</span>
          </h2>
          <p>{copy.statement.description}</p>
          <Link href="/inquire" className="text-link">
            Let’s dream something up <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
      <section className="services-section section" id="services">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHAT CAN WE CREATE?</span>
            <h2>
              Pick the moment.
              <br />
              We’ll bring the magic.
            </h2>
          </div>
          <p>
            From a little celebration
            <br />
            to a can’t-miss statement.
          </p>
        </div>
        <div className="service-grid">
          {services.map((s, i) => (
            <Link
              href={`/inquire?service=${encodeURIComponent(s.title)}`}
              className={`service-card service-${s.color}`}
              key={s.title}
            >
              <div className="service-number">
                <span>({s.number})</span>
                <ArrowUpRight />
              </div>
              <div className={`service-symbol symbol-${i}`} aria-hidden="true">
                {i === 0 ? (
                  <BalloonCluster />
                ) : i === 1 ? (
                  <span className="mini-arches">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : i === 2 ? (
                  <span className="big-asterisk">✳</span>
                ) : (
                  <span className="big-word">
                    HEY
                    <br />
                    YOU.
                  </span>
                )}
              </div>
              <span className="service-tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <PaletteLab />
      <section className="portfolio-section section" id="work">
        <div className="section-heading">
          <div>
            <span className="eyebrow">RECENT MAGIC</span>
            <h2>
              Made for the moment.
              <br />
              Built for the camera.
            </h2>
          </div>
          <p>
            A peek at the possibilities.
            <br />
            Color studies, ready for your story.
          </p>
        </div>
        <Gallery limit={6} />
        <div className="center-action">
          <Link className="button button-outline" href="/gallery">
            View the Full Gallery <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
      <section className="process-section section" id="process">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>
              From “I have an idea”
              <br />
              to “this is perfect.”
            </h2>
          </div>
          <Image
            src="/swanky/brand/lightning.png"
            alt=""
            width={65}
            height={95}
          />
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
          <span className="eyebrow">ALL THE FUN. A CLEAR WAY FORWARD.</span>
          <h2>
            One clear plan for
            <br />
            your biggest moments.
          </h2>
        </div>
        <div>
          <ul className="benefit-list">
            {copy.benefits.map((b) => (
              <li key={b}>
                <Check size={20} />
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
            Come along on Instagram <ArrowUpRight size={19} />
          </a>
        </div>
        <div className="about-art">
          {brand.founderImage ? (
            <>
              <Image
                src={brand.founderImage}
                fill
                sizes="(max-width:700px) 100vw,50vw"
                alt="The creative behind Swanky Balloon Co."
              />
              <span>Meet the creative behind Swanky</span>
            </>
          ) : (
            <>
              <Image
                src="/swanky/brand/disco.png"
                width={390}
                height={390}
                alt=""
              />
              <span>
                BIG ON
                <br />
                GOOD TIMES.
              </span>
            </>
          )}
        </div>
      </section>
      <section className="proof-section section">
        <span className="eyebrow">MADE TO BE REMEMBERED</span>
        <h2>
          The kind of moment
          <br />
          people keep talking about.
        </h2>
        {testimonials.length ? (
          testimonials.map((t) => (
            <blockquote key={t.attribution}>
              {t.quote}
              <cite>{t.attribution}</cite>
            </blockquote>
          ))
        ) : (
          <p>
            Designed to look incredible in the room and even better in the
            photos.
          </p>
        )}
        <div className="proof-strip">
          {[portfolio[1], portfolio[3], portfolio[5]].map((p) => (
            <PortfolioArt item={p} key={p.id} />
          ))}
        </div>
      </section>
      <section className="faq-section section" id="faq">
        <div>
          <span className="eyebrow">THE PARTY PARTICULARS</span>
          <h2>
            Good questions.
            <br />
            Clear answers.
          </h2>
          <p>A little clarity before the confetti.</p>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.question}>
              <summary>
                {f.question}
                <Plus size={21} />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="closing section">
        <span className="eyebrow">HAVE A DATE IN MIND?</span>
        <h2>{copy.closing.title}</h2>
        <p>{copy.closing.description}</p>
        <Link href="/inquire" className="button button-ink">
          Start Your Party <ArrowUpRight size={21} />
        </Link>
        <Image
          src="/swanky/brand/cant-pop.png"
          alt=""
          width={170}
          height={170}
        />
        <span className="closing-star" aria-hidden="true">
          ✳
        </span>
      </section>
    </>
  );
}
