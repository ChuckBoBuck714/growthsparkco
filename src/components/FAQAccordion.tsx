"use client";

import { useState } from "react";
import Link from "next/link";

export type FAQItem = {
  question: string;
  answer: string;
};

const defaultFaqs: FAQItem[] = [
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
];

type FAQAccordionProps = {
  items?: FAQItem[];
  showViewAll?: boolean;
};

export function FAQAccordion({ items = defaultFaqs, showViewAll = true }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-white shadow-sm">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-slate-50"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-navy">{faq.question}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-charcoal transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-charcoal">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {showViewAll && (
          <p className="mt-8 text-center">
            <Link href="/faq" className="text-sm font-semibold text-accent-blue hover:underline">
              View all FAQs →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
