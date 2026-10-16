import { PageHeader, ButtonLink, SectionHeading } from "@/components/ui/Primitives";
import { Notice } from "@/components/ui/Content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Partnerships, OEM, Supplier & Research Enquiries",
  description:
    "Supplier, manufacturing, integration and academic partnership enquiries for BUCKBOTICS, a Buckingham venture developing robotic concepts and physical AI frameworks.",
  path: "/company/partnerships",
});

const TRACKS = [
  {
    h: "OEM & component supply",
    p: "Actuation, sensors, grippers, compute, safety hardware and chassis components for concept and pilot builds.",
    who: "Manufacturers and distributors with documented specifications and compliance records.",
  },
  {
    h: "Systems integration",
    p: "Site deployment, mechanical integration, network and controls work around customer pilots.",
    who: "Integrators and automation houses with Canadian field capability.",
  },
  {
    h: "Research & academic",
    p: "Perception, simulation, human-robot interaction and safety research aligned to the LAB family and BUCKCORE concepts.",
    who: "Universities, labs and research groups with publication or student-project interests.",
  },
  {
    h: "Manufacturing & assembly",
    p: "Prototype fabrication and low-volume assembly relationships for future validated hardware.",
    who: "Fabrication partners with quality documentation and traceability.",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Company · partnerships"
        title="Build the supply side with us."
        intro="Supplier, manufacturing, integration and academic discussions run separately from end-customer project enquiries. We are early-stage and evidence-driven, the best partnerships start with real specifications, not logos."
      >
        <ButtonLink href="/contact?type=partnership">Send a partnership enquiry</ButtonLink>
        <ButtonLink href="/company/about" tone="secondary">
          About BUCKBOTICS
        </ButtonLink>
      </PageHeader>

      <section className="section border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Tracks"
            title="Four conversation tracks"
            intro="Every track begins the same way: a written description of capability, evidence of what you have actually built or supplied, and the specific BUCKBOTICS family or module you want to work on."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {TRACKS.map((t) => (
              <article key={t.h} className="card p-6">
                <h3 className="font-display text-xl font-semibold">{t.h}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{t.p}</p>
                <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-graphite">
                  <span className="spec-label mr-1.5">Who</span>
                  {t.who}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-arctic border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="What to include" title="A useful first message" />
              <ol className="mt-6 grid gap-3">
                {[
                  "Your organization, location and the person accountable for the conversation.",
                  "The capability or component you provide, with real specifications and documentation.",
                  "Which robot family or BUCKCORE module it relates to.",
                  "Evidence: datasheets, certifications held, references you are permitted to share.",
                  "Any regulatory or export constraints that apply to your products.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-4 rounded-xl border border-line bg-white p-4">
                    <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.95rem] leading-relaxed text-graphite">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <SectionHeading eyebrow="Boundaries" title="What we will not do" />
              <ul className="mt-6 grid gap-3">
                {[
                  "No partnership is announced, logo-published or implied before an executed agreement.",
                  "No mutual claims of performance, certification or market leadership without evidence from both sides.",
                  "No exclusivity, volume commitment or delivery schedule is promised at enquiry stage.",
                  "Concept-stage work stays labelled as concept, partners must present it the same way.",
                ].map((b) => (
                  <li key={b} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-[0.95rem] leading-relaxed text-graphite">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-xs text-copper-ink">
                      !
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Notice title="Research data" tone="info">
                  Academic collaborations follow the same evidence rule as the public site: methods,
                  test conditions and limitations are documented; results are not generalized beyond
                  their conditions.
                </Notice>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-midnight p-8">
            <div className="grid items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="font-display text-2xl font-semibold text-white">
                  Start a supplier or research discussion
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#b7c6d8]">
                  Select “Partner / OEM / research discussion” on the form and name the family or
                  module you are interested in. Enquiries route to the company-controlled inbox.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <ButtonLink href="/contact?type=partnership" surface="dark">
                  Partnership enquiry
                </ButtonLink>
                <ButtonLink href="/robots" tone="secondary" surface="dark">
                  Browse the families
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
