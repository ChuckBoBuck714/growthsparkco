/**
 * Legal page content sourced from counsel-provided documents:
 * - Privacy Policy.docx
 * - Terms and Conditions.docx
 * - Disclaimer.docx
 *
 * IMPORTANT: Have legal counsel review all legal content before production launch.
 */

import Link from "next/link";
import type { LegalSection } from "@/components/LegalPageLayout";
import {
  SITE_DOMAIN,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
} from "./constants";

export const TERMS_LAST_UPDATED = "June 11, 2026";
export const DISCLAIMER_LAST_UPDATED = "June 11, 2026";

const listClass = "list-disc space-y-2 pl-6";

export const privacySections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: (
      <p>
        Growth Spark Co. LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) helps small
        business owners explore business funding options and connects businesses with financing
        options and funding-related services. Growth Spark Co. LLC is not a direct lender unless
        otherwise stated. This Privacy Policy explains how we collect, use, and protect your
        personal information.
      </p>
    ),
  },
  {
    id: "web-security",
    title: "2. Web Security/Internet Privacy Policy",
    content: (
      <p>
        This privacy policy has been compiled to better serve those who are concerned with how
        their &apos;Personally Identifiable Information&apos; (PII) is being used online. PII, as
        described in US privacy law and information security, is information that can be used on
        its own or with other information to identify, contact, or locate a single person, or to
        identify an individual in context. Please read our privacy policy carefully to get a clear
        understanding of how we collect, use, protect or otherwise handle your Personally
        Identifiable Information in accordance with our website.
      </p>
    ),
  },
  {
    id: "privacy-policy-intro",
    title: "3. Growth Spark Co&apos;s Privacy Policy",
    content: (
      <p>
        Growth Spark Co. LLC (the &quot;Company&quot;) is committed to maintaining robust privacy
        protections for its users. Our Privacy Policy (&quot;Privacy Policy&quot;) is designed to
        help you understand how we collect, use and safeguard the information you provide to us and
        to assist you in making informed decisions when using our Service. For purposes of this
        Agreement, &quot;Service&quot; refers to the Company&apos;s service which can be accessed
        via our website at {SITE_DOMAIN} in which users can review information related to
        alternative funding. The terms &quot;we,&quot; &quot;us,&quot; and &quot;our&quot; refer to
        the Company. &quot;You&quot; refers to you, as a user of Service. By accepting our Privacy
        Policy, you consent to our collection, storage, use and disclosure of your personal
        information as described in this Privacy Policy.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "4. Information We Collect",
    content: (
      <p>
        We collect information when you interact with our website, submit a form, or communicate
        with us. We collect &quot;Non-Personal Information&quot; and &quot;Personal
        Information&quot;. Non-Personal Information includes information that cannot be used to
        personally identify you, such as anonymous usage data, general demographic information we
        may collect, referring/exit pages and URLs, platform types, preferences you submit and
        preferences that are generated based on the data you submit and number of clicks. Personal
        Information includes only your full name, email address, phone number, business name or other
        messages and details which you submit to us through the registration process at the Site.
      </p>
    ),
  },
  {
    id: "information-via-technology",
    title: "5. Information Collected via Technology",
    content: (
      <>
        <p>
          To activate the Service you do not need to submit any Personal Information other than your
          name, email address, phone number, business name or other details. To use the Service
          thereafter, you do not need to submit further Personal Information. However, in an effort to
          improve the quality of the Service, we track information provided to us by your browser or
          by our software application when you view or use the Service, such as the website you came
          from (known as the &quot;referring URL&quot;), the type of browser you use, the device from
          which you connected to the Service, the time and date of access, and other information that
          does not personally identify you. We track this information using cookies, or small text
          files which include an anonymous unique identifier. Cookies are sent to a user&apos;s
          browser from our servers and are stored on the user&apos;s computer hard drive. Sending a
          cookie to a user&apos;s browser enables us to collect Non-Personal information about that
          user and keep a record of the user&apos;s preferences when utilizing our services, both on
          an individual and aggregate basis. For example, the Company may use cookies to collect the
          following information:
        </p>
        <ul className={listClass}>
          <li>
            Compile aggregate data about site traffic and site interactions in order to offer better
            site experiences and tools in the future.
          </li>
        </ul>
        <p>
          The Company may use both persistent and session cookies; persistent cookies remain on your
          computer after you close your session and until you delete them, while session cookies
          expire when you close your browser.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-share",
    title: "6. How We Use and Share Information",
    content: (
      <>
        <h3 className="font-semibold text-navy">Personal Information</h3>
        <p>
          Except as otherwise stated in this Privacy Policy, we do not sell, trade, rent or
          otherwise share for marketing purposes your Personal Information with third parties
          without your consent. We do share Personal Information with vendors who are performing
          services for the Company, such as the servers for our email communications who are
          provided access to user&apos;s email address for purposes of sending emails from us. Those
          vendors use your Personal Information only at our direction and in accordance with our
          Privacy Policy.
        </p>
        <p>
          In general, the Personal Information you provide to us is used to help us communicate with
          you. For example, we use Personal Information to contact users in response to questions,
          solicit feedback from users, provide technical support, and inform users about promotional
          offers.
        </p>
        <h3 className="font-semibold text-navy">Non-Personal Information</h3>
        <p>
          In general, we use Non-Personal Information to help us improve the Service and customize
          the user experience. We also aggregate Non-Personal Information in order to track trends
          and analyze use patterns on the Site. This Privacy Policy does not limit in any way our
          use or disclosure of Non-Personal Information and we reserve the right to use and disclose
          such Non-Personal Information to our partners, advertisers and other third parties at our
          discretion.
        </p>
        <p>
          In the event we undergo a business transaction such as a merger, acquisition by another
          company, or sale of all or a portion of our assets, your Personal Information may be
          among the assets transferred. You acknowledge and consent that such transfers may occur
          and are permitted by this Privacy Policy, and that any acquirer of our assets may continue
          to process your Personal Information as set forth in this Privacy Policy. If our
          information practices change at any time in the future, we will post the policy changes to
          the Site so that you may opt out of the new information practices. We suggest that you
          check the Site periodically if you are concerned about how your information is used.
        </p>
      </>
    ),
  },
  {
    id: "how-we-protect",
    title: "7. How We Protect Information",
    content: (
      <p>
        We implement security measures designed to protect your information from unauthorized
        access. We further protect your information from potential security breaches by implementing
        certain technological security measures including encryption, firewalls and secure socket
        layer technology. However, these measures do not guarantee that your information will not be
        accessed, disclosed, altered or destroyed by breach of such firewalls and secure server
        software. By using our Service, you acknowledge that you understand and agree to assume these
        risks.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    content: (
      <p>
        We retain your personal information for as long as necessary to fulfill the purposes outlined
        in this policy or as required by law. If you request deletion of your data, we will comply
        within a reasonable timeframe, subject to legal obligations.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "9. Your Rights Regarding the Use of Your Personal Information",
    content: (
      <p>
        You have the right at any time to prevent us from contacting you for marketing purposes.
        When we send a promotional communication to a user, the user can opt out of further
        promotional communications by following the unsubscribe instructions provided in each
        promotional e-mail. Please note that notwithstanding the promotional preferences you indicate
        by unsubscribing, we may continue to send you administrative emails including, for example,
        periodic updates to our Privacy Policy.
      </p>
    ),
  },
  {
    id: "sms-policy",
    title: "10. SMS/Text Messaging Policy (10DLC Compliance)",
    content: (
      <>
        <p>By opting in to receive SMS/text messages from Growth Spark Co., you agree to the following:</p>
        <ul className={listClass}>
          <li>
            <strong>Consent:</strong> You provide express written consent to receive SMS/text
            messages from Growth Spark Co. LLC at the phone number you provided. Your consent is not
            a condition of obtaining any product or service.
          </li>
          <li>
            <strong>Message Content:</strong> Messages may include funding updates, appointment
            reminders, account notifications, and information related to our services.
          </li>
          <li>
            <strong>Message Frequency:</strong> Message frequency varies based on your interaction
            with us.
          </li>
          <li>
            <strong>Message &amp; Data Rates:</strong> Standard message and data rates may apply
            depending on your wireless carrier and plan.
          </li>
          <li>
            <strong>Opt-Out:</strong> You may opt out at any time by replying STOP to any message.
            You will receive a one-time confirmation message and no further messages will be sent.
          </li>
          <li>
            <strong>Help:</strong> For assistance, reply HELP to any message or contact us at the
            information below.
          </li>
          <li>
            <strong>Carriers:</strong> Carriers are not liable for delayed or undelivered messages.
          </li>
          <li>
            <strong>No Sharing:</strong> We do not share your phone number or opt-in data with any
            third parties for their own marketing purposes. Opt-in data and consent are never sold
            or transferred for third-party marketing.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "links-other-websites",
    title: "11. Links to Other Websites",
    content: (
      <p>
        As part of the Service, we may provide links to or compatibility with other websites or
        applications. However, we are not responsible for the privacy practices employed by those
        websites or the information or content they contain. This Privacy Policy applies solely to
        information collected by us through the Site and the Service. Therefore, this Privacy Policy
        does not apply to your use of a third party website accessed by selecting a link on our Site
        or via our Service. To the extent that you access or use the Service through or on another
        website or application, then the privacy policy of that other website or application will
        apply to your access or use of that site or application. We encourage our users to read the
        privacy statements of other websites before proceeding to use them.
      </p>
    ),
  },
  {
    id: "opting-out",
    title: "12. Opting Out",
    content: (
      <p>
        Users can set preferences for how Google advertises to you using the Google Ad Settings page.
        Alternatively, you can opt out by visiting the Network Advertising Initiative Opt Out page or
        by using the Google Analytics Opt Out Browser add on.
      </p>
    ),
  },
  {
    id: "caloppa",
    title: "13. California Online Privacy Protection Act",
    content: (
      <p>
        CalOPPA is the first state law in the nation to require commercial websites and online
        services to post a privacy policy. The law&apos;s reach stretches well beyond California to
        require any person or company in the United States (and conceivably the world) that operates
        websites collecting Personally Identifiable Information from California consumers to post a
        conspicuous privacy policy on its website stating exactly the information being collected and
        those individuals or companies with whom it is being shared. – See more at:{" "}
        <a
          href="http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf"
          className="text-accent-blue hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf
        </a>
      </p>
    ),
  },
  {
    id: "coppa",
    title: "14. COPPA (Children Online Privacy Protection Act)",
    content: (
      <>
        <p>
          When it comes to the collection of personal information from children under the age of 13
          years old, the Children&apos;s Online Privacy Protection Act (COPPA) puts parents in
          control. The Federal Trade Commission, United States&apos; consumer protection agency,
          enforces the COPPA Rule, which spells out what operators of websites and online services
          must do to protect children&apos;s privacy and safety online.
        </p>
        <p>We do not specifically market to children under the age of 13 years old.</p>
      </>
    ),
  },
  {
    id: "changes",
    title: "15. Changes to Our Privacy Policy",
    content: (
      <p>
        The Company reserves the right to change this policy and our Terms of Service at any time. We
        will notify you of significant changes to our Privacy Policy by sending a notice to the
        primary email address specified in your account or by placing a prominent notice on our site.
        Significant changes will go into effect 30 days following such notification. Non-material
        changes or clarifications will take effect immediately. You should periodically check the
        Site and this privacy page for updates.
      </p>
    ),
  },
  {
    id: "do-not-call",
    title: "16. Do Not Call Registry Compliance",
    content: (
      <p>
        By submitting your personal contact and/or financial information through the Website, you
        hereby grant express written permission to the Company, its affiliated sites, and its
        business partners for contact via telephone, voice broadcasts, artificial intellegence, mail,
        SMS text message (data rates may apply), and/or e-mail. Further, by registering on the
        Website you are expressly consenting to receive phone calls from the Company, its affiliated
        sites, and its business partners for contact via telephone and to receive prerecorded messages
        and/or receive calls via automated means even if you are on a Company, state or federal Do
        Not Call List. The frequency may vary but you will typically receive 1 SMS every two weeks
        unless you&apos;re in constant communication with a representative. You may request to
        receive information via an alternative means by contacting the Company, however, if you
        resubmit your telephone/mobile phone number, such request removes any prior alternative means
        of contact.
      </p>
    ),
  },
  {
    id: "contact",
    title: "17. Contact Us",
    content: (
      <>
        <p>
          If you have any questions about this Privacy Policy or wish to exercise your rights, please
          contact us:
        </p>
        <ul className="mt-4 list-none space-y-1">
          <li>
            <strong>{SITE_NAME}</strong>
          </li>
          <li>Phone: {SITE_PHONE}</li>
          <li>Email: {SITE_EMAIL}</li>
          <li>
            Website:{" "}
            <a href={SITE_URL} className="text-accent-blue hover:underline">
              {SITE_DOMAIN}
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. General Acceptance of Terms",
    content: (
      <p>
        By accessing or using the Growth Spark Co. LLC website and services, you agree to be bound by
        these Terms and Conditions. If you do not agree to these terms, please do not use our website
        or services. Any applications submitted electronically shall have the same force and effect as
        if the application bore an inked original signature(s). The above information, together with
        any accompanying financial statements, schedules, or other materials, is submitted for the
        purpose of obtaining credit and is warranted to be true, correct, and complete.
      </p>
    ),
  },
  {
    id: "patriot-act",
    title: "2. US Patriot Act",
    content: (
      <p>
        To help the government fight the funding of terrorism and money laundering activities,
        Federal law requires all financial institutions to obtain, verify, and record information that
        identifies each person and business that seeks a business loan. What this means for you: When
        you apply for a loan, we will ask for your business name, address, and Tax Identification
        Number. We will also ask for your name, address, date of birth, and other information that
        will allow us to identify you. We may also ask to see your driver&apos;s license or other
        identifying documents.
      </p>
    ),
  },
  {
    id: "loan-merchant",
    title: "3. For Loan/Merchant Services",
    content: (
      <p>
        The Merchant and Owner(s)/Officer(s) identified in the application (individually, an
        &quot;Applicant&quot;) each represents, acknowledges and agrees that (1) all information and
        documents provided to Growth Spark Co. LLC including credit card processor statements are true,
        accurate and complete, (2) Applicant will immediately notify Growth Spark Co. LLC of any change
        in such information or financial condition, (3) Applicant authorizes Growth Spark Co. LLC to
        disclose all information and documents Growth Spark Co. LLC may obtain including credit reports
        to other persons or entities (collectively, &quot;Assignees&quot;) that may be involved with or
        acquire commercial loans having daily repayment features and/or Merchant Cash Advance
        transactions, including without limitation the application therefor (collectively,
        &quot;Transactions&quot;) and each Assignee is authorized to use such information and
        documents, and share such information and documents with other Assignees, in connection with
        potential Transactions, (4) each Assignee will rely upon the accuracy and completeness of such
        information and documents, (5) Growth Spark Co. LLC, Assignees, and each of their
        representatives, successors, assigns and designees (collectively, &quot;Recipients&quot;) are
        authorized to request and receive any investigative reports, credit reports, statements from
        creditors or financial institutions, verification of information, or any other information that
        a Recipient deems necessary, (6) Applicant waives and releases any claims against Recipients
        and any information-providers arising from any act or omission relating to the requesting,
        receiving or release of information, and (7) each Owner/Officer represents that he or she is
        authorized to sign this form on behalf of Merchant.(8) I consent to receive direct mail,
        faxes, text-messages, and e-mails sent by Growth Spark Co. LLC and its affiliates for the
        purposes of transmitting account updates, requests for information and notices, and (9) this
        request is for business and not for consumer purposes.
      </p>
    ),
  },
  {
    id: "equipment",
    title: "4. For Equipment Services",
    content: (
      <p>
        I hereby certify: (1) the information provided is true and correct, (2) you are hereby
        authorized to investigate all bank, credit, and trade references, and said references are
        hereby authorized to release any requested information to you or your nominee, (3) such
        authorization shall extend to obtaining personal credit profile in considering this
        application and subsequently for the purposes of update, renewal or extension of such credit
        or additional credit and for reviewing or collecting the resulting account, (4) this
        information may be transmitted by us to you and by you to underwriter(s) for the purpose of
        granting me credit, either electronically or manually, and that by submitting this
        application, I take full responsibility for transmission thereof, (5) I am over 18 years of
        age, (6) I acknowledge my rights under the Fair Credit Reporting Act, (7) I consent to
        receive direct mail, faxes, text-messages, and e-mails sent by Growth Spark Co. LLC and its
        affiliates for the purposes of transmitting account updates, requests for information and
        notices, and (8) this request is for business and not for consumer purposes.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "5. Eligibility",
    content: (
      <>
        <p>To use our services, you must:</p>
        <ul className={listClass}>
          <li>Be at least 18 years of age</li>
          <li>Be a legal owner or authorized representative of a business</li>
          <li>Provide accurate and truthful information in all forms and communications</li>
        </ul>
      </>
    ),
  },
  {
    id: "website-use",
    title: "6. Use of the Website",
    content: (
      <>
        <p>You agree to use this website only for lawful purposes. You may not:</p>
        <ul className={listClass}>
          <li>Submit false, misleading, or fraudulent information</li>
          <li>Attempt to interfere with the website&apos;s functionality or security</li>
          <li>Use automated tools to scrape or collect data from our website</li>
          <li>Reproduce, distribute, or modify any content without our written permission</li>
        </ul>
      </>
    ),
  },
  {
    id: "sms-terms",
    title: "7. SMS/Text Messaging Terms (10DLC Compliance)",
    content: (
      <>
        <p>
          By opting in to receive text messages from Growth Spark Co. LLC, you acknowledge and agree
          to the following:
        </p>
        <ul className={listClass}>
          <li>
            You consent to receive SMS/text and/or multimedia messages from Growth Spark Co. LLC at
            the mobile/wireless number you provided for any purpose and agree that these text or
            multimedia messages may be regarding the products and/or services that you have previously
            purchased and products and/or services Growth Spark Co. LLC may market to me.
          </li>
          <li>
            this consent may be removed at your request but that until such consent is revoked, you may
            receive text or multimedia messages from Growth Spark Co. LLC to your mobile/wireless phone
            number.
          </li>
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
      </>
    ),
  },
  {
    id: "ecoa",
    title: "8. Federal Equal Credit Opportunity Act",
    content: (
      <p>
        The Federal Equal Credit Opportunity Act prohibits creditors from discriminating against credit
        applicants on the basis of race, color, religion, national origin, sex, marital status or age
        (provided the applicant has the capacity to enter into the binding contract); because all or
        part of the applicant&apos;s income derives from any public assistance program; or because the
        applicant has in good faith exercised any right under the Consumer Credit Protection Act. If
        for any reason your application for business credit is denied, you have the right to a written
        statement of the specific reasons for the denial. To obtain the statement, please write to
        Growth Spark Co. LLC, 26 Executive Park ste#100, Irvine, CA 92614. Funding amount and credit
        approval is subject to a full credit profile review.
      </p>
    ),
  },
  {
    id: "no-guarantee",
    title: "9. No Guarantee of Funding",
    content: (
      <p>
        Submitting an inquiry through our website does not guarantee approval or funding. All funding
        options are subject to review, underwriting criteria, and verification of the information you
        provide by applicable funding providers.
      </p>
    ),
  },
  {
    id: "ip",
    title: "10. Intellectual Property",
    content: (
      <p>
        All content on this website — including text, graphics, logos, and design — is the property of
        Growth Spark Co. and is protected by applicable intellectual property laws. You may not
        reproduce, copy, or distribute any content without our prior written consent.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "11. Third-Party Links",
    content: (
      <p>
        Our website may contain links to third-party websites or services. We are not responsible for
        the content, accuracy, or practices of those websites. Accessing third-party sites is at your
        own risk.
      </p>
    ),
  },
  {
    id: "liability",
    title: "12. Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by law, Growth Spark Co. shall not be liable for any indirect,
        incidental, special, or consequential damages arising from your use of our website or services.
        Our total liability shall not exceed the amount you have paid to us, if any.
      </p>
    ),
  },
  {
    id: "indemnification",
    title: "13. Indemnification",
    content: (
      <p>
        You agree to indemnify and hold harmless Growth Spark Co., its officers, directors, employees,
        and agents from any claims, damages, or expenses arising from your use of the website, your
        violation of these Terms, or your violation of any third-party rights.
      </p>
    ),
  },
  {
    id: "modifications",
    title: "14. Modifications",
    content: (
      <p>
        We reserve the right to modify these Terms of Service at any time. Changes will be effective
        immediately upon posting. Your continued use of the website after changes are posted
        constitutes acceptance of the revised terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "12. Governing Law",
    content: (
      <p>
        These Terms of Service shall be governed by and construed in accordance with the laws of the
        State of New York, without regard to its conflict of law provisions.
      </p>
    ),
  },
  {
    id: "contact-terms",
    title: "13. Contact Us",
    content: (
      <>
        <p>If you have any questions about these Terms of Service, please contact us:</p>
        <ul className="mt-4 list-none space-y-1">
          <li>
            <strong>{SITE_NAME}</strong>
          </li>
          <li>Phone: {SITE_PHONE}</li>
          <li>Email: {SITE_EMAIL}</li>
          <li>
            Website:{" "}
            <a href={SITE_URL} className="text-accent-blue hover:underline">
              {SITE_DOMAIN}
            </a>
          </li>
        </ul>
      </>
    ),
  },
];
