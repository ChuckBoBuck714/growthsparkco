/**
 * Terms of Service — adapted from tokencapitalgroupllc.com/terms with brand substitutions.
 * IMPORTANT: Have legal counsel review this page before launch.
 */
import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";
import { SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms of Service | Growth Spark Co.",
  description: "Terms of Service for using the Growth Spark Co. website and funding review services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="June 4, 2026">
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing or using the {SITE_NAME} website and services, you agree to be bound by these
          Terms of Service. If you do not agree to these terms, please do not use our website or
          services.
        </p>
      </LegalSection>

      <LegalSection title="2. Description of Services">
        <p>
          {SITE_NAME} helps small business owners explore business funding options and connects
          businesses with financing options and funding-related services. {SITE_NAME} is not a direct
          lender unless otherwise stated. Funding decisions and terms are made by applicable funding
          providers and are subject to their review processes, underwriting criteria, and verification
          of the information you provide.
        </p>
      </LegalSection>

      <LegalSection title="3. Eligibility">
        <p>To use our services, you must:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Be at least 18 years of age</li>
          <li>Be a legal owner or authorized representative of a business</li>
          <li>Provide accurate and truthful information in all forms and communications</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Use of the Website">
        <p>You agree to use this website only for lawful purposes. You may not:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Submit false, misleading, or fraudulent information</li>
          <li>Attempt to interfere with the website&apos;s functionality or security</li>
          <li>Use automated tools to scrape or collect data from our website</li>
          <li>Reproduce, distribute, or modify any content without our written permission</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. SMS/Text Messaging Terms (10DLC Compliance)">
        <p>By opting in to receive text messages from {SITE_NAME}, you acknowledge and agree to the following:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>You consent to receive SMS/text messages from {SITE_NAME} at the mobile number you provided.</li>
          <li>
            Messages may include information about your funding inquiry, account updates, appointment
            reminders, and content related to our services.
          </li>
          <li>Message frequency varies.</li>
          <li>Message and data rates may apply.</li>
          <li>You may opt out at any time by replying STOP to any text message.</li>
          <li>
            For help, reply HELP or call {SITE_PHONE} or email {SITE_EMAIL}.
          </li>
          <li>
            Your consent to receive text messages is not required as a condition of purchasing any
            goods or services.
          </li>
          <li>
            We will not share your opt-in information or phone number with any third parties for their
            marketing purposes.
          </li>
          <li>Wireless carriers are not liable for delayed or undelivered messages.</li>
        </ul>
        <p>
          For more details on how we handle your data, please review our{" "}
          <Link href="/privacy-policy" className="text-accent-blue hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="6. No Guarantee of Funding">
        <p>
          Submitting an inquiry through our website does not guarantee approval or funding. All funding
          options are subject to review, underwriting criteria, and verification of the information you
          provide by applicable funding providers.
        </p>
      </LegalSection>

      <LegalSection title="7. Intellectual Property">
        <p>
          All content on this website — including text, graphics, logos, and design — is the property
          of {SITE_NAME} and is protected by applicable intellectual property laws. You may not
          reproduce, copy, or distribute any content without our prior written consent.
        </p>
      </LegalSection>

      <LegalSection title="8. Third-Party Links">
        <p>
          Our website may contain links to third-party websites or services. We are not responsible for
          the content, accuracy, or practices of those websites. Accessing third-party sites is at your
          own risk.
        </p>
      </LegalSection>

      <LegalSection title="9. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, {SITE_NAME} shall not be liable for any indirect,
          incidental, special, or consequential damages arising from your use of our website or services.
          Our total liability shall not exceed the amount you have paid to us, if any.
        </p>
      </LegalSection>

      <LegalSection title="10. Indemnification">
        <p>
          You agree to indemnify and hold harmless {SITE_NAME}, its officers, directors, employees, and
          agents from any claims, damages, or expenses arising from your use of the website, your
          violation of these Terms, or your violation of any third-party rights.
        </p>
      </LegalSection>

      <LegalSection title="11. Modifications">
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be effective
          immediately upon posting. Your continued use of the website after changes are posted
          constitutes acceptance of the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="12. Governing Law">
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of the
          State of New York, without regard to its conflict of law provisions.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact Us">
        <p>If you have any questions about these Terms of Service, please contact us:</p>
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
