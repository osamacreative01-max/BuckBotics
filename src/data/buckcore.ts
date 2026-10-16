/**
 * BUCKCORE, proposed physical AI architecture.
 * Source: Master Spec V2.0, Chapter 14.
 *
 * Every module is claim status "Concept". Nothing may be described as
 * deployed, finished or certified software.
 */

export const BUCKCORE = {
  eyebrow: "TECHNOLOGY",
  h1: "One Intelligence Architecture. Multiple Robotic Systems.",
  body: "BUCKCORE is the proposed shared software and physical AI framework connecting perception, task orchestration, robot skills, supervised operation and fleet visibility across BUCKBOTICS solutions.",
  statusNote:
    "All BUCKCORE modules are Concept-stage. No module is released, certified or deployed software.",
  safetyCallout:
    "BUCKCORE GUARD must never be described as itself providing safety certification. Safety-rated control belongs in verified independent robot subsystems where required.",
} as const;

export interface BuckcoreModule {
  name: string;
  purpose: string;
  status: string;
}

export const BUCKCORE_MODULES: BuckcoreModule[] = [
  { name: "BUCKCORE INTELLIGENCE", purpose: "Policy-guided task orchestration", status: "Concept" },
  { name: "BUCKCORE VISION", purpose: "Cameras, depth and sensor fusion", status: "Concept" },
  { name: "BUCKCORE MOTION", purpose: "Motion coordination interfaces", status: "Concept" },
  { name: "BUCKCORE SKILLS", purpose: "Versioned tested task libraries", status: "Concept" },
  { name: "BUCKCORE MEMORY", purpose: "Controlled operational and conversation context", status: "Concept" },
  { name: "BUCKCORE FLEET", purpose: "Job queues, telemetry, lifecycle reporting", status: "Concept" },
  { name: "BUCKCORE SIM", purpose: "Training and simulation", status: "Concept" },
  { name: "BUCKCORE GUARD", purpose: "Application rules and safety interfaces", status: "Concept" },
  { name: "BUCKCORE OPS", purpose: "Maintenance and service reporting", status: "Concept" },
  { name: "BUCKCORE VOICE", purpose: "Accessible dialogue for robot interfaces", status: "Concept" },
];

/** Architecture flow, spec diagram description (Chapter 14). */
export const ARCHITECTURE_FLOW = [
  "Customer workflow",
  "Approved application tasks",
  "BUCKCORE AI and skills",
  "Independent motion / safety layer",
  "Compatible physical robot",
] as const;

export const ARCHITECTURE_NOTES = [
  "Data logging and human supervision sit alongside the stack, not inside a fictitious finished feature.",
  "The independent motion and safety layer is a separate, verified subsystem; language models never bypass it.",
  "BUCKCORE integrates with robot platforms only where a documented compatibility review exists.",
] as const;
