"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Wordmark — BUCKBOTICS | A Buckingham Venture.
 *
 * Master Spec, Chapter 03: the wordmark is type-as-mark only — no icon,
 * antler, crest or pictogram. BUCK renders white-on-navy (light variant)
 * or navy-on-white (dark variant); BOTICS uses the approved blue;
 * BUCKi carries a lowercase cyan i.
 *
 * When /images/logo/logo-{variant}.svg is supplied (exported from the
 * approved master artwork, not retyped), it is used automatically.
 * Until then a geometrically consistent fallback lockup is shown —
 * REPLACE WITH APPROVED VECTOR OUTLINES BEFORE LAUNCH (acceptance 01).
 */

type Variant = "light" | "dark";

interface WordmarkProps {
  variant?: Variant;
  /** Height in Tailwind units (default h-7). */
  className?: string;
  /** Render as plain text (no link) — e.g. inside the footer identity block. */
  asLink?: boolean;
  href?: string;
}

export function Wordmark({
  variant = "dark",
  className = "h-7",
  asLink = true,
  href = "/",
}: WordmarkProps) {
  const [failed, setFailed] = useState(false);
  const src = `/images/logo/logo-${variant}.svg`;

  const lockup = failed ? (
    <span
      className={`inline-flex items-baseline gap-[0.12em] font-display font-semibold tracking-[-0.02em] ${
        variant === "light" ? "text-white" : "text-midnight"
      } ${className}`}
    >
      <span aria-hidden="true">BUCK</span>
      <span
        className={variant === "light" ? "text-cyan" : "text-blue"}
        aria-hidden="true"
      >
        BOTICS
      </span>
      <span className="sr-only">BUCKBOTICS</span>
    </span>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element -- plain SVG until approved vector artwork is delivered
    <img
      src={src}
      alt="BUCKBOTICS"
      className={`${className} w-auto`}
      onError={() => setFailed(true)}
    />
  );

  if (!asLink) return lockup;

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 rounded-sm"
      aria-label="BUCKBOTICS home"
    >
      {lockup}
    </Link>
  );
}

/** Small inline BUCKi mark for body copy (lowercase cyan i). */
export function BuckiMark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-semibold ${className}`}>
      BUCK<span className="text-cyan lowercase">i</span>
    </span>
  );
}
