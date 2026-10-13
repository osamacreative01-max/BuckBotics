import type { ReactNode } from "react";
import { PageHeader, ButtonLink } from "@/components/ui/Primitives";
import { Notice } from "@/components/ui/Content";

/**
 * Shared shell for legal pages — Master Spec, Chapter 19:
 * real policy text (not generic promises), clearly marked as pending
 * counsel/owner review before publication (acceptance item 12).
 */
export function LegalShell({
  title,
  intro,
  path,
  updated = "11 October 2026",
  children,
}: {
  title: string;
  intro: string;
  path: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Legal", href: "/legal/privacy" }, { label: title }]}
        eyebrow={`Legal · ${path.replace("/legal/", "")}`}
        title={title}
        intro={intro}
      >
        <ButtonLink href="/contact?type=support">Contact about this policy</ButtonLink>
        <ButtonLink href="/responsible-robotics" tone="secondary">
          Responsible robotics
        </ButtonLink>
      </PageHeader>

      <section className="section border-b border-line">
        <div className="mx-auto grid max-w-[min(93vw,1800px)] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="sticky top-32">
              <Notice title="Publication status" tone="warning">
                This policy is a working draft prepared for owner and counsel review. It must be
                approved in writing before go-live (master specification, acceptance item 12). Last
                edited: {updated}.
              </Notice>
              <div className="mt-4 rounded-2xl border border-line bg-arctic/60 p-5">
                <p className="spec-label">Document details</p>
                <dl className="mt-3 grid gap-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Version</dt>
                    <dd className="font-mono text-graphite">draft-2026-10</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Route</dt>
                    <dd className="font-mono text-graphite">{path}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Review</dt>
                    <dd className="font-mono text-graphite">Pre-launch, then annually</dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>

          <div className="prose-neutral max-w-3xl lg:col-span-8">{children}</div>
        </div>
      </section>
    </>
  );
}

/** Standard section heading inside legal copy. */
export function LegalSection({ id, h, children }: { id: string; h: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-32 first:mt-0">
      <h2 className="font-display text-xl font-semibold text-midnight">{h}</h2>
      <div className="mt-3 grid gap-4 text-[0.98rem] leading-relaxed text-graphite">{children}</div>
    </section>
  );
}
