import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "./constants";

type PageMeta = {
  title: string;
  description: string;
  path?: string;
};

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Growth Spark Co. — a marketing and referral service for business funding. Not a direct lender.",
} as const;

export function createPageMetadata({ title, description, path = "" }: PageMeta): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
