import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { StatusPill, ButtonLink, SectionHeading } from "@/components/ui/Primitives";
import { FamilyCard } from "@/components/ui/Cards";
import { ProcessSteps } from "@/components/ui/Content";
import { StatsStrip } from "@/components/ui/StatsStrip";
import SplitText from "@/components/bits/SplitText";
import DecryptedText from "@/components/bits/DecryptedText";
import Particles from "@/components/bits/Particles";
import AnimatedContent from "@/components/bits/AnimatedContent";
import SpotlightCard from "@/components/bits/SpotlightCard";
import { FAMILIES_HOME_ORDER } from "@/data/families";
import { industriesBySector } from "@/data/industries";
import { BUCKCORE_MODULES } from "@/data/buckcore";
import { homeHero, homeHeroSlides } from "@/data/site";

export default function HomePage() {
  const sectors = industriesBySector();

  return (
    <>
      {/* 01 — HERO ------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="mx-auto grid max-w-[min(93vw,1800px)] items-center gap-10 px-5 pt-14 pb-16 sm:px-8 lg:grid-cols-12 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-5">
            <Wordmark variant="dark" className="h-9" />
            <p className="eyebrow mt-7">
              <DecryptedText text={homeHero.eyebrow} animateOn="view" sequential speed={32} />
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
                All nine families are concept-stage —{" "}
                <Link href="/product-status" className="link-quiet">
                  see what that means
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <figure className="relative">
              <ImageSlider
                images={homeHeroSlides}
                label="Hero"
                className="aspect-[16/10] overflow-hidden rounded-2xl border border-line"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 01b — STATS BAND (animated counters, React Bits CountUp) -------- */}
      <section
        aria-label="BUCKBOTICS at a glance"
        className="border-b border-line bg-white"
      >
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 py-12 sm:px-8 lg:py-16">
          <StatsStrip />
        </div>
      </section>

      {/* 02 — COMPANY MISSION -------------------------------------- */}
      <section className="section surface-arctic border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <SectionHeading
            eyebrow="The company"
            title="Engineering first. Claims second."
            intro="BUCKBOTICS is a Buckingham venture examining how robotics and physical AI can relieve repetitive physical work in Canadian industries — and being explicit about everything that is still unproven."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                h: "Engineering discipline",
                p: "Every model on this site carries a lifecycle status and an evidence rule. Specifications stay unpublished until a dated test record exists — no estimated payload, runtime or accuracy figures.",
              },
              {
                h: "Targeted physical AI",
                p: "BUCKCORE is proposed as a shared framework for perception, task orchestration, skills and supervised operation — scoped to specific workflows rather than general intelligence claims.",
              },
              {
                h: "Canadian operating realities",
                p: "The target sectors reflect real operating challenges here: long facility routes, seasonal greenhouses, remote infrastructure, careful hygiene regimes and small-lot manufacturing.",
              },
            ].map((c) => (
              <article key={c.h} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-xl font-semibold">{c.h}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{c.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — ROBOT FAMILY GRID ------------------------------------ */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Nine families · 27 concept models"
              title="The robot families"
              intro="Equal-priority families with white studio concept imagery. FORGE leads our commercial work; every other family is published as a visible vision."
            />
            <ButtonLink href="/robots" tone="secondary">
              All robots
            </ButtonLink>
          </div>

          <AnimatedContent className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" distance={40} threshold={0.05}>
            {FAMILIES_HOME_ORDER.map((family, i) => (
              <FamilyCard key={family.slug} family={family} priority={i < 3} />
            ))}
          </AnimatedContent>
        </div>
      </section>

      {/* 04 — APPLICATIONS BY INDUSTRY ----------------------------- */}
      <section className="section surface-arctic border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="30 target industries"
              title="Applications by industry"
              intro="Six sector groups, one directory of thirty markets and five fully developed launch pages. Industries are framed as task and productivity challenges — not labour-shortage claims."
            />
            <ButtonLink href="/industries" tone="secondary">
              Open the directory
            </ButtonLink>
          </div>

          <AnimatedContent className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" distance={40} threshold={0.05}>
            {sectors.map(({ sector, items }) => (
              <Link
                key={sector.slug}
                href={`/industries#${sector.slug}`}
                className="group rounded-2xl border border-line bg-white p-6 transition-colors hover:border-blue"
              >
                <span className="font-mono text-xs tracking-[0.14em] text-blue">
                  {items.length} markets
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-blue">
                  {sector.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{sector.blurb}</p>
              </Link>
            ))}
          </AnimatedContent>

        </div>
      </section>

      {/* 05 — BUCKCORE --------------------------------------------- */}
      <section className="section surface-midnight relative overflow-hidden">
        {/* Particle constellation backdrop (React Bits Particles). */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Particles
            particleCount={70}
            particleColors={["#158de6", "#39c2f7", "#8fd4ff"]}
            particleBaseSize={110}
            speed={0.12}
            glow={0.6}
            twinkle={0.35}
            connections
            connectionDistance={140}
            className="opacity-70"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-cyan!">Technology</p>
              <h2 className="display-lg mt-3 text-white">
                One intelligence architecture. Multiple robotic systems.
              </h2>
              <p className="mt-5 leading-relaxed text-[#b7c6d8]">
                BUCKCORE is the proposed shared framework connecting sensing, planning, skills,
                supervised operation and fleet visibility across BUCKBOTICS solutions. It is
                concept-stage software — not a released platform.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/technology/buckcore" tone="light">
                  Explore BUCKCORE
                </ButtonLink>
                <ButtonLink
                  href="/responsible-robotics"
                  className="border border-white/25 text-white hover:border-white"
                  tone="ghost"
                >
                  Responsible integration
                </ButtonLink>
              </div>
            </div>

            <AnimatedContent className="lg:col-span-7" distance={40} threshold={0.05}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {BUCKCORE_MODULES.slice(0, 8).map((m) => (
                  <li key={m.name}>
                    <SpotlightCard
                      className="h-full"
                      spotlightColor="#158de6"
                      intensity={0.35}
                      spotlightSize={220}
                      style={{
                        borderRadius: "0.75rem",
                        padding: "1rem",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[0.72rem] tracking-[0.1em] text-cyan">
                          {m.name}
                        </span>
                        <span className="rounded-full border border-white/20 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-[#9fb2c7]">
                          {m.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[#b7c6d8]">{m.purpose}</p>
                    </SpotlightCard>
                  </li>
                ))}
              </ul>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* 07 — HOW ENGAGEMENTS WORK --------------------------------- */}
      <section className="section border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Solutions"
            title="How engagements work"
            intro="A staged path from first conversation to measured evaluation — no delivery promises before assessment."
          />
          <div className="mt-10">
            <ProcessSteps
              steps={[
                { title: "Discovery", text: "The physical task, locations, frequency per shift and operating constraints." },
                { title: "Technical assessment", text: "Site survey, network, hazards, access and staff roles." },
                { title: "Supplier selection", text: "Matching documented tasks to candidate platforms and tooling." },
                { title: "Controlled pilot", text: "A limited, supervised trial with human override at all times." },
                { title: "Measured evaluation", text: "Baseline vs pilot results against pre-agreed stop criteria." },
              ]}
            />
          </div>
          <div className="mt-8">
            <ButtonLink href="/solutions" tone="secondary">
              See the full solutions path
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 08 — RESPONSIBLE ROBOTICS --------------------------------- */}
      <section className="section surface-arctic border-b border-line">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Responsible robotics"
            title="Safety, identity and consent are design inputs"
            intro="Five standing commitments that shape every concept we publish."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { h: "Identity", p: "Robots disclose that they are machines; PERSONA uses only original synthetic adult faces." },
              { h: "Consent", p: "Meaningful consent, safe defaults and deletion workflows for speech and interaction data." },
              { h: "Clinical limits", p: "CARE and PERSONA CARE are nonclinical concepts — never presented as medical devices." },
              { h: "Child safety", p: "No childlike synthetic designs and no unattended childcare claims. Adult supervision only." },
              { h: "Physical safety", p: "Independent safety-rated controls; language models never bypass them." },
            ].map((item) => (
              <li key={item.h} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="font-display text-base font-semibold">{item.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.p}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/responsible-robotics" tone="secondary">
              Read the responsible robotics policy
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 09 — PILOT ENQUIRY ---------------------------------------- */}
      <section className="section bg-midnight">
        <div className="mx-auto max-w-[min(93vw,1800px)] px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-cyan!">Pilot enquiry</p>
              <h2 className="display-lg mt-3 text-white">
                Bring us one repeatable physical task.
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-[#b7c6d8]">
                FORGE is our leading commercial focus and the pilot programme starts with a
                feasibility conversation. We do not hold stock and we do not promise returns — we
                assess, pilot and measure.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/contact?type=project" size="lg">
                  Discuss a Robotics Project
                </ButtonLink>
                <ButtonLink
                  href="/solutions/pilot-programme"
                  tone="ghost"
                  className="text-white hover:text-cyan"
                  size="lg"
                >
                  Pilot programme details
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="spec-label text-cyan!">Before you enquire</p>
                <ul className="mt-3 space-y-2 text-sm text-[#b7c6d8]">
                  {[
                    "What moves or what is inspected?",
                    "Between which locations?",
                    "How many times per shift?",
                    "What are the floor, network and hygiene conditions?",
                    "Who supervises and who can stop the system?",
                  ].map((q) => (
                    <li key={q} className="flex gap-2">
                      <span aria-hidden="true" className="text-cyan">
                        ›
                      </span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept notice removed per owner direction (was Chapter 19 disclaimer) */}
    </>
  );
}
