import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { FOOTER_LINKS } from "@/data/navigation";
import { homeHero, site } from "@/data/site";

/**
 * Footer, Master Spec, Chapter 05:
 * BUCKBOTICS | A Buckingham Venture; domain; email; telephone;
 * full mailing address; nine-family links; legal links.
 *
 * Design: premium dark-navy surface with layered blue gradient depth,
 * a brand-and-contact rail on the left, five navigation columns on the
 * right, cyan icon tiles and accent rules, light blue-grey links that
 * highlight cyan on hover, circular social badges (dormant until official
 * accounts are verified) and a thin blue divider above the copyright bar.
 * Faint circuit lines sit in the bottom-right corner as decoration.
 * Content, links and semantics are unchanged from the spec,
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

/* Circular social glyphs, filled brand marks sized for a 36px badge. */
const glyphCls = "h-[1.05rem] w-[1.05rem]";

function IconLinkedIn() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={glyphCls}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={glyphCls}>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3L17.61 20.65Z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={glyphCls}>
      <path d="M23.5 6.5a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.5 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.5 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.24 3.6-6.24 3.6Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={glyphCls}>
      <path
        fillRule="evenodd"
        d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.18.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.18.22.55.47.94.88 1.35.41.41.8.66 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.18-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.76-.07Zm0 3.37a4.49 4.49 0 1 1 0 8.98 4.49 4.49 0 0 1 0-8.98Zm0 7.4a2.91 2.91 0 1 0 0-5.82 2.91 2.91 0 0 0 0 5.82Zm5.72-7.59a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={glyphCls}>
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

/**
 * Social badges. No official accounts are verified yet, so every entry
 * ships with `href: null` and renders as a non-interactive badge; set the
 * verified profile URL to promote it to a real link. Nothing is invented here.
 */
interface Social {
  label: string;
  href: string | null;
  glyph: React.ReactNode;
}

const SOCIALS: Social[] = [
  { label: "LinkedIn", href: null, glyph: <IconLinkedIn /> },
  { label: "X", href: null, glyph: <IconX /> },
  { label: "YouTube", href: null, glyph: <IconYouTube /> },
  { label: "Instagram", href: null, glyph: <IconInstagram /> },
  { label: "Facebook", href: null, glyph: <IconFacebook /> },
];

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

      <div className="relative mx-auto max-w-[min(93vw,1800px)] px-5 pt-9 pb-7 sm:px-8 lg:pt-12 lg:pb-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Identity + contacts */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Wordmark variant="light" className="h-7 sm:h-8" />
            <p className="spec-label mt-2.5 text-cyan!">{site.ventureLine}</p>

            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[#b7c6d8]">
              {homeHero.subheadline}
            </p>

            <div aria-hidden="true" className="mt-5 h-px w-full max-w-md bg-gradient-to-r from-white/20 to-transparent" />

            <address className="mt-5 space-y-3.5 text-[#a9bccf] not-italic">
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

            {/* Circular social badges, dormant until official accounts are verified. */}
            <ul className="mt-6 flex flex-wrap items-center gap-2.5">
              {SOCIALS.map((s) => {
                const badgeCls =
                  "grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-cyan transition duration-200 hover:-translate-y-0.5 hover:border-cyan/60 hover:bg-cyan/15 hover:text-white hover:shadow-[0_8px_18px_-8px_rgba(53,182,243,0.9)]";
                return (
                  <li key={s.label}>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className={badgeCls}
                      >
                        {s.glyph}
                      </a>
                    ) : (
                      <span aria-hidden="true" title={s.label} className={`${badgeCls} cursor-default`}>
                        {s.glyph}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
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
        <div className="mt-10 lg:mt-12">
          <div
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-cyan/70 via-blue-bright/45 to-transparent"
          />
          <nav aria-label="Legal" className="flex justify-center pt-5">
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
