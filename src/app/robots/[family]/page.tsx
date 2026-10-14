import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SmartImage } from "@/components/ui/SmartImage";
import { PageBanner } from "@/components/ui/PageBanner";
import { StatusPill, ButtonLink } from "@/components/ui/Primitives";
import { ModelCard } from "@/components/ui/Cards";
import { ModelGallery } from "@/components/ui/ModelGallery";
import { Notice, AccordionItem } from "@/components/ui/Content";
import { FAMILIES, getFamily } from "@/data/families";
import { SPEC_ROWS } from "@/data/status";
import { conceptDisclaimer } from "@/data/site";
import { PERSONA_COLLECTIONS, PERSONA_ATELIER, PERSONA_FAQS, PERSONA } from "@/data/persona";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return FAMILIES.map((f) => ({ family: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ family: string }>;
}): Promise<Metadata> {
  const { family: slug } = await params;
  const family = getFamily(slug);
  if (!family) return {};
  return pageMeta({
    title: `${family.name} — ${family.headline}`,
    description: `${family.intro} ${family.models.length} concept models: ${family.models
      .map((m) => m.name)
      .join(", ")}. Status: concept.`,
    path: `/robots/${family.slug}`,
  });
}

export default async function FamilyPage({ params }: { params: Promise<{ family: string }> }) {
  const { family: slug } = await params;
  const family = getFamily(slug);
  if (!family) notFound();

  const isPersona = family.slug === "bucki-persona";

  return (
    <>
      {/* DELIVERED BANNER — 3:1 marketing artwork, headline baked in */}
      <PageBanner
        src={family.banner?.src}
        alt={family.banner?.alt ?? `${family.name} concept banner`}
        priority
      />

      {/* HERO — family name, headline, intro and the CTA row beside the
          white-background render. The status badge, model count and tier
          metadata are dropped; those live in the delivered banner artwork. */}
      <header className="border-b border-line bg-arctic/50">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 pt-10 pb-14 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h1 className="display-xl">{family.name}</h1>
              <p className="font-display text-2xl font-medium text-blue">{family.headline}</p>
              <p className="lede mt-4 max-w-xl">{family.intro}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={`/contact?type=project&model=${family.slug}`}>
                  Discuss an Application
                </ButtonLink>
                <ButtonLink href="/technology/buckcore" tone="secondary">
                  Explore BUCKCORE
                </ButtonLink>
                <ButtonLink href="/responsible-robotics" tone="ghost">
                  Responsible Robotics
                </ButtonLink>
              </div>
            </div>
            <figure className="lg:col-span-6">
              <SmartImage
                src={family.image}
                alt={`${family.name} — white-background robot concept render`}
                className="aspect-[4/3] rounded-2xl border border-line bg-white"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </figure>
          </div>
        </div>
      </header>

      {/* PERSONA special block: five collections + ATELIER service */}
      {isPersona ? (
        <section className="section border-b border-line" id="collections">
          <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
            <p className="eyebrow">Five collections · one service</p>
            <h2 className="display-lg mt-3">The PERSONA collections</h2>
            <p className="lede mt-4 max-w-3xl">{PERSONA.heroSub}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PERSONA_COLLECTIONS.map((c) => (
                <article key={c.slug} className="card flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="spec-label">{c.model}</p>
                      <h3 className="mt-1 font-display text-xl font-semibold">{c.name}</h3>
                    </div>
                    <StatusPill status={c.status} size="sm" />
                  </div>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{c.intro}</p>
                  <p className="mt-3 text-sm font-semibold text-midnight">{c.h1}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
                    <code className="font-mono text-[0.7rem] text-muted">{c.internalId}</code>
                    <a
                      href={`/robots/bucki-persona/${c.slug}`}
                      className="rounded-sm text-sm font-semibold text-blue hover:underline underline-offset-4"
                    >
                      View collection
                    </a>
                  </div>
                </article>
              ))}

              <article className="card flex h-full flex-col border-dashed p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="spec-label">Service</p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{PERSONA_ATELIER.name}</h3>
                  </div>
                  <span className="rounded-full border border-copper/50 bg-copper/10 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-[#6d4a26]">
                    Not a model
                  </span>
                </div>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{PERSONA_ATELIER.intro}</p>
                <div className="mt-auto border-t border-line pt-4">
                  <Link
                    href="/robots/bucki-persona/atelier"
                    className="rounded-sm text-sm font-semibold text-blue hover:underline underline-offset-4"
                  >
                    Explore ATELIER
                  </Link>
                </div>
              </article>
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-arctic/60 p-6">
              <h3 className="font-display text-lg font-semibold">PERSONA questions, answered on every page</h3>
              <div className="mt-3 grid gap-x-8 md:grid-cols-2">
                {PERSONA_FAQS.map((f) => (
                  <AccordionItem key={f.q} question={f.q}>
                    <p>{f.a}</p>
                  </AccordionItem>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">{conceptDisclaimer}</p>
            </div>
          </div>
        </section>
      ) : null}

      {/* MODEL CARDS — all variants with unique product identifiers */}
      <section className="section border-b border-line" id="models">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow">Model registry</p>
          <h2 className="display-lg mt-3">Models in this family</h2>
          <p className="lede mt-4 max-w-3xl">
            Every model below is a proposed concept with a unique internal identifier. Full public
            names are always shown — {family.name} designations are never abbreviated.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {family.models.map((model, i) => (
              <ModelCard key={model.id} family={family} model={model} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TARGET WORKFLOWS + INDUSTRY CROSS-LINKS */}
      <section className="section surface-arctic border-b border-line" id="workflows">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Target workflows</p>
              <h2 className="display-md mt-3">Proposed applications for {family.name}</h2>
              <ol className="mt-6 grid gap-3">
                {family.workflows.map((w, i) => (
                  <li key={w} className="flex gap-4 rounded-xl border border-line bg-white p-4">
                    <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.95rem] leading-relaxed text-graphite">{w}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="eyebrow">Planned vs demonstrated</p>
              <h2 className="display-md mt-3">Capability honesty</h2>
              <div className="mt-6 grid gap-4">
                <div className="rounded-xl border border-line bg-white p-5">
                  <p className="spec-label">Planned capabilities (proposed)</p>
                  <ul className="mt-3 grid gap-2 text-[0.95rem] text-graphite">
                    {family.capabilities.map((c) => (
                      <li key={c} className="flex gap-2.5">
                        <span aria-hidden="true" className="text-blue">
                          ▸
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-line bg-white p-5">
                  <p className="spec-label">Demonstrated / verified capabilities</p>
                  <p className="mt-3 text-[0.95rem] text-graphite">
                    <strong className="font-semibold">None published.</strong> No operational test,
                    deployment or third-party verification exists for this family. Status is{" "}
                    <strong className="font-semibold">CONCEPT</strong>.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-white p-5">
                  <p className="spec-label">Industry cross-links</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {family.industryLinks.map((l) => (
                      <a
                        key={l.href + l.label}
                        href={l.href}
                        className="rounded-full border border-line bg-arctic px-3.5 py-1.5 text-sm text-graphite hover:border-blue hover:text-blue"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECIFICATIONS — "Not specified" until measured */}
      <section className="section border-b border-line" id="specifications">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow">Technical specifications</p>
          <h2 className="display-md mt-3">Specification register</h2>
          <p className="lede mt-4 max-w-3xl">
            Prohibited figures (payload, runtime, speed, IP rating, certifications and similar) are
            never guessed. Each row stays at its default until a dated test log or approved source
            exists — applies to every model in this family.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[560px] border-collapse bg-white text-left">
              <caption className="sr-only">{family.name} technical specifications</caption>
              <thead>
                <tr className="border-b border-line bg-arctic/70">
                  <th scope="col" className="spec-label px-5 py-3">
                    Parameter
                  </th>
                  <th scope="col" className="spec-label px-5 py-3">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {SPEC_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-0">
                    <th scope="row" className="px-5 py-3 text-sm font-semibold text-midnight">
                      {row.label}
                    </th>
                    <td className="px-5 py-3 font-mono text-sm text-muted">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* IMAGE GALLERY TEMPLATE — 6 viewpoints + 3 close-ups per model */}
      <section className="section surface-arctic border-b border-line" id="gallery">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow">Image gallery</p>
          <h2 className="display-md mt-3">Six viewpoints + three engineering close-ups</h2>
          <p className="lede mt-4 max-w-3xl">
            Every model reserves nine approved angles: front, rear, left and right profiles, 3/4
            front and 3/4 rear, plus sensor, manipulator and chassis close-ups. Morphology stays
            identical across views of a model.
          </p>
          <div className="mt-8 grid gap-8">
            {family.models.map((model) => (
              <div key={model.id}>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-semibold">{model.name}</h3>
                  <code className="font-mono text-xs text-muted">{model.id}</code>
                  <StatusPill status={model.status} size="sm" />
                </div>
                <ModelGallery modelId={model.id} modelName={model.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY & INTENDED-USE BOUNDARIES + ASSESSMENT CTA */}
      <section className="section surface-midnight border-b border-white/10" id="safety">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Safety &amp; intended use</p>
              <h2 className="display-md mt-3">Operating boundaries for {family.name}</h2>
              <ul className="mt-6 grid gap-3">
                {family.boundaries.map((b) => (
                  <li key={b} className="flex gap-3 rounded-xl border border-white/15 bg-white/[0.06] p-4 text-[0.95rem] leading-relaxed text-[#d5e0ec]">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-xs text-copper">
                      !
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-[#93a6bd]">
                Applications involving motion require an application-specific hazard assessment,
                speed and force limitations, stop systems, fault recovery and documented
                supervisory authority.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-7">
                <p className="spec-label text-cyan!">Next step</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">
                  Assess {family.name} against your task
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b7c6d8]">
                  Bring the task, the environment and the shift pattern. We will tell you honestly
                  whether a feasibility study makes sense — no stock claims, no delivery dates.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <ButtonLink href="/contact?type=project" surface="dark">
                    Request a Consultation
                  </ButtonLink>
                  <ButtonLink href="/solutions" tone="ghost" surface="dark">
                    How engagements work
                  </ButtonLink>
                </div>
              </div>
              <div className="mt-4">
                <Notice tone="concept" surface="dark">
                  {conceptDisclaimer}
                </Notice>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
