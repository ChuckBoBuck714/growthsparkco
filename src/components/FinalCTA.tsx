import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-navy to-slate-800 px-8 py-12 text-center shadow-lg sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Take the Next Step Toward Business Growth
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Growth starts with a conversation. Submit your request today and review potential funding
            options for your business.
          </p>
          <Link
            href="#request-review"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-accent-blue px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy"
          >
            Check Your Options
          </Link>
        </div>
      </div>
    </section>
  );
}
