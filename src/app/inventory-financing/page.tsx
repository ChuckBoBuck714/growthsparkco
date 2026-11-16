import { ServiceRoute, serviceMetadata } from "@/lib/service-page";

const slug = "inventory-financing";

export const metadata = serviceMetadata(slug);

export default function InventoryFinancingPage() {
  return <ServiceRoute slug={slug} />;
}
