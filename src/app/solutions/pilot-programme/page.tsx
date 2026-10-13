import { PageHeader, ButtonLink } from "@/components/ui/Primitives";
import { Notice, ProcessSteps, AccordionItem } from "@/components/ui/Content";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Controlled Pilot Programme — Qualified Trials",
  description:
    "The BUCKBOTICS controlled pilot programme: qualification, task scoping, supervision, baseline KPIs, written stop criteria and a measured evaluation — with no delivery or return promises before assessment.",
  path: "/solutions/pilot-programme",
});

export default function PilotProgrammePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: "Pilot programme" },
        ]}
        eyebrow="Solutions · controlled pilot"
        title="A pilot is a measurement, not a deployment."
        intro="The pilot programme gives qualified buyers a supervised, bounded trial on one task set — designed to produce evidence, including evidence against proceeding. It begins only after a feasibility assessment confirms the task is a sensible candidate."
      >
        <ButtonLink href="/contact?type=pilot">Apply for a pilot discussion</ButtonLink>
        <ButtonLink href="/solutions" tone="secondary">
          Back to solutions
        </ButtonLink>
      </PageHeader>

      {/* QUALIFICATION */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Qualification</p>
              <h2 className="display-md mt-3">Who the pilot is for</h2>
              <p className="lede mt-4">
                A pilot is qualified, not open-enrolment. These conditions exist so that both sides
                can interpret the results honestly.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {[
                { h: "A repeatable task", p: "Structured physical work with clear origin, destination and cadence." },
                { h: "A process owner", p: "One named person accountable for access, supervision and review." },
                { h: "A baseline", p: "Current counts, times or error rates shared before the trial starts." },
                { h: "Site access", p: "Survey, network review and hazard scoping completed in the assessment." },
                { h: "Supervision capacity", p: "A trained operator with stop authority present during runs." },
                { h: "Written expectations", p: "Scope, duration, data terms and stop criteria signed off in advance." },
              ].map((i) => (
                <li key={i.h} className="rounded-xl border border-line bg-white p-5">
                  <h3 className="font-display text-base font-semibold">{i.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{i.p}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section surface-arctic border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow">Programme stages</p>
          <h2 className="display-md mt-3">Six stages, one decision point</h2>
          <div className="mt-8">
            <ProcessSteps
              steps={[
                { title: "Qualification", text: "Task fit, owner, baseline and site readiness confirmed." },
                { title: "Scoping", text: "Route/task set, duration, KPIs and stop criteria in writing." },
                { title: "Set-up", text: "Survey, network, supervision training and data terms." },
                { title: "Supervised runs", text: "Bounded execution with human override and run logs." },
                { title: "Evaluation", text: "Baseline vs results, incidents and qualitative notes." },
                { title: "Decision", text: "Proceed, revise, pause or stop — documented either way." },
              ]}
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Notice title="Evaluation design" tone="info">
              A baseline KPI, trial duration and stop criteria are agreed before the pilot begins.
              Results are reported with their test conditions — measured units only, no
              extrapolations.
            </Notice>
            <Notice title="What a pilot does not promise" tone="warning">
              No delivery date, no ROI guarantee, no certification and no claim that a concept will
              become a product. Pilots can and sometimes should end with a recommendation not to
              proceed.
            </Notice>
          </div>
        </div>
      </section>

      {/* COMMERCIAL TRUTH */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">Commercial truth</p>
              <h2 className="display-md mt-3">Concept-stage honesty applies here too</h2>
              <ul className="mt-6 grid gap-3 text-[0.97rem] text-graphite">
                {[
                  "No stock or “in stock” claims exist for any family — pilots use evaluation hardware arrangements agreed case by case.",
                  "Pricing is quoted per scoped statement of work after assessment; no public price list is published for concept models.",
                  "Evidence produced during a pilot stays with its test conditions attached; it never becomes a blanket marketing claim.",
                  "Customer identities, sites and results are published only with written approval.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 rounded-xl border border-line bg-white p-4">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-xs text-copper">
                      !
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-line bg-white px-6 sm:px-8">
                <h3 className="pt-6 font-display text-lg font-semibold">Pilot FAQ</h3>
                {[
                  {
                    q: "How long does a pilot take?",
                    a: "Durations are set during scoping and depend on task cadence and site availability. No standard duration is published because none has been validated across environments.",
                  },
                  {
                    q: "Who pays for the pilot?",
                    a: "Assessment and pilot work are scoped per statement of work. Commercial terms are shared during qualification — before any site work begins.",
                  },
                  {
                    q: "Can the pilot run in a regulated facility?",
                    a: "Possibly — with your compliance team's approval and written safety scoping. The pilot never positions concepts as certified or medically approved equipment.",
                  },
                  {
                    q: "What happens to the data we share?",
                    a: "It is stored under the privacy notice with retention controls, used only for the assessment, and never republished without approval.",
                  },
                ].map((f) => (
                  <AccordionItem key={f.q} question={f.q}>
                    <p>{f.a}</p>
                  </AccordionItem>
                ))}
                <div className="pb-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-midnight">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 text-center sm:px-8">
          <p className="eyebrow text-cyan!">Apply</p>
          <h2 className="display-lg mt-3 text-white">
            Tell us the task. We will tell you if a pilot makes sense.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[#b7c6d8]">
            The form takes five minutes: task, environment, frequency and schedule. Feasibility
            first — pilot only when the evidence path is clear.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact?type=pilot" size="lg">
              Apply for a pilot discussion
            </ButtonLink>
            <ButtonLink
              href="/resources/faq"
              tone="ghost"
              className="text-white hover:text-cyan"
              size="lg"
            >
              Read the FAQ first
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
