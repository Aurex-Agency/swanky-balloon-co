import type { Metadata } from "next";
import { TransitionLink } from "@/components/swanky/motion/transition-link";
import { LegalContact } from "@/components/swanky/ui/legal-contact";
import { brand, legal } from "@/data/swanky";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${brand.legalName} collects, uses and protects your information, including text messages.`,
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <section
      className="band band-ivory prose-page"
      aria-labelledby="privacy-title"
    >
      <div className="band-inner prose">
        <p className="label">Privacy Policy</p>
        <h1 id="privacy-title">
          Privacy, <em>in plain language.</em>
        </h1>
        <p className="legal-updated">Last updated {legal.updated}</p>
        <p>
          This Privacy Policy explains how {brand.legalName} (“Swanky,” “we,”
          “us”) collects, uses, shares and protects information when you visit
          swankyballoon.com or swanky-balloon-co.vercel.app, send us an inquiry,
          or talk with us by email, phone or text message.
        </p>

        <h2>Information we collect</h2>
        <h3>Information you give us</h3>
        <ul>
          <li>
            Contact details: your name, email address, mobile phone number and
            how you prefer to be contacted.
          </li>
          <li>
            Event details: the type of celebration, date, time, guest count,
            venue name and city, and whether it is indoors or outdoors.
          </li>
          <li>
            Design details: your palette and colors, the services you are
            interested in, any inspiration link, your notes and a budget range.
          </li>
          <li>
            How you heard about us, and anything you tell us in messages, calls
            or texts.
          </li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>
            With an inquiry: the campaign tags in the link that brought you here
            (such as utm_source), the referring page, the page you landed on and
            the time you submitted.
          </li>
          <li>
            Technical information our hosting provider processes to deliver and
            secure the site, such as IP address, browser type and the pages
            requested.
          </li>
        </ul>
        <h3>Information stored on your device</h3>
        <p>
          The inquiry form saves your progress in your browser for up to seven
          days so you can pick up where you left off, and the site remembers
          whether you paused its animations. You can remove both by clearing
          this site’s data in your browser. We do not use advertising or
          tracking cookies.
        </p>

        <h2>How we use your information</h2>
        <ul>
          <li>To reply to your inquiry and prepare a design proposal.</li>
          <li>
            To book, plan, deliver, install and pick up your order, and to send
            confirmations, reminders and event-day updates.
          </li>
          <li>To provide customer service and answer your questions.</li>
          <li>
            To send offers and announcements by text when you separately opt in
            to marketing SMS.
          </li>
          <li>
            To understand which channels bring inquiries and to improve our
            website and services.
          </li>
          <li>
            To meet legal, tax and accounting obligations and to prevent fraud.
          </li>
        </ul>
        <p>
          Sending an inquiry does not automatically sign you up for marketing.
          We send marketing texts only when you separately select the marketing
          SMS checkbox. This does not subscribe you to marketing emails.
        </p>

        <h2 id="text-messages">Text messages (SMS)</h2>
        <p>
          Texts from {legal.smsProgram} are based on two separate, optional
          checkboxes on our inquiry form, both unchecked by default. The inquiry
          SMS checkbox covers replies, quotes, booking confirmations, reminders
          and event-day updates. The marketing SMS checkbox covers recurring
          special offers, seasonal balloon decor announcements and service
          promotions. You can select either, both or neither and still submit an
          inquiry. We send only the message types you consent to receive.
        </p>
        <p>
          We record each SMS consent choice, the disclosure and version for each
          opt-in, and the submission timestamp with your inquiry so we can honor
          and document your choices.
        </p>
        <ul>
          <li>
            Message frequency varies for both informational and marketing texts.
          </li>
          <li>Message and data rates may apply.</li>
          <li>
            Reply <strong>STOP</strong> at any time to stop receiving texts. You
            will receive one message confirming you have opted out.
          </li>
          <li>
            Reply <strong>HELP</strong> for help, or contact us using the
            details below.
          </li>
          <li>Consent to receive texts is not a condition of purchase.</li>
        </ul>
        <p>
          <strong>
            We do not sell, rent or share your mobile phone number or text
            message opt-in consent with third parties or affiliates for their
            marketing or promotional purposes.
          </strong>{" "}
          Your number is shared only with the service providers that deliver our
          messages, such as our messaging platform and wireless carriers, and
          only to send the texts you agreed to receive. Text message originator
          opt-in data and consent are excluded from every other kind of sharing
          described in this policy. See our{" "}
          <TransitionLink href="/terms#text-messages">
            text message terms
          </TransitionLink>{" "}
          for the full program details.
        </p>

        <h2>How we share information</h2>
        <p>
          We do not sell or rent your personal information. We share it only:
        </p>
        <ul>
          <li>
            With service providers who help us run our business, such as website
            hosting, our customer relationship and messaging platform, email and
            payment processing. They may use it only to provide services to us.
          </li>
          <li>
            With venues, planners or vendors involved in your event, when you
            ask us to or when it is needed to deliver your order.
          </li>
          <li>
            When required by law, or to protect the rights and safety of our
            customers, our team or the public.
          </li>
          <li>
            As part of a sale or transfer of our business, with this policy
            continuing to apply.
          </li>
        </ul>
        <p>
          None of this sharing includes your text message opt-in data or
          consent, as described above.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep inquiry and booking records for as long as we need them to
          respond, deliver your event and meet our tax and accounting
          obligations, and then delete them. If you opt out of texts, we keep a
          record of that so we can honor it.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>
            Ask to see, correct or delete the information we hold about you by
            emailing or calling us.
          </li>
          <li>Reply STOP to any text to stop text messages.</li>
          <li>Ask us at any time to stop contacting you by email or phone.</li>
        </ul>

        <h2>Security</h2>
        <p>
          We use reasonable safeguards to protect your information, including
          encrypted connections for our website and inquiry form. No method of
          transmission or storage is completely secure.
        </p>

        <h2>Children</h2>
        <p>
          Our website and services are for adults planning events. We do not
          knowingly collect personal information from children under 13.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy. The date at the top shows when it last
          changed. We will not use your mobile number or opt-in consent in a new
          way without asking you first.
        </p>

        <h2>Contact us</h2>
        <LegalContact />
        <p>
          See also our{" "}
          <TransitionLink href="/terms">Terms of Service</TransitionLink>.
        </p>
      </div>
    </section>
  );
}
