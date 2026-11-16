import { BUSINESS_HOURS, SITE_PHONE, type UseOfFundsOption } from "@/lib/constants";

/**
 * Draft copy for use-of-funds pages.
 *
 * TODO(owner): Have counsel review every page in this file before treating it as final marketing copy.
 * TODO(owner): Confirm each URL should stay published. Remove any use of funds you do not want the site to rank for.
 * TODO(owner): Confirm "funding options" and "financing options" match how specialists describe a referral. Do not add lender or partner names.
 * TODO(owner): Confirm relatedSlugs are the cross-links you want. They are editorial, not a statement of which products exist.
 * TODO(owner): Confirm defaultUseOfFunds still matches the lead form's existing "Intended Use of Funds" choices.
 * TODO(owner): Confirm these FAQ answers do not overstate the follow-up. The site only says a specialist may call during posted hours.
 * TODO(owner): Confirm phone, email, and hours in src/lib/constants.ts are still the public contact details. This file reads the phone and hours from there.
 * TODO(owner): Payroll, marketing, and hiring stay form choices only. Add pages for them only if you want those terms to rank.
 * TODO(owner): Do not add rates, approval odds, timelines, statistics, testimonials, addresses, or "available in all states" without a sourced, counsel-approved claim.
 * TODO(owner): Replace the generated GS mark (src/app/icon.tsx, apple-icon.tsx, opengraph-image.tsx) with an official logo if you have one.
 */

