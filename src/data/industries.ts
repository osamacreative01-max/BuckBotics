/**
 * Industry directory — Master Spec V2.0, Chapters 12 & 13.
 *
 * 30 Canadian market opportunity tiles grouped into six sectors.
 * Only five sectors have full detail pages at launch; the remaining 25
 * tiles link to the enquiry flow — never to empty SEO stubs.
 *
 * Framing rule: gaps are described as task, operating and productivity
 * challenges — not as verified labour-shortage statistics.
 */

export interface Industry {
  n: number;
  title: string;
  sector: SectorSlug;
  /** Relevant families (display labels). */
  families: string[];
  /** Opportunity focus / proposed task (spec wording). */
  task: string;
  /** Set for the five launch detail pages. */
  detailSlug?: string;
}

export type SectorSlug =
  | "manufacturing-production"
  | "logistics-retail"
  | "food-agriculture"
  | "resources-infrastructure"
  | "marine-seafood"
  | "health-care-hospitality";

export interface Sector {
  slug: SectorSlug;
  label: string;
  blurb: string;
}

export const SECTORS: Sector[] = [
  {
    slug: "manufacturing-production",
    label: "Manufacturing & Production",
    blurb: "Repeatable part handling, machine tending and packing workflows in plants of every size.",
  },
  {
    slug: "logistics-retail",
    label: "Warehousing, Fulfilment & Retail",
    blurb: "Internal movement of totes, orders and stock between storage, lines and customers.",
  },
  {
    slug: "food-agriculture",
    label: "Food & Agriculture",
    blurb: "Hygiene-aware handling, grading and supply tasks in greenhouses, kitchens and plants.",
  },
  {
    slug: "resources-infrastructure",
    label: "Natural Resources & Infrastructure",
    blurb: "Inspection, mapping and sensing across sites that are remote, rugged or safety-critical.",
  },
  {
    slug: "marine-seafood",
    label: "Marine & Seafood",
    blurb: "Deck, dock and subsea tasks including grading, monitoring and asset observation.",
  },
  {
    slug: "health-care-hospitality",
    label: "Health, Care & Hospitality",
    blurb: "Nonclinical logistics, supervised engagement and information service concepts.",
  },
];

