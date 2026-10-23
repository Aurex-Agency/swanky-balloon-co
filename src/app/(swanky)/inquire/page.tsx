import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryPlanner } from "@/components/swanky/inquiry/inquiry-planner";

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
      </div>
    </section>
  );
}
