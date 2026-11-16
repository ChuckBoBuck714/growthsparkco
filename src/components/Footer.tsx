import Link from "next/link";
import {
  BUSINESS_HOURS,
  FOOTER_DISCLAIMER,
  LEGAL_LINKS,
  NAV_LINKS,
  SITE_DOMAIN,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
} from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/services";

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-6">
          <div className="sm:col-span-2">
            <p className="text-lg font-bold text-navy">{SITE_NAME}</p>
            <p className="mt-2 text-sm text-charcoal">
              <a href={SITE_URL} className="hover:text-accent-blue transition-colors">
                {SITE_DOMAIN}
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-charcoal hover:text-accent-blue transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy">Funding</h3>
            <ul className="mt-4 space-y-2">
              {SERVICE_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="text-sm text-charcoal hover:text-accent-blue transition-colors"
                  >
                    {page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy">Legal</h3>
            <ul className="mt-4 space-y-2">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-charcoal hover:text-accent-blue transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-charcoal">
              <li>
                <a href={`mailto:${SITE_EMAIL}`} className="break-words hover:text-accent-blue transition-colors">
                  {SITE_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_PHONE.replace(/\D/g, "")}`} className="hover:text-accent-blue transition-colors">
                  {SITE_PHONE}
                </a>
              </li>
              <li>{BUSINESS_HOURS}</li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-8 text-xs leading-relaxed text-charcoal">
          {FOOTER_DISCLAIMER}
        </p>

        <p className="mt-4 text-xs text-charcoal">
          © {new Date().getFullYear()} {SITE_NAME} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
