import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { LightningBackground } from "@/components/LightningBackground";
import { Navbar } from "@/components/Navbar";
import { createPageMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = createPageMetadata({
  title: "Growth Spark Co. | Business Expansion Capital for Growing Companies",
  description:
    "Growth Spark Co. helps small business owners explore funding options for expansion, working capital, equipment, inventory, payroll, marketing, and cash flow needs.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="relative min-h-screen flex flex-col antialiased">
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
