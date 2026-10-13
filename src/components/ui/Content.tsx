import type { ReactNode } from "react";

/* ---------------------------------------------------------------
   Accessible accordion built on native <details>/<summary>
   (works without JavaScript — keyboard & screen-reader friendly).
--------------------------------------------------------------- */
export function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group border-b border-line" open={defaultOpen}>
      <summary className="flex items-start justify-between gap-6 py-5 text-left transition-colors hover:text-blue">
        <span className="font-display text-[1.05rem] font-semibold leading-snug">{question}</span>
        <span
          aria-hidden="true"
          className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-blue transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-6 pr-10 text-[0.97rem] leading-relaxed text-muted">{children}</div>
    </details>
  );
}

export function Accordion({ items }: { items: Array<{ q: string; a: string }> }) {
  return (
    <div className="rounded-2xl border border-line bg-white px-6 sm:px-8">
      {items.map((item) => (
        <AccordionItem key={item.q} question={item.q}>
          <p>{item.a}</p>
        </AccordionItem>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------
   Engagement process — homepage section 07 / solutions.
--------------------------------------------------------------- */
export function ProcessSteps({ steps }: { steps: Array<{ title: string; text: string }> }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, i) => (
        <li key={step.title} className="relative rounded-2xl border border-line bg-white p-5">
          <span className="font-mono text-xs tracking-[0.16em] text-blue">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------
   Inline note / disclosure banner.
--------------------------------------------------------------- */
export function Notice({
  title,
  children,
  tone = "info",
  surface = "light",
}: {
  title?: string;
  children: ReactNode;
  tone?: "info" | "warning" | "concept";
  surface?: "light" | "dark";
}) {
  const tones = {
    light: {
      info: "border-blue/30 bg-blue/5 text-graphite",
      warning: "border-copper/40 bg-copper/10 text-[#6d4a26]",
      concept: "border-cyan/40 bg-cyan/10 text-[#0b5c8f]",
    },
    dark: {
      info: "border-blue/40 bg-blue/15 text-[#e2edf8]",
      warning: "border-copper/40 bg-copper/15 text-[#f2ddc4]",
      concept: "border-cyan/40 bg-cyan/15 text-[#dcf3fb]",
    },
  }[surface][tone];
  return (
    <aside className={`rounded-xl border px-5 py-4 ${tones}`}>
      {title ? <p className="spec-label mb-1 text-inherit!">{title}</p> : null}
      <div className="text-sm leading-relaxed">{children}</div>
    </aside>
  );
}
