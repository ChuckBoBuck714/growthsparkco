import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/constants";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageLayoutProps = {
  title: string;
  lastUpdated?: string;
  sections?: LegalSection[];
  children?: ReactNode;
};

export function LegalPageLayout({
  title,
  lastUpdated,
  sections,
  children,
}: LegalPageLayoutProps) {
  return (
    <article className="py-12 lg:py-16">
      {/*
        LEGAL REVIEW REQUIRED: Content sourced from counsel-provided documents.
        Have qualified counsel review all legal content before production launch.
      */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
        >
          ← Back to Home
        </Link>

        <header className="mt-6 border-b border-border pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h1>
          {lastUpdated && (
            <p className="mt-3 text-sm text-charcoal">Last updated: {lastUpdated}</p>
          )}
        </header>

        {sections && sections.length > 0 && (
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-xl font-semibold text-navy">{section.title}</h2>
                <div className="prose-legal mt-4 space-y-4 text-base leading-relaxed text-charcoal">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        )}

        {children && (
          <div className="prose-legal mt-10 space-y-4 text-base leading-relaxed text-charcoal">
            {children}
          </div>
        )}
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
