import { PageHeader, ButtonLink, SectionHeading } from "@/components/ui/Primitives";
import { ProcessSteps, Notice, AccordionItem } from "@/components/ui/Content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Solutions — Feasibility, Pilots & Managed Services",
  description:
    "How a BUCKBOTICS engagement works: robotics feasibility assessment, controlled pilot programme and proposed managed services — staged from discovery to measured evaluation.",
  path: "/solutions",
});

const ROUTES = [
  {
    who: "Industrial customer",
    action: "Solutions · feasibility · family product CTA",
    result: "Qualified robotics assessment opportunity",
  },
  {
    who: "Research / OEM partner",
    action: "Company · Partnerships",
    result: "Supplier, manufacturing or academic discussion",
  },
  {
    who: "PERSONA EXECUTIVE",
    action: "PERSONA · Executive",
    result: "Controlled development-pilot interest",
  },
  {
    who: "PERSONA SIGNATURE / HOME",
    action: "Private consultation",
    result: "Non-public design discovery",
  },
  {
    who: "PERSONA MEMORIA",
    action: "Confidential enquiry",
    result: "Initial non-sensitive screening only",
  },
  {
    who: "Support request",
    action: "Contact",
    result: "Contact routing — installed-fleet support is not yet offered",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Solutions" }]}
        eyebrow="Solutions"
        title="From one physical task to a measured pilot."
        intro="Three staged offerings: a robotics feasibility assessment, a controlled pilot programme, and proposed managed services. Nothing is sold as delivered capability — each stage produces documented decisions."
      >
        <ButtonLink href="/contact?type=project">Request a feasibility discussion</ButtonLink>
        <ButtonLink href="/solutions/pilot-programme" tone="secondary">
          Pilot programme details
        </ButtonLink>
      </PageHeader>

      {/* FEASIBILITY */}
      <section className="section border-b border-line" id="feasibility">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">01 · Robotics feasibility</p>
              <h2 className="display-md mt-3">Is the task a robotics task?</h2>
              <p className="lede mt-4">
                A paid, scoped assessment of one repeatable physical task: what moves, where, how
                often, under which constraints — and whether any concept family plausibly fits.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact?type=project">Start with discovery</ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  { h: "Task definition", p: "Physical action, origin/destination, frequency per shift, tolerances." },
                  { h: "Environment survey", p: "Floors, network, lighting, hygiene, obstacles, staff traffic." },
                  { h: "Constraint mapping", p: "Regulatory, data-governance and site-policy boundaries." },
                  { h: "Candidate selection", p: "Which families and models could fit — proposed fit, not proven." },
                  { h: "Risk & safety scoping", p: "Hazard assessment outline, supervision model, stop criteria." },
                  { h: "Pilot proposal", p: "Scope, duration, baseline KPIs and decision points — or an honest no." },
                ].map((i) => (
                  <li key={i.h} className="rounded-xl border border-line bg-white p-5">
                    <h3 className="font-display text-base font-semibold">{i.h}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{i.p}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <ProcessSteps
              steps={[
                { title: "Discovery", text: "Task, environment and shift pattern in plain language." },
                { title: "Technical assessment", text: "Site data, network, hazards and operator roles." },
                { title: "Supplier selection", text: "Candidate platform and tooling against the task list." },
                { title: "Controlled pilot", text: "Limited, supervised trial with human override." },
                { title: "Measured evaluation", text: "Baseline vs results, with pre-agreed stop criteria." },
              ]}
            />
          </div>
        </div>
      </section>

      {/* PILOT */}
      <section className="section surface-arctic border-b border-line" id="pilot">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">02 · Controlled pilot programme</p>
              <h2 className="display-md mt-3">Prove the task before anyone scales it</h2>
              <p className="lede mt-4">
                A pilot runs a bounded set of tasks on-site with supervision, measured against a
                baseline agreed before day one. It exists to generate evidence — including the
                evidence that something should not be automated.
              </p>
              <ul className="mt-5 grid gap-2 text-[0.97rem] text-graphite sm:grid-cols-2">
                {[
                  "Limited route or task set",
                  "Named supervisor with stop authority",
                  "Baseline KPIs recorded first",
                  "Written stop criteria",
                  "Data-handling terms agreed",
                  "Exit review with recommendations",
                ].map((x) => (
                  <li key={x} className="flex gap-2.5 rounded-lg border border-line bg-white p-3 text-sm">
                    <span aria-hidden="true" className="text-blue">
                      ✓
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-lg font-semibold">Qualification questions</h3>
                <div className="mt-2">
                  {[
                    {
                      q: "Who owns the task today?",
                      a: "A named process owner must exist — pilots without an owner cannot produce accountable results.",
                    },
                    {
                      q: "Is the task repeatable?",
                      a: "Single-occurrence or highly variable tasks are poor pilot candidates; we look for structured repetition.",
                    },
                    {
                      q: "Can you share a baseline?",
                      a: "Counts, times or error rates from current operations let the evaluation mean something.",
                    },
                    {
                      q: "What would stop the pilot?",
                      a: "Stop criteria — safety, continuity or measurement failures — are agreed in writing beforehand.",
                    },
                  ].map((item) => (
                    <AccordionItem key={item.q} question={item.q}>
                      <p>{item.a}</p>
                    </AccordionItem>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <ButtonLink href="/solutions/pilot-programme">Full pilot programme details</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANAGED SERVICES */}
      <section className="section border-b border-line" id="managed-services">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <p className="eyebrow">03 · Proposed managed services</p>
          <h2 className="display-md mt-3">Services under consideration — not yet contracted</h2>
          <p className="lede mt-4 max-w-3xl">
            These service shapes are proposed for later phases. They are published as concept-stage
            offerings without pricing, SLAs or availability claims; each would require its own
            written statement of work.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                h: "Assessment-as-a-service",
                p: "Repeatable feasibility assessments for portfolio operations — standardized task surveys, evidence templates and decision reports.",
              },
              {
                h: "Pilot operations support",
                p: "Supervision tooling, run logs and evaluation reporting for pilots already scoped under the pilot programme.",
              },
              {
                h: "Concept lifecycle updates",
                p: "Scheduled status reviews so published concept claims stay aligned with evidence, with version history retained.",
              },
            ].map((s) => (
              <article key={s.h} className="card p-6">
                <span className="rounded-full border border-copper/50 bg-copper/10 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-[#6d4a26]">
                  Proposed
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{s.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTE MAP */}
      <section className="section surface-midnight">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Which route fits?"
            title="Enquiry routes and where they lead"
            intro="Every journey ends with a human reading your enquiry — never an automated promise of booking, stock or delivery."
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Enquiry routes and outcomes</caption>
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.05]">
                  <th scope="col" className="spec-label px-5 py-3 text-[#8fa4bb]">
                    Who
                  </th>
                  <th scope="col" className="spec-label px-5 py-3 text-[#8fa4bb]">
                    Route
                  </th>
                  <th scope="col" className="spec-label px-5 py-3 text-[#8fa4bb]">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROUTES.map((r) => (
                  <tr key={r.who} className="border-b border-white/10 last:border-0">
                    <th scope="row" className="px-5 py-3.5 text-sm font-semibold text-white">
                      {r.who}
                    </th>
                    <td className="px-5 py-3.5 text-sm text-[#b7c6d8]">{r.action}</td>
                    <td className="px-5 py-3.5 text-sm text-[#b7c6d8]">{r.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Notice title="Support requests" tone="info" surface="dark">
              Support routing exists, but installed-fleet support is not yet offered — we will not
              imply a service desk for robots that have not been deployed.
            </Notice>
            <Notice title="Ready to start?" tone="concept" surface="dark">
              Use the project form and pick “Robotics feasibility discussion”. Add the task,
              environment and shift pattern — it speeds up the first call.
            </Notice>
          </div>

          <div className="mt-8">
            <ButtonLink href="/contact?type=project" size="lg">
              Discuss a Robotics Project
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
