import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryPlanner } from "@/components/swanky/inquiry/inquiry-planner";
import { brand, legal } from "@/data/swanky";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Tell Swanky Balloon Co. about your celebration: the date, the place, your colors and what you have in mind.",
  alternates: { canonical: "/inquire" },
};

export default function InquirePage() {
  return (
    <section className="band band-blush inquire" aria-label="Inquiry">
      <div className="band-inner">
        <Suspense>
          <InquiryPlanner />
        </Suspense>
        <section
          id="text-message-choices"
          className="prose sms-overview"
          aria-labelledby="text-message-choices-title"
        >
          <h2 id="text-message-choices-title">Your text message choices</h2>
          <p>
            {brand.legalName} offers two optional ways to stay in touch by text.
            Complete The Event, The Vision and The Investment, then enter your
            mobile number in step 4, Your Details. Select either, both or
            neither of the text message checkboxes, then choose Send My Inquiry.
            Entering a phone number alone does not subscribe you to texts.
          </p>
          <h3>Text me about my inquiry (optional)</h3>
          <p>{legal.smsDisclosure}</p>
          <h3>Send me offers and inspiration (optional)</h3>
          <p>{legal.marketingSmsDisclosure}</p>
          <p>
            Both boxes start unchecked. Inquiry texts and promotional texts have
            separate permissions. You can submit your inquiry without agreeing
            to either. These are the disclosures beside the checkboxes in step
            4; reading this information does not subscribe you.
          </p>
          <p>
            Read our <a href="/privacy">Privacy Policy</a> and{" "}
            <a href="/terms#text-messages">Text Message Terms</a>. For help,
            email{" "}
            <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>.
          </p>
        </section>
      </div>
    </section>
  );
}
