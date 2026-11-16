import {
  absoluteUrl,
  ORGANIZATION_DESCRIPTION,
  ORGANIZATION_ID,
  SITE_EMAIL,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_PHONE_E164,
  SITE_URL,
} from "@/lib/constants";
import type { FAQItem } from "@/lib/faqs";
import type { ServicePageContent } from "@/lib/services";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/apple-icon"),
    telephone: SITE_PHONE_E164,
    email: SITE_EMAIL,
    description: ORGANIZATION_DESCRIPTION,
  };
}

export function faqPageJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceJsonLd(service: ServicePageContent) {
  const url = absoluteUrl(`/${service.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.serviceName,
    serviceType: "Business funding referral",
    description: service.description,
    url,
    provider: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
    },
    termsOfService: absoluteUrl("/terms"),
  };
}
