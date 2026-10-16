/**
 * BUCKi PERSONA, luxury humanlike division.
 * Source: Master Spec V2.0, Chapters 09, 10 & 11.
 *
 * Hierarchy: BUCKBOTICS (master) → BUCKi (interaction ecosystem) →
 * BUCKi PERSONA (premium hyper-realistic category).
 *
 * RULES enforced by this data file:
 *  - Five collections + ATELIER (a service, never a sixth model).
 *  - All copy is approved verbatim from the master spec.
 *  - Every collection shows CONCEPT status and a boundary statement.
 *  - Only adult fictional synthetic androids; no real-person imagery.
 */

import type { StatusKey } from "./status";

export interface PersonaCollection {
  slug: string;
  /** Collection name shown after BUCKi PERSONA, e.g. "EXECUTIVE". */
  name: string;
  model: string;
  internalId: string;
  /** Exact H1 from Chapter 10. */
  h1: string;
  intro: string;
  applications: string[];
  boundary: string;
  cta: string;
  ctaHref: string;
  buyer: string;
  status: StatusKey;
  /** Publication tier, Chapter 07 portfolio table. */
  tier: "now" | "private";
  image: string;
  /** Slider images for the collection card (delivered android renders). */
  images?: Array<{ src: string; alt: string }>;
}

export const PERSONA = {
  familyName: "BUCKi PERSONA",
  umbrellaLine: "Humanlike Presence, Responsibly Designed.",
  heroSub:
    "Explore a proposed range of refined adult humanoid companions and service systems combining expressive design, conversational intelligence and carefully defined assistance.",
  heroCtas: [
    { label: "Explore the Collections", href: "/robots/bucki-persona#collections" },
    { label: "Request a Private Consultation", href: "/contact?type=private-consultation" },
  ],
  intro:
    "We envision a robot that feels approachable in appearance, precise in function and clear about being a machine. BUCKi PERSONA is the luxury humanlike category within BUCKBOTICS, designed for environments where communication, presence and service quality matter.",
} as const;

