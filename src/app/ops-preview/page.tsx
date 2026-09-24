import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  ArrowRight,
  CalendarDays,
  Inbox,
  Clock,
  FileText,
} from "lucide-react";
import { mockLeads } from "@/data/swanky";
export const metadata: Metadata = {
  title: "Concept CRM Preview",
  robots: { index: false, follow: false },
  alternates: { canonical: "/ops-preview" },
};
const stages = [
  "New Inquiry",
  "Qualified",
  "Proposal Sent",
  "Booked",
  "Production",
  "Completed",
];
const automation = [
  "Website inquiry submitted",
  "Confirmation email sent",
  "Confirmation text sent",
  "Owner notified",
  "Follow-up task created",
  "Consultation link delivered",
  "Proposal follow-up scheduled",
];
export default function OpsPreview() {
  return (
    <div className="ops-page">
      <div className="ops-topline">
        <span>SWANKY / THE BUSINESS SIDE</span>
        <span>
          CONCEPT CRM PREVIEW{" "}
          <span className="sample-pill">No live customer data</span>
        </span>
      </div>
      <div className="ops-heading">
        <div>
          <span className="eyebrow">AUREX BUSINESS LABS · SYSTEMS CONCEPT</span>
          <h1>
            Good parties.
            <br />
            Better organized.
          </h1>
          <p>One place for every inquiry, next step and event detail.</p>
        </div>
        <div className="ops-sample-note">
          <span className="sample-pill">Sample data</span>
          <p>
            Illustrative workflow
            <br />
            October 2026
          </p>
        </div>
      </div>
      <div className="ops-stats">
        {[
          {
            label: "New Inquiries",
            value: "08",
            icon: Inbox,
            detail: "Ready for a first response",
          },
          {
            label: "Follow-Ups Due",
            value: "03",
            icon: Clock,
            detail: "A clear next action",
          },
          {
            label: "Proposals Awaiting Response",
            value: "05",
            icon: FileText,
            detail: "Keep the conversation moving",
          },
          {
            label: "Upcoming Events",
            value: "12",
            icon: CalendarDays,
            detail: "Every detail in view",
          },
        ].map((s) => (
          <article key={s.label}>
            <div>
              <s.icon size={19} />
              <span>{s.label}</span>
            </div>
            <strong>{s.value}</strong>
            <p>{s.detail}</p>
          </article>
        ))}
      </div>
      <section className="ops-section">
        <div className="ops-section-heading">
          <h2>The inquiry pipeline</h2>
          <span>7 sample inquiries · 6 stages shown</span>
        </div>
        <div
          className="kanban"
          tabIndex={0}
          aria-label="Sample inquiry pipeline, scroll horizontally for all stages"
        >
          {stages.map((stage, i) => (
            <div className="kanban-column" key={stage}>
              <h3>
                <i
                  style={{
                    background: [
                      "#ef2aa8",
                      "#aaa7f7",
                      "#ff786c",
                      "#9ee4df",
                      "#e7ef2d",
                      "#b5bcad",
                    ][i],
                  }}
                />
                {stage}
                <span>{mockLeads.filter((l) => l.stage === stage).length}</span>
              </h3>
              {mockLeads
                .filter((l) => l.stage === stage)
                .map((lead) => (
                  <article className="lead-card" key={lead.id}>
                    <span>INQUIRY #{lead.id}</span>
                    <h4>{lead.type}</h4>
                    <p>
                      {lead.city} · {lead.date}
                    </p>
                    <div className="color-dots">
                      {lead.colors.map((c) => (
                        <span key={c} style={{ background: c }} />
                      ))}
                    </div>
                    <div className="lead-budget">Budget: {lead.budget}</div>
                  </article>
                ))}
            </div>
          ))}
        </div>
      </section>
      <div className="ops-detail-grid">
        <section className="ops-detail ops-section">
          <div className="ops-section-heading">
            <h2>Every detail, captured.</h2>
            <span>#1048</span>
          </div>
          <span className="sample-pill">Website inquiry · Sample data</span>
          <dl>
            <div>
              <dt>Event</dt>
              <dd>Birthday · October 18, 2026</dd>
            </div>
            <div>
              <dt>Venue city</dt>
              <dd>Nashville</dd>
            </div>
            <div>
              <dt>Budget range</dt>
              <dd>$1,000–$2,500</dd>
            </div>
            <div>
              <dt>Palette</dt>
              <dd>
                Hot pink, lavender, aqua
                <div className="color-dots">
                  {["#ef2aa8", "#aaa7f7", "#9ee4df"].map((c) => (
                    <span key={c} style={{ background: c }} />
                  ))}
                </div>
              </dd>
            </div>
            <div>
              <dt>Inspiration</dt>
              <dd>Client inspiration link would appear here</dd>
            </div>
            <div>
              <dt>Source / campaign</dt>
              <dd>Instagram / autumn-celebrations</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd>
                A colorful backdrop for an indoor milestone celebration. Venue
                details to confirm.
              </dd>
            </div>
            <div>
              <dt>Preferred contact</dt>
              <dd>Email</dd>
            </div>
          </dl>
          <div className="ops-tags">
            <span>website-inquiry</span>
            <span>swanky-event-lead</span>
            <span>event-type-birthday</span>
          </div>
        </section>
        <section className="ops-timeline ops-section">
          <div className="ops-section-heading">
            <h2>The follow-through.</h2>
            <ArrowUpRight size={20} />
          </div>
          <p>
            A proposed automation sequence, shown for presentation. No messages
            have been sent.
          </p>
          <ol>
            {automation.map((item, i) => (
              <li key={item}>
                <span className={i < 4 ? "timeline-done" : ""}>
                  {i < 4 ? <Check size={14} /> : String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong>{item}</strong>
                  <small>
                    {i === 0
                      ? "The website starts the workflow"
                      : i === 2
                        ? "Only when the appropriate consent allows"
                        : i < 4
                          ? "Proposed immediate action"
                          : "Proposed scheduled action"}
                  </small>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <section className="ops-section calendar-section">
        <div className="ops-section-heading">
          <div>
            <span className="eyebrow">EVENT CALENDAR / SAMPLE WEEK</span>
            <h2>October 12–18, 2026</h2>
          </div>
          <span>Design. Prep. Party.</span>
        </div>
        <div
          className="ops-calendar"
          tabIndex={0}
          role="region"
          aria-label="Sample event calendar, scroll horizontally for the full week"
        >
          {[
            "Mon 12",
            "Tue 13",
            "Wed 14",
            "Thu 15",
            "Fri 16",
            "Sat 17",
            "Sun 18",
          ].map((day, i) => (
            <div key={day}>
              <h3>{day}</h3>
              {i === 1 && (
                <p className="calendar-note lavender">
                  Design approval
                  <br />
                  <strong>Inquiry #1038</strong>
                </p>
              )}
              {i === 3 && (
                <p className="calendar-note lime">
                  Prep + materials
                  <br />
                  <strong>Inquiry #1035</strong>
                </p>
              )}
              {i === 4 && (
                <p className="calendar-note pink">
                  Brand event
                  <br />
                  <strong>Nashville</strong>
                </p>
              )}
              {i === 5 && (
                <p className="calendar-note aqua">
                  Birthday
                  <br />
                  <strong>Nashville</strong>
                </p>
              )}
              {i === 6 && (
                <p className="calendar-note tentative">
                  Requested date
                  <br />
                  <strong>Not yet booked</strong>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="ops-takeaway">
        <span className="eyebrow">THE BIGGER PICTURE</span>
        <h2>
          A great first impression.
          <br />A system that follows through.
        </h2>
        <p>
          The website is not just a digital brochure. It becomes the first step
          in a repeatable system for capturing, qualifying, booking and managing
          every event.
        </p>
        <div>
          <span>Capture</span>
          <ArrowRight />
          <span>Qualify</span>
          <ArrowRight />
          <span>Book</span>
          <ArrowRight />
          <span>Create</span>
        </div>
      </section>
    </div>
  );
}
