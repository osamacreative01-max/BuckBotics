import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SmartImage } from "@/components/ui/SmartImage";
import { StatusPill, ButtonLink, Breadcrumbs } from "@/components/ui/Primitives";
import { AccordionItem, Notice } from "@/components/ui/Content";
import {
  PERSONA,
  PERSONA_COLLECTIONS,
  PERSONA_ATELIER,
  PERSONA_FAQS,
  getCollection,
} from "@/data/persona";
import { conceptDisclaimer } from "@/data/site";
import { pageMeta } from "@/lib/metadata";

export function generateStaticParams() {
  return [...PERSONA_COLLECTIONS.map((c) => ({ collection: c.slug })), { collection: "atelier" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection: slug } = await params;
  if (slug === "atelier") {
    return pageMeta({
      title: "PERSONA ATELIER — Private Design Consultation",
      description: PERSONA_ATELIER.intro,
      path: "/robots/bucki-persona/atelier",
    });
  }
  const c = getCollection(slug);
  if (!c) return {};
  return pageMeta({
    title: `BUCKi PERSONA ${c.name} ${c.model} — Concept Collection`,
    description: `${c.h1} ${c.intro} Concept programme — not manufactured or for sale.`,
    path: `/robots/bucki-persona/${c.slug}`,
  });
}

const CONFIDENTIAL_NOTE =
  "Private review tier. Content is a concept programme — no manufactured product, no pricing and no delivery dates.";

export default async function PersonaCollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: slug } = await params;

  /* ---------- ATELIER: private personalization service ---------- */
  if (slug === "atelier") {
    return (
      <>
        <header className="section border-b border-line bg-arctic/50">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
            <Breadcrumbs
              items={[
                { label: "Robots", href: "/robots" },
                { label: "BUCKi PERSONA", href: "/robots/bucki-persona" },
                { label: "ATELIER" },
              ]}
            />
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-copper/50 bg-copper/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#6d4a26]">
                Service · not a robot model
              </span>
              <span className="spec-label">Concept programme</span>
            </div>
            <h1 className="display-xl mt-4">{PERSONA_ATELIER.h1}</h1>
            <p className="lede mt-5 max-w-3xl">{PERSONA_ATELIER.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={PERSONA_ATELIER.ctaHref}>{PERSONA_ATELIER.cta}</ButtonLink>
              <ButtonLink href="/robots/bucki-persona" tone="secondary">
                All PERSONA collections
              </ButtonLink>
            </div>
          </div>
        </header>

        <section className="section border-b border-line">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="eyebrow">Process</p>
                <h2 className="display-md mt-3">A staged design consultation</h2>
                <ol className="mt-6 grid gap-3 sm:grid-cols-3">
                  {PERSONA_ATELIER.process.map((step, i) => (
                    <li key={step} className="rounded-xl border border-line bg-white p-4">
                      <span className="font-mono text-xs text-blue">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-1 text-sm font-semibold text-midnight">{step}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-6">
                  <Notice title="Commercial note" tone="warning">
                    {PERSONA_ATELIER.notice}
                  </Notice>
                </div>
              </div>
              <div className="lg:col-span-5">
                <SmartImage
                  src={PERSONA_ATELIER.image}
                  alt="PERSONA ATELIER — private design consultation concept visualization"
                  className="aspect-[4/3] rounded-2xl border border-line"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  caption="Fictional adult android concept visualization."
                />
                <div className="mt-4">
                  <Notice tone="concept">{conceptDisclaimer}</Notice>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PersonaSharedSections />
      </>
    );
  }

  /* ---------- Five collections ---------- */
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <>
      <header className="section border-b border-line bg-arctic/50">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <Breadcrumbs
            items={[
              { label: "Robots", href: "/robots" },
              { label: "BUCKi PERSONA", href: "/robots/bucki-persona" },
              { label: `${collection.name} ${collection.model}` },
            ]}
          />
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill status={collection.status} />
                <span className="spec-label">Concept programme</span>
                <code className="font-mono text-xs text-muted">{collection.internalId}</code>
              </div>
              <p className="eyebrow mt-5 text-copper-ink!">
                BUCKi PERSONA — {collection.name} | {collection.model}
              </p>
              <h1 className="display-xl mt-3">{collection.h1}</h1>
              <p className="lede mt-5 max-w-xl">{collection.intro}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={collection.ctaHref}>{collection.cta}</ButtonLink>
                <ButtonLink href="/robots/bucki-persona" tone="secondary">
                  Explore the Collections
                </ButtonLink>
              </div>

              <p className="mt-6 rounded-xl border border-copper/40 bg-copper/10 p-4 text-sm leading-relaxed text-[#6d4a26]">
                <strong className="font-semibold">Buyer &amp; positioning:</strong> {collection.buyer}
              </p>
            </div>

            <figure className="lg:col-span-6">
              <SmartImage
                src={collection.image}
                alt={`BUCKi PERSONA ${collection.name} ${collection.model} — fictional adult synthetic android concept`}
                className="aspect-[4/3] rounded-2xl border border-line bg-white"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                caption="Fictional adult android — synthetic design, not a real person."
              />
              <figcaption className="mt-2 text-xs text-muted">
                Concept visualization — proposed design. Adult synthetic appearance; clearly
                artificial mechanical indicators; not a manufactured product.
              </figcaption>
            </figure>
          </div>
        </div>
      </header>

      {/* Planned applications vs boundary */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Planned applications</p>
              <h2 className="display-md mt-3">Where {collection.name} is intended to fit</h2>
              <ul className="mt-6 grid gap-3">
                {collection.applications.map((a, i) => (
                  <li key={a} className="flex gap-4 rounded-xl border border-line bg-white p-4">
                    <span className="font-mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.95rem] text-graphite">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Boundary statement</p>
              <h2 className="display-md mt-3">What {collection.name} does not do</h2>
              <div className="mt-6 rounded-2xl border border-line bg-midnight p-6 text-[#b7c6d8]">
                <p className="leading-relaxed">{collection.boundary}</p>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm">
                  No celebrity imitation, real-person photography, clinical autonomy, artificial
                  consciousness or false grief promises across the whole PERSONA programme.
                </p>
              </div>
              <div className="mt-4">
                <Notice title={CONFIDENTIAL_NOTE} tone="concept">
                  {collection.status === "concept"
                    ? "Status: CONCEPT — no operational test is shown for this collection."
                    : null}
                  Human caregivers, security staff and supervising operators remain responsible;
                  the machine always discloses that it is artificial.
                </Notice>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection navigation */}
      <section className="section surface-arctic border-b border-line">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <p className="eyebrow">Explore the collections</p>
          <h2 className="display-md mt-3">Five collections, one service</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {PERSONA_COLLECTIONS.map((c) =>
              c.slug === collection.slug ? (
                <span
                  key={c.slug}
                  className="rounded-full bg-midnight px-4 py-2 text-sm font-semibold text-white"
                  aria-current="page"
                >
                  {c.name} {c.model}
                </span>
              ) : (
                <Link
                  key={c.slug}
                  href={`/robots/bucki-persona/${c.slug}`}
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm text-graphite hover:border-blue hover:text-blue"
                >
                  {c.name} {c.model}
                </Link>
              ),
            )}
            <Link
              href="/robots/bucki-persona/atelier"
              className="rounded-full border border-copper/50 bg-copper/10 px-4 py-2 text-sm text-[#6d4a26] hover:border-copper"
            >
              ATELIER (service)
            </Link>
          </div>
        </div>
      </section>

      <PersonaSharedSections />
    </>
  );
}

/** Required on all PERSONA pages — Chapter 10 + mandatory disclaimer. */
function PersonaSharedSections() {
  return (
    <section className="section border-b border-line" id="faqs">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">PERSONA FAQs</p>
            <h2 className="display-md mt-3">Direct answers, required on every collection page</h2>
            <p className="lede mt-4">{PERSONA.umbrellaLine}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/responsible-robotics">Responsible robotics policy</ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-line bg-white px-6 sm:px-8">
              {PERSONA_FAQS.map((f) => (
                <AccordionItem key={f.q} question={f.q}>
                  <p>{f.a}</p>
                </AccordionItem>
              ))}
            </div>
            <div className="mt-5">
              <Notice tone="concept">{conceptDisclaimer}</Notice>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
