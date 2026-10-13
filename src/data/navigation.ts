/**
 * Primary navigation — Master Spec V2.0, Chapter 05.
 * Desktop: sticky header, logo left, menus right, persistent
 * "Discuss a Project" CTA. Mobile: accordion drawer.
 */

import { FAMILIES } from "./families";
import { INDUSTRY_DETAILS } from "./industries";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  columns?: Array<{ heading: string; links: NavLink[] }>;
  links?: NavLink[];
}

const familyLinks: NavLink[] = [
  { label: "All robots", href: "/robots" },
  ...FAMILIES.map((f) => ({ label: f.name, href: `/robots/${f.slug}` })),
];

const industryLinks: NavLink[] = [
  { label: "30-industry directory", href: "/industries" },
  ...INDUSTRY_DETAILS.map((d) => ({ label: d.title, href: `/industries/${d.slug}` })),
];

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Robots",
    href: "/robots",
    columns: [
      { heading: "All robot families", links: familyLinks },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    columns: [
      { heading: "Directory", links: industryLinks },
    ],
  },
  {
    label: "Technology",
    href: "/technology/buckcore",
    links: [
      { label: "BUCKCORE", href: "/technology/buckcore" },
      { label: "Physical AI architecture", href: "/technology/buckcore#architecture" },
      { label: "Planned capabilities", href: "/technology/buckcore#modules" },
      { label: "Responsible integration", href: "/responsible-robotics" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    links: [
      { label: "Robotics feasibility", href: "/solutions#feasibility" },
      { label: "Controlled pilot programme", href: "/solutions/pilot-programme" },
      { label: "Proposed managed services", href: "/solutions#managed-services" },
    ],
  },
  {
    label: "Company",
    href: "/company/about",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Buckingham venture relationship", href: "/company/about#buckingham" },
      { label: "Partnerships", href: "/company/partnerships" },
    ],
  },
  {
    label: "Resources",
    href: "/resources/faq",
    links: [
      { label: "Frequently asked questions", href: "/resources/faq" },
      { label: "Status definitions", href: "/product-status" },
      { label: "Responsible robotics", href: "/responsible-robotics" },
    ],
  },
];

export const CONTACT_LINK: NavLink = { label: "Contact", href: "/contact" };

export const PRIMARY_CTA = { label: "Discuss a Project", href: "/contact?type=project" };

export const FOOTER_LINKS = {
  robots: familyLinks,
  industries: industryLinks,
  company: [
    { label: "About", href: "/company/about" },
    { label: "Partnerships", href: "/company/partnerships" },
    { label: "Solutions", href: "/solutions" },
    { label: "Pilot programme", href: "/solutions/pilot-programme" },
  ],
  resources: [
    { label: "Frequently asked questions", href: "/resources/faq" },
    { label: "Status definitions", href: "/product-status" },
    { label: "Responsible robotics", href: "/responsible-robotics" },
    { label: "BUCKCORE", href: "/technology/buckcore" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Use", href: "/legal/terms" },
    { label: "Cookie Notice", href: "/legal/cookies" },
    { label: "Accessibility Statement", href: "/legal/accessibility" },
  ],
};
