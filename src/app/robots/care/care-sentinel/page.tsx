import type { Metadata } from "next";
import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  ButtonLink,
  ResearchConceptBadge,
} from "@/components/ui/Primitives";
import { AccordionItem, Notice } from "@/components/ui/Content";
import {
  CARE_SENTINEL,
  CARE_SENTINEL_IMAGES,
  CARE_SENTINEL_PATH,
} from "@/data/careSentinel";
import { pageMeta } from "@/lib/metadata";

/**
 * CARE SENTINEL, product research concept page.
 *
 * Every public sentence below comes from Part A of
 * BUCKBOTICS_CARE_SENTINEL_WEBSITE_MASTER_V1_0.pdf. Part B developer
 * instructions never appear on this page.
 *
 * Publication is gated: the page stays noindex until the owner and the
 * Canadian medical-device reviewer approve the exact public content.
 */
const APPROVED = process.env.CARE_SENTINEL_APPROVED === "true";

export const metadata: Metadata = pageMeta({
  title: CARE_SENTINEL.seo.title,
  description: CARE_SENTINEL.seo.description,
  path: CARE_SENTINEL_PATH,
  ogImage: CARE_SENTINEL.seo.ogImage,
  absoluteTitle: true,
  ogTitle: CARE_SENTINEL.seo.socialTitle,
  ogDescription: CARE_SENTINEL.seo.socialDescription,
  ogAlt: "CARE SENTINEL research concept station, concept visualization",
  noIndex: !APPROVED,
});

type IconName =
  | "heart"
  | "brain"
  | "lungs"
  | "shield"
  | "drop"
  | "sensor"
  | "screen"
  | "alert"
  | "network"
  | "lock";

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const common = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (name) {
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.4-9.2-8.4A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.2 6.6C19 16.6 12 21 12 21Z" />
          <path d="M7 11h2l1.4-2.2L12 13l1.2-2H17" />
        </svg>
      );
    case "brain":
      return (
        <svg {...common}>
          <path d="M9.5 4A3.5 3.5 0 0 0 6 7.5a3 3 0 0 0-1 5.8A3.2 3.2 0 0 0 8 18.5h1.5V4Z" />
          <path d="M14.5 4A3.5 3.5 0 0 1 18 7.5a3 3 0 0 1 1 5.8 3.2 3.2 0 0 1-3 5.2h-1.5V4Z" />
          <path d="M9.5 8.5H8M14.5 8.5H16M9.5 13H8M14.5 13H16M12 4v16" />
        </svg>
      );
    case "lungs":
      return (
        <svg {...common}>
          <path d="M12 4v9" />
          <path d="M9 8.5C7.3 7.7 4.5 8.6 4 11.4c-.4 2.2-.7 4.7.4 6.1.9 1.1 2.6.8 3.6-.2L10 13" />
          <path d="M15 8.5c1.7-.8 4.5.1 5 2.9.4 2.2.7 4.7-.4 6.1-.9 1.1-2.6.8-3.6-.2L14 13" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "drop":
      return (
        <svg {...common}>
          <path d="M12 3s6 6.4 6 10a6 6 0 0 1-12 0c0-3.6 6-10 6-10Z" />
          <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
        </svg>
      );
    case "sensor":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.4" />
          <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.8 4.8a10 10 0 0 0 0 14.4M19.2 4.8a10 10 0 0 1 0 14.4" />
        </svg>
      );
    case "screen":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="12" rx="2" />
          <path d="M9 20h6M12 16.5V20" />
          <path d="M7 8.5h5M7 12h8" />
        </svg>
      );
    case "alert":
      return (
        <svg {...common}>
          <path d="M12 3.5 2.8 20h18.4L12 3.5Z" />
          <path d="M12 9v4.5M12 17h.01" />
        </svg>
      );
    case "network":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M12 7v4M12 11 6.5 16.4M12 11l5.5 5.4" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
          <path d="M8 10V7.5a4 4 0 0 1 8 0V10M12 14v2.5" />
        </svg>
      );
  }
}

function SectionTitle({
  children,
  surface = "light",
  id,
}: {
  children: React.ReactNode;
  surface?: "light" | "dark";
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      <ResearchConceptBadge surface={surface} />
      <h2 id={id} className="display-lg mt-3">
        {children}
      </h2>
    </div>
  );
}

function ConceptFigure({
  image,
  aspect = "aspect-[4/3]",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 48vw",
  className = "",
}: {
  image: { src: string; alt: string; mobileSrc?: string };
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={`relative ${className}`}>
      <SmartImage
        src={image.src}
        mobileSrc={image.mobileSrc}
        alt={image.alt}
        fit="cover"
        className={`${aspect} rounded-2xl border border-line bg-white!`}
        imgClassName="object-center"
        sizes={sizes}
        priority={priority}
      />
      <div className="absolute left-3 top-3 z-10">
        <ResearchConceptBadge size="sm" surface="overlay" />
      </div>
    </figure>
  );
}

