import Link from "next/link";
import { SmartImage } from "./SmartImage";
import { ImageSlider, type SliderImage } from "./ImageSlider";
import { StatusPill, ButtonLink } from "./Primitives";
import GlareHover from "@/components/bits/GlareHover";
import type { RobotFamily, RobotModel } from "@/data/families";
import { conceptCaption } from "@/data/site";
import type { Industry } from "@/data/industries";
import type { PersonaCollection } from "@/data/persona";

/* ---------------------------------------------------------------
   Family card, homepage grid & /robots directory.
   Required fields (Chapter 06): family name, one-line positioning,
   development stage, image with concept badge, 3 application chips,
   one Explore link. Keyboard accessible; 2 cols tablet / 1 col mobile.
--------------------------------------------------------------- */
export function FamilyCard({ family, priority = false }: { family: RobotFamily; priority?: boolean }) {
  const gallery: SliderImage[] =
    family.images && family.images.length > 0
      ? family.images
      : [
          {
            src: family.image,
            alt: `${family.name} robot concept on a white studio background`,
          },
        ];

  return (
    <article className="card group flex flex-col overflow-hidden">
      {/* React Bits GlareHover, soft sheen sweeps the card on hover/focus. */}
      <GlareHover className="flex flex-1 flex-col" height="100%" variant="sheen" glareOpacity={0.4}>
        <div className="relative border-b border-line">
          <ImageSlider
            images={gallery}
            label={family.name}
            className="aspect-[4/3]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
          <span className="absolute left-3 top-3 z-10">
            <StatusPill status={family.status} size="sm" />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3 className="font-display text-xl font-semibold">
              <Link href={`/robots/${family.slug}`} className="rounded-sm hover:text-blue">
                {family.name}
                <span className="sr-only">, explore family</span>
              </Link>
            </h3>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{family.positioning}</p>
          </div>

          <ul className="flex flex-wrap gap-2" aria-label={`${family.name} application areas`}>
            {family.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-line bg-arctic px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-graphite"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
            <span className="spec-label">{family.models.length} concept models</span>
            <Link
              href={`/robots/${family.slug}`}
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-blue hover:text-blue-deep hover:underline underline-offset-4"
            >
              Explore
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </GlareHover>
    </article>
  );
}

/* ---------------------------------------------------------------
   Model card, Chapter 16 model schema (cards inside family pages).
--------------------------------------------------------------- */
export function ModelCard({
  family,
  model,
  index = 0,
}: {
  family: RobotFamily;
  model: RobotModel;
  index?: number;
}) {
  // Approved render for the model, falling back to the registry's default
  // per-model path (`/images/robots/{id}/front.webp`).
  const imageSrc = model.image ?? `/images/robots/${model.id.toLowerCase()}/front.webp`;
  const href = model.detailHref
    ? model.detailHref
    : model.collectionSlug
      ? `/robots/bucki-persona/${model.collectionSlug}`
      : `/contact?type=project&model=${encodeURIComponent(model.id)}`;

  return (
    <article className="card flex flex-col overflow-hidden">
      <SmartImage
        src={imageSrc}
        alt={`${model.name}, front view concept visualization`}
        className="aspect-[4/3] border-b border-line"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority={index < 3}
        caption={conceptCaption}
      />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="spec-label">{family.name}</p>
            {/* h3, not h4, ModelCard only renders under the family page's
                "Models in this family" h2, and h4 there skipped a level. */}
            <h3 className="mt-1 font-display text-lg font-semibold">{model.name}</h3>
          </div>
          <StatusPill status={model.status} size="sm" />
        </div>

        <p className="text-[0.93rem] leading-relaxed text-muted">
          <span className="spec-label mr-2">Intended use</span>
          {model.purpose}
        </p>

        {/* Two bounded feature groups, proposed only, no measured values. */}
        <dl className="grid gap-2 rounded-lg border border-line bg-arctic/70 p-4 text-sm">
          <div className="flex gap-2">
            <dt className="spec-label shrink-0">Planned</dt>
            <dd className="text-graphite">{family.capabilities.slice(0, 3).join(", ")}.</dd>
          </div>
          <div className="flex gap-2">
            <dt className="spec-label shrink-0">Boundary</dt>
            <dd className="text-graphite">{family.boundaries[0]}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <code className="font-mono text-[0.72rem] tracking-wider text-muted">{model.id}</code>
          <Link
            href={href}
            className="rounded-sm text-sm font-semibold text-blue hover:text-blue-deep hover:underline underline-offset-4"
          >
            {model.ctaLabel ?? (model.collectionSlug ? "View collection" : "Enquire")}
            <span className="sr-only"> about {model.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------
   Industry tile, 30-tile directory (Chapter 12).
--------------------------------------------------------------- */
export function IndustryTile({ industry }: { industry: Industry }) {
  const detailHref = industry.detailSlug ? `/industries/${industry.detailSlug}` : null;
  const enquiryHref = `/contact?type=project&industry=${encodeURIComponent(industry.title)}`;

  return (
    <article className="card flex h-full flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs tracking-[0.14em] text-blue">
          {String(industry.n).padStart(2, "0")}
        </span>
        <ul className="flex flex-wrap justify-end gap-1.5">
          {industry.families.map((f) => (
            <li
              key={f}
              className="rounded-full border border-line bg-arctic px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-graphite"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-base font-semibold leading-snug">{industry.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{industry.task}</p>
      </div>

      <div className="mt-auto flex items-center gap-3 border-t border-line pt-3 text-sm">
        {detailHref ? (
          <Link
            href={detailHref}
            className="font-semibold text-blue hover:text-blue-deep hover:underline underline-offset-4"
          >
            Read sector page
          </Link>
        ) : null}
        <Link
          href={enquiryHref}
          className={`font-semibold text-blue hover:text-blue-deep hover:underline underline-offset-4 ${
            detailHref ? "ml-auto" : ""
          }`}
        >
          Enquire
          <span className="sr-only"> about {industry.title}</span>
        </Link>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------
   PERSONA collection card.
--------------------------------------------------------------- */
export function PersonaCard({ collection }: { collection: PersonaCollection }) {
  const altBase = `BUCKi PERSONA ${collection.name} ${collection.model}, adult synthetic android concept visualization`;
  const gallery: SliderImage[] =
    collection.images && collection.images.length > 0
      ? collection.images
      : [{ src: collection.image, alt: altBase }];

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      {/* React Bits GlareHover, soft sheen sweeps the card on hover/focus. */}
      <GlareHover className="flex flex-1 flex-col" height="100%" variant="sheen" glareOpacity={0.4}>
        <ImageSlider
          images={gallery}
          label={`PERSONA ${collection.name}`}
          className="aspect-[4/3] border-b border-line"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="spec-label">BUCKi PERSONA</p>
            <h3 className="mt-1 font-display text-xl font-semibold">
              <Link
                href={`/robots/bucki-persona/${collection.slug}`}
                /* copper-ink, not copper: this link sits on a white card and
                 #c58c55 is only 2.89:1 there. copper-ink reads 5.74:1. */
              className="rounded-sm hover:text-copper-ink"
              >
                {collection.name} <span className="font-mono text-base text-muted">{collection.model}</span>
                <span className="sr-only">, view collection</span>
              </Link>
            </h3>
          </div>
          <StatusPill status={collection.status} size="sm" />
        </div>

        <p className="text-[0.95rem] leading-relaxed text-muted">{collection.intro}</p>

        <p className="rounded-lg border border-line bg-arctic/70 p-3 text-[0.82rem] leading-relaxed text-graphite">
          <span className="spec-label mr-1.5">Boundary</span>
          {collection.boundary}
        </p>

        <div className="mt-auto border-t border-line pt-4">
          <ButtonLink
            href={`/robots/bucki-persona/${collection.slug}`}
            tone="secondary"
            size="sm"
            className="w-full"
          >
            Explore {collection.name}
          </ButtonLink>
        </div>
        </div>
      </GlareHover>
    </article>
  );
}
