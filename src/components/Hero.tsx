import Link from "next/link";
import { LeadForm } from "./LeadForm";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:pt-4">
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
              Business Expansion Capital for Growing Companies
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-charcoal">
              Growth Spark Co. helps small business owners explore funding options for expansion,
              working capital, equipment, inventory, payroll, marketing, and cash flow needs.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal">
              Submit a simple request and a funding specialist may contact you to review possible
              options based on your business profile.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#request-review"
                className="inline-flex items-center justify-center rounded-lg bg-accent-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
              >
                Check Your Options
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-6 py-3.5 text-sm font-semibold text-navy shadow-sm transition hover:border-accent-blue hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
              >
                How It Works
              </Link>
            </div>
          </div>
          <LeadForm className="lg:sticky lg:top-24" />
        </div>
      </div>
    </section>
  );
}
