import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Growth Spark Co.",
  description:
    "This page is not available on Growth Spark Co. Return home, review small business funding topics, or contact a specialist.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-blue">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-charcoal">
          The page you requested is not available. It may have moved, or the address may be incorrect.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-accent-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
          >
            Back to home
          </Link>
          <Link
            href="/small-business-funding"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-6 py-3.5 text-sm font-semibold text-navy shadow-sm transition hover:border-accent-blue hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
          >
            Small business funding
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-6 py-3.5 text-sm font-semibold text-navy shadow-sm transition hover:border-accent-blue hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
