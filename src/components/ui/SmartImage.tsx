"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * SmartImage, renders optimized Next.js imagery when the file exists in
 * /public, otherwise shows an art-directed CONCEPT placeholder.
 *
 * Media policy (Master Spec, Chapter 04): white studio backgrounds,
 * robot-only subjects, concept captions. Once the approved exports are
 * dropped into the paths listed in IMAGES_REQUIRED.md, no code changes
 * are needed.
 */

const ROBOT_GLYPH = (
  <svg viewBox="0 0 64 64" aria-hidden="true" className="h-14 w-14 text-blue/70" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="18" y="12" width="28" height="22" rx="7" />
    <circle cx="27" cy="23" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="37" cy="23" r="2.4" fill="currentColor" stroke="none" />
    <path d="M32 12V6" />
    <circle cx="32" cy="4.5" r="2" />
    <path d="M24 40h16l4 14H20l4-14Z" />
    <path d="M18 20h-5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h5" />
    <path d="M46 20h5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-5" />
  </svg>
);

export interface SmartImageProps {
  /** Path inside /public, e.g. /images/families/forge.webp */
  src?: string | null;
  /** Independent mobile crop (spec: 1080x1350, never cuts head/arms/wheels/brand). */
  mobileSrc?: string | null;
  alt: string;
  /** Tailwind classes applied to the outer ratio wrapper. */
  className?: string;
  /** Tailwind classes applied to the <Image> element. */
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Caption shown under the placeholder (concept disclosure). */
  caption?: string;
  /**
   * Object-fit for the delivered file. `contain` (default) suits the white
   * studio renders; `cover` suits the wide 3:1 marketing banners, which are
   * composed to be cropped to the wrapper ratio.
   */
  fit?: "contain" | "cover";
}

export function SmartImage({
  src,
  mobileSrc,
  alt,
  className = "",
  imgClassName = "",
  sizes,
  priority,
  caption,
  fit = "contain",
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const [mobileFailed, setMobileFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={`relative overflow-hidden bg-arctic ${className}`}>
      {showImage ? (
        mobileSrc && !mobileFailed ? (
          <picture className="absolute inset-0 block h-full w-full">
            <source media="(max-width: 640px)" srcSet={mobileSrc} />
            <img
              src={src as string}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} ${imgClassName}`}
              onError={() => {
                // Mobile crop failed on a small viewport → placeholder;
                // otherwise fall back to the desktop image.
                if (
                  typeof window !== "undefined" &&
                  window.matchMedia("(max-width: 640px)").matches
                ) {
                  setFailed(true);
                } else {
                  setMobileFailed(true);
                }
              }}
            />
          </picture>
        ) : (
          <Image
            src={src as string}
            alt={alt}
            fill
            sizes={sizes ?? "100vw"}
            priority={priority}
            className={`${fit === "cover" ? "object-cover" : "object-contain"} ${imgClassName}`}
            onError={() => setFailed(true)}
          />
        )
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(180deg,#ffffff_0%,#f0f5f9_100%)]"
          role="img"
          aria-label={`${alt}, concept visualization placeholder`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.35] [background-image:repeating-linear-gradient(90deg,transparent_0_46px,#dbe4ec_46px_47px)]"
          />
          <div className="relative flex flex-col items-center gap-2 px-6 text-center">
            {ROBOT_GLYPH}
            <span className="spec-label text-blue">Concept visualization</span>
            {caption ? (
              <span className="max-w-xs text-xs leading-snug text-muted">{caption}</span>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