export const PERSONA_COLLECTIONS: PersonaCollection[] = [
  {
    slug: "executive",
    name: "EXECUTIVE",
    model: "E200",
    internalId: "PER-E200",
    h1: "A Remarkable First Impression.",
    intro:
      "A refined adult humanoid concept for luxury reception, curated hospitality, executive information services and memorable brand experiences.",
    applications: [
      "Visitor orientation",
      "Approved company FAQs",
      "Appointment guidance",
      "Branded product presentation",
      "Human escalation",
    ],
    boundary:
      "No security authority, deceptive human impersonation, unsupervised physical assistance or clinical tasks.",
    cta: "Discuss an Executive Pilot",
    ctaHref: "/contact?type=persona-executive",
    buyer: "Luxury reception, hospitality, office information, concierge",
    status: "concept",
    tier: "now",
    image: "/images/persona/executive.webp",
    images: [
      { src: "/images/persona/executive/slide-1.webp", alt: "PERSONA EXECUTIVE E200, male persona in navy suit, three-quarter front view, fictional adult android concept render" },
      { src: "/images/persona/executive/slide-2.webp", alt: "PERSONA EXECUTIVE E200, male persona front view standing, fictional adult android concept render" },
      { src: "/images/persona/executive/slide-3.webp", alt: "PERSONA EXECUTIVE E200, side profile with ear module visible, fictional adult android concept render" },
      { src: "/images/persona/executive/slide-4.webp", alt: "PERSONA EXECUTIVE E200, close-up of chrome robotic hand in suit sleeve, concept render" },
      { src: "/images/persona/executive/slide-5.webp", alt: "PERSONA EXECUTIVE E200, close-up of jaw line and illuminated neck mechanics, concept render" },
    ],
  },
  {
    slug: "home",
    name: "HOME",
    model: "H200",
    internalId: "PER-H200",
    h1: "The Art of Living with Intelligent Assistance.",
    intro:
      "An adult humanlike home-presence concept for conversation, everyday coordination and carefully supervised assistance.",
    applications: [
      "Household routines",
      "Approved reminders",
      "Conversational support",
      "Authorized smart-home interactions",
    ],
    boundary:
      "No autonomous cooking, domestic general intelligence, childcare, essential eldercare, lifting or medication administration.",
    cta: "Request a Private Consultation",
    ctaHref: "/contact?type=private-consultation",
    buyer: "Private domestic communication and supervised assistance",
    status: "concept",
    tier: "private",
    image: "/images/families/bucki-persona/slide-5.webp",
  },
  {
    slug: "care",
    name: "CARE",
    model: "C200",
    internalId: "PER-C200",
    h1: "A Kinder Interface for Everyday Support.",
    intro:
      "A proposed humanlike companion interface supporting senior engagement, family connection and approved nonclinical workflows alongside professional caregivers.",
    applications: [
      "Conversation",
      "Reminiscence",
      "Family calls",
      "Accessible reminders",
      "Supervised nonclinical support",
    ],
    boundary:
      "No diagnostic, treatment, fall-monitoring guarantee, private care substitution or unsupervised emergency duties.",
    cta: "Discuss a Care Pilot",
    ctaHref: "/contact?type=persona-care",
    buyer: "Senior engagement and nonclinical, supervised support",
    status: "concept",
    tier: "private",
    image: "/images/families/bucki-persona/slide-4.webp",
  },
  {
    slug: "memoria",
    name: "MEMORIA",
    model: "M200",
    internalId: "PER-M200",
    h1: "A Thoughtful Way to Preserve a Legacy.",
    intro:
      "A private remembrance concept using curated, authorized memories and carefully governed likeness elements. It is a tribute interface, never a recreation of a person.",
    applications: [
      "Curated stories",
      "Actual-recording playback",
      "Clearly labelled synthetic responses",
      "Private family memory sessions",
    ],
    boundary:
      "Do not promise resurrection, fabricate life events or accept facial/voice uploads on an open form. Rights and consent review required.",
    cta: "Enquire Privately",
    ctaHref: "/contact?type=persona-memoria",
    buyer: "Private, consent-led remembrance and legacy storytelling",
    status: "concept",
    tier: "private",
    image: "/images/families/bucki-persona/slide-3.webp",
  },
  {
    slug: "signature",
    name: "SIGNATURE",
    model: "S300",
    internalId: "PER-S300",
    h1: "An Expression of Individuality.",
    intro:
      "An exclusive adult humanoid design concept exploring bespoke appearance, wardrobe, synthetic voice and carefully bounded interactions for premium settings.",
    applications: [
      "Custom fictional adult facial geometry",
      "Licensed attire",
      "Voice profile",
      "Optional interaction packages",
      "Staged design reviews",
    ],
    boundary:
      "No guarantee of humanoid movement, emotional consciousness, copyrighted likeness rights or broad care capability.",
    cta: "Discuss a Bespoke Commission",
    ctaHref: "/contact?type=persona-signature",
    buyer: "Custom adult appearance, style, persona and design",
    status: "concept",
    tier: "private",
    image: "/images/persona/signature.webp",
    images: [
      { src: "/images/persona/signature/slide-1.webp", alt: "PERSONA SIGNATURE S300, female persona in navy suit, three-quarter front view, fictional adult android concept render" },
      { src: "/images/persona/signature/slide-2.webp", alt: "PERSONA SIGNATURE S300, side profile, fictional adult android concept render" },
      { src: "/images/persona/signature/slide-3.webp", alt: "PERSONA SIGNATURE S300, close-up of wrist module and chrome bracelet, concept render" },
      { src: "/images/persona/signature/slide-4.webp", alt: "PERSONA SIGNATURE S300, close-up of back-of-head ear module and neck spine, concept render" },
      { src: "/images/persona/signature/slide-5.webp", alt: "PERSONA SIGNATURE S300, close-up of head with ear module and chrome neck, concept render" },
    ],
  },
];

