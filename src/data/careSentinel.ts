/**
 * CARE SENTINEL, public website copy.
 *
 * Source: BUCKBOTICS_CARE_SENTINEL_WEBSITE_MASTER_V1_0.pdf, Part A.
 * Everything in this file is approved draft public copy marked
 * "PUBLISH EXACTLY" in the source document. Do not add claims, figures,
 * timelines, hospital references or commercial offers.
 *
 * Canonical identity: Family CARE | Model CARE C300 | ID CAR-C300 |
 * Programme CARE SENTINEL | Status CONCEPT.
 */

export const CARE_SENTINEL_PATH = "/robots/care/care-sentinel";

export const CARE_SENTINEL_IMAGES = {
  homeProblem: {
    src: "/images/care-sentinel/home-problem.webp",
    mobileSrc: "/images/care-sentinel/home-problem-mobile.webp",
    alt: "Concept visualization of the CARE SENTINEL assessment station, a white and navy chair inside a curved sensor arch beside a staff display and console.",
  },
  homeHuman: {
    src: "/images/care-sentinel/home-human.webp",
    mobileSrc: "/images/care-sentinel/home-human-mobile.webp",
    alt: "Concept visualization of the CARE SENTINEL station from a second angle, showing the patient seat, sensor arch, staff screen and branded console.",
  },
  front: {
    src: "/images/care-sentinel/station-front.webp",
    alt: "Concept visualization of the CARE SENTINEL station, front three-quarter view with the patient seat, curved sensor arch, staff display and console.",
  },
  detail: {
    src: "/images/care-sentinel/station-detail.webp",
    alt: "Concept visualization of the CARE SENTINEL patient seat and curved sensor arch, with staff-facing sensor modules visible.",
  },
  interface: {
    src: "/images/care-sentinel/station-interface.webp",
    alt: "Concept visualization of the CARE SENTINEL station with a staff-facing display showing an illustrative, simulated interface.",
  },
  branded: {
    src: "/images/care-sentinel/station-branded.webp",
    alt: "Concept visualization of the CARE SENTINEL station with the BUCKBOTICS CARE SENTINEL wordmark on the console.",
  },
  portrait: {
    src: "/images/care-sentinel/station-portrait.webp",
    alt: "Concept visualization of the CARE SENTINEL station, portrait view showing the full assessment chair, sensor arch and staff console.",
  },
} as const;

/** Mandatory label on every CARE SENTINEL image, Part B10. */
export const CARE_IMAGE_LABEL =
  "Concept visualization. Proposed design, not a manufactured product.";

/* ------------------------------------------------------------------
   Homepage slides 2 and 3, Part A2 and A3.
------------------------------------------------------------------ */
export const careHomeSlides = [
  {
    id: "care-problem",
    label: "BUCKBOTICS CARE  |  CARE SENTINEL  |  RESEARCH CONCEPT",
    headline: "When Every Minute Matters.",
    body: "Exploring a nurse guided emergency assessment concept that combines medical measurements and AI assisted prompts to support clinical awareness of possible warning signs.",
    button: "Explore CARE SENTINEL",
    status:
      "Proposed design only. Not manufactured, clinically validated or licensed for patient use.",
    image: CARE_SENTINEL_IMAGES.homeProblem,
  },
  {
    id: "care-human",
    label: "CARE SENTINEL  |  HUMAN FIRST DESIGN",
    headline: "Human Care. Intelligent Support.",
    body: "A proposed silent clinical assistant. Patients speak with healthcare staff while planned technology helps organize measurements, questions and urgent concerns behind the scenes.",
    button: "Discover the Concept",
    status:
      "Research concept only. No autonomous diagnosis, clinical deployment or regulatory authorization is claimed.",
    image: CARE_SENTINEL_IMAGES.homeHuman,
  },
] as const;

