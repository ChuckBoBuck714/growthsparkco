import Link from "next/link";

export function CredibilitySection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Capital Support Built Around Business Growth
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal">
            Growth Spark Co. was created to help small business owners take the next step with more
            clarity, speed, and confidence. Instead of searching across multiple providers on your
            own, you can submit one request and review potential funding options based on your
            business profile.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-charcoal">
            Our goal is to make the process simple, professional, and focused on real business needs
            — whether you are looking to expand, stabilize cash flow, purchase equipment, invest in
            marketing, or support daily operations.
          </p>
          <Link
            href="#request-review"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent-green px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2"
          >
            Start Your Funding Review
          </Link>
        </div>
      </div>
    </section>
  );
}
