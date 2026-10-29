import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, StatusPill } from "@/components/ui/Primitives";
import { PageBanner } from "@/components/ui/PageBanner";
import { Notice, ProcessSteps } from "@/components/ui/Content";
import { SmartImage } from "@/components/ui/SmartImage";
import { INDUSTRY_DETAILS, getIndustryDetail, INDUSTRIES } from "@/data/industries";
import { getFamily } from "@/data/families";
import { conceptCaption } from "@/data/site";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return INDUSTRY_DETAILS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getIndustryDetail(slug);
  if (!detail) return {};
  return pageMeta({
    title: `${detail.title}, Robotics Opportunity`,
    description: detail.heroIntro,
    path: `/industries/${detail.slug}`,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getIndustryDetail(slug);
  if (!detail) notFound();

  const industry = INDUSTRIES.find((i) => i.detailSlug === detail.slug);
  const families = detail.relatedFamilySlugs
    .map((s) => getFamily(s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  const enquiryHref = `/contact?type=project&industry=${encodeURIComponent(
    industry?.title ?? detail.title,
  )}&model=${detail.relatedFamilySlugs[0] ?? ""}`;

  return (
    <>
      {/* DELIVERED BANNER, 3:1 marketing artwork, headline baked in */}
      <PageBanner
        src={detail.banner?.src}
        alt={detail.banner?.alt ?? `${detail.title} concept banner`}
        priority
      />

      {/* HERO, exact introduction from the master spec */}
      <header className="section border-b border-line bg-arctic/50">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">
                Industry launch page {industry ? `· market ${String(industry.n).padStart(2, "0")}` : ""}
              </p>
              <h1 className="display-xl mt-3">{detail.title}</h1>
              <p className="lede mt-5 max-w-2xl">{detail.heroIntro}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="spec-label">Related concepts</span>
                {detail.related.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 font-mono text-xs tracking-wide text-graphite"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={enquiryHref}>Industry enquiry</ButtonLink>
                <ButtonLink href="/solutions/pilot-programme" tone="secondary">
                  Pilot pathway
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="spec-label">Task examples</p>
                <ul className="mt-3 grid gap-2">
                  {detail.taskExamples.map((t) => (
                    <li key={t} className="flex gap-2.5 text-[0.95rem] text-graphite">
                      <span aria-hidden="true" className="text-blue">
                        ▸
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-lg bg-cyan/10 p-3 font-mono text-xs leading-relaxed text-[#0b5c8f]">
                  “{detail.enquiryPrompt}”
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* OPERATIONAL CHALLENGE */}
      <section className="section border-b border-line" id="challenge">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">01, Customer operational challenge</p>
              <h2 className="display-md mt-3">The physical bottleneck</h2>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-graphite">{detail.challenge}</p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-arctic/60 p-6">
                <p className="spec-label">Repeatable opportunity tasks</p>
                <ul className="mt-4 grid gap-4">
                  {detail.opportunity.map((o) => (
                    <li key={o.task}>
                      <p className="text-sm font-semibold text-midnight">{o.task}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{o.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TASK MAP + MODEL CANDIDATES */}
      <section className="section surface-arctic border-b border-line" id="models">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow">02, Task map &amp; model candidates</p>
          <h2 className="display-md mt-3">Proposed fit, not test-proven compatibility</h2>

          <div className="mt-8 grid max-w-5xl gap-6">
            {families.map((family) => (
              <article key={family.slug} className="card overflow-hidden md:flex">
                <SmartImage
                  src={family.image}
                  alt={`${family.name} concept on white studio background`}
                  className="aspect-[16/9] border-b border-line md:aspect-[4/3] md:w-[42%] md:shrink-0 md:border-b-0 md:border-r"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  caption={conceptCaption}
                />
                <div className="p-6 sm:p-8 md:flex md:w-[58%] md:flex-col md:justify-center">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold">{family.name}</h3>
                    <StatusPill status={family.status} size="sm" />
                  </div>
                  <p className="mt-2 text-sm text-muted">{family.positioning}</p>
                  <ul className="mt-4 grid gap-2">
                    {family.models.map((m) => (
                      <li
                        key={m.id}
                        className="flex items-baseline justify-between gap-3 border-b border-line/70 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="font-mono text-[0.68rem] font-medium tracking-wide text-blue">
                          {m.short}
                        </span>
                        <span className="text-right text-xs leading-relaxed text-muted">{m.purpose}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 border-t border-line pt-3">
                    <Link
                      href={`/robots/${family.slug}`}
                      className="text-sm font-semibold text-blue hover:underline underline-offset-4"
                    >
                      View {family.name} family
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <Notice title="Editorial validation" tone="info">
              Families below show <em>proposed application fit</em> for the tasks described, not
              compatibility proven by testing. Related concepts named on this page:{" "}
              {detail.related.join(", ")}.
            </Notice>
          </div>
        </div>
      </section>

      {/* FEASIBILITY ASSUMPTIONS */}
      <section className="section border-b border-line" id="feasibility">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow">03, Feasibility &amp; implementation assumptions</p>
          <h2 className="display-md mt-3">What a buyer must confirm before a pilot</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {detail.assumptions.map((a, i) => (
              <li key={a} className="flex gap-4 rounded-xl border border-line bg-white p-5">
                <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.95rem] leading-relaxed text-graphite">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SAFETY & DATA LIMITATIONS */}
      <section className="section surface-midnight" id="safety">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow text-cyan!">04, Safety &amp; data limitations</p>
          <h2 className="display-md mt-3 text-white">Where the limits are</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {detail.safety.map((s) => (
              <li
                key={s}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 text-[0.95rem] leading-relaxed text-[#b7c6d8]"
              >
                <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-xs text-copper">
                  !
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PILOT PATHWAY */}
      <section className="section border-b border-line" id="pathway">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow">05, Pilot pathway</p>
          <h2 className="display-md mt-3">From discovery to measured evaluation</h2>
          <div className="mt-8">
            <ProcessSteps
              steps={detail.pathway.map((p, i) => {
                const [title, ...rest] = p.split(":");
                return rest.length
                  ? { title, text: rest.join(":") }
                  : { title: `Step ${i + 1}`, text: p };
              })}
            />
          </div>
        </div>
      </section>

      {/* CTA, preselected industry enquiry */}
      <section className="section bg-arctic border-b border-line" id="enquiry">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid items-center gap-8 rounded-2xl border border-line bg-white p-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow">06, Industry enquiry</p>
              <h2 className="display-md mt-3">Start with this question</h2>
              <p className="mt-4 font-mono text-[0.95rem] leading-relaxed text-graphite">
                “{detail.enquiryPrompt}”
              </p>
              <p className="mt-3 text-sm text-muted">
                A feasibility discussion is tailored to {detail.title.toLowerCase()}. We never
                promise delivery or a quantified return before assessment.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4">
              <ButtonLink href={enquiryHref} size="lg">
                Send an industry enquiry
              </ButtonLink>
              <ButtonLink href="/contact?type=project" tone="secondary">
                General project enquiry
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
