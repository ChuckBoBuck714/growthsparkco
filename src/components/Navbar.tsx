"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { isServicePath } from "@/lib/services";

function linkIsActive(href: string, pathname: string) {
  if (href === "/small-business-funding") return isServicePath(pathname);
  return pathname === href;
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-navy hover:text-accent-blue transition-colors"
        >
          {SITE_NAME}
        </Link>

        <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
          {NAV_LINKS.map(({ href, label }) => {
            const active = linkIsActive(href, pathname);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-accent-blue ${
                    active ? "text-accent-blue" : "text-charcoal"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/#request-review"
            className="inline-flex items-center rounded-lg bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
          >
            Request a Review
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-charcoal hover:bg-slate-100 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-border bg-white px-4 pb-6 lg:hidden">
          <ul className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map(({ href, label }) => {
              const active = linkIsActive(href, pathname);
              return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-slate-50 ${
                    active ? "text-accent-blue bg-accent-blue-light/30" : "text-charcoal"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
              );
            })}
          </ul>
          <Link
            href="/#request-review"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-accent-blue px-5 py-3 text-sm font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Request a Review
          </Link>
        </div>
      )}
    </header>
  );
}
