import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Preview",
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <section className="privacy-page section">
      <span className="eyebrow">CONCEPT PREVIEW</span>
      <h1>Privacy, in plain language.</h1>
      <p>
        This is a presentation website. The business’s final privacy policy
        needs to be added before launch.
      </p>
      <h2>Your inquiry</h2>
      <p>
        The planner saves your progress in this browser for up to seven days.
        You can remove it by clearing this site’s browser data. Drafts may
        include the contact details you enter, so use your own device.
      </p>
      <p>
        If a live integration is configured, submitted details are sent to
        Swanky’s inquiry system so the team can respond. Without that
        connection, submissions run in demo mode and are not delivered.
        Inspiration files stay on your device; only a link you enter is included
        in a submission.
      </p>
      <h2>What gets captured</h2>
      <p>
        The inquiry includes event and contact details, any campaign parameters
        in the visit URL, the referring URL and landing page, and a submission
        timestamp. Consent is for responding to your inquiry and does not enroll
        you in ongoing marketing.
      </p>
      <h2>Before launch</h2>
      <p>
        Swanky will need to confirm its privacy contact, retention policy,
        service providers and final privacy notice.
      </p>
    </section>
  );
}
