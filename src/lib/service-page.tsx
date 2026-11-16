import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/ServicePageView";
import { createPageMetadata } from "@/lib/metadata";
import { getService } from "@/lib/services";

export function serviceMetadata(slug: string): Metadata {
  const service = getService(slug);
  if (!service) {
    throw new Error(`No service page data for slug "${slug}"`);
  }

  return createPageMetadata({
    title: service.metaTitle,
    description: service.description,
    path: `/${service.slug}`,
  });
}

export function ServiceRoute({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) notFound();
  return <ServicePageView service={service} />;
}
