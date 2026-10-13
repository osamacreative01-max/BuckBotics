import CountUp from "@/components/bits/CountUp";

/* ---------------------------------------------------------------
   Scale stats strip (homepage, below the robot family grid) — animated
   counters (React Bits CountUp).
   All figures are registry facts (9 families / 27 models /
   30 target industries / 10 BUCKCORE modules). SSR renders the
   final values; the count-up runs once when scrolled into view;
   reduced-motion users get static numbers.
--------------------------------------------------------------- */
const STATS = [
  { value: 9, label: "Robot families" },
  { value: 27, label: "Concept models" },
  { value: 30, label: "Target industries" },
  { value: 10, label: "BUCKCORE modules" },
] as const;

export function StatsStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-8 ${className}`}>
      {STATS.map((stat) => (
        <div key={stat.label}>
          <p
            aria-hidden="true"
            className="font-display text-3xl font-semibold tracking-tight tabular-nums text-blue sm:text-4xl"
          >
            <CountUp to={stat.value} duration={1.6} />
          </p>
          <p
            aria-hidden="true"
            className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted"
          >
            {stat.label}
          </p>
          <span className="sr-only">
            {stat.value} {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
