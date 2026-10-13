import { PageHeader, ButtonLink, StatusPill } from "@/components/ui/Primitives";
import { Notice } from "@/components/ui/Content";
import { BUCKCORE, BUCKCORE_MODULES, ARCHITECTURE_FLOW, ARCHITECTURE_NOTES } from "@/data/buckcore";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "BUCKCORE — Proposed Physical AI Architecture",
  description:
    "BUCKCORE is the proposed shared software and physical AI framework connecting perception, task orchestration, robot skills, supervised operation and fleet visibility across BUCKBOTICS solutions. All ten modules are Concept stage.",
  path: "/technology/buckcore",
});

export default function BuckcorePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Technology", href: "/technology/buckcore" }, { label: "BUCKCORE" }]}
        eyebrow="Technology · proposed platform"
        title={BUCKCORE.h1}
        intro={BUCKCORE.body}
        tone="dark"
      >
        <ButtonLink href="/contact?type=project" surface="dark">
          Discuss an integration
        </ButtonLink>
        <ButtonLink href="/responsible-robotics" tone="secondary" surface="dark">
          Responsible integration
        </ButtonLink>
      </PageHeader>

      {/* ARCHITECTURE DIAGRAM */}
      <section className="section border-b border-line" id="architecture">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow">Architecture</p>
          <h2 className="display-md mt-3">How the stack is proposed to flow</h2>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-arctic/60 p-6 sm:p-8">
            <ol className="flex min-w-[860px] items-stretch gap-3">
              {ARCHITECTURE_FLOW.map((step, i) => {
                const isCore = step.startsWith("BUCKCORE");
                const isSafety = step.startsWith("Independent");
                return (
                  <li key={step} className="flex flex-1 items-center gap-3">
                    <div
                      className={`flex h-full min-h-[92px] flex-1 flex-col justify-center rounded-xl border p-4 ${
                        isCore
                          ? "border-blue bg-blue text-white"
                          : isSafety
                            ? "border-copper/50 bg-copper/10 text-[#6d4a26]"
                            : "border-line bg-white text-graphite"
                      }`}
                    >
                      <span
                        className={`font-mono text-[0.62rem] uppercase tracking-[0.14em] ${
                          isCore ? "text-white" : "text-muted"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1 text-sm font-semibold leading-snug">{step}</span>
                    </div>
                    {i < ARCHITECTURE_FLOW.length - 1 ? (
                      <span aria-hidden="true" className="shrink-0 text-blue">
                        →
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>

            {/* Supervision band alongside the stack */}
            <div className="mt-4 min-w-[860px] rounded-xl border border-dashed border-line bg-white p-4">
              <div className="flex flex-wrap items-center gap-6">
                <span className="spec-label">Alongside the stack</span>
                <span className="text-sm text-graphite">Data logging</span>
                <span aria-hidden="true" className="text-line">
                  │
                </span>
                <span className="text-sm text-graphite">Human supervision</span>
                <span className="text-sm text-muted">
                  — sitting beside the pipeline, never inside a fictitious finished feature.
                </span>
              </div>
            </div>
          </div>

          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {ARCHITECTURE_NOTES.map((n) => (
              <li key={n} className="rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-muted">
                {n}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Notice title="Safety callout" tone="warning">
              {BUCKCORE.safetyCallout}
            </Notice>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="section surface-arctic border-b border-line" id="modules">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <p className="eyebrow">Software modules</p>
          <h2 className="display-md mt-3">Ten modules, one claim status: Concept</h2>
          <p className="lede mt-4 max-w-3xl">{BUCKCORE.statusNote}</p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">BUCKCORE software modules and claim status</caption>
              <thead>
                <tr className="border-b border-line bg-arctic/70">
                  <th scope="col" className="spec-label px-5 py-3">
                    Module
                  </th>
                  <th scope="col" className="spec-label px-5 py-3">
                    Purpose
                  </th>
                  <th scope="col" className="spec-label px-5 py-3">
                    Public claim status
                  </th>
                </tr>
              </thead>
              <tbody>
                {BUCKCORE_MODULES.map((m) => (
                  <tr key={m.name} className="border-b border-line last:border-0">
                    <th scope="row" className="px-5 py-3.5 font-mono text-sm font-medium text-midnight">
                      {m.name}
                    </th>
                    <td className="px-5 py-3.5 text-sm text-graphite">{m.purpose}</td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-[#0b5c8f]">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PLANNED CAPABILITIES + RESPONSIBLE INTEGRATION */}
      <section className="section border-b border-line" id="capabilities">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Planned capabilities</p>
              <h2 className="display-md mt-3">What BUCKCORE is intended to do</h2>
              <ul className="mt-6 grid gap-3 text-[0.97rem] text-graphite">
                {[
                  "Orchestrate approved application tasks under written policies.",
                  "Fuse camera, depth and other sensor inputs for perception.",
                  "Coordinate motion through interfaces to independent control systems.",
                  "Version and test task skills before they reach a robot.",
                  "Keep operational and conversation context controlled and auditable.",
                  "Queue jobs and report fleet telemetry and lifecycle data.",
                  "Train scenarios in simulation before physical trials.",
                  "Apply application rules and safety interfaces — without claiming certification.",
                ].map((c) => (
                  <li key={c} className="flex gap-3 rounded-xl border border-line bg-white p-4">
                    <span aria-hidden="true" className="text-blue">
                      ▸
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Responsible integration</p>
              <h2 className="display-md mt-3">How it is bounded</h2>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-line bg-white p-5">
                  <p className="spec-label">Demonstrated today</p>
                  <p className="mt-2 text-[0.97rem] text-graphite">
                    Nothing. No module is released, deployed or certified software — each row above
                    is a Concept claim only.
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-white p-5">
                  <p className="spec-label">Safety boundary</p>
                  <p className="mt-2 text-[0.97rem] text-graphite">
                    Language models must not bypass independent safety-rated robot controls. Motion
                    applications require hazard assessment, speed/force limits, stop systems, fault
                    recovery and documented supervisory authority.
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-white p-5">
                  <p className="spec-label">Evidence rule</p>
                  <p className="mt-2 text-[0.97rem] text-graphite">
                    Any promoted technical metric needs a source, test date and sign-off before the
                    CMS can mark it verified.
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-white p-5">
                  <div className="flex items-center justify-between">
                    <p className="spec-label">Compatibility</p>
                    <StatusPill status="concept" size="sm" />
                  </div>
                  <p className="mt-2 text-[0.97rem] text-graphite">
                    Robot-platform integrations are proposed per application and documented in a
                    compatibility review before any pilot.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-midnight p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-white">
              Evaluate BUCKCORE against your workflow
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#b7c6d8]">
              Bring an approved application task list. We will scope which modules would apply —
              and which safety layer must remain independent.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact?type=project" surface="dark">
                Discuss a Robotics Project
              </ButtonLink>
              <ButtonLink href="/solutions" tone="secondary" surface="dark">
                See solutions
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
