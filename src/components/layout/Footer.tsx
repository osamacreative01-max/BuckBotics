import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { FOOTER_LINKS } from "@/data/navigation";
import { site } from "@/data/site";

/**
 * Footer, Master Spec, Chapter 05:
 * BUCKBOTICS | A Buckingham Venture; domain; email; telephone;
 * full mailing address; nine-family links; legal links.
 *
 * Design: premium dark-navy surface with layered blue gradient depth,
 * a brand-and-contact rail on the left, five navigation columns on the
 * right, cyan icon tiles and accent rules, light blue-grey links that
 * highlight cyan on hover, and a thin blue divider above the legal bar.
 * Faint circuit lines sit in the bottom-right corner as decoration.
 * Social badges and the subheadline were removed per owner direction;
 * content, links and semantics are otherwise unchanged from the spec,
 * presentation only.
 */

/* Decorative contact icons (aria-hidden; text stays the accessible name). */
const iconCls = "h-4 w-4 shrink-0";

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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
      <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

/** Cyan tile behind a contact glyph; brightens while its row is hovered. */
function IconTile({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-cyan transition duration-200 group-hover:border-cyan/45 group-hover:bg-cyan/15 ${className}`}
    >
      {children}
    </span>
  );
}

/** Column heading: short blue rule + mono uppercase label. */
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 sm:mb-4">
      <span
        aria-hidden="true"
        className="mb-3 block h-0.5 w-8 rounded-full bg-gradient-to-r from-cyan to-blue-bright/30"
      />
      {/* Fixed two-line height: a heading that wraps must not push its list
          below the neighbouring columns' first links. */}
      <p className="spec-label min-h-[2.1rem] text-[0.78rem] leading-[1.4] font-medium text-white!">
        {children}
      </p>
    </div>
  );
}

const linkCls =
  "inline-block underline-offset-4 transition-[color,transform] duration-200 hover:translate-x-0.5 hover:text-cyan hover:underline hover:decoration-cyan/70";

/** One navigation column: accent heading + hover-highlighted link list. */
function FooterColumn({
  label,
  links,
}: {
  label: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <nav aria-label={label}>
      <FooterHeading>{label}</FooterHeading>
      <ul className="space-y-2 text-[0.94rem] leading-snug text-[#a9bccf]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkCls}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const addr = site.address;

  return (
    <footer className="surface-midnight relative overflow-hidden">
      {/* Decorative navy depth: cyan glow top-right, blue lift bottom-left,
          near-black vignette top and bottom for a premium dark surface. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58rem_28rem_at_88%_-10%,rgba(53,182,243,0.13),transparent_62%),radial-gradient(44rem_24rem_at_-6%_106%,rgba(21,141,230,0.1),transparent_60%),linear-gradient(180deg,rgba(5,10,19,0.92),rgba(9,19,33,0)_36%,rgba(5,10,19,0.88))]"
      />
      {/* Cyan hairline along the top edge. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/45 to-transparent" />

      {/* Faint circuit lines in the bottom-right corner. Shown only at xl+,
          where the five link columns end well clear of this area; below that
          the columns are taller and the motif would sit behind the text. */}
      <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-16 hidden w-[min(56vw,780px)] opacity-70 xl:block">
        <svg viewBox="0 0 780 300" fill="none" className="h-auto w-full">
          <defs>
            <linearGradient id="footer-trace-fade" x1="0" y1="0" x2="780" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#35B6F3" stopOpacity="0" />
              <stop offset="0.55" stopColor="#35B6F3" stopOpacity="0.3" />
              <stop offset="1" stopColor="#158DE6" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <g stroke="url(#footer-trace-fade)" strokeWidth="1">
            <path d="M150 62H780" />
            <path d="M70 110H780" strokeOpacity="0.6" />
            <path d="M230 158H780" />
            <path d="M20 206H780" strokeOpacity="0.5" />
            <path d="M330 254H780" strokeOpacity="0.7" />
            <path d="M560 62v96" strokeOpacity="0.6" />
            <path d="M676 110v144" strokeOpacity="0.5" />
            <path d="m150 62 80 96" strokeOpacity="0.55" />
            <path d="m440 206 120-48" strokeOpacity="0.55" />
          </g>
          <g fill="#35B6F3">
            <circle cx="560" cy="158" r="3.5" fillOpacity="0.65" />
            <circle cx="676" cy="110" r="3" fillOpacity="0.55" />
            <circle cx="230" cy="158" r="2.5" fillOpacity="0.5" />
            <rect x="736" y="250" width="9" height="9" rx="1.5" fillOpacity="0.6" />
          </g>
        </svg>
      </div>

      <div className="relative mx-auto max-w-[min(93vw,1800px)] px-5 pt-7 pb-6 sm:px-8 lg:pt-9 lg:pb-7">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Identity + contacts */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Wordmark variant="light" className="h-7 sm:h-8" />
            <p className="spec-label mt-2.5 text-cyan!">{site.ventureLine}</p>

            <div aria-hidden="true" className="mt-4 h-px w-full max-w-md bg-gradient-to-r from-white/20 to-transparent" />

            <address className="mt-4 space-y-3 text-[#a9bccf] not-italic">
              <a
                href={`https://${site.domain}`}
                className="group flex items-center gap-3 text-[0.94rem] transition-colors duration-200 hover:text-white"
              >
                <IconTile>
                  <IconGlobe />
                </IconTile>
                {site.domain}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 text-[0.94rem] transition-colors duration-200 hover:text-white"
              >
                <IconTile>
                  <IconMail />
                </IconTile>
                {site.email}
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="group flex items-center gap-3 text-[0.94rem] transition-colors duration-200 hover:text-white"
              >
                <IconTile>
                  <IconPhone />
                </IconTile>
                {site.phoneDisplay}
              </a>
              <p className="flex items-start gap-3">
                <IconTile className="mt-0.5">
                  <IconPin />
                </IconTile>
                <span className="mt-0.5 text-[0.94rem] leading-relaxed">
                  {addr.line1}
                  <br />
                  {addr.city}, {addr.region} {addr.postal}
                  <br />
                  {addr.country}
                </span>
              </p>
            </address>
          </div>

          {/* Navigation columns, five across on desktop, reflowed on smaller screens */}
          <div className="lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-8 xl:col-span-9 xl:pl-14">
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 xl:grid-cols-5 xl:gap-x-10">
              <FooterColumn label="Robots" links={FOOTER_LINKS.robots} />
              <FooterColumn label="Industries" links={FOOTER_LINKS.industries} />
              <FooterColumn label="Warehousing & Logistics" links={FOOTER_LINKS.warehousing} />
              <FooterColumn label="Company" links={FOOTER_LINKS.company} />
              <FooterColumn label="Resources" links={FOOTER_LINKS.resources} />
            </div>
          </div>
        </div>

        {/* Concept disclaimer panel removed per owner direction (was Chapter 19) */}

        {/* Legal links */}
        <div className="mt-8 lg:mt-9">
          <div
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-cyan/70 via-blue-bright/45 to-transparent"
          />
          <nav aria-label="Legal" className="flex justify-center pt-4">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.86rem] text-[#8fa4bb]">
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