/* ------------------------------------------------------------------
   Product page, Part A4 to A18.
------------------------------------------------------------------ */
export const CARE_SENTINEL = {
  breadcrumb: ["Robots", "CARE", "CARE SENTINEL"],
  label: "CARE C300  |  CARE SENTINEL  |  RESEARCH CONCEPT",
  h1: "CARE SENTINEL",
  heroHeading: "When Every Minute Matters, Human Care Comes First.",
  heroParagraph:
    "CARE SENTINEL is a proposed research concept for supervised emergency assessment. It explores how medical sensors, staff facing AI assistance and structured alerts may help clinical teams recognize and respond to important warning signs.",
  heroPrimary: "How the Concept Works",
  heroSecondary: "Research and Engineering Enquiries",
  heroStatus:
    "Development concept only. CARE SENTINEL is not a manufactured, clinically validated or licensed medical device. It is not available for clinical use or sale.",

  idea: {
    heading: "Designed Around the Nurse. Never Instead of the Nurse.",
    paragraph:
      "The proposed experience is simple. A nurse talks directly with the patient and remains responsible for the assessment. CARE SENTINEL may assist in collecting selected measurements, organizing information and presenting possible concerns privately to the medical team. The patient does not need to speak to an AI voice assistant.",
  },

  challenge: {
    heading: "Important Changes Should Not Go Unnoticed.",
    paragraph:
      "People arriving at emergency departments can have different symptoms and levels of illness. Some serious conditions require immediate clinical attention. CARE SENTINEL is an early research programme focused on how carefully designed technology might support awareness, escalation and reassessment without replacing normal emergency care.",
  },

  steps: [
    {
      title: "A human welcome",
      text: "A nurse or another authorized healthcare professional welcomes the patient and identifies whether immediate direct care is required.",
    },
    {
      title: "A focused assessment",
      text: "The nurse may use selected medical instruments to collect measurements such as pulse, blood pressure, oxygen level, temperature and an ECG when appropriate.",
    },
    {
      title: "Quiet support",
      text: "The proposed software may organize verified readings and present suggested follow up questions privately to the nurse.",
    },
    {
      title: "Important concerns",
      text: "Clinician approved safety rules could surface selected warning signs. Missing or uncertain information must remain clearly marked.",
    },
    {
      title: "Human escalation",
      text: "The clinical team remains responsible for deciding what action is required. The proposed design includes staff alerts and acknowledgement tracking.",
    },
    {
      title: "Reassessment support",
      text: "Future research may explore reminders and monitoring connections for patients waiting for further assessment.",
    },
  ],

  researchAreas: {
    heading: "Five Initial Areas of Clinical Research",
    cards: [
      { title: "Heart and circulation warning signs", icon: "heart" },
      { title: "Stroke and neurological warning signs", icon: "brain" },
      { title: "Breathing difficulties", icon: "lungs" },
      { title: "Severe infection and circulation concerns", icon: "shield" },
      { title: "Glucose and selected metabolic warning signs", icon: "drop" },
    ],
    explanation:
      "These are proposed research areas, not confirmed diagnostic abilities. Any clinical algorithms, sensors and alert rules require specialist development, independent testing and appropriate authorization.",
  },

  technology: {
    heading: "One Proposed Station. Many Carefully Defined Functions.",
    modules: [
      {
        title: "Medical measurements",
        text: "Proposed integrations include medical grade ECG equipment, blood pressure measurement, oxygen monitoring, temperature and point of care glucose testing where clinically appropriate.",
        icon: "sensor",
      },
      {
        title: "Clinical information screen",
        text: "A staff facing display could present measured values, missing information, selected care prompts and the status of clinical alerts.",
        icon: "screen",
      },
      {
        title: "Independent alert workflow",
        text: "A separately controlled safety workflow is proposed to request staff attention when approved warning rules are triggered.",
        icon: "alert",
      },
      {
        title: "Hospital connections",
        text: "Later phases may explore suitable connections with hospital laboratory results, imaging reports and clinical records, subject to hospital approval.",
        icon: "network",
      },
    ],
  },

  boundaries: {
    heading: "Medical Professionals Remain in Control.",
    paragraph:
      "CARE SENTINEL is not intended to replace doctors or nurses, provide an all clear diagnosis, discharge patients or independently choose treatment. MRI, CT and X-ray imaging are separate hospital systems, not built into this concept station. Emergency care must never be delayed to complete an AI assessment.",
  },

  privacy: {
    heading: "Patient Privacy by Design.",
    paragraph:
      "The proposed design keeps direct conversation between patient and healthcare professional. Any future audio transcription or camera use would require appropriate hospital oversight, privacy controls and applicable patient notice and consent. The assessment must also support a manual path without AI audio capture.",
  },

  roadmap: {
    heading: "A Research Programme Built in Stages.",
    stages: [
      {
        stage: "Stage 1",
        title: "Clinical requirements",
        text: "Work with healthcare and engineering specialists to define the intended use, risk controls, measurement needs and proposed workflows.",
      },
      {
        stage: "Stage 2",
        title: "Engineering feasibility",
        text: "Study a nurse facing application and suitable medical equipment integrations using simulated cases and controlled engineering tests.",
      },
      {
        stage: "Stage 3",
        title: "Validation and regulatory work",
        text: "Investigate clinical performance, user safety, privacy and the required Canadian regulatory route before any authorized patient evaluation.",
      },
    ],
  },

  faqs: [
    {
      q: "Is CARE SENTINEL available for hospitals today?",
      a: "No. CARE SENTINEL is a proposed research and development concept. It is not offered for clinical use or sale.",
    },
    {
      q: "Does CARE SENTINEL diagnose heart attacks or strokes?",
      a: "No such validated capability is claimed. Proposed research may explore warning sign support, but medical diagnosis and treatment remain the responsibility of qualified clinicians.",
    },
    {
      q: "Does a patient need to talk to the AI?",
      a: "No. The proposed workflow is led by a healthcare professional. The patient speaks to the nurse or clinician, not to a machine.",
    },
    {
      q: "Is the microphone always recording?",
      a: "No. The design calls for audio capture to be off by default. Any future use would depend on hospital policies and appropriate privacy permissions.",
    },
    {
      q: "Can it replace MRI, CT or X-ray?",
      a: "No. Those tests require separate equipment and clinical decisions. Future integration may make authorized results available to staff.",
    },
    {
      q: "Can it replace an emergency nurse?",
      a: "No. CARE SENTINEL is being explored as supervised decision support, not a substitute for professional care.",
    },
    {
      q: "Can a hospital arrange a product demonstration?",
      a: "No clinical product demonstration is being offered. Qualified healthcare, academic and engineering organizations may contact the team to discuss the research concept.",
    },
  ],

  contact: {
    heading: "Explore a Responsible Research Collaboration.",
    paragraph:
      "BUCKBOTICS welcomes early conversations with healthcare institutions, academic researchers, biomedical engineers and regulatory specialists interested in the CARE SENTINEL research concept.",
    button: "Contact the BUCKBOTICS Team",
    privacy:
      "Please do not send patient names, medical records, symptoms or other personal health information through this website.",
  },

  disclosure:
    "CARE SENTINEL is an early development concept within BUCKBOTICS CARE C300. All product imagery is illustrative. No finished hardware, completed clinical validation, regulatory licence, hospital deployment, clinical performance or patient benefit is claimed. Not for diagnosis, treatment, patient use or sale.",

  card: {
    title: "CARE C300  |  CARE SENTINEL",
    body: "Exploring a nurse guided emergency assessment station with medical measurement integration and supervised clinical alerts.",
    status: "RESEARCH CONCEPT",
    button: "Explore CARE SENTINEL",
  },

  careFamilyFeature: {
    heading: "CARE SENTINEL: Emergency Assessment Research",
    paragraph:
      "Within the CARE C300 research concept, CARE SENTINEL explores a human first approach to supervised emergency assessment, measurement integration and clinical escalation.",
  },

  seo: {
    title: "CARE SENTINEL Research Concept | BUCKBOTICS CARE C300",
    description:
      "Explore BUCKBOTICS CARE SENTINEL, a proposed nurse guided emergency assessment research concept combining medical measurements, human supervision and clinical alert design.",
    socialTitle: "CARE SENTINEL  |  Human Care. Intelligent Support.",
    socialDescription:
      "A BUCKBOTICS CARE C300 research concept for supervised emergency assessment. Not available for patient use or sale.",
    ogImage: "/images/care-sentinel/care-sentinel-og.jpg",
  },
} as const;
