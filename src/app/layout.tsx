import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LightningBackground } from "@/components/LightningBackground";
import { Navbar } from "@/components/Navbar";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { organizationJsonLd } from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Growth Spark Co. | Business Expansion Capital for Growing Companies",
    template: "%s",
  },
  description:
    "Growth Spark Co. is a marketing and referral service that helps small business owners explore business funding options. Growth Spark Co. is not a direct lender.",
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "sHrGB6eJVXR9vGSKnSuKRqBudfmgFScC7q3DCBpn8ec",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="relative min-h-screen flex flex-col antialiased">
        <JsonLd data={organizationJsonLd()} />
        <LightningBackground />
        <div className="relative z-0 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
