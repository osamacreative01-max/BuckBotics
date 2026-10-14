import { PageHeader, ButtonLink } from "@/components/ui/Primitives";
import { PageBanner } from "@/components/ui/PageBanner";
import { AccordionItem, Notice } from "@/components/ui/Content";
import { FAQS, STATUS_FAQ } from "@/data/faq";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Frequently Asked Questions",
  description:
    "Answers about BUCKBOTICS robot concepts, product status, engagements, BUCKCORE, safety, identity, consent and privacy.",
  path: "/resources/faq",
});

const GROUP_ORDER = [
  "Products & status",
  "Engagements",
  "Technology",
  "Safety & responsibility",
  "Privacy",
];

export default function FaqPage() {
  const groups = [
    ...GROUP_ORDER.map((g) => ({ name: g, items: FAQS.filter((f) => f.group === g) })),
  ].filter((g) => g.items.length > 0);

  return (
    <>
      {/* DELIVERED BANNER — 3:1 marketing artwork, headline baked in */}
      <PageBanner
        src="/images/banners/faq.jpg"
        alt="FAQ banner — 'Frequently Asked Questions.' A FORGE W200 mobile manipulator with its arm extended over a gear in a dark industrial production hall. Concept visualization."
        priority
      />
      <PageHeader
        eyebrow="Resources"
        title="Frequently asked questions"
        intro="Straight answers about concept status, how engagements work, what BUCKCORE is, and how identity, consent and safety are handled."
      >
        <ButtonLink href="/contact?type=support">Ask something else</ButtonLink>
        <ButtonLink href="/product-status" tone="secondary">
          Status definitions
        </ButtonLink>
      </PageHeader>

      <section className="section border-b border-line">
        <div className="mx-auto grid max-w-[min(93vw,1800px)] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="space-y-10">
              {groups.map((group) => (
                <div key={group.name}>
                  <p className="eyebrow">{group.name}</p>
                  <div className="mt-4 rounded-2xl border border-line bg-white px-6 sm:px-8">
                    {group.items.map((item) => (
                      <AccordionItem key={item.q} question={item.q}>
                        <p>{item.a}</p>
                      </AccordionItem>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="rounded-2xl border border-line bg-arctic/60 p-6">
                <p className="spec-label">Status glossary</p>
                <div className="mt-4 space-y-4">
                  {STATUS_FAQ.map(({ status, a }) => (
                    <div key={status.key}>
                      <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-blue">
                        {status.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{a}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-t border-line pt-4">
                  <ButtonLink href="/product-status" tone="secondary" size="sm">
                    Full status page
                  </ButtonLink>
                </div>
              </div>

              <div className="mt-4">
                <Notice title="Can’t find your answer?" tone="concept">
                  Write to us with the task or family you are asking about — general questions are
                  fine too.
                </Notice>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
