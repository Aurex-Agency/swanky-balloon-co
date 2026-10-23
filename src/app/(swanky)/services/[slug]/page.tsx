import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Sticker } from "@/components/swanky/brand/sticker";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { CardReveal } from "@/components/swanky/motion/reveal";
import { TransitionLink } from "@/components/swanky/motion/transition-link";
import { Band, SectionHead } from "@/components/swanky/ui/band";
import { ButtonLink } from "@/components/swanky/ui/button-link";
import { ServiceCard } from "@/components/swanky/ui/service-card";
import { portfolio, processSteps, services } from "@/data/swanky";

// Pick Up + Celebrate has its own page at /pickup.
const DETAIL = services.filter((s) => s.href.startsWith("/services/"));
const TONE = {
  blush: "blush",
  blue: "blue",
  gold: "ivory",
  sand: "ivory",
} as const;

export const dynamicParams = false;
export function generateStaticParams() {
  return DETAIL.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = DETAIL.find((d) => d.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: s.href },
  };
}

export default async function ServiceDetail({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = DETAIL.find((d) => d.slug === slug);
  if (!s) notFound();
  const inquire = `/inquire?${new URLSearchParams({ service: s.title })}`;
  return (
    <>
      <section
        className={`band band-${TONE[s.color]} page-hero`}
        aria-labelledby="service-title"
      >
        <PageIntro className="band-inner page-hero-inner">
          <div className="page-hero-copy">
            <p className="label" data-load="">
              <TransitionLink href="/services">Services</TransitionLink> ·{" "}
              {s.tag.toLowerCase()}
            </p>
            <h1 id="service-title" data-load="">
              {s.title}
            </h1>
            <p className="lede" data-load="">
              {s.lead}
            </p>
            <div className="cta-row" data-load="">
              <ButtonLink href={inquire} solid pop dot>
                Ask about {s.title.toLowerCase()}
              </ButtonLink>
            </div>
          </div>
          <div
            className={`page-hero-art page-hero-sticker tone-${s.color}`}
            data-load=""
          >
            <Sticker name={s.sticker} />
          </div>
        </PageIntro>
      </section>
      <Band tone="ivory" labelledBy="includes">
        <div className="split">
          <SectionHead
            eyebrow="What we make"
            id="includes"
            title={
              <>
                Pieces in <em>this collection.</em>
              </>
            }
          >
            {s.note}
          </SectionHead>
          <ul className="include-list">
            {s.includes.map((item) => (
              <li key={item}>
                <Sticker name="sparkle" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Band>
      <Band tone="blue" labelledBy="service-work">
        <SectionHead
          eyebrow="Recent work"
          id="service-work"
          title={
            <>
              A few <em>Swanky moments.</em>
            </>
          }
        />
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
              <span className="photo-caption">{item.title}</span>
            </TransitionLink>
          ))}
        </CardReveal>
      </Band>
      <Band tone="blush" labelledBy="service-steps">
        <SectionHead
          eyebrow="How it works"
          id="service-steps"
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
      <Band tone="ivory" labelledBy="more-services">
        <SectionHead
          eyebrow="Keep exploring"
          id="more-services"
          title={
            <>
              More ways <em>to celebrate.</em>
            </>
          }
        />
        <CardReveal className="service-cards three">
          {services
            .filter((o) => o.slug !== s.slug)
            .map((o) => (
              <ServiceCard key={o.slug} service={o} />
            ))}
        </CardReveal>
      </Band>
    </>
  );
}
