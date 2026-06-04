import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";

type PageMeta = {
  title: string;
  description: string;
  path?: string;
};

export function createPageMetadata({ title, description, path = "" }: PageMeta): Metadata {
  const url = `${SITE_URL}${path}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
