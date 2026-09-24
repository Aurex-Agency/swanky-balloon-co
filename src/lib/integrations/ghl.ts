import "server-only";
import type { Inquiry } from "@/lib/inquiry";
const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export function inquiryTags(inquiry: Inquiry) {
  return [
    "website-inquiry",
    "swanky-event-lead",
    `event-type-${slug(inquiry.event.type)}`,
    `budget-${slug(inquiry.qualification.budgetRange)}`,
    `event-month-${inquiry.event.date.slice(0, 7)}`,
    `source-${slug(inquiry.attribution.utmSource || inquiry.qualification.leadSource || "direct")}`,
  ];
}
export async function deliverInquiry(
  inquiry: Inquiry,
): Promise<{ demo: boolean }> {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    // DEMO MODE: no delivery or persistence occurs without a webhook. Never log PII.
    if (process.env.NODE_ENV !== "production")
      console.info("[Swanky demo inquiry]", {
        id: inquiry.id,
        submittedAt: inquiry.submittedAt,
        eventType: inquiry.event.type,
        colorCount: inquiry.creative.colors.length,
        contact: "[REDACTED]",
        notes: "[REDACTED]",
      });
    return { demo: true };
  }
  if (new URL(url).protocol !== "https:")
    throw new Error("Webhook must use HTTPS");
  // GHL mapping: contact -> contact; event/creative/qualification -> custom fields;
  // inspiration + notes -> contact notes; tags -> contact tags; create an opportunity
  // in New Inquiry, then Needs Date Check. Consent is for inquiry response only.
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...inquiry,
      tags: inquiryTags(inquiry),
      pipelineStage: "New Inquiry",
    }),
    signal: AbortSignal.timeout(10000),
    redirect: "error",
  });
  if (!response.ok) throw new Error("Inquiry delivery failed");
  return { demo: false };
}
