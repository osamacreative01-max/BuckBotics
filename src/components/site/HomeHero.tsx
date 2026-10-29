"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  ButtonLink,
  ResearchConceptBadge,
  StatusPill,
} from "@/components/ui/Primitives";
import { Notice } from "@/components/ui/Content";
import SplitText from "@/components/bits/SplitText";
import DecryptedText from "@/components/bits/DecryptedText";
import Particles from "@/components/bits/Particles";
import { homeHero, homeHeroSlides } from "@/data/site";
import {
  CARE_SENTINEL_PATH,
  careHomeSlides,
} from "@/data/careSentinel";

/**
 * Homepage hero, a manual-first slideshow.
 *
 * Slide 1 is the existing approved BUCKBOTICS brand slide, unchanged.
 * Slides 2 and 3 are the CARE SENTINEL research concept, using only the
 * exact public copy from Part A of the CARE SENTINEL master file.
 *
 * Controls: visible arrows, position dots, a pause/play control and
 * left/right keyboard support. Auto-advance pauses on hover or focus and
 * is disabled entirely when the visitor prefers reduced motion.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", callback);
      return () => query.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  /* One existing brand slide plus the two CARE SENTINEL concept slides. */
  const slideCount = 1 + careHomeSlides.length;
  const autoPaused = paused || reducedMotion;

  const go = (delta: number) =>
    setActive((current) => (current + delta + slideCount) % slideCount);

  useEffect(() => {
    if (autoPaused || interacting) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slideCount),
      9000,
    );
    return () => window.clearInterval(timer);
  }, [autoPaused, interacting, active, slideCount]);

  const slideNames = [
    "BUCKBOTICS brand",
    ...careHomeSlides.map((slide) => slide.headline),
  ];

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="BUCKBOTICS homepage highlights"
      className="relative overflow-hidden border-b border-line bg-white"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setInteracting(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
      }}
    >
      {/* Particle constellation backdrop, same system as the BUCKBOTICS band. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Particles
          particleCount={90}
          particleColors={["#091321", "#0a5590", "#0e6eb8"]}
          particleBaseSize={135}
          speed={0.12}
          glow={0.85}
          twinkle={0.3}
          connections
          connectionDistance={150}
          lightMode
          className="opacity-80"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[min(93vw,1800px)] px-5 pt-12 pb-8 sm:px-8 lg:pt-20 lg:pb-10">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Copy stack */}
          <div className="lg:col-span-5">
            <div className="grid">
              {/* 01, existing brand slide */}
              <div
                className={`col-start-1 row-start-1 transition-opacity duration-500 ${
                  active === 0 ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={active !== 0}
                inert={active !== 0}
              >
                <p className="eyebrow">
                  <DecryptedText
                    text={homeHero.eyebrow}
                    animateOn="view"
                    sequential
                    speed={32}
                  />
                </p>
                <SplitText
                  tag="h1"
                  text={homeHero.headline}
                  className="display-xl mt-4 pb-2"
                  splitType="words"
                  delay={80}
                  duration={0.9}
                  textAlign="left"
                />
                <p className="lede mt-5 max-w-xl">{homeHero.subheadline}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/contact?type=project" size="lg">
                    {homeHero.primaryCta}
                  </ButtonLink>
                  <ButtonLink href="/robots" tone="secondary" size="lg">
                    {homeHero.secondaryCta}
                  </ButtonLink>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <StatusPill status="concept" />
                  <p className="text-sm text-muted">
                    All nine families are concept-stage,{" "}
                    <Link href="/product-status" className="link-quiet">
                      see what that means
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* 02 and 03, CARE SENTINEL research concept */}
              {careHomeSlides.map((slide, index) => {
                const slideIndex = index + 1;
                return (
                  <div
                    key={slide.id}
                    className={`col-start-1 row-start-1 transition-opacity duration-500 ${
                      active === slideIndex
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={active !== slideIndex}
                    inert={active !== slideIndex}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="eyebrow max-w-xl">{slide.label}</p>
                      {/* The Part A label already names the research concept on
                          slide 2, so only show the pill where it adds meaning. */}
                      {slide.label.includes("RESEARCH CONCEPT") ? null : (
                        <ResearchConceptBadge size="sm" />
                      )}
                    </div>

                    <h2 className="display-xl mt-4 pb-2">{slide.headline}</h2>
                    <p className="lede mt-5 max-w-xl">{slide.body}</p>

                    <div className="mt-8">
                      <ButtonLink href={CARE_SENTINEL_PATH} size="lg">
                        {slide.button}
                      </ButtonLink>
                    </div>

                    <div className="mt-7 max-w-xl">
                      <Notice tone="concept">{slide.status}</Notice>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image stack */}
          <div className="lg:col-span-7">
            <figure
              className={`relative overflow-hidden rounded-2xl border border-line bg-white ${
                active === 0 ? "aspect-[16/10]" : "aspect-[4/3] lg:aspect-[16/10]"
              }`}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  active === 0 ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={active !== 0}
                inert={active !== 0}
              >
                <ImageSlider
                  images={homeHeroSlides}
                  label="Hero"
                  className="h-full w-full"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                />
              </div>

              {careHomeSlides.map((slide, index) => {
                const slideIndex = index + 1;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      active === slideIndex
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={active !== slideIndex}
                    inert={active !== slideIndex}
                  >
                    <SmartImage
                      src={slide.image.src}
                      mobileSrc={slide.image.mobileSrc}
                      alt={slide.image.alt}
                      fit="cover"
                      className="h-full w-full bg-white!"
                      imgClassName="object-center"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute left-3 top-3 z-10">
                      <ResearchConceptBadge size="sm" surface="overlay" />
                    </div>
                  </div>
                );
              })}
            </figure>
          </div>
        </div>

        {/* Slideshow controls */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-[0.7rem] tracking-[0.16em] text-muted">
              {String(active + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5" aria-label="Choose a slide">
              {Array.from({ length: slideCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show slide ${index + 1}: ${slideNames[index]}`}
                  aria-current={index === active ? "true" : undefined}
                  className="group flex h-6 items-center justify-center px-2"
                >
                  <span
                    aria-hidden="true"
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      index === active
                        ? "w-8 bg-blue"
                        : "w-2 bg-line group-hover:bg-blue/50"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">
              Slide {active + 1} of {slideCount}: {slideNames[active]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="btn-outline flex h-10 w-10 items-center justify-center text-xl leading-none"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="btn-outline flex h-10 w-10 items-center justify-center text-xl leading-none"
            >
              <span aria-hidden="true">›</span>
            </button>
            <button
              type="button"
              onClick={() => setPaused((current) => !current)}
              className="btn-outline ml-1 inline-flex h-10 items-center gap-2 px-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              aria-pressed={autoPaused}
              disabled={reducedMotion}
              title={
                reducedMotion
                  ? "Auto-advance is off because your device prefers reduced motion."
                  : undefined
              }
            >
              <span aria-hidden="true" className="text-[0.7rem]">
                {autoPaused ? "▶" : "❚❚"}
              </span>
              {autoPaused ? "Play" : "Pause"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
