import { LegalPageLayout } from "@/components/LegalPageLayout";
import { TERMS_LAST_UPDATED, termsSections } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms & Conditions | Growth Spark Co.",
  description:
    "Review the Growth Spark Co. Terms & Conditions for use of the website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated={TERMS_LAST_UPDATED}
      sections={termsSections}
    />
  );
}
