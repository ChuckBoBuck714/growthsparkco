const steps = [
  {
    number: "1",
    title: "Tell us about your business",
    description:
      "Complete a short funding request with basic information about your company, revenue, time in business, and funding needs.",
  },
  {
    number: "2",
    title: "Review potential options",
    description:
      "Your information is reviewed to help identify business funding options that may fit your situation.",
  },
  {
    number: "3",
    title: "Speak with a funding specialist",
    description:
      "A specialist may contact you to discuss next steps, answer questions, and help you move forward if there is a potential fit.",
  },
];

type HowItWorksProps = {
  showHeading?: boolean;
  className?: string;
};

export function HowItWorks({ showHeading = true, className = "" }: HowItWorksProps) {
  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              A Simple Path to Reviewing Your Options
            </h2>
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-border bg-white p-8 shadow-sm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue text-sm font-bold text-white">
                {step.number}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
