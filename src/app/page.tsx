import { CredibilitySection } from "@/components/CredibilitySection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { FundingUseCases } from "@/components/FundingUseCases";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { QualificationSection } from "@/components/QualificationSection";
import { TrustBar } from "@/components/TrustBar";
import { WhyGrowthSpark } from "@/components/WhyGrowthSpark";

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
