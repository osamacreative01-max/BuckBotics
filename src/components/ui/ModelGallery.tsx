"use client";

import { useState } from "react";
import { SmartImage } from "./SmartImage";

/**
 * Model gallery — Chapter 08 required module:
 * "Image gallery template capable of 6 viewpoints and 3 engineering
 * close-ups per model." Accessible tabs; each angle is a separate file
 * under /images/robots/{id}/{view}.webp.
 */

const VIEWPOINTS = [
  { key: "front", label: "Front" },
  { key: "rear", label: "Rear" },
  { key: "left-profile", label: "Left profile" },
  { key: "right-profile", label: "Right profile" },
  { key: "three-quarter-front", label: "3/4 front" },
  { key: "three-quarter-rear", label: "3/4 rear" },
] as const;

const CLOSEUPS = [
  { key: "closeup-sensors", label: "Sensors" },
  { key: "closeup-hands", label: "Hands & manipulators" },
  { key: "closeup-chassis", label: "Chassis & branding" },
] as const;

export function ModelGallery({ modelId, modelName }: { modelId: string; modelName: string }) {
  const [active, setActive] = useState<string>(VIEWPOINTS[0].key);
  const allViews = [...VIEWPOINTS, ...CLOSEUPS];
  const current = allViews.find((v) => v.key === active) ?? VIEWPOINTS[0];
  const src = `/images/robots/${modelId.toLowerCase()}/${active}.webp`;
  // Unique DOM ids — a family page renders one gallery per model.
  const uid = modelId.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const panelId = `gallery-panel-${uid}`;
  const tabId = (key: string) => `gallery-tab-${uid}-${key}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <SmartImage
        src={src}
        alt={`${modelName} — ${current.label.toLowerCase()} concept visualization`}
        className="aspect-[4/3] sm:aspect-[16/10]"
        sizes="(max-width: 1200px) 100vw, 66vw"
        caption="Concept visualization — proposed design. Morphology is consistent across all registered views of this model."
      />

      <div className="border-t border-line bg-arctic/60 p-4">
        <div
          role="tablist"
          aria-label={`${modelName} image viewpoints`}
          className="flex flex-wrap gap-2"
        >
          {allViews.map((view) => {
            const selected = view.key === active;
            return (
              <button
                key={view.key}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                id={tabId(view.key)}
                onClick={() => setActive(view.key)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] transition-colors ${
                  selected
                    ? "border-blue bg-blue text-white"
                    : "border-line bg-white text-graphite hover:border-blue hover:text-blue"
                }`}
              >
                {view.label}
              </button>
            );
          })}
        </div>
        <p
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(current.key)}
          className="mt-3 text-sm text-muted"
        >
          Showing <strong className="font-semibold text-midnight">{current.label}</strong> — all
          views of {modelName} share one approved morphology, colour and wheel/limb layout.
        </p>
      </div>
    </div>
  );
}
