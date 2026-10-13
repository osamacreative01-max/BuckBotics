import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { FOOTER_LINKS } from "@/data/navigation";
import { conceptDisclaimer, site } from "@/data/site";

/**
 * Footer — Master Spec, Chapter 05:
 * BUCKBOTICS | A Buckingham Venture; domain; email; telephone;
 * full mailing address; nine-family links; legal links.
 * No social badges until official accounts are verified.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const addr = site.address;

  return (
    <footer className="surface-midnight">
      <div className="mx-auto max-w-[min(93vw,1800px)] px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Identity + contacts */}
          <div className="lg:col-span-4">
            <Wordmark variant="light" className="h-6 sm:h-7" />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-cyan">
              {site.fullName}
            </p>
            <address className="mt-5 space-y-1.5 text-sm not-italic text-[#a9bccf]">
              <a href={`https://${site.domain}`} className="block hover:text-white">
                {site.domain}
              </a>
              <a href={`mailto:${site.email}`} className="block hover:text-white">
                {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className="block hover:text-white">
                {site.phoneDisplay}
              </a>
              <p className="pt-2 leading-relaxed">
                {addr.line1}
                <br />
                {addr.city}, {addr.region} {addr.postal}
                <br />
                {addr.country}
              </p>
            </address>
          </div>

          {/* Nine robot families */}
          <nav aria-label="Robot families" className="lg:col-span-2">
            <p className="spec-label text-[#7d93ab]!">Robots</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {FOOTER_LINKS.robots.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#a9bccf] hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries" className="lg:col-span-3">
            <p className="spec-label text-[#7d93ab]!">Industries</p>
            <ul className="mt-3 grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2">
              {FOOTER_LINKS.industries.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#a9bccf] hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3">
            <nav aria-label="Company">
              <p className="spec-label text-[#7d93ab]!">Company</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {FOOTER_LINKS.company.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[#a9bccf] hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Resources">
              <p className="spec-label text-[#7d93ab]!">Resources</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {FOOTER_LINKS.resources.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[#a9bccf] hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Mandatory concept disclaimer — Chapter 19 */}
        <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <p className="spec-label text-cyan!">Concept disclaimer</p>
          <p className="mt-2 text-sm leading-relaxed text-[#a9bccf]">{conceptDisclaimer}</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#8fa4bb]">
            © {year} {site.fullName}. All robot designs are proposed concepts.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#a9bccf] hover:text-white">
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
