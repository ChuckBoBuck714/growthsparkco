import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About Growth Spark Co. | Business Funding Referral Service",
  description:
    "Growth Spark Co. is a marketing and referral service that helps small business owners explore funding options. Not a direct lender, and approval is not guaranteed.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Growth Spark Co."
        subtitle="Business Expansion Capital for Growing Companies"
      />
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-10 px-4 text-lg leading-relaxed text-charcoal sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-navy">
              Business needs owners ask about
            </h2>
            <p>
              Growth Spark Co. was created to help small business owners explore funding options with
              more clarity and confidence. We focus on legitimate business needs —{" "}
              <Link href="/business-expansion-capital" className="font-semibold text-accent-blue hover:underline">
                expansion
              </Link>
              ,{" "}
              <Link href="/working-capital" className="font-semibold text-accent-blue hover:underline">
                working capital
              </Link>
              ,{" "}
              <Link href="/equipment-financing" className="font-semibold text-accent-blue hover:underline">
                equipment
              </Link>
              ,{" "}
              <Link href="/inventory-financing" className="font-semibold text-accent-blue hover:underline">
                inventory
              </Link>
              , payroll, marketing, hiring, and{" "}
              <Link href="/business-cash-flow" className="font-semibold text-accent-blue hover:underline">
                cash flow
              </Link>{" "}
              support.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-navy">One request, then a possible follow-up</h2>
            <p>
              Rather than navigating multiple providers on your own, you can submit one professional
              request and review potential options based on your business profile. A funding specialist
              may contact you to discuss next steps if there appears to be a potential fit.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-navy">A referral service, not a direct lender</h2>
            <p>
              Growth Spark Co. helps connect businesses with financing options and funding-related
              services. Growth Spark Co. is not a direct lender unless otherwise stated. Submitting a
              request does not guarantee approval, funding, or specific terms.{" "}
              <Link href="/small-business-funding" className="font-semibold text-accent-blue hover:underline">
                See small business funding options
              </Link>
              .
            </p>
          </div>
          <div className="pt-4">
            <Link
              href="/#request-review"
              className="inline-flex items-center rounded-lg bg-accent-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Request a Funding Review
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
