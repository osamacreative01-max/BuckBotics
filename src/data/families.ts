/**
 * Canonical robot portfolio — Master Spec V2.0, Chapters 07 & 08.
 *
 * Nine top-level families, 27 uniquely identified concept models.
 * PERSONA is ONE family with five collections (not five families).
 * ATELIER is a service, not a model.
 *
 * This file is the structured-content source. In Phase 2 it maps 1:1 to
 * CMS collections (Robot family / Robot model) — no hard-coded counts
 * anywhere else in the UI; always derive from this registry.
 */

import type { StatusKey } from "./status";

export type PortfolioTier = "now" | "vision" | "private";

export interface RobotModel {
  /** Unique internal product ID (never duplicated across families). */
  id: string;
  /** Full public name — always shown unqualified (e.g. "BUCKi HOME H200"). */
  name: string;
  /** Short model designation (e.g. "H200"). */
  short: string;
  /** Primary concept purpose (spec registry wording). */
  purpose: string;
  status: StatusKey;
  /** Only set for PERSONA collections with a dedicated launch page. */
  collectionSlug?: string;
}

export interface RobotFamily {
  slug: string;
  /** Exact public family name. */
  name: string;
  headline: string;
  intro: string;
  /** One-line positioning for homepage cards. */
  positioning: string;
  /** Intended capabilities — proposed, never demonstrated. */
  capabilities: string[];
  /** Operating boundaries — mandatory on family page. */
  boundaries: string[];
  /** 3–6 specific target workflows (proposed applications). */
  workflows: string[];
  /** Industry cross-links (detail pages where they exist). */
  industryLinks: Array<{ label: string; href: string }>;
  /** 3 application chips for homepage cards. */
  chips: string[];
  /** Commercial priority — spec, Chapter 07 portfolio table. */
  tier: PortfolioTier;
  status: StatusKey;
  models: RobotModel[];
  /** `/images/families/{slug}.webp` — white studio imagery. */
  image: string;
}

const CONCEPT = "concept" as StatusKey;

