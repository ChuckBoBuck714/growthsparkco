import { ServiceRoute, serviceMetadata } from "@/lib/service-page";

const slug = "business-expansion-capital";

export const metadata = serviceMetadata(slug);

export default function BusinessExpansionCapitalPage() {
  return <ServiceRoute slug={slug} />;
}
