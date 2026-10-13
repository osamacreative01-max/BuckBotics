/**
 * Product status schema — Master Spec V2.0, Chapter 16.
 * Every model card, family hero and detail page derives its status
 * wording from this table. Never invent a status.
 */

export type StatusKey = "concept" | "in-development" | "prototype" | "pilot" | "available";

export interface StatusDefinition {
  key: StatusKey;
  label: string;
  meaning: string;
  /** CSS tone used for status pills. */
  tone: "concept" | "progress" | "verified";
}

export const STATUS_SCHEMA: Record<StatusKey, StatusDefinition> = {
  concept: {
    key: "concept",
    label: "CONCEPT",
    meaning: "Proposed design only. No operational test shown.",
    tone: "concept",
  },
  "in-development": {
    key: "in-development",
    label: "IN DEVELOPMENT",
    meaning: "Engineering work underway; specify what can be disclosed.",
    tone: "progress",
  },
  prototype: {
    key: "prototype",
    label: "PROTOTYPE",
    meaning: "Physical/software demonstration exists with documented test conditions.",
    tone: "progress",
  },
  pilot: {
    key: "pilot",
    label: "PILOT",
    meaning: "Controlled customer or field testing with evidence and restrictions.",
    tone: "progress",
  },
  available: {
    key: "available",
    label: "AVAILABLE",
    meaning:
      "Approved sales/service programme, validated claims and appropriate compliance.",
    tone: "verified",
  },
};

export const STATUS_LIST = Object.values(STATUS_SCHEMA);

/** Every model in the launch registry is CONCEPT — no evidence exists yet. */
export const DEFAULT_MODEL_STATUS: StatusKey = "concept";

/**
 * Placeholder specification value — Master Spec, Chapter 16.
 * Prohibited figures (payload, runtime, speed, IP rating, certifications…)
 * must never be guessed.
 */
export const NOT_SPECIFIED = "Not specified / under engineering evaluation.";

/** Specification rows every model page shows until measured values exist. */
export const SPEC_ROWS: Array<{ label: string; value: string }> = [
  { label: "Payload", value: NOT_SPECIFIED },
  { label: "Runtime", value: NOT_SPECIFIED },
  { label: "Maximum speed", value: NOT_SPECIFIED },
  { label: "Degrees of freedom", value: NOT_SPECIFIED },
  { label: "Degrees of protection", value: NOT_SPECIFIED },
  { label: "Operating temperature", value: NOT_SPECIFIED },
  { label: "Connectivity", value: NOT_SPECIFIED },
  { label: "Certifications", value: NOT_SPECIFIED },
  { label: "Estimated pricing", value: NOT_SPECIFIED },
  { label: "Delivery timeline", value: NOT_SPECIFIED },
];
