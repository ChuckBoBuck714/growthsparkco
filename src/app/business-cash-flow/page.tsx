import { ServiceRoute, serviceMetadata } from "@/lib/service-page";

const slug = "business-cash-flow";

export const metadata = serviceMetadata(slug);

export default function BusinessCashFlowPage() {
  return <ServiceRoute slug={slug} />;
}
