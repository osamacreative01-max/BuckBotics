import { IndustryTile } from "@/components/ui/Cards";
import { PageHeader, ButtonLink } from "@/components/ui/Primitives";
import { Notice } from "@/components/ui/Content";
import { industriesBySector, INDUSTRY_DETAILS, INDUSTRIES } from "@/data/industries";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Industries, 30 Canadian Market Opportunities",
  description:
    "A searchable directory of 30 Canadian industry opportunities for robotics, grouped into six sectors, with five fully developed launch pages for warehousing, food processing, healthcare logistics, greenhouses and mining.",
  path: "/industries",
});

export default function IndustriesPage() {
  const groups = industriesBySector();
  const detailSlugs = new Set(INDUSTRY_DETAILS.map((d) => d.slug));

  return (
    <>
      <PageHeader
        eyebrow="Industry directory"
        title="Thirty markets. Six sectors. One directory."
        intro="A strategic market-opportunity catalogue for Canadian buyers, each tile names the proposed task, the relevant robot families and an enquiry route. Five sectors have full launch pages; the rest are enquiry tiles at launch, not empty articles."
      >
        <ButtonLink href="/contact?type=project">Discuss your operation</ButtonLink>
        <ButtonLink href="/solutions/pilot-programme" tone="secondary">
          Pilot programme
        </ButtonLink>
      </PageHeader>

      {/* Five launch pages */}
      <section className="border-b border-line bg-arctic/60 py-8">
        <div className="mx-auto flex max-w-[min(93vw,1800px)] flex-wrap items-center gap-3 px-5 sm:px-8">
          <span className="spec-label">Full launch pages</span>
          {INDUSTRY_DETAILS.map((d) => (
            <a
              key={d.slug}
              href={`/industries/${d.slug}`}
              className="btn-outline px-4 py-1.5 text-sm"
            >
              {d.title}
            </a>
          ))}
        </div>
      </section>

      {/* 30 tiles grouped by six sectors */}
      <section className="section">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="space-y-14">
            {groups.map(({ sector, items }) => (
              <div key={sector.slug} id={sector.slug} className="scroll-mt-32">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
                  <div>
                    <p className="eyebrow">{items.length} markets</p>
                    <h2 className="display-md mt-2">{sector.label}</h2>
                    <p className="mt-2 max-w-2xl text-[0.95rem] text-muted">{sector.blurb}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((industry) => (
                    <IndustryTile key={industry.n} industry={industry} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Notice title="How to read this list" tone="info">
              This is a strategic market-opportunity catalogue, not a verified ranking of Canadian
              labour shortages. Gaps are framed as task, operating and productivity challenges.{" "}
              {detailSlugs.size} sectors have detailed pages; the remaining tiles link to the
              enquiry flow rather than to thin SEO stubs.
            </Notice>
            <Notice title="Not sure where you fit?" tone="concept">
              Describe the physical task, what moves, what is inspected, how often, and we will
              route it to the right family during the discovery call.{" "}
              <strong className="font-semibold">{INDUSTRIES.length} markets</strong> are covered by
              the nine robot families.
            </Notice>
          </div>
        </div>
      </section>
    </>
  );
}
