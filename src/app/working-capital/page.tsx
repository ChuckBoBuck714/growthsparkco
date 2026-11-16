import { ServiceRoute, serviceMetadata } from "@/lib/service-page";

const slug = "working-capital";

export const metadata = serviceMetadata(slug);

export default function WorkingCapitalPage() {
  return <ServiceRoute slug={slug} />;
}
