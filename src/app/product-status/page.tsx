import { PageHeader, ButtonLink, StatusPill } from "@/components/ui/Primitives";
import { Notice, AccordionItem } from "@/components/ui/Content";
import { STATUS_LIST } from "@/data/status";
import { ALL_MODELS } from "@/data/families";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Product Status — What the Stages Mean",
  description:
    "The meaning of CONCEPT, IN DEVELOPMENT, PROTOTYPE, PILOT and AVAILABLE at BUCKBOTICS, plus the evidence rules required before any specification is published.",
  path: "/product-status",
});

const EVIDENCE_EXAMPLES = [
  {
    h: "Battery runtime",
    p: "Requires a dated test log with duty cycle, environment and charge conditions before any number appears.",
  },
  {
    h: "Robot payload",
    p: "Arm payload, carry capacity, lift fixture and operating mode are distinguished — measured units only.",
  },
  {
    h: "AI language capability",
    p: "Spoken accents and task-specific success are validated; “understands everything” is never claimed.",
  },
  {
    h: "Healthcare suitability",
    p: "Only approved intended use and a documented regulatory position may be published — reviewed with a Canadian professional.",
  },
  {
    h: "Visual safety",
    p: "A photorealistic synthetic render is still labelled CONCEPT artwork, not a photograph of hardware.",
  },
  {
    h: "Claims approval",
    p: "Every promoted technical metric needs a source, test date and sign-off before the CMS can mark it verified.",
  },
];

const PROHIBITED = [
  "Payload",
  "Runtime",
  "Maximum speed",
  "Degrees of freedom",
  "Dexterity success rate",
  "Language count / speech quality",
  "Waterproofing or IP rating",
  "Certifications",
  "Medical authorizations",
  "Real deployments",
  "Labour savings",
  "Patents",
  "Cost savings",
];

export default function ProductStatusPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Resources", href: "/resources/faq" }, { label: "Product status" }]}
        eyebrow="Resources"
        title="What each status actually means"
        intro="Every model, family and BUCKCORE module on this site carries one of five lifecycle labels. They are defined once, used everywhere, and never softened for marketing."
      >
        <ButtonLink href="/robots">Browse the robots</ButtonLink>
        <ButtonLink href="/resources/faq" tone="secondary">
          Read the FAQ
        </ButtonLink>
      </PageHeader>

      {/* STATUS SCHEMA */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-4 md:grid-cols-5">
            {STATUS_LIST.map((s) => (
              <article key={s.key} className="card p-5">
                <StatusPill status={s.key} />
                <p className="mt-3 text-sm leading-relaxed text-graphite">{s.meaning}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-midnight p-6">
            <p className="spec-label text-cyan!">Launch reality</p>
            <p className="mt-2 text-[0.97rem] leading-relaxed text-[#b7c6d8]">
              At launch, <strong className="font-semibold text-white">all 27 models, all nine
              families and all ten BUCKCORE modules are labelled CONCEPT.</strong> Nothing has an
              operational test shown. If a status changes on this site, it changes because evidence
              was accepted — with source, date and approver.
            </p>
          </div>
        </div>
      </section>

      {/* WHY SPECIFICATIONS SAY "NOT SPECIFIED" */}
      <section className="section surface-arctic border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Evidence framework</p>
              <h2 className="display-md mt-3">Why specs read “Not specified”</h2>
              <p className="lede mt-4">
                Guessing a number is easier than earning one. Until a dated test record exists, the
                specification register stays at its default value.
              </p>
              <div className="mt-6 rounded-xl border border-line bg-white p-5">
                <p className="spec-label">Never guessed — prohibited until evidenced</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {PROHIBITED.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-line bg-arctic px-2.5 py-1 font-mono text-[0.65rem] text-graphite"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-line bg-white px-6 sm:px-8">
                <h2 className="pt-6 font-display text-lg font-semibold">
                  Evidence &amp; spec controls — examples
                </h2>
                <div className="mt-2">
                  {EVIDENCE_EXAMPLES.map((e) => (
                    <AccordionItem key={e.h} question={e.h}>
                      <p>{e.p}</p>
                    </AccordionItem>
                  ))}
                </div>
                <div className="pb-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE THE LABEL APPEARS */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow">Registry snapshot</p>
          <h2 className="display-md mt-3">Status across the launch portfolio</h2>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Model status across the 27-model registry</caption>
              <thead>
                <tr className="border-b border-line bg-arctic/70">
                  <th scope="col" className="spec-label px-5 py-3">
                    Model
                  </th>
                  <th scope="col" className="spec-label px-5 py-3">
                    Family
                  </th>
                  <th scope="col" className="spec-label px-5 py-3">
                    Internal ID
                  </th>
                  <th scope="col" className="spec-label px-5 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {ALL_MODELS.map(({ family, model }) => (
                  <tr key={model.id} className="border-b border-line last:border-0">
                    <th scope="row" className="px-5 py-3 text-sm font-semibold text-midnight">
                      {model.name}
                    </th>
                    <td className="px-5 py-3 text-sm text-graphite">{family.name}</td>
                    <td className="px-5 py-3 font-mono text-xs text-muted">{model.id}</td>
                    <td className="px-5 py-3">
                      <StatusPill status={model.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <Notice title="Change control" tone="info">
              A status can only move forward through the CMS publishing workflow: editorial check →
              technical verification → safety/legal review where needed → brand/media audit →
              owner sign-off. If concept media loses its label, publication is blocked.
            </Notice>
          </div>
        </div>
      </section>
    </>
  );
}
