import Link from "next/link";
import { SERVICE_PAGES } from "@/lib/services";
import { SectionHeading } from "./SectionHeading";

const cardLinks = new Map<string, string>(
  SERVICE_PAGES.flatMap((page) =>
    page.homepageCardTitle ? [[page.homepageCardTitle, `/${page.slug}`] as const] : [],
  ),
);

const useCases = [
  { title: "Expansion", description: "Open a new location, add capacity, or support a larger growth plan." },
  { title: "Working Capital", description: "Cover short-term needs, operating expenses, and cash flow gaps." },
  { title: "Inventory", description: "Purchase inventory, prepare for seasonal demand, or fulfill larger orders." },
  { title: "Equipment", description: "Upgrade machinery, vehicles, technology, or business tools." },
  { title: "Payroll", description: "Support staffing needs during busy periods or expansion phases." },
  { title: "Marketing", description: "Invest in customer acquisition, advertising, outreach, and sales growth." },
  { title: "Hiring", description: "Bring on new employees, sales reps, contractors, or operational support." },
  { title: "Cash Flow", description: "Manage timing gaps between receivables, expenses, and growth opportunities." },
];

export function FundingUseCases() {
  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Business Funding Can Help Support"
          subtitle="Business capital can be used for a wide range of growth and operating needs."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => {
            const href = cardLinks.get(item.title);
            const body = (
              <>
                <div className="h-1 w-8 rounded-full bg-accent-green" />
                <h3 className="mt-4 text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">{item.description}</p>
                {href ? (
                  <span className="mt-4 inline-block text-sm font-semibold text-accent-blue">Learn more</span>
                ) : null}
              </>
            );

            if (!href) {
              return (
                <div key={item.title} className="rounded-xl border border-border bg-white p-6 shadow-sm">
                  {body}
                </div>
              );
            }

            return (
              <Link
                key={item.title}
                href={href}
                className="rounded-xl border border-border bg-white p-6 shadow-sm transition hover:border-accent-blue hover:shadow-md"
              >
                {body}
              </Link>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm leading-relaxed text-charcoal">
          Payroll, marketing, and hiring can be selected as an intended use of funds on the request
          form.{" "}
          <Link href="/small-business-funding" className="font-semibold text-accent-blue hover:underline">
            See small business funding options
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
