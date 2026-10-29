import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * Per-page metadata helper, unique title, description and canonical URL
 * for every canonical route (Performance chapter, Chapter 20).
 */
export function pageMeta({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
  absoluteTitle = false,
  ogTitle,
  ogDescription,
  ogAlt,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  /** Use the supplied title verbatim, without the site-name template. */
  absoluteTitle?: boolean;
  /** Optional exact social-card title/description. */
  ogTitle?: string;
  ogDescription?: string;
  ogAlt?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const image = ogImage ?? "/images/og/cover-1200x630.jpg";
  const socialTitle = ogTitle ?? `${title} | ${site.name}`;
  const socialDescription = ogDescription ?? description;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: ogAlt ?? `${title}, concept visualization` }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
  };
}
