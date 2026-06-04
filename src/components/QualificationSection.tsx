const bullets = [
  "Active operating businesses",
  "Owners, partners, or authorized decision-makers",
  "Businesses seeking $10,000 or more",
  "Companies with consistent monthly business revenue or deposits",
  "Businesses with a clear use for capital",
  "Businesses looking to grow, stabilize cash flow, or support operations",
];

export function QualificationSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl text-center">
            Who We Typically Help
          </h2>
          <p className="mt-4 text-center text-lg text-charcoal leading-relaxed">
            Growth Spark Co. is designed for business owners and decision-makers who are exploring
            capital for legitimate business purposes.
          </p>
          <ul className="mt-10 space-y-4">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-charcoal">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-lg border border-border bg-slate-50 px-4 py-3 text-sm text-charcoal text-center">
            Not every business will qualify, and submitting a request does not guarantee approval.
          </p>
        </div>
      </div>
    </section>
  );
}
