import Link from "next/link";
import { HowItWorks } from "@/components/HowItWorks";
import { PageHero } from "@/components/PageHero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "How It Works | Growth Spark Co.",
  description:
    "Learn the simple three-step process to submit a business funding review request with Growth Spark Co.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="How It Works"
        subtitle="A simple, professional path to reviewing your business funding options."
      />
      <HowItWorks showHeading={false} className="pt-0" />
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-charcoal">
            Submitting a request does not guarantee approval or funding. Options are subject to
            review based on your business profile.
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
