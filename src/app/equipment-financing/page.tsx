import { ServiceRoute, serviceMetadata } from "@/lib/service-page";

const slug = "equipment-financing";

export const metadata = serviceMetadata(slug);

export default function EquipmentFinancingPage() {
  return <ServiceRoute slug={slug} />;
}
