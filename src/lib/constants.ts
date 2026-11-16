export const SITE_NAME = "Growth Spark Co.";
export const SITE_LEGAL_NAME = "Growth Spark Co. LLC";
// The live site is served on the www host. Vercel 308-redirects the apex
// (https://growthsparkco.com) to www. Public URLs in this repo use www so
// canonicals, Open Graph URLs, and the sitemap match that host.
export const SITE_URL = "https://www.growthsparkco.com";
export const SITE_DOMAIN = "www.growthsparkco.com";
export const SITE_EMAIL = "info@growthsparkco.com";
export const SITE_PHONE = "(949) 342-5432";
export const SITE_PHONE_E164 = "+1-949-342-5432";
export const BUSINESS_HOURS = "Monday–Friday, 7:00 AM – 4:00 PM PST";

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const ORGANIZATION_DESCRIPTION =
  "Growth Spark Co. LLC is a marketing and referral service that helps small-business owners explore funding options. Growth Spark Co. is not a direct lender, bank, or government agency, and it does not fund, issue, or make loans directly. A specialist may follow up after an owner submits a request. Products may not be available in all states, and submitting a request does not guarantee approval, funding, or specific terms.";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/small-business-funding", label: "Funding" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export const FOOTER_DISCLAIMER =
  "Growth Spark Co. helps connect businesses with financing options and funding-related services. Growth Spark Co. is not a direct lender unless otherwise stated. Submission of information does not guarantee approval, funding, or specific terms. By submitting your information, you agree to be contacted by phone, email, and SMS regarding business funding options. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out or HELP for help.";

export const CONSENT_TEXT =
  "I give my express consent to receive recurring automated service updates and account notifications texts to the phone number from Growth Spark Co. Message and data rates may apply. Msg frequency varies. I understand I can opt-out by replying 'STOP' to any message, or get more info by replying 'HELP.' Consent is not required for purchasing products or services. My number will not be shared with third parties or affiliates.";

export const TIME_IN_BUSINESS_OPTIONS = [
  "Less than 6 months",
  "6–12 months",
  "1–2 years",
  "2–5 years",
  "5+ years",
] as const;

export const MONTHLY_REVENUE_OPTIONS = [
  "Under $10,000",
  "$10,000–$20,000",
  "$20,000–$50,000",
  "$50,000–$100,000",
  "$100,000+",
] as const;

export const FUNDING_AMOUNT_OPTIONS = [
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "$100,000–$250,000",
  "$250,000+",
] as const;

export const USE_OF_FUNDS_OPTIONS = [
  "Working Capital",
  "Expansion",
  "Equipment",
  "Inventory",
  "Payroll",
  "Marketing",
  "Hiring",
  "Cash Flow",
  "Other",
] as const;

export type UseOfFundsOption = (typeof USE_OF_FUNDS_OPTIONS)[number];
