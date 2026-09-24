# Swanky: lead to event system

The website captures a structured inquiry. GoHighLevel becomes the contact record, opportunity pipeline, task list and communication history. This concept has no database and does not send email or SMS itself.

## Connect the website

1. Create a GoHighLevel workflow with an inbound webhook trigger.
2. Set `GHL_WEBHOOK_URL` to its HTTPS endpoint in the hosting provider's server environment. Never use a `NEXT_PUBLIC_` prefix for this value.
3. Submit a controlled test inquiry. Map `contact` to the GHL contact, `event`, `creative`, and `qualification` to custom fields, and `creative.notes` plus `creative.inspirationLink` to notes. Map `attribution` to source/campaign fields. Preserve `id` and `submittedAt` for audit and deduplication.
4. Upsert the contact and use the inquiry ID to deduplicate opportunities. Repeated genuine event inquiries should create separate event opportunities for the same contact.
5. Add the supplied tags. Create an opportunity in New Inquiry, then Needs Date Check. Never automatically describe a requested date as available or booked.
6. Test success and failed delivery before switching demo mode off. The adapter returns an error if the webhook rejects or times out. It cannot prove downstream workflow actions ran. Configure alerting in GHL and review its execution logs.

The server-only adapter is `src/lib/integrations/ghl.ts`. It sends normalized JSON with contact, event, creative, qualification, attribution, consent, ID, timestamp, tags and pipeline stage. All payloads are validated with Zod. Without a webhook, the endpoint returns a successful **demo** result without delivery or persistence, including in production. Development logs contain only an inquiry ID, timestamp, event type and color count. No raw contact details or notes are logged.

`OWNER_NOTIFICATION_EMAIL` and `RESEND_API_KEY` are reserved configuration names for a future direct email adapter. They do not enable email in this build. Configure owner notifications and confirmations inside GHL for the first release.

## Pipeline

New Inquiry → Needs Date Check → Qualified → Consultation Scheduled → Proposal Sent → Awaiting Deposit → Booked → Design Approval → Production → Event Scheduled → Completed → Review Requested.

Keep stage changes tied to actual actions. Booked requires the owner's confirmed reservation requirements. A submitted inquiry never reserves an event.

## Proposed automation rules

| Trigger | Action | Guardrail |
| --- | --- | --- |
| Inquiry received | Immediate branded confirmation email | Acknowledge receipt, summarize event details, explain approximate 24–48-hour response window. |
| Inquiry received | Immediate confirmation text | Enable only after appropriate SMS consent wording and messaging requirements are approved. Current checkbox grants inquiry response consent, not marketing consent. |
| Inquiry received | Notify owner and create a follow-up task | Include event date, city, services, palette and budget. Target the next business day. |
| No owner response | Internal overdue task alert | Avoid promising that automatic messages replace a human response. |
| No prospect response | Short follow-up sequence | Suggested 2 and 5 business days after the last response; stop on reply, opt-out, booking or disqualification. |
| Qualified, date checked | Send consultation booking link | Owner supplies the correct calendar URL. |
| Proposal sent | Proposal reminders | Suggested 3 and 7 days; stop after approval, rejection or expiry. |
| Deposit recorded | Confirmation and reservation update | Trigger on verified payment, never on link clicks. Owner defines terms. |
| Design awaiting approval | Approval reminders | Link the specific design and due date. Escalate unresolved approvals to owner. |
| Seven days before event | Client event reminder | Confirm location, access, timeline and included services. |
| Forty-eight hours before event | Internal preparation reminder | Materials, production, transport, venue access and removal checklist. |
| Event completed | Thank-you message | Owner confirms completion before sending. |
| After completion | Review request | Owner supplies the verified review URL. Stop when a review is received. |
| After completion | Referral request | Owner approves timing and copy; no invented incentive. |
| Annual event approaching | Anniversary/reactivation | Only with appropriate ongoing marketing consent. |

## Owner decisions before launch

Confirm service scope, sample event categories and qualification ranges; supply real event photos, optional founder photo, any verified testimonials, privacy notice and business contact details; decide response task timing, proposal/payment process, availability handling, travel/setup/removal policies, consent language and marketing preferences.

The file control is a local-only demonstration. Files are not uploaded, stored, or sent. A live upload integration will need storage, file checks, retention rules and restricted access. Shareable inspiration links work now.

`/ops-preview` is an unlinked, noindex static presentation with clearly labeled fictional entries. It has no authentication and must never contain real customer data. Add authentication before making it a real operations screen. Robots directives are not access control. The full concept is noindex while `NEXT_PUBLIC_DEMO_MODE=true`.

Before accepting public traffic, configure host-level abuse protection for the inquiry endpoint and validate the actual GHL workflow end to end. The current adapter has a request size limit and timeout but no distributed rate limiter, durable queue or guaranteed exactly-once delivery. On a timeout, check GHL before retrying to avoid duplicate event records.
