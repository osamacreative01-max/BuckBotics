"use client";

import { useState } from "react";
import { SmartImage } from "./SmartImage";

export interface SliderImage {
  src: string;
  /** Optional small-viewport variant (served via <picture> media query). */
  mobileSrc?: string;
  alt: string;
}

/**
 * ImageSlider — accessible image slider for cards that have several
 * delivered renders (families ship 3–6 angles each). Arrow buttons,
 * dot navigation and an aria-live caption. Degrades to a single
 * SmartImage (placeholder when no file exists) when only one image
 * or none is available.
 */
export function ImageSlider({
  images,
  label,
  className = "aspect-[4/3]",
  sizes,
  priority = false,
}: {
  images: SliderImage[];
  /** Accessible name prefix, e.g. "FORGE" */
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return <SmartImage src={null} alt={label} className={className} sizes={sizes} />;
  }

  const safeIndex = Math.min(index, images.length - 1);
  const current = images[safeIndex];
  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div className={`relative ${className}`}>
      <SmartImage
        key={current.src}
        src={current.src}
        mobileSrc={current.mobileSrc}
        alt={current.alt}
        className="h-full w-full"
        sizes={sizes}
        priority={priority}
      />

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={`Previous ${label} image`}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/95 text-xl leading-none text-graphite shadow-sm transition-colors hover:border-blue hover:text-blue focus-visible:outline-2 focus-visible:outline-blue"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`Next ${label} image`}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/95 text-xl leading-none text-graphite shadow-sm transition-colors hover:border-blue hover:text-blue focus-visible:outline-2 focus-visible:outline-blue"
          >
            <span aria-hidden="true">›</span>
          </button>

          <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${label} image ${i + 1} of ${images.length}`}
                aria-current={i === safeIndex ? "true" : undefined}
                className={`h-2 w-2 rounded-full border transition-colors ${
                  i === safeIndex
                    ? "border-blue bg-blue"
                    : "border-line bg-white hover:border-blue"
                }`}
              />
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {label} image {safeIndex + 1} of {images.length}
          </p>
        </>
      ) : null}
    </div>
  );
}
