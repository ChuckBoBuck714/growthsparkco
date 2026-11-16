import { CredibilitySection } from "@/components/CredibilitySection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { FundingUseCases } from "@/components/FundingUseCases";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { QualificationSection } from "@/components/QualificationSection";
import { TrustBar } from "@/components/TrustBar";
import { WhyGrowthSpark } from "@/components/WhyGrowthSpark";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Growth Spark Co. | Business Expansion Capital for Growing Companies",
  description:
    "Growth Spark Co. helps small business owners explore funding options for expansion, working capital, equipment, inventory, payroll, marketing, and cash flow needs.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CredibilitySection />
      <HowItWorks />
      <FundingUseCases />
      <QualificationSection />
      <WhyGrowthSpark />
      <FAQAccordion />
      <FinalCTA />
    </>
  );
}
