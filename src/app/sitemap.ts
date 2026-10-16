import type { MetadataRoute } from "next";
import { FAMILIES } from "@/data/families";
import { INDUSTRY_DETAILS } from "@/data/industries";
import { PERSONA_COLLECTIONS } from "@/data/persona";
import { site } from "@/data/site";

/** All 36 mandatory launch routes, Master Spec, Chapter 05. */
const STATIC_ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1.0 },
  { path: "/robots", priority: 0.9 },
  { path: "/industries", priority: 0.9 },
  { path: "/technology/buckcore", priority: 0.8 },
  { path: "/solutions", priority: 0.8 },
  { path: "/solutions/pilot-programme", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
  { path: "/company/about", priority: 0.6 },
  { path: "/company/partnerships", priority: 0.6 },
  { path: "/resources/faq", priority: 0.6 },
  { path: "/responsible-robotics", priority: 0.6 },
  { path: "/product-status", priority: 0.5 },
  { path: "/legal/privacy", priority: 0.3 },
  { path: "/legal/terms", priority: 0.3 },
  { path: "/legal/cookies", priority: 0.3 },
  { path: "/legal/accessibility", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Deterministic timestamp, current time (`new Date()`) is blocked during prerender.
  const now = new Date("2026-10-11T00:00:00.000Z");

  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: (r.path === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: r.priority,
  }));

  const familyEntries = FAMILIES.map((f) => ({
    url: `${site.url}/robots/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const collectionEntries = [
    ...PERSONA_COLLECTIONS.map((c) => `/robots/bucki-persona/${c.slug}`),
    "/robots/bucki-persona/atelier",
  ].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryEntries = INDUSTRY_DETAILS.map((d) => ({
    url: `${site.url}/industries/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...familyEntries, ...collectionEntries, ...industryEntries];
}
