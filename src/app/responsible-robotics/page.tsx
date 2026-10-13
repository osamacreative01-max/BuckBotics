import { PageHeader, ButtonLink, SectionHeading } from "@/components/ui/Primitives";
import { Notice } from "@/components/ui/Content";
import { RESPONSIBLE_BLOCKS } from "@/data/persona";
import { conceptDisclaimer } from "@/data/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Responsible Robotics — Safety, Identity & Consent",
  description:
    "BUCKBOTICS responsible robotics standards: MEMORIA consent protocol, senior-support safeguards, appearance and marketing rules, and BUCKCORE physical safety limitations.",
  path: "/responsible-robotics",
});

const PILLARS = [
  {
    h: "Identity disclosure",
    p: "Every robot on this site stays recognizable as a machine and discloses artificial identity — including the humanlike PERSONA designs.",
  },
  {
    h: "Consent by default",
    p: "Speech, biometric and interaction data follow meaningful consent, safe defaults, purpose limitation, records and deletion workflows.",
  },
  {
    h: "Clinical limitations",
    p: "CARE and PERSONA CARE are nonclinical concepts. Nothing here represents an approved medical device or professional judgement.",
  },
  {
    h: "Child safety",
    p: "No underage-looking synthetic visuals, no childlike humanoid product line and no unattended childcare promise. Adult supervision always.",
  },
  {
    h: "Independent physical safety",
    p: "Safety-rated control lives in verified independent subsystems. Language models never bypass stop systems, speed or force limits.",
  },
];

export default function ResponsibleRoboticsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Responsible robotics" }]}
        eyebrow="Policy"
        title="Responsible robotics, written down."
        intro="Identity, consent, clinical boundaries, child protection and independent physical safety controls — the standing rules that shape every concept we publish."
        tone="dark"
      >
        <ButtonLink href="/contact?type=support" tone="light">
          Raise a concern
        </ButtonLink>
        <ButtonLink href="/legal/privacy" tone="light">
          Privacy Policy
        </ButtonLink>
      </PageHeader>

      {/* FIVE PILLARS */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Standing commitments"
            title="Five pillars"
            intro="These apply to the whole site — not only to the PERSONA programme."
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((p) => (
              <li key={p.h} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="font-display text-base font-semibold">{p.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MANDATORY STANDARDS */}
      <section className="section surface-arctic border-b border-line">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Mandatory standards"
            title="Sensitive uses, handled explicitly"
            intro="Chapter 11 of the master specification is implemented as public policy — the same rules our content must follow."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {RESPONSIBLE_BLOCKS.map((block) => (
              <article key={block.id} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-lg font-semibold">{block.title}</h3>
                <ul className="mt-4 grid gap-3">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[0.93rem] leading-relaxed text-graphite"
                    >
                      <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-xs text-blue">
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONSENT + MACHINE SAFETY */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Biometrics &amp; speech</p>
              <h2 className="display-md mt-3">Data rules for interaction systems</h2>
              <ul className="mt-5 grid gap-3 text-[0.97rem] text-graphite">
                {[
                  "Meaningful consent with safe defaults — nothing sensitive enabled on first run.",
                  "Purpose limitation: interaction data serves the approved task, nothing else.",
                  "Records of consent and processing, with deletion workflows on request.",
                  "No open upload channels for faces, voices or family archives anywhere on this site.",
                  "Real recordings and AI-generated simulation are separated and clearly labelled.",
                ].map((r) => (
                  <li key={r} className="flex gap-3 rounded-xl border border-line bg-white p-4">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-xs text-copper">
                      !
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Machine safety</p>
              <h2 className="display-md mt-3">Motion means assessment</h2>
              <ul className="mt-5 grid gap-3 text-[0.97rem] text-graphite">
                {[
                  "Application-specific hazard assessment before any robot moves near people.",
                  "Speed and force limitations defined per application — not assumed from marketing material.",
                  "Stop systems, fault recovery and documented supervisory authority for every trial.",
                  "No certification is portrayed publicly until it exists; no explosion-proof or underground claims.",
                  "Marketing imagery never implies completed deployments, tests or customer facilities.",
                ].map((r) => (
                  <li key={r} className="flex gap-3 rounded-xl border border-line bg-white p-4">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-xs text-copper">
                      !
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Notice title="Mandatory concept disclaimer" tone="concept">
              {conceptDisclaimer}
            </Notice>
            <Notice title="Accessibility commitment" tone="info">
              Design target is WCAG 2.2 AA: keyboard navigation, visible focus, semantic controls,
              descriptive image alternatives, captions and reduced-motion support. Issues are
              tracked on the{" "}
              <a href="/legal/accessibility" className="link-quiet font-semibold">
                Accessibility Statement
              </a>
              .
            </Notice>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/robots/bucki-persona">BUCKi PERSONA collections</ButtonLink>
            <ButtonLink href="/technology/buckcore" tone="secondary">
              BUCKCORE safety boundaries
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
