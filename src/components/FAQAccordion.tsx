import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { HOMEPAGE_FAQS, type FAQItem } from "@/lib/faqs";
import { faqPageJsonLd } from "@/lib/schema";

export type { FAQItem };

type FAQAccordionProps = {
  items?: FAQItem[];
  showViewAll?: boolean;
  /** Pass null to omit the heading. A string replaces the default heading. */
  heading?: string | null;
};

export function FAQAccordion({
  items = HOMEPAGE_FAQS,
  showViewAll = true,
  heading = "Frequently Asked Questions",
}: FAQAccordionProps) {
  return (
    <section className="py-16 lg:py-24" id="faq">
      <JsonLd data={faqPageJsonLd(items)} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {heading ? (
          <h2 className="text-center text-3xl font-bold tracking-tight text-navy sm:text-4xl">{heading}</h2>
        ) : null}
        <div className={`${heading ? "mt-10" : ""} divide-y divide-border rounded-2xl border border-border bg-white shadow-sm`}>
          {items.map((faq, index) => (
            <details key={faq.question} className="faq-item group" name="faq" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue [&::-webkit-details-marker]:hidden">
                <span className="font-semibold text-navy">{faq.question}</span>
                <svg
                  className="faq-chevron h-5 w-5 shrink-0 text-charcoal transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm leading-relaxed text-charcoal">{faq.answer}</p>
              </div>
            </details>
          ))}
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
