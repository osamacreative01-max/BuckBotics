import { LegalShell, LegalSection } from "@/components/legal/LegalShell";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Cookie Notice",
  description:
    "Which cookies and similar technologies the BUCKBOTICS website uses, why, and how to control them — essential cookies at launch, analytics only with consent.",
  path: "/legal/cookies",
});

const COOKIES = [
  {
    name: "Session / security cookie",
    purpose: "Protects form submissions and site security (essential).",
    category: "Strictly necessary",
    duration: "Session",
    consent: "Not required",
  },
  {
    name: "Cookie preference",
    purpose: "Remembers your consent choice so we do not ask on every page.",
    category: "Functional",
    duration: "6 months",
    consent: "Not required (stores your choice only)",
  },
  {
    name: "Analytics (privacy-friendly, aggregated)",
    purpose: "Measures qualified enquiries, form completions and industry interest — disabled until you consent.",
    category: "Analytics",
    duration: "13 months maximum",
    consent: "Required",
  },
];

export default function CookiesPage() {
  return (
    <LegalShell
      title="Cookie Notice"
      path="/legal/cookies"
      intro="Plain-language inventory of what this site stores on your device, and the controls you have. Launch configuration: essential cookies only, analytics behind consent."
    >
      <LegalSection id="what" h="1. What cookies are">
        <p>
          Cookies and similar technologies are small files stored on your device to make a site
          work, remember choices and — only with permission — measure usage. You can block or
          delete them in your browser; blocking strictly necessary cookies may affect form
          submission.
        </p>
      </LegalSection>

      <LegalSection id="inventory" h="2. What this site uses">
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-arctic/70">
                <th scope="col" className="spec-label px-4 py-2.5">Name</th>
                <th scope="col" className="spec-label px-4 py-2.5">Purpose</th>
                <th scope="col" className="spec-label px-4 py-2.5">Category</th>
                <th scope="col" className="spec-label px-4 py-2.5">Duration</th>
                <th scope="col" className="spec-label px-4 py-2.5">Consent</th>
              </tr>
            </thead>
            <tbody>
              {COOKIES.map((c) => (
                <tr key={c.name} className="border-b border-line last:border-0">
                  <th scope="row" className="px-4 py-3 font-mono text-xs font-medium text-midnight">
                    {c.name}
                  </th>
                  <td className="px-4 py-3 text-graphite">{c.purpose}</td>
                  <td className="px-4 py-3 text-graphite">{c.category}</td>
                  <td className="px-4 py-3 text-graphite">{c.duration}</td>
                  <td className="px-4 py-3 text-graphite">{c.consent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted">
          No advertising cookies, cross-site trackers or social media pixels are installed at
          launch.
        </p>
      </LegalSection>

      <LegalSection id="control" h="3. Your controls">
        <ul className="list-disc pl-5">
          <li>Browser settings: block or delete cookies at any time.</li>
          <li>Consent: analytics stay off until you actively accept them.</li>
          <li>Withdrawal: clearing the preference cookie re-asks on your next visit.</li>
          <li>Do Not Track / Global Privacy Control signals are respected where supported.</li>
        </ul>
      </LegalSection>

      <LegalSection id="changes" h="4. Changes and contact">
        <p>
          This notice is updated when the site&apos;s technology changes. Questions: info@buckbotics.com.
          See also the <a className="link-quiet" href="/legal/privacy">Privacy Policy</a>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
