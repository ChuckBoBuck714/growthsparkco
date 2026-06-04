/**
 * Privacy Policy — adapted from tokencapitalgroupllc.com/privacy with brand substitutions.
 * IMPORTANT: Have legal counsel review this page before launch.
 */
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";
import { SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy | Growth Spark Co.",
  description: "Privacy Policy for Growth Spark Co. — how we collect, use, and protect your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="June 4, 2026">
      <LegalSection title="1. Who We Are">
        <p>
          {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) helps small business owners
          explore business funding options and connects businesses with financing options and
          funding-related services. {SITE_NAME} is not a direct lender unless otherwise stated. This
          Privacy Policy explains how we collect, use, and protect your personal information.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We may collect the following information when you interact with our website, submit a form, or communicate with us:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Business name</li>
          <li>Business and funding-related details you provide in forms</li>
          <li>Messages or notes you provide about your funding needs</li>
          <li>Device and browser information (via cookies and analytics)</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <p>We use the information we collect solely for the following purposes:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>To evaluate and process your funding request</li>
          <li>To contact you regarding your inquiry via phone, email, or SMS/text message</li>
          <li>To provide customer support</li>
          <li>To improve our website and services</li>
          <li>To comply with legal and regulatory obligations</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. We Do Not Sell or Share Your Data">
        <p>
          We will never sell, rent, trade, or share your personal information with third parties for
          their own marketing purposes. Your data is used by {SITE_NAME} and its partners or service
          providers to help review and service your funding request. We may share information with
          service providers who assist us in operating our business (e.g., CRM systems, funding
          partners) under strict confidentiality agreements, or when required by law.
        </p>
      </LegalSection>

      <LegalSection title="5. SMS/Text Messaging Policy (10DLC Compliance)">
        <p>By opting in to receive SMS/text messages from {SITE_NAME}, you agree to the following:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Consent:</strong> You provide express written consent to receive SMS/text messages
            from {SITE_NAME} at the phone number you provided. Your consent is not a condition of
            obtaining any product or service.
          </li>
          <li>
            <strong>Message Content:</strong> Messages may include funding updates, appointment
            reminders, account notifications, and information related to our services.
          </li>
          <li><strong>Message Frequency:</strong> Message frequency varies based on your interaction with us.</li>
          <li>
            <strong>Message &amp; Data Rates:</strong> Standard message and data rates may apply
            depending on your wireless carrier and plan.
          </li>
          <li>
            <strong>Opt-Out:</strong> You may opt out at any time by replying STOP to any message. You
            will receive a one-time confirmation message and no further messages will be sent.
          </li>
          <li>
            <strong>Help:</strong> For assistance, reply HELP to any message or contact us at the
            information below.
          </li>
          <li><strong>Carriers:</strong> Carriers are not liable for delayed or undelivered messages.</li>
          <li>
            <strong>No Sharing:</strong> We do not share your phone number or opt-in data with any
            third parties for their own marketing purposes. Opt-in data and consent are never sold or
            transferred for third-party marketing.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Cookies and Tracking">
        <p>
          Our website may use cookies and similar tracking technologies to analyze website traffic and
          improve your browsing experience. You may disable cookies through your browser settings, but
          some features of the website may not function properly.
        </p>
      </LegalSection>

      <LegalSection title="7. Data Security">
        <p>
          We implement reasonable administrative, technical, and physical safeguards to protect your
          personal information from unauthorized access, use, or disclosure. However, no method of
          electronic transmission or storage is 100% secure.
        </p>
      </LegalSection>

      <LegalSection title="8. Data Retention">
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes outlined
          in this policy or as required by law. If you request deletion of your data, we will comply
          within a reasonable timeframe, subject to legal obligations.
        </p>
      </LegalSection>

      <LegalSection title="9. Your Rights">
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your personal data</li>
          <li>Opt out of marketing communications</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>To exercise these rights, please contact us using the information below.</p>
      </LegalSection>

      <LegalSection title="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with
          the updated effective date. We encourage you to review this policy periodically.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
        <p className="font-medium text-navy">
          {SITE_NAME}
          <br />
          Phone: {SITE_PHONE}
          <br />
          Email: {SITE_EMAIL}
          <br />
          Website: {SITE_URL.replace("https://", "")}
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