export default function CareSentinelPage() {
  return (
    <>
      {/* 01, breadcrumb, concept label, hero and status (A4) */}
      <header className="border-b border-line bg-arctic/60">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/robots" className="hover:text-blue hover:underline underline-offset-4">
                  Robots
                </Link>
              </li>
              <li aria-hidden="true" className="text-line">
                /
              </li>
              <li>
                <Link href="/robots/care" className="hover:text-blue hover:underline underline-offset-4">
                  CARE
                </Link>
              </li>
              <li aria-hidden="true" className="text-line">
                /
              </li>
              <li aria-current="page" className="font-semibold text-midnight">
                CARE SENTINEL
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 pt-4 pb-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow">{CARE_SENTINEL.label}</p>
              </div>

              <h1 className="display-xl mt-3">{CARE_SENTINEL.h1}</h1>
              <h2 className="display-lg mt-4 text-blue">{CARE_SENTINEL.heroHeading}</h2>
              <p className="lede mt-4 max-w-xl">{CARE_SENTINEL.heroParagraph}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="#how-it-works" size="lg">
                  {CARE_SENTINEL.heroPrimary}
                </ButtonLink>
                <ButtonLink
                  href="/contact?type=care-sentinel-research"
                  tone="secondary"
                  size="lg"
                >
                  {CARE_SENTINEL.heroSecondary}
                </ButtonLink>
              </div>

              <div className="mt-7 max-w-xl">
                <Notice tone="concept">{CARE_SENTINEL.heroStatus}</Notice>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ConceptFigure
                image={CARE_SENTINEL_IMAGES.front}
                aspect="aspect-[4/3]"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 02, human first philosophy (A5) */}
      <section className="section border-b border-line">
        <div className="mx-auto grid max-w-[min(93vw,1800px)] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle>{CARE_SENTINEL.idea.heading}</SectionTitle>
            <div className="mt-6 max-w-2xl border-l-2 border-cyan pl-5">
              <p className="lede">{CARE_SENTINEL.idea.paragraph}</p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ConceptFigure image={CARE_SENTINEL_IMAGES.detail} />
          </div>
        </div>
      </section>

      {/* 03, the problem being researched (A6) */}
      <section className="section surface-midnight border-b border-white/10">
        <div className="mx-auto grid max-w-[min(93vw,1800px)] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionTitle surface="dark">{CARE_SENTINEL.challenge.heading}</SectionTitle>
            <p className="mt-5 max-w-xl leading-relaxed text-[#b7c6d8]">
              {CARE_SENTINEL.challenge.paragraph}
            </p>
          </div>
          <div className="lg:col-span-6">
            <ConceptFigure
              image={CARE_SENTINEL_IMAGES.interface}
              aspect="aspect-[16/10]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 04, six planned steps (A7) */}
      <section
        id="how-it-works"
        aria-label="How the concept works"
        className="section surface-arctic border-b border-line"
      >
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <ResearchConceptBadge />
              <h2 className="display-lg mt-3">{CARE_SENTINEL.heroPrimary}</h2>
            </div>
            <p className="font-mono text-[0.7rem] tracking-[0.18em] text-muted">01 — 06</p>
          </div>

          <ol className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARE_SENTINEL.steps.map((step, index) => (
              <li
                key={step.title}
                className="relative overflow-hidden rounded-2xl border border-line bg-white p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan via-blue to-transparent"
                />
                <span className="font-mono text-xs tracking-[0.18em] text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 05, five initial clinical research areas (A8) */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <SectionTitle>{CARE_SENTINEL.researchAreas.heading}</SectionTitle>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CARE_SENTINEL.researchAreas.cards.map((area) => (
              <li
                key={area.title}
                className="card flex h-full flex-col gap-4 p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 text-blue-deep">
                  <Icon name={area.icon as IconName} />
                </span>
                <h3 className="font-display text-[1.02rem] font-semibold leading-snug">
                  {area.title}
                </h3>
              </li>
            ))}
          </ul>

          <div className="mt-7 max-w-4xl">
            <Notice tone="info">{CARE_SENTINEL.researchAreas.explanation}</Notice>
          </div>
        </div>
      </section>

      {/* 06, four proposed technology modules (A9) */}
      <section className="section surface-arctic border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <SectionTitle>{CARE_SENTINEL.technology.heading}</SectionTitle>

          <div className="mt-9 grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ConceptFigure
                image={CARE_SENTINEL_IMAGES.branded}
                aspect="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {CARE_SENTINEL.technology.modules.map((module, index) => (
                <article
                  key={module.title}
                  className="rounded-2xl border border-line bg-white p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue/25 bg-blue/5 text-blue">
                      <Icon name={module.icon as IconName} className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-[0.16em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{module.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{module.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 07, safety boundaries and medical limits (A10) */}
      <section className="section surface-midnight border-b border-white/10">
        <div className="mx-auto grid max-w-[min(93vw,1800px)] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle surface="dark">{CARE_SENTINEL.boundaries.heading}</SectionTitle>
            <p className="mt-5 max-w-2xl leading-relaxed text-[#b7c6d8]">
              {CARE_SENTINEL.boundaries.paragraph}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full border border-cyan/20"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -bottom-8 h-36 w-36 rounded-full border border-cyan/25"
              />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan/40 bg-cyan/10 text-cyan">
                <Icon name="shield" className="h-9 w-9" />
              </span>
              <div className="relative mt-6 flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan" />
                <span aria-hidden="true" className="h-px w-16 bg-cyan/40" />
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08, privacy statement (A11) */}
      <section className="section border-b border-line">
        <div className="mx-auto grid max-w-[min(93vw,1800px)] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-[linear-gradient(145deg,#f0f5f9_0%,#ffffff_58%,#e2ebf2_100%)] p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full border border-blue/10"
              />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-blue/25 bg-white text-blue-deep shadow-sm">
                <Icon name="lock" className="h-8 w-8" />
              </span>
              <div className="relative mt-7 space-y-2">
                <span aria-hidden="true" className="block h-2 w-4/5 rounded-full bg-line" />
                <span aria-hidden="true" className="block h-2 w-3/5 rounded-full bg-line" />
                <span aria-hidden="true" className="block h-2 w-2/3 rounded-full bg-line" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionTitle>{CARE_SENTINEL.privacy.heading}</SectionTitle>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              {CARE_SENTINEL.privacy.paragraph}
            </p>
          </div>
        </div>
      </section>

      {/* 09, three stage research roadmap (A12) */}
      <section className="section surface-arctic border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <SectionTitle>{CARE_SENTINEL.roadmap.heading}</SectionTitle>

          <ol className="mt-9 grid gap-5 lg:grid-cols-3">
            {CARE_SENTINEL.roadmap.stages.map((stage, index) => (
              <li
                key={stage.title}
                className="relative overflow-hidden rounded-2xl border border-line bg-white p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue via-cyan to-transparent"
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.68rem] tracking-[0.16em] text-blue">
                    {stage.stage}
                  </span>
                  <span className="font-mono text-[0.68rem] tracking-[0.16em] text-muted">
                    {String(index + 1).padStart(2, "0")} / 03
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10, seven questions, simple accordion (A13) */}
      <section
        aria-label="Frequently asked questions"
        className="section border-b border-line"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <ResearchConceptBadge />
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>
          <div className="mt-5 rounded-2xl border border-line bg-white px-6 sm:px-8">
            {CARE_SENTINEL.faqs.map((faq) => (
              <AccordionItem key={faq.q} question={faq.q}>
                <p>{faq.a}</p>
              </AccordionItem>
            ))}
          </div>
        </div>
      </section>

      {/* 11, research collaboration contact area (A14) */}
      <section className="section surface-midnight border-b border-white/10">
        <div className="mx-auto grid max-w-[min(93vw,1800px)] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle surface="dark">{CARE_SENTINEL.contact.heading}</SectionTitle>
            <p className="mt-5 max-w-2xl leading-relaxed text-[#b7c6d8]">
              {CARE_SENTINEL.contact.paragraph}
            </p>

            <p className="mt-6 max-w-xl rounded-xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm leading-relaxed text-[#dcf3fb]">
              {CARE_SENTINEL.contact.privacy}
            </p>

            <div className="mt-5">
              <ButtonLink
                href="/contact?type=care-sentinel-research"
                surface="dark"
                size="lg"
              >
                {CARE_SENTINEL.contact.button}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ConceptFigure
              image={CARE_SENTINEL_IMAGES.portrait}
              aspect="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 38vw"
            />
          </div>
        </div>
      </section>

      {/* 12, full mandatory concept disclosure (A17) */}
      <section className="section border-b border-line bg-arctic/60">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-2xl border border-cyan/40 bg-white p-6 sm:p-8">
            <ResearchConceptBadge />
            <p className="mt-4 text-[0.98rem] leading-relaxed text-graphite">
              {CARE_SENTINEL.disclosure}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