export const INDUSTRIES: Industry[] = [
  { n: 1, title: "Warehousing and Logistics", sector: "logistics-retail", families: ["FORGE"], task: "Tote movement, picking, feeding", detailSlug: "warehousing-logistics" },
  { n: 2, title: "Food and Beverage Manufacturing", sector: "food-agriculture", families: ["FORGE"], task: "Packing, visual inspection, line supply", detailSlug: "food-processing" },
  { n: 3, title: "Automotive and Parts", sector: "manufacturing-production", families: ["FORGE"], task: "Part handling, machine tending" },
  { n: 4, title: "Hospitals and Health Systems", sector: "health-care-hospitality", families: ["CARE"], task: "Sealed supplies, linen movement", detailSlug: "healthcare-logistics" },
  { n: 5, title: "Long-Term Care", sector: "health-care-hospitality", families: ["CARE", "PERSONA CARE"], task: "Nonclinical delivery, engagement" },
  { n: 6, title: "Greenhouses", sector: "food-agriculture", families: ["TERRA"], task: "Crop monitoring, grading", detailSlug: "greenhouses" },
  { n: 7, title: "General Manufacturing", sector: "manufacturing-production", families: ["FORGE"], task: "Loading, materials, inspection" },
  { n: 8, title: "Commercial Cleaning", sector: "health-care-hospitality", families: ["FORGE", "BUCKi HOME"], task: "Cleaning workflow support" },
  { n: 9, title: "Meat and Poultry Processing", sector: "food-agriculture", families: ["FORGE"], task: "Packaging, handling" },
  { n: 10, title: "E-Commerce Fulfilment", sector: "logistics-retail", families: ["FORGE"], task: "Sorting, internal movement" },
  { n: 11, title: "Mining and Critical Minerals", sector: "resources-infrastructure", families: ["TITAN"], task: "Mapping and remote inspections", detailSlug: "mining" },
  { n: 12, title: "Residential Construction", sector: "resources-infrastructure", families: ["TITAN"], task: "Inspection, mapping, transport" },
  { n: 13, title: "Civil Infrastructure", sector: "resources-infrastructure", families: ["TITAN"], task: "Site monitoring and surveys" },
  { n: 14, title: "Electrical Utilities", sector: "resources-infrastructure", families: ["TITAN"], task: "Condition checks, thermal imaging" },
  { n: 15, title: "Oil and Gas", sector: "resources-infrastructure", families: ["TITAN"], task: "Remote observation and sensing" },
  { n: 16, title: "Seafood Processing", sector: "marine-seafood", families: ["TIDE", "FORGE"], task: "Grading and packing" },
  { n: 17, title: "Commercial Fisheries", sector: "marine-seafood", families: ["TIDE"], task: "Handling and deck monitoring" },
  { n: 18, title: "Aquaculture", sector: "marine-seafood", families: ["TIDE"], task: "Underwater net/cage inspection" },
  { n: 19, title: "Forestry and Wood Processing", sector: "resources-infrastructure", families: ["TITAN", "FORGE"], task: "Lumber handling, inspection" },
  { n: 20, title: "Ports and Marine Terminals", sector: "marine-seafood", families: ["TIDE", "FORGE"], task: "Cargo and asset observations" },
  { n: 21, title: "Home Healthcare", sector: "health-care-hospitality", families: ["BUCKi HOME", "PERSONA CARE"], task: "Supervised nonclinical assistance" },
  { n: 22, title: "Physician and Nursing Support", sector: "health-care-hospitality", families: ["CARE"], task: "Clinician-supervised research only" },
  { n: 23, title: "Diagnostic Laboratories", sector: "health-care-hospitality", families: ["CARE", "FORGE"], task: "Controlled sample transport" },
  { n: 24, title: "Pharmaceutical Manufacturing", sector: "manufacturing-production", families: ["FORGE"], task: "Packing and inspection" },
  { n: 25, title: "Hotels and Hospitality", sector: "health-care-hospitality", families: ["BUCKi", "PERSONA EXECUTIVE"], task: "Concierge and information" },
  { n: 26, title: "Restaurants and Commercial Kitchens", sector: "food-agriculture", families: ["FORGE"], task: "Dish transport, repeatable handling" },
  { n: 27, title: "Retail and Grocery", sector: "logistics-retail", families: ["BUCKi", "FORGE"], task: "Inventory and information" },
  { n: 28, title: "Waste Management and Recycling", sector: "resources-infrastructure", families: ["FORGE", "TITAN"], task: "Sorting and hazard detection" },
  { n: 29, title: "Water and Wastewater Utilities", sector: "resources-infrastructure", families: ["TITAN", "TIDE"], task: "Asset inspection" },
  { n: 30, title: "Data Centres and Telecommunications", sector: "resources-infrastructure", families: ["TITAN", "FORGE"], task: "Thermal monitoring, asset checks" },
];

export function industriesBySector(): Array<{ sector: Sector; items: Industry[] }> {
  return SECTORS.map((sector) => ({
    sector,
    items: INDUSTRIES.filter((i) => i.sector === sector.slug),
  }));
}

/* ---------------------------------------------------------------
   Five fully developed industry landing pages — Chapter 13
--------------------------------------------------------------- */

export interface IndustryDetail {
  slug: string;
  title: string;
  /** Exact hero introduction from the master spec. */
  heroIntro: string;
  /** Related concept models (spec wording). */
  related: string[];
  relatedFamilySlugs: string[];
  /** Task examples (spec wording). */
  taskExamples: string[];
  /** Observed operational challenge. */
  challenge: string;
  /** Repeatable opportunity tasks with operating constraints. */
  opportunity: Array<{ task: string; note: string }>;
  /** Implementation assumptions a buyer must confirm. */
  assumptions: string[];
  /** Safety and data limitations (mandatory). */
  safety: string[];
  /** Pilot pathway. */
  pathway: string[];
  /** Industry-specific feasibility question (exact spec wording). */
  enquiryPrompt: string;
}

