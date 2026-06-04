import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { BUSINESS_HOURS, SITE_EMAIL, SITE_PHONE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact Us | Growth Spark Co.",
  description:
    "Contact Growth Spark Co. or submit a business funding review request. Speak with a funding specialist during business hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Growth Spark Co."
        subtitle="Submit a funding review request or reach out during business hours."
      />
      <section className="py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-navy">Speak With a Funding Specialist</h2>
            <p className="mt-4 text-charcoal leading-relaxed">
              A funding specialist may contact you after you submit a request to review your
              information and discuss potential options. You may also reach us using the contact
              details below during business hours.
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
            <p className="mt-8 text-sm text-charcoal">
              Submitting information does not guarantee approval or funding. Growth Spark Co. is not
              a direct lender unless otherwise stated.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
