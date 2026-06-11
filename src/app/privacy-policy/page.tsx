import { LegalPageLayout } from "@/components/LegalPageLayout";
import { privacySections } from "@/lib/legal-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy | Growth Spark Co.",
  description:
    "Read the Growth Spark Co. Privacy Policy for information about how we collect, use, and protect personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalPageLayout title="Privacy Policy" sections={privacySections} />;
}
