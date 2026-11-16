import Link from "next/link";
import { HowItWorks } from "@/components/HowItWorks";
import { PageHero } from "@/components/PageHero";
import { createPageMetadata } from "@/lib/metadata";
import { SERVICE_PAGES } from "@/lib/services";

export const metadata = createPageMetadata({
  title: "How Business Funding Reviews Work | Growth Spark Co.",
  description:
    "Learn how to request a business funding review with Growth Spark Co. A specialist may follow up. We are not a lender, and approval is not guaranteed.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="How It Works"
        subtitle="A simple, professional path to reviewing your business funding options."
      />
      <HowItWorks className="pt-8 lg:pt-12" />
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-navy">Uses of funds you can describe</h2>
          <p className="mt-4 leading-relaxed text-charcoal">
            The request form asks for an intended use of funds. These pages explain the topics that
            have their own guides:
          </p>
          <ul className="mt-4 space-y-2">
            {SERVICE_PAGES.map((page) => (
              <li key={page.slug}>
                <Link href={`/${page.slug}`} className="font-semibold text-accent-blue hover:underline">
                  {page.navLabel}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-10 text-2xl font-bold tracking-tight text-navy">
            What submitting a request does not mean
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal">
            Submitting a request does not guarantee approval or funding. Options are subject to
            review based on your business profile. Growth Spark Co. is not a direct lender unless
            otherwise stated.
          </p>
          <Link
            href="/#request-review"
            className="mt-8 inline-flex items-center rounded-lg bg-accent-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Start Your Review
          </Link>
        </div>
      </section>
    </>
  );
}
