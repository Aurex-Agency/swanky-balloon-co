import { brand, faqs } from "@/data/swanky";

const origin = () => process.env.NEXT_PUBLIC_SITE_URL || brand.website;

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is built from our own static data; escape "<" so it can't close the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** LocalBusiness schema for the site. Only facts already confirmed in the data file. */
export function LocalBusinessJsonLd() {
  const url = origin();
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${url}/#business`,
        name: brand.name,
        url,
        description: brand.description,
        logo: `${url}/swanky/brand/logo/swanky-logo.png`,
        image: `${url}/og.png`,
        sameAs: [brand.instagram],
        areaServed: [
          { "@type": "City", name: "Nashville" },
          { "@type": "City", name: "Brentwood" },
          { "@type": "AdministrativeArea", name: "Middle Tennessee" },
        ],
      }}
    />
  );
}

export function FaqJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}
