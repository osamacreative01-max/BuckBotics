import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { FOOTER_LINKS } from "@/data/navigation";
import { site } from "@/data/site";

/**
 * Footer, Master Spec, Chapter 05:
 * BUCKBOTICS | A Buckingham Venture; domain; email; telephone;
 * full mailing address; nine-family links; legal links.
 * No social badges until official accounts are verified.
 *
 * Design: premium dark-navy surface with cyan accents, icon-tagged
 * contact column, cyan-ruled navigation headings and a modern copyright
 * bar. All content, links and semantics are unchanged from the spec,
 * presentation only.
 */

/* Decorative contact icons (aria-hidden; text stays the accessible name). */
const iconCls = "h-4 w-4 shrink-0 text-cyan/90 transition-colors group-hover:text-cyan";

function IconGlobe() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={iconCls}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 3.9 5.7 3.9 9S14.6 18.4 12 21c-2.6-2.6-3.9-5.7-3.9-9S9.4 5.6 12 3Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4.5 8 7.5 5.2L19.5 8" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M6.5 3.5h3l1.6 4-2 1.5a12.5 12.5 0 0 0 5.9 5.9l1.5-2 4 1.6v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`${iconCls} mt-0.5`}>
      <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

/** Column heading: short cyan rule + mono uppercase label. */
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <span aria-hidden="true" className="mb-3 block h-px w-7 bg-cyan" />
      <p className="spec-label text-[#e7eef6]!">{children}</p>
    </div>
  );
}

const linkCls =
  "text-[#a9bccf] underline-offset-4 transition-colors duration-200 hover:text-white hover:underline hover:decoration-cyan/70";

export function Footer() {
  const year = new Date().getFullYear();
  const addr = site.address;

  return (
    <footer className="surface-midnight relative overflow-hidden">
      {/* Decorative navy depth, cyan glow top-right, soft blue lift bottom-left. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(56rem_26rem_at_88%_-8%,rgba(53,182,243,0.12),transparent_62%),radial-gradient(42rem_22rem_at_-6%_104%,rgba(21,141,230,0.08),transparent_60%)]"
      />
      {/* Cyan hairline along the top edge. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/45 to-transparent" />

      <div className="relative mx-auto max-w-[min(93vw,1800px)] px-5 pt-16 pb-10 sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Identity + contacts */}
          <div className="lg:col-span-4">
            <Wordmark variant="light" className="h-7 sm:h-8" />
            <address className="mt-7 space-y-3.5 text-sm not-italic text-[#a9bccf]">
              <a href={`https://${site.domain}`} className={`group flex items-center gap-3 ${linkCls}`}>
                <IconGlobe />
                {site.domain}
              </a>
              <a href={`mailto:${site.email}`} className={`group flex items-center gap-3 ${linkCls}`}>
                <IconMail />
                {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className={`group flex items-center gap-3 ${linkCls}`}>
                <IconPhone />
                {site.phoneDisplay}
              </a>
              <p className="flex items-start gap-3 pt-1.5">
                <IconPin />
                <span className="leading-relaxed">
                  {addr.line1}
                  <br />
                  {addr.city}, {addr.region} {addr.postal}
                  <br />
                  {addr.country}
                </span>
              </p>
            </address>
          </div>

          {/* Nine robot families */}
          <nav aria-label="Robot families" className="lg:col-span-2">
            <FooterHeading>Robots</FooterHeading>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.robots.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries" className="lg:col-span-3">
            <FooterHeading>Industries</FooterHeading>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {FOOTER_LINKS.industries.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-3">
            <nav aria-label="Company">
              <FooterHeading>Company</FooterHeading>
              <ul className="space-y-2 text-sm">
                {FOOTER_LINKS.company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Resources">
              <FooterHeading>Resources</FooterHeading>
              <ul className="space-y-2 text-sm">
                {FOOTER_LINKS.resources.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Concept disclaimer panel removed per owner direction (was Chapter 19) */}

        {/* Copyright bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#8fa4bb]">
            © {year} {site.name}. All robot designs are proposed concepts.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
