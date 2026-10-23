import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BalloonTrio } from "@/components/swanky/brand/balloon-trio";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { TransitionLink } from "@/components/swanky/motion/transition-link";
import { Band } from "@/components/swanky/ui/band";
import { ButtonLink } from "@/components/swanky/ui/button-link";
import { portfolio, swatches } from "@/data/swanky";

// The closest balloon colors from the inquiry swatches, so "Start with these colors"
// carries into the form.
const STARTERS: Record<string, { vibe: string; colors: string[] }> = {
  "botanical-greens": {
    vibe: "Build My Own",
    colors: ["#A7B5A0", "#565522", "#F7F0E6"],
  },
  "pink-ivory": {
    vibe: "Soft Bloom",
    colors: ["#E8C3BA", "#F7F0E6", "#C9B79F"],
  },
  "pink-lilac": {
    vibe: "Build My Own",
    colors: ["#E8C3BA", "#BCB4CD", "#CF8BAF"],
  },
};

export const dynamicParams = false;
export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolio.find((p) => p.id === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.story,
    alternates: { canonical: `/work/${item.id}` },
    openGraph: { images: [{ url: item.image! }] },
  };
}

export default async function WorkStory({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = portfolio.findIndex((p) => p.id === slug);
  if (index < 0) notFound();
  const item = portfolio[index];
  const next = portfolio[(index + 1) % portfolio.length];
  const starter = STARTERS[item.id];
  const names = starter.colors.map(
    (hex) => swatches.find((s) => s.hex === hex)?.name ?? hex,
  );

  return (
    <>
      <section className="band band-ivory story" aria-labelledby="story-title">
        <PageIntro className="band-inner story-inner">
          <div className="story-photo" data-load="">
            <Image
              src={item.image!}
              alt={item.alt}
              width={1200}
              height={1500}
              sizes="(max-width: 900px) 92vw, 50vw"
              priority
            />
          </div>
          <div className="story-copy">
            <p className="label" data-load="">
              <TransitionLink href="/work">Work</TransitionLink> ·{" "}
              {item.category}
            </p>
            <h1 id="story-title" data-load="">
              {item.title}
            </h1>
            <p className="lede" data-load="">
              {item.story}
            </p>
            <div className="story-palette" data-load="">
              <BalloonTrio colors={starter.colors} />
              <div>
                <p className="label">The palette</p>
                <p>{names.join(" · ")}</p>
              </div>
            </div>
            <div className="cta-row" data-load="">
              <ButtonLink
                href={`/inquire?${new URLSearchParams({ vibe: starter.vibe, colors: starter.colors.join(",") })}`}
                solid
                pop
                dot
              >
                Start with these colors
              </ButtonLink>
              <ButtonLink href="/work">All work</ButtonLink>
            </div>
          </div>
        </PageIntro>
      </section>
      <Band tone="blush" labelledBy="story-next">
        <div className="next-story">
          <p className="label">Next celebration</p>
          <h2 id="story-next">
            <TransitionLink href={`/work/${next.id}`}>
              {next.title} <span aria-hidden="true">→</span>
            </TransitionLink>
          </h2>
        </div>
      </Band>
    </>
  );
}