/** ATELIER, private personalization service (not a robot model). */
export const PERSONA_ATELIER = {
  slug: "atelier",
  name: "PERSONA ATELIER",
  kind: "service" as const,
  h1: "Your Vision. Thoughtfully Engineered.",
  intro:
    "A private, staged design consultation for original adult synthetic appearances or carefully authorized likeness requests.",
  process: [
    "Discovery",
    "Identity-rights review",
    "Appearance design",
    "Voice and behaviours",
    "Hardware feasibility",
    "Privacy plan",
    "Test scope",
    "Acceptance",
    "Maintenance",
  ],
  notice:
    "No prices or guaranteed delivery dates are published until supplier and engineering quotations are approved.",
  cta: "Begin a Private Design Consultation",
  ctaHref: "/contact?type=private-consultation",
  image: "/images/families/bucki-persona/slide-1.webp",
} as const;

/** Required on all PERSONA-related pages, Chapter 10. */
export const PERSONA_FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Is PERSONA available today?",
    a: "No. This is a concept-stage initiative. No PERSONA collection has been manufactured, field-tested or offered for sale.",
  },
  {
    q: "Can it look like a real person?",
    a: "Only after a formal rights review. Original fictional adult designs are preferred, and no likeness of a living or deceased person is used without documented permission.",
  },
  {
    q: "Can MEMORIA revive a loved one?",
    a: "No. MEMORIA is a clearly artificial remembrance concept, a tribute interface, never a recreation or resurrection of a person.",
  },
  {
    q: "Can PERSONA independently care for children, patients or seniors?",
    a: "No. Human caregivers and family remain responsible for all essential care. PERSONA supports supervised, nonclinical interaction only.",
  },
  {
    q: "Does the robot feel human emotions?",
    a: "No verified consciousness or emotional experience is claimed. PERSONA designs may express scripted mechanical cues, but they are machines and disclose that identity.",
  },
];

/** Mandatory safety, consent and identity standards, Chapter 11. */
export const RESPONSIBLE_BLOCKS = [
  {
    id: "memoria-protocol",
    title: "MEMORIA protocol",
    items: [
      "No open website upload of photos, voices, deceased identity records or sensitive family archives.",
      "Enquiries begin low-information; identity verification and legal process move to a secured channel.",
      "Applicant authority and rights to images, voice, recordings and private material are verified, an estate or family request alone may be insufficient.",
      "Documented lifetime consent is preferred. No scraping of social networks or private correspondence.",
      "Real recordings are separated from AI-generated simulation and each is clearly labelled.",
      "MEMORIA is explained as an artificial tribute, not consciousness, resurrection or the actual deceased person.",
      "Cancellation, deletion and retention controls are offered; no grief-pressure sales tactics.",
    ],
  },
  {
    id: "care-senior-support",
    title: "Care and senior support",
    items: [
      "Human caregivers and family remain responsible for essential care.",
      "Workflows require consent, accessibility, opt-out, clear escalation and staff override.",
      "No diagnoses, prescriptions, treatment recommendations, intimate care, patient lifting or autonomous emergency monitoring unless separately validated and lawfully authorized.",
      "Child-facing interactions must have adult supervision. There is no childlike humanoid product line and no self-directed babysitting claim.",
    ],
  },
  {
    id: "appearance-marketing",
    title: "Appearance and public marketing",
    items: [
      "Only original synthetic adult faces appear in public artwork.",
      "The website never claims that a rendered face belongs to a human client, patient, celebrity or deceased relative.",
      "Robots remain recognizable as machines through labelling and distinct mechanical indicators.",
      "Public demonstrations must disclose artificial identity.",
    ],
  },
  {
    id: "buckcore-safety",
    title: "BUCKCORE physical safety limitation",
    items: [
      "Language models must not bypass independent safety-rated robot controls.",
      "Any interactive robot with motion requires application-specific hazard assessment, speed/force limitations, stop systems, fault recovery and documented supervisory authority.",
    ],
  },
];

export function getCollection(slug: string): PersonaCollection | undefined {
  return PERSONA_COLLECTIONS.find((c) => c.slug === slug);
}
