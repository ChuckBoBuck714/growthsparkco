import Link from "next/link";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { PageHero } from "@/components/PageHero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "FAQ | Growth Spark Co.",
  description:
    "Frequently asked questions about business funding reviews, eligibility, and how Growth Spark Co. works.",
  path: "/faq",
});

const allFaqs: FAQItem[] = [
  {
    question: "What does Growth Spark Co. do?",
    answer:
      "Growth Spark Co. helps small business owners explore business funding options for expansion, working capital, equipment, inventory, payroll, marketing, and other business needs.",
  },
  {
    question: "Is Growth Spark Co. a direct lender?",
    answer:
      "Growth Spark Co. helps connect businesses with financing options and funding-related services. Growth Spark Co. is not a direct lender unless specifically stated.",
  },
  {
    question: "Does submitting a request guarantee approval?",
    answer:
      "No. Submitting your information does not guarantee approval, funding, or any specific terms. All funding options are subject to review.",
  },
  {
    question: "How quickly will someone contact me?",
    answer:
      "After submitting your request, a funding specialist may contact you during business hours to review your information and discuss potential next steps.",
  },
  {
    question: "Can I opt out of text messages?",
    answer:
      "Yes. You can reply STOP to opt out of SMS communications or HELP for help. Message and data rates may apply.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "You will be asked for basic business details including name, contact information, time in business, monthly revenue range, requested funding amount, and intended use of funds.",
  },
  {
    question: "Who may qualify for a funding review?",
    answer:
      "Growth Spark Co. is designed for active operating businesses with consistent revenue or deposits, authorized decision-makers, and a clear business purpose for capital. Not every business will qualify.",
  },
  {
    question: "Will my information be sold to marketers?",
    answer:
      "Growth Spark Co. does not sell your personal information for third-party marketing purposes. Information may be shared with partners or service providers involved in reviewing funding options, subject to applicable agreements and law.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Clear answers about our funding review process and what to expect."
      />
      <FAQAccordion items={allFaqs} showViewAll={false} />
      <section className="pb-16 text-center">
        <Link
          href="/#request-review"
          className="inline-flex items-center rounded-lg bg-accent-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Check Your Options
        </Link>
      </section>
    </>
  );
}