export type ServiceSection = {
  heading: string;
  paragraphs: string[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePageContent = {
  slug: string;
  navLabel: string;
  metaTitle: string;
  description: string;
  h1: string;
  subtitle: string;
  summary: string;
  serviceName: string;
  homepageCardTitle?: string;
  defaultUseOfFunds?: UseOfFundsOption;
  faqHeading: string;
  intro: string[];
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
};

export const SERVICE_PAGES: ServicePageContent[] = [
  {
    slug: "small-business-funding",
    navLabel: "Small Business Funding",
    metaTitle: "Small Business Funding Options | Growth Spark Co.",
    description:
      "Explore small business funding options with Growth Spark Co., a marketing and referral service. Request a review. Not a direct lender, and approval is not guaranteed.",
    h1: "Small Business Funding Options",
    subtitle:
      "One request to start a funding review. Growth Spark Co. does not lend, and nothing on this page is an offer of credit.",
    summary: "An overview of the funding topics an owner can ask Growth Spark Co. to review.",
    serviceName: "Small business funding review",
    faqHeading: "Questions About Small Business Funding Reviews",
    intro: [
      "Growth Spark Co. helps small business owners ask about funding for real operating and growth needs. You submit one request. A funding specialist may follow up during business hours if there appears to be a possible next step.",
      "This is a marketing and referral service. Growth Spark Co. is not a direct lender, bank, or government agency. This page does not publish rates, promise an approval, or say that a product is available in every state.",
    ],
    sections: [
      {
        heading: "Topics you can ask about",
        paragraphs: [
          "The request form asks how you intend to use funds. The choices already on the form are working capital, expansion, equipment, inventory, payroll, marketing, hiring, cash flow, or another business purpose.",
          "Working capital, equipment, expansion, inventory, and cash flow each have a page that explains the request in more detail. Payroll, marketing, and hiring are still choices on the form. They do not have separate pages.",
        ],
      },
      {
        heading: "What the review asks for",
        paragraphs: [
          "The form asks for your name, business name, phone, email, time in business, a monthly revenue range, a requested funding range, and the intended use of funds. You can add a note.",
          "You are also asked to consent to contact by phone, email, and text. Consent is not required to buy a product, and you can reply STOP to opt out of texts.",
        ],
      },
      {
        heading: "What a request does not do",
        paragraphs: [
          "Sending the form does not guarantee a call, an approval, funding, or any terms. Products may not be available in all states.",
          "If a third-party provider offers funding, that provider decides. Growth Spark Co. does not fund, issue, or make loans directly.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Growth Spark Co. a small business lender?",
        answer:
          "No. Growth Spark Co. is a marketing and referral service. It helps connect businesses with financing options and funding-related services. It does not fund, issue, or make loans directly.",
      },
      {
        question: "Will I be approved if I request small business funding?",
        answer:
          "No. Submitting your information does not guarantee approval, funding, or any specific terms. Not every business will qualify.",
      },
      {
        question: "Do you offer funding in every state?",
        answer:
          "No. Products may not be available in all states. A specialist, if one follows up, can only discuss options that may apply to your situation.",
      },
      {
        question: "How do I start a funding review?",
        answer: `Complete the request on this page, or call ${SITE_PHONE} during ${BUSINESS_HOURS}. A funding specialist may contact you during those hours. That window is for contact, not a promise of when funding would occur.`,
      },
    ],
    relatedSlugs: [
      "working-capital",
      "equipment-financing",
      "business-expansion-capital",
      "inventory-financing",
      "business-cash-flow",
    ],
  },
  {
    slug: "working-capital",
    navLabel: "Working Capital",
    metaTitle: "Working Capital for Small Businesses | Growth Spark Co.",
    description:
      "Request a review of working capital options for operating expenses and short-term business needs. Growth Spark Co. is a referral service, not a direct lender.",
    h1: "Working Capital for Small Businesses",
    subtitle:
      "A review for day-to-day business needs. Not a loan offer, a rate quote, or an approval.",
    summary: "A funding review for short-term needs, operating expenses, and cash flow gaps.",
    serviceName: "Working capital funding review",
    homepageCardTitle: "Working Capital",
    defaultUseOfFunds: "Working Capital",
    faqHeading: "Questions About Working Capital Reviews",
    intro: [
      "Working capital, as this site uses the term, is for short-term needs, operating expenses, and cash flow gaps. Owners often ask about it when bills, payroll timing, or customer payments do not line up.",
      "Growth Spark Co. can take a request from an owner who wants that review. We are a marketing and referral service, not the lender. A specialist may contact you about possible next steps. This page is not a commitment to fund the business.",
    ],
    sections: [
      {
        // TODO(owner): Confirm working capital should be described only as a use of funds on the review form, which is how the form treats it today.
        heading: "What a working-capital review is for",
        paragraphs: [
          "On this site, working capital means support for short-term needs, operating expenses, and gaps in cash flow. It is one of the intended uses on the request form.",
          "Choosing it does not mean a particular bill or expense will be financed. It tells a reviewer what the request is about.",
        ],
      },
      {
        heading: "What to include with the request",
        paragraphs: [
          "Share the business name, how to reach you, how long you have been operating, a monthly revenue range, the funding range you want reviewed, and Working Capital as the use of funds.",
          "Optional notes can describe the timing gap in your own words. Do not include passwords or full account numbers.",
        ],
      },
      {
        heading: "What this page does not quote",
        paragraphs: [
          "Growth Spark Co. does not set a rate, a fee, or a repayment schedule, and this page does not quote any.",
          "We also do not promise how soon anyone will call, or that an option exists in your state. Products may not be available in all states.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Growth Spark Co. provide working capital loans?",
        answer:
          "No. Growth Spark Co. is not a direct lender. A working-capital request is a request for a review. Any funding would come from a third party, if one offers it, and is not guaranteed.",
      },
      {
        question: "Can I use the review to ask about operating expenses?",
        answer:
          "You can describe operating expenses, short-term needs, or a cash flow gap as the reason you are asking about working capital. Describing the need does not mean it will be approved.",
      },
      {
        question: "Is every business eligible for working capital?",
        answer:
          "No. The site is aimed at active operating businesses with consistent revenue or deposits and an authorized decision-maker. Not every business will qualify.",
      },
      {
        question: "Will you tell me a rate for working capital?",
        answer:
          "No. Growth Spark Co. does not publish rates or terms. Any terms, if offered at all, would come from a third-party provider after its own review.",
      },
    ],
    relatedSlugs: [
      "business-cash-flow",
      "inventory-financing",
      "equipment-financing",
      "business-expansion-capital",
      "small-business-funding",
    ],
  },
  {
    slug: "equipment-financing",
    navLabel: "Equipment Financing",
    metaTitle: "Equipment Financing for Small Businesses | Growth Spark Co.",
    description:
      "Ask about equipment financing for machinery, vehicles, technology, or business tools. Growth Spark Co. refers funding questions and is not a direct lender.",
    h1: "Equipment Financing for Small Businesses",
    subtitle:
      "A referral review for business equipment. No rate, no approval promise, and not a claim of availability in every state.",
    summary: "A review for machinery, vehicles, technology, or other business tools.",
    serviceName: "Equipment financing referral",
    homepageCardTitle: "Equipment",
    defaultUseOfFunds: "Equipment",
    faqHeading: "Questions About Equipment Financing Reviews",
    intro: [
      "Equipment needs on this site include machinery, vehicles, technology, and other business tools. Owners request a review when replacing a tool, adding capacity, or updating equipment the business already uses.",
      "Growth Spark Co. does not sell equipment and does not finance it directly. Submit a request with Equipment selected, and a funding specialist may follow up if there is a possible fit.",
    ],
    sections: [
      {
        // TODO(owner): Confirm whether equipment requests are discussed only as a use of funds. This draft does not describe leases, vendor programs, or named finance companies.
        heading: "Equipment needs you can describe",
        paragraphs: [
          "The homepage describes this use of funds as a way to upgrade machinery, vehicles, technology, or business tools. Use the request if that is the business purpose.",
          "You may name the type of equipment in the optional notes. Extra detail does not guarantee that a funding option exists.",
        ],
      },
      {
        heading: "What a follow-up can cover",
        paragraphs: [
          "If someone calls, it is to review the information you sent and talk about possible next steps. Growth Spark Co. may help connect you with financing options and funding-related services.",
          "The company does not itself approve, fund, or issue that financing.",
        ],
      },
      {
        heading: "What we leave off this page",
        paragraphs: [
          "There are no payment examples, no rates, and no claim that equipment funding is offered in all states. There is also no list of manufacturers or finance companies.",
          "If a provider offers terms, those terms belong in that provider's documents. Read them before agreeing to anything.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can Growth Spark Co. finance a vehicle or a machine directly?",
        answer:
          "No. Growth Spark Co. is a marketing and referral service, not a direct lender, and it does not fund equipment purchases itself.",
      },
      {
        question: "Do I need to name the equipment?",
        answer:
          "The form only requires you to choose a use of funds. You may describe the machinery, vehicle, technology, or tools in the notes. Naming them does not guarantee an option.",
      },
      {
        question: "Are equipment options available in my state?",
        answer:
          "Not necessarily. Products may not be available in all states. This page does not promise coverage in any particular state.",
      },
      {
        question: "Will I get a monthly payment quote?",
        answer: "No. This site does not quote payments, rates, or terms for equipment or any other use of funds.",
      },
    ],
    relatedSlugs: [
      "business-expansion-capital",
      "working-capital",
      "inventory-financing",
      "small-business-funding",
    ],
  },
  {
    slug: "business-expansion-capital",
    navLabel: "Expansion Capital",
    metaTitle: "Business Expansion Capital | Growth Spark Co.",
    description:
      "Explore expansion capital for a new location, added capacity, or a larger growth plan. Growth Spark Co. is a referral service, not a direct lender.",
    h1: "Business Expansion Capital",
    subtitle: "Ask for a review of capital for a growth plan. Submitting a request is not an approval.",
    summary: "A review for a new location, added capacity, or a larger growth plan.",
    serviceName: "Business expansion capital review",
    homepageCardTitle: "Expansion",
    defaultUseOfFunds: "Expansion",
    faqHeading: "Questions About Expansion Capital Reviews",
    intro: [
      "Expansion capital, as this site already describes it, is for owners who want to open a new location, add capacity, or support a larger growth plan. It is a use of funds on the request form, not a promise that the plan will be funded.",
      "Growth Spark Co. helps you put that request in one place. A specialist may contact you during business hours. We are not a direct lender, and we do not guarantee that expansion capital is available for your business or your state.",
    ],
    sections: [
      {
        heading: "Growth plans you can describe",
        paragraphs: [
          "Owners use this request to talk about a new location, more capacity, or a broader growth plan. Related pages cover equipment, inventory, and working capital if one of those is the closer fit.",
          "Pick the use that best matches the request, and explain the rest in the notes.",
        ],
      },
      {
        heading: "Who the homepage says the review is for",
        paragraphs: [
          "The site describes the review as a fit for active operating businesses, authorized decision-makers, and companies with consistent monthly revenue or deposits. It also says the audience includes businesses seeking $10,000 or more.",
          "Those points describe who the conversation is meant for. They are not a checklist that creates an approval.",
        ],
      },
      {
        heading: "A plan on the form is not a funding decision",
        paragraphs: [
          "Describing a growth plan does not mean Growth Spark Co. agrees the plan is fundable, and it does not mean a third party will offer capital.",
          "Products may not be available in all states. This page does not give a closing timeline.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does requesting expansion capital mean my growth plan is approved?",
        answer:
          "No. Submitting information does not guarantee approval, funding, or specific terms.",
      },
      {
        question: "Can I ask about a second location?",
        answer:
          "Yes. A new location is one of the expansion examples already listed on this site. Asking about it is not a commitment from Growth Spark Co. or from any funding provider.",
      },
      {
        question: "Is Growth Spark Co. the source of the expansion capital?",
        answer:
          "No. Growth Spark Co. is a marketing and referral service, not a direct lender. It does not fund, issue, or make loans directly.",
      },
      {
        question: "How fast can expansion funding close?",
        answer:
          "This site does not state a timeline. A specialist may contact you during posted business hours to review your information. That is not a closing date.",
      },
    ],
    relatedSlugs: [
      "equipment-financing",
      "working-capital",
      "inventory-financing",
      "small-business-funding",
    ],
  },
  {
    slug: "inventory-financing",
    navLabel: "Inventory Financing",
    metaTitle: "Inventory Financing for Small Businesses | Growth Spark Co.",
    description:
      "Request a review of inventory funding for stock, seasonal demand, or larger orders. Growth Spark Co. is not a direct lender and does not guarantee approval.",
    h1: "Inventory Financing for Small Businesses",
    subtitle:
      "A review for inventory, seasonal demand, or a larger order. Not a guaranteed line of funding.",
    summary: "A review for purchasing inventory, seasonal demand, or a larger order.",
    serviceName: "Inventory financing referral",
    homepageCardTitle: "Inventory",
    defaultUseOfFunds: "Inventory",
    faqHeading: "Questions About Inventory Financing Reviews",
    intro: [
      "Inventory funding, as this site describes it, is for purchasing inventory, preparing for seasonal demand, or fulfilling larger orders. If that is the business need, select Inventory on the request form.",
      "Growth Spark Co. does not buy inventory for you and does not advance money itself. We take the request, and a specialist may follow up about financing options and funding-related services. Products may not be available in all states.",
    ],
    sections: [
      {
        // TODO(owner): Confirm this page should not mention purchase-order financing or a named inventory program. This draft does not, because the current site never describes those products.
        heading: "Inventory situations you can describe",
        paragraphs: [
          "You might be stocking up for a season, placing a larger order, or refilling products you already sell. Say which one in the notes if it helps the review.",
          "The form's revenue range and time-in-business range are the only size details this site asks for.",
        ],
      },
      {
        heading: "What happens after you submit",
        paragraphs: [
          "Your information is reviewed to help identify business funding options that may fit. A funding specialist may contact you to discuss next steps if there appears to be a potential fit.",
          "You may not be contacted. Contact, if it happens, is not an offer of funding.",
        ],
      },
      {
        heading: "No inventory program is named here",
        paragraphs: [
          "This page does not name a supplier, a warehouse, a lender, or a program. It does not say that seasonal businesses are approved more often, and it does not say inventory funding is offered in every state.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will Growth Spark Co. pay my supplier?",
        answer:
          "No. Growth Spark Co. does not fund, issue, or make loans, and it does not pay suppliers.",
      },
      {
        question: "Can I ask about a seasonal inventory order?",
        answer:
          "Yes. Seasonal demand is one of the inventory examples on the homepage. A request about that order is still subject to review and is not guaranteed.",
      },
      {
        question: "Do I have to share my supplier's name?",
        answer:
          "No. The form does not require it. You may add it in the notes if you want to. Do not include passwords or full account numbers.",
      },
      {
        question: "Is inventory funding available in every state?",
        answer:
          "Products may not be available in all states. This page does not list the states where any product is offered.",
      },
    ],
    relatedSlugs: [
      "working-capital",
      "business-cash-flow",
      "business-expansion-capital",
      "small-business-funding",
    ],
  },
  {
    slug: "business-cash-flow",
    navLabel: "Cash Flow",
    metaTitle: "Business Cash Flow Funding Options | Growth Spark Co.",
    description:
      "Explore cash flow funding for gaps between receivables, expenses, and growth. Growth Spark Co. is a referral service, not a lender, and approval is not guaranteed.",
    h1: "Business Cash Flow Funding",
    subtitle:
      "A review for timing gaps in the business. Not a promise that invoices will be paid early.",
    summary: "A review for gaps between receivables, expenses, and growth opportunities.",
    serviceName: "Business cash flow funding review",
    homepageCardTitle: "Cash Flow",
    defaultUseOfFunds: "Cash Flow",
    faqHeading: "Questions About Cash Flow Funding Reviews",
    intro: [
      "Cash flow funding, on this site, is about timing gaps between receivables, expenses, and growth opportunities. It is its own choice on the form when the issue is timing rather than a single purchase.",
      "This site does not describe invoice factoring and does not quote a rate. Send a request if you want a specialist to review whether any funding option may fit. A follow-up is possible, not promised.",
    ],
    sections: [
      {
        // TODO(owner): Confirm Growth Spark Co. does not want this page to describe invoice factoring. The draft says the site does not describe that product. Change it if that is wrong.
        heading: "Timing gaps you can describe",
        paragraphs: [
          "Examples already used on the site are gaps between money you are owed, bills you have to pay, and a growth opportunity. Describe the gap in the notes.",
          "Do not paste full bank or customer account numbers into the form.",
        ],
      },
      {
        heading: "How this differs from working capital",
        paragraphs: [
          "Working capital on this site is aimed at short-term needs and operating expenses. Cash flow is aimed at the timing between receivables, expenses, and growth.",
          "If both feel true, pick the closer label and explain the other in the notes. Either choice is only a label on the request.",
        ],
      },
      {
        heading: "What this page will not predict",
        paragraphs: [
          "We will not estimate how much of a receivable might be available, how soon money could arrive, or whether your customers' payment habits qualify you. Those claims are not published on this site.",
          "Products may not be available in all states.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this invoice factoring?",
        answer:
          "No. Growth Spark Co. does not describe an invoice-factoring product on this site, and it is not a direct lender. This page is only a request for a cash-flow funding review.",
      },
      {
        question: "Can slow customer payments be the reason I submit?",
        answer:
          "Yes. Receivables timing is part of the cash-flow description already on the homepage. Saying that is the reason does not mean the invoices will be funded.",
      },
      {
        question: "Do you guarantee a call about cash flow?",
        answer:
          "No. A funding specialist may contact you during business hours. The call is not guaranteed.",
      },
      {
        question: "Are cash-flow products offered in all states?",
        answer: "Products may not be available in all states.",
      },
    ],
    relatedSlugs: [
      "working-capital",
      "inventory-financing",
      "business-expansion-capital",
      "small-business-funding",
    ],
  },
];

export function getService(slug: string): ServicePageContent | undefined {
  return SERVICE_PAGES.find((page) => page.slug === slug);
}

export function getRelatedServices(service: ServicePageContent): ServicePageContent[] {
  return service.relatedSlugs
    .map((slug) => getService(slug))
    .filter((page): page is ServicePageContent => Boolean(page));
}

export function isServicePath(pathname: string): boolean {
  return SERVICE_PAGES.some((page) => pathname === `/${page.slug}`);
}
