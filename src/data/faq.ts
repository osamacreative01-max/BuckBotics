/**
 * Site-wide FAQ + product status glossary copy.
 * Chapter 05 (Resources) and Chapter 16 (Status schema).
 * PERSONA-specific FAQs live in persona.ts and appear on all PERSONA pages.
 */

import { STATUS_LIST } from "./status";

export const FAQS: Array<{ q: string; a: string; group: string }> = [
  {
    group: "Products & status",
    q: "Are BUCKBOTICS robots available for purchase today?",
    a: "No. The robots shown on this website are proposed concepts. No model has been manufactured or commercially tested unless a page explicitly identifies it as a verified prototype or available product. Features, specifications, certifications, pricing and delivery timing are subject to engineering validation.",
  },
  {
    group: "Products & status",
    q: "What do I do if a specification I need is missing?",
    a: "It is published as “Not specified / under engineering evaluation.” Payload, runtime, speed, protection ratings, certifications and similar figures cannot be guessed, each requires a dated test log or an approved source before it appears on the site.",
  },
  {
    group: "Products & status",
    q: "What is the difference between CARE C200 and BUCKi PERSONA CARE C200?",
    a: "They are separate lines with full product names. CARE C200 is a mechanical nonclinical assistance concept in the CARE family. BUCKi PERSONA CARE C200 is a humanlike android collection in the luxury PERSONA family. A short “C200” or “H200” is never used alone, because those designations exist in more than one family.",
  },
  {
    group: "Products & status",
    q: "Can I order a robot or see live pricing?",
    a: "There is no checkout or stock for concept equipment. The commercial path is an enquiry: feasibility discussion first, then a controlled pilot programme if the task and site justify it.",
  },
  {
    group: "Engagements",
    q: "How does an engagement with BUCKBOTICS work?",
    a: "Discovery call to understand the physical task, technical assessment of the site and constraints, supplier and platform selection, a controlled pilot with supervision, and a measured evaluation against a baseline agreed before the pilot starts.",
  },
  {
    group: "Engagements",
    q: "What should I prepare before the first conversation?",
    a: "The physical task (what moves or what is inspected), where it happens, how often per shift, the environment (floors, network, hygiene, hazards), and any scheduling constraints. Industry-specific prompts are listed on each industry page.",
  },
  {
    group: "Engagements",
    q: "Do you partner with OEMs, integrators and researchers?",
    a: "Yes, use the Partnerships route. Supplier, manufacturing and academic discussions are handled separately from end-customer project enquiries.",
  },
  {
    group: "Technology",
    q: "Is BUCKCORE finished software I can install?",
    a: "No. BUCKCORE is a proposed architecture. All ten modules, intelligence, vision, motion, skills, memory, fleet, sim, guard, ops and voice, carry Concept status at launch.",
  },
  {
    group: "Technology",
    q: "Does BUCKCORE provide safety certification?",
    a: "No. BUCKCORE GUARD provides application rules and interfaces; safety-rated control belongs in verified independent robot subsystems. Any interactive robot with motion requires an application-specific hazard assessment.",
  },
  {
    group: "Safety & responsibility",
    q: "How do you handle identity, consent and sensitive PERSONA uses?",
    a: "Only original synthetic adult faces appear publicly. MEMORIA starts with a low-information enquiry and moves identity and rights verification to a secured channel, no open uploads of faces, voices or family archives. Full standards are published on the Responsible Robotics page.",
  },
  {
    group: "Safety & responsibility",
    q: "Are these robots certified or medically approved?",
    a: "No certification, medical approval or hazardous-area rating is claimed anywhere on this site. Marketing must not portray certification until it exists.",
  },
  {
    group: "Safety & responsibility",
    q: "Is the website accessible?",
    a: "The site is designed toward WCAG 2.2 AA: keyboard navigation, visible focus states, semantic structure, descriptive image alternatives and reduced-motion support. Known gaps are tracked on the Accessibility Statement page.",
  },
  {
    group: "Privacy",
    q: "What happens when I submit an enquiry?",
    a: "The form is validated on the server, sent over encrypted transport to a company-controlled inbox/CRM, tagged by family or collection, and stored with your consent record. We do not ask for faces, medical records, household or memorial attachments on the general form.",
  },
  {
    group: "Privacy",
    q: "Do you use cookies?",
    a: "Essential cookies keep the site working. Optional analytics only run with consent. Details and controls are on the Cookies page.",
  },
];

export const STATUS_FAQ = STATUS_LIST.map((s) => ({
  status: s,
  q: `What does “${s.label}” mean?`,
  a: s.meaning,
}));
