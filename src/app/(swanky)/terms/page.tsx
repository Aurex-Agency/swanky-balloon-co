import type { Metadata } from "next";
import { TransitionLink } from "@/components/swanky/motion/transition-link";
import { LegalContact } from "@/components/swanky/ui/legal-contact";
import { brand, legal } from "@/data/swanky";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using the ${brand.name} website and text message program.`,
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <section
      className="band band-ivory prose-page"
      aria-labelledby="terms-title"
    >
      <div className="band-inner prose">
        <p className="label">Terms of Service</p>
        <h1 id="terms-title">
          The fine print, <em>kept friendly.</em>
        </h1>
        <p className="legal-updated">Last updated {legal.updated}</p>
        <p>
          These Terms of Service apply to swankyballoon.com,
          swanky-balloon-co.vercel.app and to text messages from{" "}
          {brand.legalName} (“Swanky,” “we,” “us”). By using the site, sending
          an inquiry or opting in to texts, you agree to these terms and to our{" "}
          <TransitionLink href="/privacy">Privacy Policy</TransitionLink>.
        </p>

        <h2 id="text-messages">Text message terms</h2>
        <p>
          <strong>Program name:</strong> {legal.smsProgram}
        </p>
        <p>
          <strong>What we send:</strong> texts about your inquiry and booking,
          including replies to your questions, quotes, booking confirmations,
          reminders and event-day updates such as delivery and pickup times.
          With separate marketing SMS consent, we also send recurring special
          offers, seasonal balloon decor announcements and service promotions.
        </p>
        <p>
          <strong>How you opt in:</strong> by selecting the informational SMS
          checkbox, the marketing SMS checkbox, or both on our{" "}
          <TransitionLink href="/inquire">inquiry form</TransitionLink> and
          providing your mobile number. Both checkboxes are optional and
          unchecked by default. You can submit an inquiry with neither selected.
          Informational SMS consent does not grant marketing SMS consent, and
          marketing SMS consent does not grant informational SMS consent.
        </p>
        <ul>
          <li>
            <strong>Message frequency varies</strong> for both informational and
            marketing texts.
          </li>
          <li>
            <strong>Message and data rates may apply.</strong> Check your mobile
            plan for details.
          </li>
          <li>
            <strong>To opt out,</strong> reply STOP to any message. You can also
            reply CANCEL, END, QUIT or UNSUBSCRIBE. We will send one message
            confirming you are unsubscribed and then stop. To opt back in, reply
            START.
          </li>
          <li>
            <strong>For help,</strong> reply HELP, email{" "}
            <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>{" "}
            or call <a href={brand.contact.phoneHref}>{brand.contact.phone}</a>.
          </li>
          <li>Consent to receive texts is not a condition of purchase.</li>
          <li>Carriers are not liable for delayed or undelivered messages.</li>
          <li>
            You must be the account holder for the mobile number you provide, or
            have the account holder’s permission.
          </li>
        </ul>
        <p>
          We do not sell, rent or share your mobile number or opt-in consent
          with third parties for their marketing. See the{" "}
          <TransitionLink href="/privacy#text-messages">
            text message section of our Privacy Policy
          </TransitionLink>
          .
        </p>

        <h2>Inquiries, quotes and bookings</h2>
        <p>
          The website describes our services and helps you start an inquiry.
          Sending an inquiry does not reserve a date. Prices, budget ranges,
          palettes and photos on the site are for planning and inspiration;
          final designs, pricing and availability are confirmed in your
          proposal. A booking is confirmed only once you accept a proposal and
          complete any required agreement and deposit, and that agreement
          controls if it differs from these terms.
        </p>

        <h2>Balloon safety</h2>
        <ul>
          <li>
            Many balloons are latex. Let us know about latex allergies when you
            inquire.
          </li>
          <li>
            Uninflated or broken balloons can be a choking hazard. Keep them
            away from children under 8 and from pets, and discard pieces right
            away.
          </li>
          <li>
            Please do not release balloons outdoors. Dispose of them in the
            trash after your event.
          </li>
          <li>
            Heat, sun, wind and humidity affect how long balloons last and how
            long helium balloons float, so float times are estimates.
          </li>
        </ul>

        <h2>Using this website</h2>
        <p>
          Please use the site only for lawful purposes and do not try to disrupt
          it or access it without permission. If you share an inspiration link
          or other content with us, you confirm you have the right to share it
          and allow us to use it to plan your event.
        </p>
        <p>
          The site’s photos, designs, text and logos belong to Swanky or its
          licensors and may not be copied for commercial use without our
          permission. Links to other sites, such as Instagram, are provided for
          convenience and are governed by those sites’ own terms.
        </p>

        <h2>Disclaimers and liability</h2>
        <p>
          The website is provided “as is.” We work to keep it accurate and
          available but do not guarantee that it will always be error free or
          uninterrupted. To the fullest extent allowed by law, Swanky is not
          liable for indirect or consequential damages arising from your use of
          the website or our text messages.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the State of Tennessee.</p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms. The date at the top shows when they last
          changed, and the version posted here applies from that date.
        </p>

        <h2>Contact us</h2>
        <LegalContact />
      </div>
    </section>
  );
}
