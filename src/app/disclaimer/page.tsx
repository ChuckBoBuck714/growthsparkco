import { LegalPageLayout } from "@/components/LegalPageLayout";
import { DISCLAIMER_LAST_UPDATED } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Disclaimer | Growth Spark Co.",
  description:
    "Read the Growth Spark Co. Disclaimer regarding marketing and referral services for business funding products.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer" lastUpdated={DISCLAIMER_LAST_UPDATED}>
      <p>
        Growth Spark Co. LLC operates as a marketing and referral service for business loan products.
        We partner with third-party licensed lenders who are solely responsible for loan origination,
        funding, and issuance. Growth Spark Co. LLC does not fund, issue, or make loans directly.
      </p>
      <p>
        Any loan offers presented are estimates based on the limited information provided by
        applicants. We cannot guarantee loan approval. Approval is subject to meeting the comprehensive
        eligibility criteria of our third-party lenders. Please note that loan products may not be
        available in all states.
      </p>
      <p>
        By submitting a loan application, you expressly consent to sharing your information with our
        affiliates and our network of third-party lenders. It is your responsibility to verify all
        criteria for pre-qualification and to carefully read all program and contract terms before
        entering into any agreement.
      </p>
      <p>
        Growth Spark Co. LLC is not a government agency, nor is it affiliated with any government
        entity. Furthermore, Growth Spark Co. LLC is not a bank, savings and loan, thrift, payday
        lender, or mortgage lender.
      </p>
    </LegalPageLayout>
  );
}
