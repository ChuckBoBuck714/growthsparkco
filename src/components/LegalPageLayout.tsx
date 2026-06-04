import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <article className="py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
        >
          ← Back to Home
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-navy">{title}</h1>
        <p className="mt-2 text-sm text-charcoal">Last updated: {lastUpdated}</p>
        <div className="prose-legal mt-10 space-y-8 text-charcoal">{children}</div>
      </div>
    </article>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-navy">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed">{children}</div>
    </section>
  );
}
