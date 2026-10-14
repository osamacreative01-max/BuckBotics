/**
 * BUCKCORE power-on readout — the single visual for every loading state.
 *
 * Deliberately presentational and server-safe (no hooks, no "use client"): it
 * is rendered both by the route fallback in app/loading.tsx and by the client
 * navigation overlay in layout/RouteBoot.tsx, and the two must look identical
 * so a handover between them is invisible.
 *
 * All motion is CSS with staggered delays, because the route fallback is
 * prerendered and cannot rely on timers or a JS dismiss.
 */

const STEPS: Array<{ label: string; result: string }> = [
  { label: "Initializing BUCKCORE", result: "OK" },
  { label: "Calibrating sensor array", result: "OK" },
  { label: "Loading model registry", result: "27 units" },
  { label: "Verifying lifecycle status", result: "Concept" },
];

export function BootScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-midnight px-6 py-8 sm:px-12"
    >
      <div className="flex items-baseline justify-between font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[#8fa4bb]">
        <span>BUCKBOTICS</span>
        <span className="text-cyan">BUCKCORE</span>
      </div>

      <div className="mx-auto w-full max-w-lg">
        <ul className="space-y-2.5">
          {STEPS.map((step, i) => (
            <li
              key={step.label}
              className="boot-step flex items-baseline justify-between gap-4 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[#c9d6e4]"
              style={{ animationDelay: `${i * 130}ms` }}
            >
              <span className="flex items-baseline gap-2">
                <span aria-hidden="true" className="text-cyan">
                  ▸
                </span>
                {step.label}
              </span>
              <span className="text-[#8fa4bb]">{step.result}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="h-px w-full bg-white/15">
          <div className="boot-bar h-px bg-cyan" />
        </div>
        <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[#8fa4bb]">
          Concept-stage portfolio — proposed designs only
        </p>
      </div>
    </div>
  );
}
