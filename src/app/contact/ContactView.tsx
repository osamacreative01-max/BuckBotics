import Link from "next/link";
import { PageHeader } from "@/components/ui/Primitives";
import { Notice } from "@/components/ui/Content";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/data/site";

const VALID_TYPES = [
  "feasibility",
  "pilot",
  "partnership",
  "private-consultation",
  "persona-executive",
  "persona-care",
  "persona-memoria",
  "persona-signature",
  "care-sentinel-research",
  "support",
] as const;

const ROUTES = [
  {
    key: "project",
    title: "Discuss a Robotics Project",
    text: "Industrial feasibility, task assessment and pilot interest, the main route for customers.",
    href: "/contact?type=feasibility",
    activeFor: ["feasibility", "pilot", "partnership", "care-sentinel-research"],
  },
  {
    key: "private-consultation",
    title: "Private PERSONA consultation",
    text: "Non-public discussion of PERSONA collections, ATELIER design or MEMORIA screening.",
    href: "/contact?type=private-consultation",
    activeFor: ["private-consultation"],
  },
  {
    key: "support",
    title: "General enquiries",
    text: "Everything else: questions, documents, accessibility feedback or support routing.",
    href: "/contact?type=support",
    activeFor: ["support"],
  },
] as const;

export async function ContactView({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const defaultType = (VALID_TYPES as readonly string[]).includes(type ?? "")
    ? (type as string)
    : "feasibility";

  const heading =
    defaultType === "care-sentinel-research"
      ? "Research and Engineering Enquiries"
      : defaultType.startsWith("persona") || defaultType === "private-consultation"
        ? "Request a private PERSONA consultation"
        : defaultType === "partnership"
          ? "Partnership enquiry"
          : defaultType === "support"
            ? "General enquiries"
            : defaultType === "pilot"
              ? "Apply for a pilot discussion"
              : "Discuss a Robotics Project";

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={heading}
        intro="One form, routed by intent. Your enquiry goes to a company-controlled inbox with consent recorded, we never claim a booking, pilot or delivery is confirmed by submitting it."
      />

      <section className="section border-b border-line">
        <div className="mx-auto grid max-w-[min(93vw,1800px)] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          {/* ROUTE CARDS + FORM */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {ROUTES.map((r) => {
                const active =
                  (r.activeFor as readonly string[]).includes(defaultType) ||
                  (r.key === "private-consultation" && defaultType.startsWith("persona"));
                return (
                  <Link
                    key={r.key}
                    href={r.href}
                    aria-current={active ? "true" : undefined}
                    className={`group flex flex-col rounded-xl border p-4 transition-colors ${
                      active
                        ? "border-blue bg-blue/5"
                        : "border-line bg-white hover:border-blue/50 hover:bg-arctic/40"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-display text-sm font-semibold leading-snug text-midnight">
                        {r.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 shrink-0 text-xs transition-colors ${
                          active ? "text-blue" : "text-muted group-hover:text-blue"
                        }`}
                      >
                        {active ? "✓" : "→"}
                      </span>
                    </span>
                    <span className="mt-1.5 text-xs leading-relaxed text-muted">{r.text}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8">
              <EnquiryForm defaultType={defaultType} />
            </div>
          </div>

          {/* DIRECT CONTACT + NOTICES */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="rounded-2xl border border-line bg-arctic/60 p-6">
              <p className="spec-label">Direct contact</p>
              <address className="mt-3 space-y-2 not-italic text-[0.97rem] text-graphite">
                <p className="font-semibold text-midnight">{site.fullName}</p>
                <p>
                  <a href={`https://${site.domain}`} className="link-quiet">
                    {site.domain}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${site.email}`} className="link-quiet">
                    {site.email}
                  </a>
                </p>
                <p>
                  <a href={`tel:${site.phoneHref}`} className="link-quiet">
                    {site.phoneDisplay}
                  </a>
                </p>
                <p className="pt-2 leading-relaxed">
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postal}
                  <br />
                  {site.address.country}
                </p>
              </address>
            </div>

            <div className="mt-4 grid gap-4">
              <Notice title="Response expectations" tone="info">
                Enquiries are read by the company. We do not operate a live chat, a chatbot agent
                or an automated booking system, and we do not promise response times we cannot
                measure yet.
              </Notice>

              <Notice title="MEMORIA & sensitive material" tone="warning">
                Do not attach photos, voices, medical records, household details or family archives
                to this form. MEMORIA enquiries start low-information; identity and rights
                verification happens later through a secured channel.
              </Notice>

              <Notice title="Consent & privacy" tone="concept">
                Submissions are validated on the server, encrypted in transit and stored with your
                consent timestamp under the{" "}
                <a href="/legal/privacy" className="link-quiet font-semibold">
                  Privacy Policy
                </a>
                . Marketing opt-in is optional and withdrawable (CASL).
              </Notice>

              <Notice title="Support requests" tone="info">
                Installed-fleet support does not exist yet, select “General or support enquiry”
                and we will route it honestly rather than imply a service desk.
              </Notice>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
