import type { Metadata } from "next";
import { InquiryPlanner } from "@/components/inquiry-planner";
export const metadata: Metadata = {
  title: "Plan Your Celebration",
  description:
    "Tell Swanky about your event, palette and vision. Plan custom balloon art and event styling in Nashville and Middle Tennessee.",
  alternates: { canonical: "/inquire" },
};
export default function Inquire() {
  return <InquiryPlanner />;
}