export const INDUSTRY_DETAILS: IndustryDetail[] = [
  {
    slug: "warehousing-logistics",
    title: "Warehousing & Logistics",
    heroIntro:
      "Explore robotic handling and autonomous movement for repeatable warehouse workflows.",
    related: ["FORGE W100", "FORGE W200"],
    relatedFamilySlugs: ["forge"],
    taskExamples: ["Tote routes", "Part movement", "Replenishment", "Exception handling"],
    challenge:
      "Inside most distribution centres the same handful of routes carry the majority of internal moves: replenishment from reserve to pick face, tote transfers between zones, and exception handling for misplaced or damaged items. These repeats are predictable in structure but variable in timing — aisles narrow, carts stop, scanners fail and people work around them. The operational question is not whether labour is available, but whether the same physical moves can be performed consistently without disrupting pick rates, changing floor layouts or adding supervision overhead.",
    opportunity: [
      { task: "Tote routes between reserve storage and pick faces", note: "Fixed origin/destination pairs, repeated many times per shift; frequency and aisle width must be documented before any pilot." },
      { task: "Part and pallet movement between zones", note: "Payload geometry and floor condition vary; requires route surveys and clearly marked travel lanes." },
      { task: "Replenishment runs triggered by stock thresholds", note: "Integration with warehouse systems is a later step; a pilot can begin with instructed or scheduled runs." },
      { task: "Exception handling for misplaced or held items", note: "Exceptions are irregular by nature — usually better suited to supervised tasks than to fixed automation." },
    ],
    assumptions: [
      "Floor surfaces are level, dry and within the robot's specified operating envelope (values remain under engineering evaluation).",
      "Travel lanes can be marked or clearly identifiable; changing racking layouts mid-pilot is out of scope.",
      "Site Wi-Fi or network coverage supports telemetry — coverage gaps must be mapped in advance.",
      "An operator role exists to start, pause and escalate tasks; no unattended operation is assumed.",
      "Hygiene and dust conditions are documented, since sealing and washdown ratings are not yet certified.",
    ],
    safety: [
      "Pedestrian and forklift interaction zones require an application-specific hazard assessment before any trial.",
      "Speed and force limitations, stop systems and fault recovery must be defined per site — not assumed from marketing material.",
      "No IP rating, battery runtime or payload figure is published until a dated test log exists for that duty cycle.",
      "Operational data from a pilot stays customer-controlled; retention and access terms are agreed before deployment.",
    ],
    pathway: [
      "Discovery call: routes, volumes, shift patterns and constraints (see enquiry prompt).",
      "Technical assessment: site survey, network review, task mapping and hazard scoping.",
      "Supplier and platform selection against the documented task list.",
      "Controlled pilot on a limited route set with a human supervisor.",
      "Measured evaluation against a baseline agreed before the pilot starts, with defined stop criteria.",
    ],
    enquiryPrompt:
      "What materials must move, between which locations, and how many times per shift?",
  },
  {
    slug: "food-processing",
    title: "Food Processing",
    heroIntro:
      "Explore precision automation for packing, internal supply and product flow in food operations.",
    related: ["FORGE W100", "FORGE W200"],
    relatedFamilySlugs: ["forge"],
    taskExamples: ["Line feeding", "Visual checks", "Repetitive handling", "Sanitation planning"],
    challenge:
      "Food and beverage plants run tight changeovers: packaging formats rotate, cleaning regimes are scheduled around production, and lines depend on consistent material supply at the right moment. Repetitive movements — moving product from staging to line, supplying packaging materials, transferring packed cases — consume operator time but tolerate little variability. Any automation concept must respect sanitation zoning, wet or dusty conditions and documented cleaning procedures before it is placed near a production line.",
    opportunity: [
      { task: "Line feeding with packaging and consumables", note: "Highly repeatable; requires changeover compatibility and confirmed container geometry." },
      { task: "Visual checks on packs or seals at defined stations", note: "Camera-based checks are a BUCKCORE VISION concept — accuracy must be validated on the customer's own products." },
      { task: "Case and tote handling between staging and packing", note: "Depends on floor condition, temperature zone and trolley design." },
      { task: "Repetitive transfer of finished goods to palletising areas", note: "Payload and grip tooling are model-specific and currently unspecified." },
    ],
    assumptions: [
      "Cleaning regime (CIP/COP or manual washdown) is documented; sealing performance is NOT certified at this stage.",
      "Product temperature zones and humidity ranges are specified by the customer.",
      "Packaging formats to be handled are provided as samples for gripper feasibility review.",
      "Production schedules allow a supervised trial window that does not affect shipping commitments.",
      "Staff are trained to override or stop the system at any time.",
    ],
    safety: [
      "Food-contact suitability and regulatory positioning must be reviewed with the customer's quality team — no certification is claimed here.",
      "Chemical exposure during cleaning can affect sensors and seals; compatibility is assessed case by case.",
      "Visual inspection concepts do not replace quality-control staff or certified inspection processes.",
      "No labour-saving, yield or uptime figure is published without a measured, dated trial record.",
    ],
    pathway: [
      "Discovery call: product format, packaging conditions and cleaning regime (see enquiry prompt).",
      "Technical assessment: zone classification, hygiene requirements, task mapping.",
      "Supplier and tooling selection for the identified grippers and sensors.",
      "Controlled pilot on a single line or staging area with staff supervision.",
      "Measured evaluation against pre-agreed quality and continuity metrics, with stop criteria.",
    ],
    enquiryPrompt:
      "What product format, packaging conditions and cleaning regime apply?",
  },
  {
    slug: "healthcare-logistics",
    title: "Healthcare Logistics",
    heroIntro:
      "Explore ways to reduce nonclinical transport workload while protecting patient safety.",
    related: ["CARE C100", "CARE C200"],
    relatedFamilySlugs: ["care"],
    taskExamples: ["Sealed supply deliveries", "Corridor navigation", "Staff control", "Delivery logs"],
    challenge:
      "Hospitals move a constant volume of nonclinical goods — sealed supplies, linen, meals, records and equipment — between stores, wards and departments. Much of this travel falls on clinical staff whose time is better spent with patients. Corridors are shared spaces with visitors, gurneys and unpredictable obstacles, and every new process must fit infection-control policies and information-governance rules. The opportunity is narrow and specific: transport tasks that require no clinical judgement and no patient contact.",
    opportunity: [
      { task: "Sealed supply deliveries between stores and units", note: "Closed containers, defined routes, staff-controlled dispatch." },
      { task: "Linen and consumable movement on scheduled runs", note: "Fixed cadence suits supervised pilot operations." },
      { task: "Nonclinical sample and record transport", note: "Chain-of-custody logging must be agreed with the laboratory before any trial." },
      { task: "Corridor navigation with staff priority handling", note: "Requires route mapping, right-of-way rules and continuous override ability." },
    ],
    assumptions: [
      "Task scope is explicitly nonclinical — no patient contact, no medication handling, no clinical decision support.",
      "Elevator access, door widths, floor surfaces and network coverage are surveyed in advance.",
      "Infection-prevention and facilities teams approve the trial routes and cleaning procedure.",
      "A staff owner is named for dispatch, supervision and incident review during the pilot.",
      "Delivery-log data handling follows the organization's privacy and retention policies.",
    ],
    safety: [
      "CARE and PERSONA CARE are not medical devices; nothing on this site should be read as regulatory approval.",
      "Human caregivers remain responsible for all essential care and clinical workflows.",
      "Motion safety requires application-specific hazard assessment, speed/force limits, stop systems and documented supervisory authority.",
      "No diagnostic, treatment, fall-monitoring or emergency-response capability is claimed.",
    ],
    pathway: [
      "Discovery call: which nonclinical items and secure transfers need routing (see enquiry prompt).",
      "Technical assessment: routes, network, elevator integration, hygiene and access controls.",
      "Supplier selection against the documented nonclinical task list.",
      "Controlled pilot on selected routes with staff override at all times.",
      "Measured evaluation against a pre-agreed transport baseline and incident criteria.",
    ],
    enquiryPrompt: "Which nonclinical items and secure transfers need routing?",
  },
  {
    slug: "greenhouses",
    title: "Greenhouses",
    heroIntro: "Explore crop sensing, produce handling and controlled-environment automation concepts.",
    related: ["TERRA A100", "TERRA A200"],
    relatedFamilySlugs: ["terra"],
    taskExamples: ["Vision", "Produce movement", "Grading", "Greenhouse navigation"],
    challenge:
      "Greenhouse operations combine living crops with rigid logistics: monitoring rounds cover long aisles, harvested produce moves from bays to packing quickly to protect quality, and grading decisions repeat hundreds of times per hour. Aisle geometry, hanging structures, drip lines and wet floors make movement delicate, while crop conditions change weekly. The practical starting point is sensing and transport tasks that improve visibility and reduce manual carries — not unsupervised harvesting.",
    opportunity: [
      { task: "Crop monitoring rounds with mounted vision", note: "Repeatable routes; image interpretation accuracy must be validated on the specific crop." },
      { task: "Produce movement from harvest bays to packing", note: "Depends on trolley design, aisle width and floor condition." },
      { task: "Grading support at a fixed station", note: "Classification models require customer-specific training data before accuracy claims." },
      { task: "Environmental sensing rounds (temperature, humidity, light)", note: "Sensor payloads are configurable; measurement accuracy needs documented calibration." },
    ],
    assumptions: [
      "Aisle geometry, floor surface and overhead clearances are surveyed before route planning.",
      "Crop type, growth stage and handling sensitivity are defined by the grower.",
      "Trial bays are selected where missed or delayed actions carry low crop risk.",
      "Network coverage through poly or glass structures is verified.",
      "Staff training covers dispatch, cleaning and emergency stop procedures.",
    ],
    safety: [
      "Selective harvesting remains research — no autonomous harvest guarantee is made or implied.",
      "Water, humidity and pesticide exposure environments must be reviewed against sealing ratings, which are not yet certified.",
      "No yield, labour-saving or payback figure is published without measured trials.",
      "Trial data (including imagery of facilities) remains customer-owned with agreed retention.",
    ],
    pathway: [
      "Discovery call: which crop, aisle geometry and handling action matter (see enquiry prompt).",
      "Technical assessment: route survey, sensing payload selection, hazard review.",
      "Supplier selection for the agreed inspection or transport task.",
      "Controlled pilot across a limited bay set with grower supervision.",
      "Measured evaluation against baseline monitoring coverage and handling times, with stop criteria.",
    ],
    enquiryPrompt: "Which crop, aisle geometry and handling action matter?",
  },
  {
    slug: "mining",
    title: "Mining",
    heroIntro: "Explore remote sensing, monitoring and robotic inspection concepts for demanding sites.",
    related: ["TITAN T100", "TITAN M100"],
    relatedFamilySlugs: ["titan"],
    taskExamples: ["Sensor routes", "Hazard assessments", "Mapping", "Communications plans"],
    challenge:
      "Mining sites ask people to enter areas that are dark, dusty, thermally extreme or structurally uncertain for routine inspection work: checking drifts, stockpiles, conveyor corridors and utility infrastructure. Many of these checks are periodic and data-light — a temperature reading, a visual condition note, a gas or structural observation — yet each one carries exposure risk. Remote or robotic sensing can move the first look away from people, provided communications, ground conditions and site rules are mapped first.",
    opportunity: [
      { task: "Scheduled sensor routes in drifts and stockpile areas", note: "Requires route marking, communications coverage and obstacle tolerance." },
      { task: "Thermal and visual condition checks on fixed assets", note: "Inspection value depends on sensor payload selection and baseline comparison records." },
      { task: "Mapping and re-mapping of changed geometries", note: "Mapping output must be validated against survey control before operational use." },
      { task: "Communications and hazard-zone survey support", note: "Zone classifications are site-specific and reviewed with the site's safety team." },
    ],
    assumptions: [
      "Ground conditions, gradients, water and debris levels are documented per route.",
      "Communications coverage (leaky feeder, Wi-Fi or mesh) is mapped before autonomy expectations are set.",
      "The site's exclusion zones, blasting schedules and permit rules govern any trial.",
      "A trained site operator supervises the system throughout the pilot.",
      "Explosion-proof or underground certifications are NOT claimed — equipment suitability is confirmed case by case.",
    ],
    safety: [
      "No explosion-proof approval, intrinsically safe rating or underground certification is implied by this website.",
      "Hazard assessment, speed/force limits, stop systems and fault recovery are defined per application.",
      "Remote operation interfaces do not replace site safety systems or supervision.",
      "No inspection accuracy, coverage or cost-saving figure is published without documented tests.",
    ],
    pathway: [
      "Discovery call: inspection route, communications conditions and hazardous zones (see enquiry prompt).",
      "Technical assessment: site survey, zone review, payload and communications plan.",
      "Supplier selection matched to the documented environmental conditions.",
      "Controlled pilot on a single supervised route with defined stop criteria.",
      "Measured evaluation against the existing inspection record agreed with the site.",
    ],
    enquiryPrompt:
      "Which inspection route, communications conditions and hazardous zones are involved?",
  },
];

export function getIndustryDetail(slug: string): IndustryDetail | undefined {
  return INDUSTRY_DETAILS.find((d) => d.slug === slug);
}
