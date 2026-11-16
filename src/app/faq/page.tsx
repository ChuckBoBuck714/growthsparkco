import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PageHero } from "@/components/PageHero";
import { FAQ_PAGE_FAQS } from "@/lib/faqs";
import { createPageMetadata } from "@/lib/metadata";
import { SERVICE_PAGES } from "@/lib/services";

export const metadata = createPageMetadata({
  title: "Business Funding FAQ | Growth Spark Co.",
  description:
    "Answers about Growth Spark Co. business funding reviews, who may be contacted, text opt-out, and what a referral service does not guarantee.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Clear answers about our funding review process and what to expect."
      />
      <FAQAccordion
        items={FAQ_PAGE_FAQS}
        showViewAll={false}
        heading="Business Funding Review Questions"
      />
      <section className="pb-4">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy">Funding topics</h2>
          <ul className="mt-4 space-y-2">
            {SERVICE_PAGES.map((page) => (
              <li key={page.slug}>
                <Link href={`/${page.slug}`} className="font-semibold text-accent-blue hover:underline">
                  {page.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
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
