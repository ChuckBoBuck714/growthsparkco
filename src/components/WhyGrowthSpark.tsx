const features = [
  {
    title: "Clear Process",
    description: "Know what information is needed and what happens next.",
  },
  {
    title: "Business-First Positioning",
    description: "Funding requests are reviewed around business use cases and growth needs.",
  },
  {
    title: "Respectful Communication",
    description: "You can opt out of SMS communications at any time by replying STOP.",
  },
  {
    title: "No Approval Guarantee",
    description:
      "We keep expectations clear: submitting a request is not a commitment or a guarantee of funding.",
  },
];

export function WhyGrowthSpark() {
  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Professional Funding Support Without the Confusion
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal">
            Finding business capital can be time-consuming. Growth Spark Co. helps simplify the
            process by collecting the key information needed to begin a funding review and helping
            connect business owners with possible options.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-navy">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
