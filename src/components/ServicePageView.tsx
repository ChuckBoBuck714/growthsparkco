import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { BUSINESS_HOURS, SITE_EMAIL, SITE_PHONE } from "@/lib/constants";
import { serviceJsonLd } from "@/lib/schema";
import { getRelatedServices, type ServicePageContent } from "@/lib/services";

export function ServicePageView({ service }: { service: ServicePageContent }) {
  const related = getRelatedServices(service);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <PageHero title={service.h1} subtitle={service.subtitle} />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-lg leading-relaxed text-charcoal sm:px-6 lg:px-8">
          {service.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {service.sections.map((section) => (
            <div key={section.heading} className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold tracking-tight text-navy">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
          <p className="rounded-lg border border-border bg-slate-50 px-4 py-3 text-sm leading-relaxed text-charcoal">
            Growth Spark Co. LLC is a marketing and referral service. It does not fund, issue, or make
            loans directly. Submitting a request does not guarantee approval, funding, or specific
            terms. Products may not be available in all states.{" "}
            <Link href="/disclaimer" className="font-semibold text-accent-blue hover:underline">
              Read the disclaimer
            </Link>
            .
          </p>
          <div>
            <a
              href="#request-review"
              className="inline-flex items-center rounded-lg bg-accent-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
            >
              Request a Funding Review
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Related Funding Topics
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-charcoal">
              These are other uses of funds an owner can ask about. Each page is a review request,
              not an offer of credit.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="rounded-xl border border-border bg-white p-6 shadow-sm transition hover:border-accent-blue hover:shadow-md"
                >
                  <div className="h-1 w-8 rounded-full bg-accent-green" />
                  <h3 className="mt-4 text-lg font-semibold text-navy">{page.navLabel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">{page.summary}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-accent-blue">Learn more</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQAccordion items={service.faqs} showViewAll={false} heading={service.faqHeading} />

      <section className="border-t border-border py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-navy">Request a review for this use of funds</h2>
            <p className="mt-4 leading-relaxed text-charcoal">
              Tell us about the business and select the use of funds that matches this page. A
              funding specialist may contact you during business hours. Submitting the form does not
              guarantee approval or funding.
            </p>
            <ul className="mt-8 space-y-4 text-charcoal">
              <li>
                <span className="font-semibold text-navy">Email: </span>
                <a href={`mailto:${SITE_EMAIL}`} className="text-accent-blue hover:underline">
                  {SITE_EMAIL}
                </a>
              </li>
              <li>
                <span className="font-semibold text-navy">Phone: </span>
                <a href={`tel:${SITE_PHONE.replace(/\D/g, "")}`} className="text-accent-blue hover:underline">
                  {SITE_PHONE}
                </a>
              </li>
              <li>
                <span className="font-semibold text-navy">Hours: </span>
                {BUSINESS_HOURS}
              </li>
            </ul>
          </div>
          <LeadForm defaultUseOfFunds={service.defaultUseOfFunds} />
        </div>
      </section>
    </>
  );
}
