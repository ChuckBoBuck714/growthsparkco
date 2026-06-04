import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About Us | Growth Spark Co.",
  description:
    "Learn how Growth Spark Co. helps small business owners explore professional funding options for expansion, working capital, and growth.",
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
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-lg leading-relaxed text-charcoal sm:px-6 lg:px-8">
          <p>
            Growth Spark Co. was created to help small business owners explore funding options with
            more clarity and confidence. We focus on legitimate business needs — expansion, working
            capital, equipment, inventory, payroll, marketing, hiring, and cash flow support.
          </p>
          <p>
            Rather than navigating multiple providers on your own, you can submit one professional
            request and review potential options based on your business profile. A funding specialist
            may contact you to discuss next steps if there appears to be a potential fit.
          </p>
          <p>
            Growth Spark Co. helps connect businesses with financing options and funding-related
            services. Growth Spark Co. is not a direct lender unless otherwise stated. Submitting a
            request does not guarantee approval, funding, or specific terms.
          </p>
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
