import { ServiceRoute, serviceMetadata } from "@/lib/service-page";

const slug = "small-business-funding";

export const metadata = serviceMetadata(slug);

export default function SmallBusinessFundingPage() {
  return <ServiceRoute slug={slug} />;
}