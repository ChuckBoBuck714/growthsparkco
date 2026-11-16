import { ImageResponse } from "next/og";
import { SocialCard } from "@/lib/brand-image";

export const alt =
  "Growth Spark Co. — a marketing and referral service for business funding. Not a direct lender.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard />, { ...size });
}
