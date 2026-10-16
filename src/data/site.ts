/**
 * BUCKBOTICS, site-level constants.
 * Source of truth: Master Website Specification V2.0 (cover contacts).
 * Contact details must match the specification exactly, do not edit
 * without written owner approval.
 */

import type { SliderImage } from "@/components/ui/ImageSlider";

export const site = {
  name: "BUCKBOTICS",
  ventureLine: "A Buckingham Venture",
  fullName: "BUCKBOTICS | A Buckingham Venture",
  domain: "www.buckbotics.com",
  url: "https://www.buckbotics.com",
  email: "info@buckbotics.com",
  phoneDisplay: "1 888 272 7884",
  phoneHref: "+18882727884",
  address: {
    line1: "26-2359 Royal Windsor Drive",
    city: "Mississauga",
    region: "Ontario",
    postal: "L5J 4S9",
    country: "Canada",
  },
  addressLine: "26-2359 Royal Windsor Drive, Mississauga, Ontario L5J 4S9, Canada",
} as const;

/** Mandatory public concept disclaimer, Master Spec, Chapter 19. */
export const conceptDisclaimer =
  "BUCKBOTICS robot designs and illustrations shown on this website are proposed concepts unless specifically identified as verified prototypes or commercially available products. Features, technical specifications, certifications, pricing and delivery timing are subject to engineering validation.";

/** Standard caption under every concept artwork, Master Spec, Chapter 04. */
export const conceptCaption =
  "Concept visualization, proposed design. Not a manufactured or commercially tested product.";

/** Homepage eyebrow + hero copy, Master Spec, Chapter 06 (exact). */
export const homeHero = {
  eyebrow: "BUCKBOTICS | ROBOTICS & PHYSICAL AI",
  headline: "Intelligence That Moves the World.",
  subheadline:
    "Developing intelligent robotic solutions and physical AI concepts for industry, essential services and thoughtful human interaction.",
  primaryCta: "Discuss a Robotics Project",
  secondaryCta: "Explore the Robot Families",
} as const;

/**
 * Homepage hero artwork, delivered studio group shots, cropped to the
 * hero figure's 16:10 box by scripts/import-artwork.mjs. Add new slides by
 * dropping exports into public/images/HERO/ and extending this array.
 */
export const homeHeroSlides: SliderImage[] = [
  {
    src: "/images/hero/hero-slide-1-1920x1200.webp",
    mobileSrc: "/images/hero/hero-slide-1-mobile-1080x675.webp",
    alt: "Concept group shot of five BUCKBOTICS robots, BUCKi HOME, the TITAN quadruped, a TERRA field rover, the LAB mobile laboratory and a compact six-wheeled inspection rover, in a light-blue studio scene.",
  },
  {
    src: "/images/hero/hero-slide-2-960x600.webp",
    alt: "Concept group shot of four BUCKBOTICS robots, BUCKi, BUCKi HOME, a FORGE mobile manipulation arm and CARE, in a light-blue studio scene.",
  },
  {
    src: "/images/hero/hero-slide-3-1920x1200.webp",
    mobileSrc: "/images/hero/hero-slide-3-mobile-1080x675.webp",
    alt: "Concept studio scene with the TITAN M100 inspection quadruped, a TERRA field rover and two adult synthetic android presenters in dark suits.",
  },
];
