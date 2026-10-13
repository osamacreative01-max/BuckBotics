import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * Per-page metadata helper — unique title, description and canonical URL
 * for every canonical route (Performance chapter, Chapter 20).
 */
export function pageMeta({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${site.url}${path}`;
  const image = ogImage ?? "/images/og/cover-1200x630.jpg";
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${title} — concept visualization` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}
