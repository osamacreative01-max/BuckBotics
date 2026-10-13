import { PageHeader, ButtonLink, SectionHeading } from "@/components/ui/Primitives";
import { Notice } from "@/components/ui/Content";
import { FAMILY_COUNT, MODEL_COUNT } from "@/data/families";
import { INDUSTRIES } from "@/data/industries";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "About — BUCKBOTICS, A Buckingham Venture",
  description:
    "BUCKBOTICS is a Buckingham venture based in Mississauga, Ontario, developing intelligent robotic solutions and physical AI concepts for industry, essential services and thoughtful human interaction.",
  path: "/company/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Company", href: "/company/about" }, { label: "About" }]}
        eyebrow="Company"
        title="A venture built around engineering honesty."
        intro="BUCKBOTICS develops intelligent robotic solutions and physical AI concepts — and publishes them with their true development status attached."
      >
        <ButtonLink href="/contact?type=project">Discuss a Robotics Project</ButtonLink>
        <ButtonLink href="/company/partnerships" tone="secondary">
          Partnership enquiries
        </ButtonLink>
      </PageHeader>

      {/* PROFILE */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Company profile"
                title="What BUCKBOTICS is"
              />
              <div className="mt-6 grid gap-5 text-[1.02rem] leading-relaxed text-graphite">
                <p>
                  BUCKBOTICS is a Buckingham venture exploring how robotics and physical AI can
                  relieve repetitive physical work in Canadian industries and essential services.
                  The programme spans {FAMILY_COUNT} robot families and {MODEL_COUNT} uniquely
                  identified concept models, organized around a proposed shared intelligence
                  architecture called BUCKCORE.
                </p>
                <p>
                  We start from a single physical task — what moves, what is inspected, how often,
                  in which environment and under whose supervision. From there the work follows an
                  engineering sequence: assessment, supplier selection, controlled pilot and
                  measured evaluation. The website documents that sequence honestly: design
                  concepts are labelled concepts, specifications stay unpublished until dated test
                  records exist, and no claim of certification, stock or deployment appears without
                  evidence.
                </p>
                <p>
                  The commercial focus at launch is <strong className="font-semibold text-midnight">FORGE</strong>{" "}
                  industrial robotics and robotics feasibility enquiries, with{" "}
                  <strong className="font-semibold text-midnight">BUCKi PERSONA EXECUTIVE</strong>{" "}
                  positioned as a separately qualified development concept. The other families are
                  published as a visible vision with enquiry routes rather than checkout.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { k: "Families", v: String(FAMILY_COUNT) },
                  { k: "Concept models", v: String(MODEL_COUNT) },
                  { k: "Target industries", v: String(INDUSTRIES.length) },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl border border-line bg-arctic/60 p-5">
                    <p className="font-mono text-3xl font-medium text-blue">{s.v}</p>
                    <p className="spec-label mt-1">{s.k}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="spec-label">Registered contact</p>
                <address className="mt-3 space-y-1.5 text-[0.97rem] not-italic text-graphite">
                  <p className="font-semibold text-midnight">{site.fullName}</p>
                  <p>{site.address.line1}</p>
                  <p>
                    {site.address.city}, {site.address.region} {site.address.postal}, {site.address.country}
                  </p>
                  <p className="pt-2">
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
                </address>
                <div className="mt-5">
                  <Notice title="Editorial rule" tone="info">
                    This page intentionally avoids company history, facility photographs, headcounts
                    or client lists — none are verified for publication.
                  </Notice>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUCKINGHAM VENTURE RELATIONSHIP */}
      <section className="section surface-arctic border-b border-line" id="buckingham">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Ownership"
            title="Buckingham venture relationship"
            intro="BUCKBOTICS operates as a Buckingham venture. The relationship is disclosed on this page — the public wordmark is BUCKBOTICS alone, and no separate incorporated subsidiary is claimed."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                h: "Identity wording",
                p: "The public lockup is the BUCKBOTICS wordmark alone in the header and footer; the Buckingham venture relationship is disclosed on this page.",
              },
              {
                h: "Legal entity",
                p: "Correct legal-entity wording requires owner approval before publication. The site avoids incorporation claims in the meantime.",
              },
              {
                h: "Decision rights",
                p: "Scope, brand, availability claims and legal copy are approved by the project owner in writing before release.",
              },
            ].map((c) => (
              <article key={c.h} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-lg font-semibold">{c.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.p}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/company/partnerships">Partnership enquiries</ButtonLink>
            <ButtonLink href="/responsible-robotics" tone="secondary">
              Responsible robotics
            </ButtonLink>
            <ButtonLink href="/product-status" tone="secondary">
              Status definitions
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