export const FAMILIES: RobotFamily[] = [
  {
    slug: "forge",
    name: "FORGE",
    headline: "Engineered for the Work That Matters.",
    intro:
      "Purposeful industrial platforms for material movement, repetitive handling, line feeding, manufacturing tasks and warehouse workflows.",
    positioning: "Industrial robotics for repeatable material handling and line-side work.",
    capabilities: [
      "Mobile manipulation",
      "Grippers and end-effectors",
      "Sensor-guided perception",
      "Controlled task planning",
      "Machine-side integration",
      "Fleet oversight concepts",
    ],
    boundaries: [
      "Leading proposed commercial focus; functionality and economic value must be proved through paid pilots.",
      "No payload, speed, accuracy or labour-saving figures are published before measured test evidence exists.",
      "No claim of current stock, installed deployments or certified production lines.",
    ],
    workflows: [
      "Tote and bin routes between storage and work cells",
      "Line feeding with repeatable pick-and-place",
      "Machine tending alongside existing equipment",
      "Packing-line supply and case handling",
      "Internal transport of components and consumables",
      "Exception handling and replenishment runs",
    ],
    industryLinks: [
      { label: "Warehousing & Logistics", href: "/industries/warehousing-logistics" },
      { label: "Food Processing", href: "/industries/food-processing" },
      { label: "30-industry directory", href: "/industries" },
    ],
    chips: ["Tote movement", "Line feeding", "Machine tending"],
    tier: "now",
    status: CONCEPT,
    image: "/images/families/forge.webp",
    models: [
      { id: "FOR-W100", name: "FORGE W100", short: "W100", purpose: "Mobile work platform", status: CONCEPT },
      { id: "FOR-W200", name: "FORGE W200", short: "W200", purpose: "Coordinated manipulation", status: CONCEPT },
      { id: "FOR-W300", name: "FORGE W300", short: "W300", purpose: "Advanced flexible humanoid research", status: CONCEPT },
    ],
  },
  {
    slug: "bucki",
    name: "BUCKi",
    headline: "Friendly Mechanical Interaction",
    intro:
      "A visibly robotic, approachable assistant concept for reception, guided information, events and selected social interactions.",
    positioning: "Approachable mechanical social robot for guidance and information.",
    capabilities: [
      "Conversation",
      "Approved knowledge retrieval",
      "Speech",
      "Mechanical expression",
      "Public guidance",
      "Accessible interaction",
    ],
    boundaries: [
      "Do not claim human emotions.",
      "No facial biometrics by default.",
      "No physical tasks without validation.",
      "BUCKi remains visibly mechanical and identifies itself as a robot.",
    ],
    workflows: [
      "Reception orientation and wayfinding",
      "Event information and schedule announcements",
      "Approved frequently-asked-question delivery",
      "Queue and appointment direction",
      "Accessible public information desks",
      "Product and service information sessions",
    ],
    industryLinks: [
      { label: "Hotels & Hospitality", href: "/industries" },
      { label: "Retail & Grocery", href: "/industries" },
      { label: "30-industry directory", href: "/industries" },
    ],
    chips: ["Reception guidance", "Event information", "Public wayfinding"],
    tier: "vision",
    status: CONCEPT,
    image: "/images/families/bucki.webp",
    models: [
      { id: "BKI-H100", name: "BUCKi H100", short: "H100", purpose: "Stationary social interaction terminal", status: CONCEPT },
      { id: "BKI-H200", name: "BUCKi H200", short: "H200", purpose: "Mobile friendly interaction platform", status: CONCEPT },
      { id: "BKI-H300", name: "BUCKi H300", short: "H300", purpose: "Extended social presentation concept", status: CONCEPT },
    ],
  },
  {
    slug: "bucki-home",
    name: "BUCKi HOME",
    headline: "Practical Help at Home",
    intro:
      "Visibly mechanical domestic assistance concepts for routines, item retrieval, carrying, communication and selected supported household tasks.",
    positioning: "Mechanical home assistance for routines and supervised household tasks.",
    capabilities: [
      "Voice control",
      "Mapped navigation",
      "Approved item movement",
      "Supervised operation",
      "Privacy settings",
    ],
    boundaries: [
      "No autonomous childcare.",
      "No intimate personal care.",
      "No “does every chore” claims.",
      "Operation is supervised; the machine stays visibly mechanical.",
    ],
    workflows: [
      "Approved item retrieval between mapped rooms",
      "Light carrying and tidy-up routines",
      "Household schedule and reminder support",
      "Authorized smart-home interactions",
      "Supervised family communication calls",
      "Repeatable tidy and return tasks",
    ],
    industryLinks: [
      { label: "Home Healthcare", href: "/industries" },
      { label: "Commercial Cleaning", href: "/industries" },
      { label: "30-industry directory", href: "/industries" },
    ],
    chips: ["Item retrieval", "Mapped routines", "Supervised support"],
    tier: "vision",
    status: CONCEPT,
    image: "/images/families/bucki-home.webp",
    models: [
      { id: "HOM-H200", name: "BUCKi HOME H200", short: "H200", purpose: "Basic indoor assistance concept", status: CONCEPT },
      { id: "HOM-H300", name: "BUCKi HOME H300", short: "H300", purpose: "Extended household manipulation research", status: CONCEPT },
    ],
  },
  {
    slug: "bucki-persona",
    name: "BUCKi PERSONA",
    headline: "Humanlike Presence, Responsibly Designed.",
    intro:
      "A premium concept collection of fictional adult-looking synthetic humanoids designed for refined interaction, service presence and thoughtfully managed personalization.",
    positioning: "Luxury adult android concepts for refined, identity-disclosed interaction.",
    capabilities: [
      "Humanlike facial design",
      "Licensed appearance options",
      "Speech",
      "Gestures",
      "Wardrobe",
      "Approved service skills",
      "Identity disclosure",
    ],
    boundaries: [
      "No celebrity imitation or real-person photography.",
      "No clinical autonomy or artificial consciousness claims.",
      "No false grief promises.",
      "Only original synthetic adult faces in public artwork; robots stay recognizable as machines.",
    ],
    workflows: [
      "Luxury reception and visitor orientation",
      "Curated hospitality and concierge information",
      "Supervised senior engagement and family connection",
      "Consent-led remembrance sessions (MEMORIA)",
      "Bespoke appearance commissions (SIGNATURE)",
      "Branded presentation and information services",
    ],
    industryLinks: [
      { label: "Hotels & Hospitality", href: "/industries" },
      { label: "Long-Term Care", href: "/industries" },
      { label: "Private consultation", href: "/contact?type=private-consultation" },
    ],
    chips: ["Luxury reception", "Supervised engagement", "Bespoke design"],
    tier: "now",
    status: CONCEPT,
    image: "/images/families/bucki-persona.webp",
    models: [
      { id: "PER-E200", name: "BUCKi PERSONA E200", short: "E200", purpose: "EXECUTIVE — luxury reception", status: CONCEPT, collectionSlug: "executive" },
      { id: "PER-H200", name: "BUCKi PERSONA H200", short: "H200", purpose: "HOME — private living", status: CONCEPT, collectionSlug: "home" },
      { id: "PER-C200", name: "BUCKi PERSONA C200", short: "C200", purpose: "CARE — supervised senior support", status: CONCEPT, collectionSlug: "care" },
      { id: "PER-M200", name: "BUCKi PERSONA M200", short: "M200", purpose: "MEMORIA — authorized remembrance", status: CONCEPT, collectionSlug: "memoria" },
      { id: "PER-S300", name: "BUCKi PERSONA S300", short: "S300", purpose: "SIGNATURE — bespoke configuration", status: CONCEPT, collectionSlug: "signature" },
    ],
  },
  {
    slug: "care",
    name: "CARE",
    headline: "Supporting Those Who Care.",
    intro:
      "Robots designed to support hospitals and care facilities with internal logistics and nonclinical workflow assistance.",
    positioning: "Healthcare logistics and nonclinical assistance concepts.",
    capabilities: [
      "Sealed supplies handling",
      "Controlled compartments",
      "Delivery logs",
      "Staff access controls",
      "Indoor facility navigation",
      "Supervised operation",
    ],
    boundaries: [
      "CARE C300 is clinician-assistive research, not a licensed doctor or nurse.",
      "No diagnosis, treatment, prescription or patient-lifting claims.",
      "Not represented as an approved medical device anywhere on this site.",
      "CARE C200 is a separate product from BUCKi PERSONA CARE C200 — always shown with its full family name.",
    ],
    workflows: [
      "Sealed supply deliveries between departments",
      "Linen and consumable movement",
      "Nonclinical sample and record transport",
      "Corridor navigation under staff control",
      "Delivery logging and access-restricted routes",
      "Pharmacy and storeroom run support",
    ],
    industryLinks: [
      { label: "Healthcare Logistics", href: "/industries/healthcare-logistics" },
      { label: "Diagnostic Laboratories", href: "/industries" },
      { label: "30-industry directory", href: "/industries" },
    ],
    chips: ["Sealed supplies", "Indoor logistics", "Delivery logs"],
    tier: "vision",
    status: CONCEPT,
    image: "/images/families/care.webp",
    models: [
      { id: "CAR-C100", name: "CARE C100", short: "C100", purpose: "Secure internal logistics", status: CONCEPT },
      { id: "CAR-C200", name: "CARE C200", short: "C200", purpose: "Nonclinical assistance", status: CONCEPT },
      { id: "CAR-C300", name: "CARE C300", short: "C300", purpose: "Clinician-assistive research", status: CONCEPT },
    ],
  },
  {
    slug: "titan",
    name: "TITAN",
    headline: "Intelligence in Demanding Conditions.",
    intro:
      "Rugged mobile and remote systems for industrial inspection, mining infrastructure and difficult operational environments.",
    positioning: "Rugged inspection, mapping and remote-observation concepts.",
    capabilities: [
      "Thermal inspection options",
      "Mapping",
      "Remote operation",
      "Sensor payloads",
      "Rugged mobility",
      "Controlled tool interfaces",
    ],
    boundaries: [
      "No explosion-proof approval is implied.",
      "No underground safety certification is claimed.",
      "Certification, IP rating and hazardous-area suitability remain unspecified until evidenced.",
    ],
    workflows: [
      "Scheduled facility inspection routes",
      "Mine infrastructure mapping and observation",
      "Thermal condition checks on assets",
      "Remote observation in difficult access areas",
      "Utility and civil asset inspection support",
      "Site survey data collection",
    ],
    industryLinks: [
      { label: "Mining", href: "/industries/mining" },
      { label: "Civil Infrastructure", href: "/industries" },
      { label: "30-industry directory", href: "/industries" },
    ],
    chips: ["Inspection routes", "Mapping", "Remote observation"],
    tier: "vision",
    status: CONCEPT,
    image: "/images/families/titan.webp",
    models: [
      { id: "TIT-T100", name: "TITAN T100", short: "T100", purpose: "Facility inspection", status: CONCEPT },
      { id: "TIT-M100", name: "TITAN M100", short: "M100", purpose: "Rugged mine inspection", status: CONCEPT },
      { id: "TIT-X200", name: "TITAN X200", short: "X200", purpose: "Specialized heavy remote operation", status: CONCEPT },
    ],
  },
  {
    slug: "terra",
    name: "TERRA",
    headline: "Precision for Growing Operations.",
    intro:
      "Agricultural concepts focusing on greenhouse sensing, crop inspection, careful handling and task-specific automation.",
    positioning: "Greenhouse sensing, crop inspection and careful handling concepts.",
    capabilities: [
      "Crop perception",
      "Grading",
      "Transport",
      "Environmental monitoring",
      "Research into safe selective harvesting",
    ],
    boundaries: [
      "No promise of general autonomous harvesting.",
      "No unsupported economic or yield claims.",
      "Selective harvesting remains a research objective, not a delivered capability.",
    ],
    workflows: [
      "Greenhouse crop monitoring rounds",
      "Produce movement between bays and packing areas",
      "Grading support with vision checks",
      "Environmental sensing and logging",
      "Selective harvest research trials",
      "Nursery and tray transport",
    ],
    industryLinks: [
      { label: "Greenhouses", href: "/industries/greenhouses" },
      { label: "General Manufacturing", href: "/industries" },
      { label: "30-industry directory", href: "/industries" },
    ],
    chips: ["Crop monitoring", "Produce handling", "Grading support"],
    tier: "vision",
    status: CONCEPT,
    image: "/images/families/terra.webp",
    models: [
      { id: "TER-A100", name: "TERRA A100", short: "A100", purpose: "Crop inspection", status: CONCEPT },
      { id: "TER-A200", name: "TERRA A200", short: "A200", purpose: "Produce handling and grading", status: CONCEPT },
      { id: "TER-A300", name: "TERRA A300", short: "A300", purpose: "Harvesting research", status: CONCEPT },
    ],
  },
  {
    slug: "tide",
    name: "TIDE",
    headline: "Engineering for Marine Environments.",
    intro:
      "Marine machines and underwater vehicles for inspections, aquaculture monitoring, seafood workflows and port applications.",
    positioning: "Marine, deck and subsea inspection concepts.",
    capabilities: [
      "ROV optics",
      "Navigation",
      "Sensor payloads",
      "Corrosion considerations",
      "Washdown systems",
      "Sorting research",
    ],
    boundaries: [
      "Different form factors serve the seafood line, deck and subsea work — not one universal robot.",
      "No seaworthiness, dive-depth or marine certification is claimed before testing.",
    ],
    workflows: [
      "Seafood line supply and grading support",
      "Deck handling and monitoring assistance",
      "Underwater net and cage inspection",
      "Port asset and hull observation",
      "Sensor survey routes in marine conditions",
      "Washdown-compatible transport research",
    ],
    industryLinks: [
      { label: "Seafood Processing", href: "/industries" },
      { label: "Aquaculture", href: "/industries" },
      { label: "30-industry directory", href: "/industries" },
    ],
    chips: ["ROV inspection", "Deck support", "Aquaculture monitoring"],
    tier: "vision",
    status: CONCEPT,
    image: "/images/families/tide.webp",
    models: [
      { id: "TID-S100", name: "TIDE S100", short: "S100", purpose: "Seafood processing", status: CONCEPT },
      { id: "TID-M200", name: "TIDE M200", short: "M200", purpose: "Marine deck support", status: CONCEPT },
      { id: "TID-U300", name: "TIDE U300", short: "U300", purpose: "Underwater remotely operated vehicle", status: CONCEPT },
    ],
  },
  {
    slug: "lab",
    name: "LAB",
    headline: "A Platform for Robotic Discovery.",
    intro:
      "Developer and academic concepts supporting perception research, simulation, testing, controlled robotics programming and engineering education.",
    positioning: "Developer and academic robotics platforms for research and teaching.",
    capabilities: [
      "Developer interfaces",
      "Experimental sensors",
      "Logging",
      "Simulation",
      "Modular hardware",
    ],
    boundaries: [
      "No claimed public SDK or finished platform until verified.",
      "No benchmark or performance figures without documented tests.",
    ],
    workflows: [
      "Perception research runs",
      "Simulation scenario testing",
      "Sensor and dataset logging",
      "Controlled programming exercises",
      "Bench repeatability tests",
      "Engineering education modules",
    ],
    industryLinks: [
      { label: "Diagnostic Laboratories", href: "/industries" },
      { label: "Partnerships", href: "/company/partnerships" },
      { label: "30-industry directory", href: "/industries" },
    ],
    chips: ["Perception research", "Simulation", "Education"],
    tier: "vision",
    status: CONCEPT,
    image: "/images/families/lab.webp",
    models: [
      { id: "LAB-D100", name: "LAB D100", short: "D100", purpose: "Teaching/developer platform", status: CONCEPT },
      { id: "LAB-D200", name: "LAB D200", short: "D200", purpose: "Advanced developer platform", status: CONCEPT },
    ],
  },
];

