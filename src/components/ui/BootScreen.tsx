/**
 * BUCKCORE core, the single visual for every loading state.
 *
 * Holds no state or effects of its own, so the route fallback in
 * app/loading.tsx and the navigation overlay in layout/RouteBoot.tsx render
 * it identically and a handover between them is invisible.
 *
 * The mark is a sensor core: a dial of ticks, two counter-rotating rings, a
 * radar sector sweeping the inner well and a pulsing node at the centre,
 * above the approved wordmark. Every animation is CSS with an infinite loop
 * rather than a timer, because the route fallback is prerendered and cannot
 * rely on JS to dismiss itself.
 */

import { Wordmark } from "./Wordmark";

export function BootScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] overflow-hidden bg-midnight"
    >
      {/* Ambient bloom behind the core */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(53,182,243,0.16),transparent_58%)]"
      />

      {/* Faint engineering grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(53,182,243,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(53,182,243,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-12 px-6">
        <svg
          viewBox="0 0 200 200"
          aria-hidden="true"
          className="h-44 w-44 sm:h-56 sm:w-56"
        >
          <defs>
            <linearGradient id="boot-sweep" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#35b6f3" stopOpacity="0" />
              <stop offset="100%" stopColor="#35b6f3" stopOpacity="0.55" />
            </linearGradient>
            <radialGradient id="boot-node">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#35b6f3" />
              <stop offset="100%" stopColor="#35b6f3" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Tick dial */}
          <g className="boot-spin-slow">
            <circle
              cx="100"
              cy="100"
              r="94"
              fill="none"
              stroke="#35b6f3"
              strokeOpacity="0.28"
              strokeWidth="1"
              strokeDasharray="1.5 10"
            />
          </g>

          {/* Outer ring, broken into arcs, turning clockwise */}
          <g className="boot-spin-mid">
            <circle
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke="#35b6f3"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="74 22 34 22"
              strokeLinecap="round"
            />
          </g>

          {/* Inner well + radar sector */}
          <circle cx="100" cy="100" r="58" fill="none" stroke="#35b6f3" strokeOpacity="0.22" strokeWidth="1" />
          <g className="boot-spin-fast">
            <path d="M100 100 L100 42 A58 58 0 0 1 150.2 71 Z" fill="url(#boot-sweep)" />
          </g>

          {/* Counter-rotating ring */}
          <g className="boot-spin-rev">
            <circle
              cx="100"
              cy="100"
              r="42"
              fill="none"
              stroke="#35b6f3"
              strokeOpacity="0.75"
              strokeWidth="1.5"
              strokeDasharray="46 18"
              strokeLinecap="round"
            />
          </g>

          {/* Node */}
          <circle cx="100" cy="100" r="26" fill="url(#boot-node)" className="boot-node" />
          <circle cx="100" cy="100" r="4.5" fill="#ffffff" className="boot-node" />
        </svg>

        <div className="flex flex-col items-center gap-4">
          <Wordmark variant="light" asLink={false} className="h-5 sm:h-6" />
          <div className="h-px w-40 overflow-hidden bg-white/12 sm:w-56">
            <div className="boot-bar h-px bg-cyan" />
          </div>
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.3em] text-[#6f86a0]">
            Buckcore · Concept-stage portfolio
          </p>
        </div>
      </div>
    </div>
  );
}
