import { FamilyCard } from "@/components/ui/Cards";
import { PageHeader, ButtonLink } from "@/components/ui/Primitives";
import { Notice } from "@/components/ui/Content";
import { FAMILIES, FAMILY_COUNT, MODEL_COUNT } from "@/data/families";
import { conceptDisclaimer } from "@/data/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "All Robot Families — 9 Families, 27 Concept Models",
  description:
    "Explore all nine BUCKBOTICS robot families — BUCKi, BUCKi HOME, BUCKi PERSONA, FORGE, CARE, TITAN, TERRA, TIDE and LAB — 27 concept models with lifecycle status and enquiry routes.",
  path: "/robots",
});

export default function RobotsIndexPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Robots" }]}
        eyebrow="Robots"
        title="Nine families. Twenty-seven concept models."
        intro="This is the complete BUCKBOTICS portfolio as published at launch. Every family shows its models with unique product identifiers, intended purpose and lifecycle status — enquiry rather than checkout."
      >
        <ButtonLink href="/contact?type=project">Discuss an Application</ButtonLink>
        <ButtonLink href="/product-status" tone="secondary">
          What do the status labels mean?
        </ButtonLink>
      </PageHeader>

      <section className="section">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="spec-label">
              {FAMILY_COUNT} families · {MODEL_COUNT} models · all concept status
            </p>
            <p className="text-sm text-muted">
              Publication tiers: <strong className="font-semibold text-graphite">Now</strong> — FORGE
              &amp; PERSONA EXECUTIVE ·{" "}
              <strong className="font-semibold text-graphite">Visible vision</strong> — remaining
              families ·{" "}
              <strong className="font-semibold text-graphite">Private review</strong> — PERSONA HOME,
              CARE, MEMORIA, SIGNATURE.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FAMILIES.map((family, i) => (
              <FamilyCard key={family.slug} family={family} priority={i < 3} />
            ))}
          </div>

          <div className="mt-10">
            <Notice title="Concept stage" tone="concept">
              {conceptDisclaimer} Model designations such as “H200” or “C200” always appear with
              their full family name — more than one family uses the same number.
            </Notice>
          </div>
        </div>
      </section>
    </>
  );
}