/** Ordered registry as required by spec: BUCKi, BUCKi HOME, BUCKi PERSONA, FORGE, CARE, TITAN, TERRA, TIDE, LAB.
 *  Commercial prominence: FORGE appears first in homepage grid emphasis. */
export const FAMILY_ORDER_SLUGS = [
  "forge",
  "bucki",
  "bucki-home",
  "bucki-persona",
  "care",
  "titan",
  "terra",
  "tide",
  "lab",
] as const;

/** Nine families sorted for homepage grid: FORGE first (commercial prominence), rest registry order. */
export const FAMILIES_HOME_ORDER: RobotFamily[] = [
  FAMILIES.find((f) => f.slug === "forge")!,
  ...FAMILY_ORDER_SLUGS.filter((s) => s !== "forge").map(
    (s) => FAMILIES.find((f) => f.slug === s)!,
  ),
];

export function getFamily(slug: string): RobotFamily | undefined {
  return FAMILIES.find((f) => f.slug === slug);
}

/** All 27 models flattened with their family. */
export const ALL_MODELS: Array<{ family: RobotFamily; model: RobotModel }> = FAMILIES.flatMap(
  (family) => family.models.map((model) => ({ family, model })),
);

export const MODEL_COUNT = ALL_MODELS.length; // 27
export const FAMILY_COUNT = FAMILIES.length; // 9
