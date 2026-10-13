"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { NAV_GROUPS, PRIMARY_CTA, type NavGroup } from "@/data/navigation";
import { site } from "@/data/site";

/**
 * Sticky header — Master Spec, Chapter 05:
 * logo left, primary menus right, persistent "Discuss a Project" CTA,
 * mega menus on desktop, accordion drawer on mobile.
 */
export function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // Close menus when the route changes (state adjustment during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  // Close on Escape.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close when clicking outside the header.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50"
      onMouseLeave={() => setOpenGroup(null)}
    >
      {/* Concept notice strip */}
      <div className="bg-midnight text-[0.78rem] text-[#9fb2c7]">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-5 py-2 sm:px-8">
          <p className="truncate">
            <span className="font-mono uppercase tracking-[0.14em] text-cyan">Concept-stage portfolio</span>
            <span className="hidden sm:inline">
              {" "}— robot designs are proposed concepts.{" "}
              <Link href="/product-status" className="underline underline-offset-2 hover:text-white">
                Status definitions
              </Link>
            </span>
          </p>
          <div className="hidden items-center gap-4 md:flex">
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
            <a href={`tel:${site.phoneHref}`} className="hover:text-white">
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between gap-6 px-5 sm:px-8">
          <Wordmark variant="dark" className="h-6 sm:h-7" />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_GROUPS.map((group) => (
              <DesktopNavItem
                key={group.label}
                group={group}
                open={openGroup === group.label}
                onToggle={() => setOpenGroup((g) => (g === group.label ? null : group.label))}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={PRIMARY_CTA.href}
              className="hidden rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-deep sm:inline-flex"
            >
              {PRIMARY_CTA.label}
            </Link>

            {/* Mobile trigger */}
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-5 bg-midnight transition-transform ${
                    mobileOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-midnight transition-opacity ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 bg-midnight transition-transform ${
                    mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mega menu panel */}
        {openGroup ? <MegaPanel group={NAV_GROUPS.find((g) => g.label === openGroup)!} /> : null}
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        hidden={!mobileOpen}
        className="max-h-[calc(100dvh-100px)] overflow-y-auto border-b border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-[1360px] px-5 py-4 sm:px-8">
          {NAV_GROUPS.map((group) => (
            <details key={group.label} className="border-b border-line">
              <summary className="flex items-center justify-between py-4">
                <span className="font-display text-lg font-semibold">{group.label}</span>
                <span aria-hidden="true" className="text-blue">
                  ▾
                </span>
              </summary>
              <div className="pb-4">
                <Link
                  href={group.href}
                  className="block rounded-lg bg-arctic px-3 py-2 text-sm font-semibold text-midnight"
                >
                  {group.label} overview
                </Link>
                {group.columns?.map((col) => (
                  <div key={col.heading} className="mt-3">
                    <p className="spec-label px-3">{col.heading}</p>
                    <ul className="mt-1">
                      {col.links.map((l) => (
                        <li key={l.href + l.label}>
                          <Link href={l.href} className="block px-3 py-2 text-[0.95rem] text-graphite hover:text-blue">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {group.links?.map((l) => (
                  <Link
                    key={l.href + l.label}
                    href={l.href}
                    className="block px-3 py-2 text-[0.95rem] text-graphite hover:text-blue"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}

          <Link
            href="/contact"
            className="mt-5 mb-2 block rounded-full bg-blue px-5 py-3 text-center font-semibold text-white"
          >
            Discuss a Robotics Project
          </Link>
          <div className="pb-6 text-sm text-muted">
            <a href={`mailto:${site.email}`} className="block py-1 hover:text-blue">
              {site.email}
            </a>
            <a href={`tel:${site.phoneHref}`} className="block py-1 hover:text-blue">
              {site.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function DesktopNavItem({
  group,
  open,
  onToggle,
}: {
  group: NavGroup;
  open: boolean;
  onToggle: () => void;
}) {
  const hasPanel = Boolean(group.columns || (group.links && group.links.length > 0));
  return (
    <div className="relative" onMouseEnter={hasPanel ? onToggle : undefined}>
      <div className="flex items-center">
        <Link
          href={group.href}
          className="rounded-l-full px-3 py-2 text-[0.92rem] font-medium text-graphite hover:text-blue"
        >
          {group.label}
        </Link>
        {hasPanel ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-haspopup="true"
            aria-label={`${open ? "Hide" : "Show"} ${group.label} menu`}
            className="rounded-r-full px-2 py-2 text-blue"
          >
            <span aria-hidden="true" className={`inline-block text-xs transition-transform ${open ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}

function MegaPanel({ group }: { group: NavGroup }) {
  if (group.columns) {
    return (
      <div className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-[0_24px_40px_-24px_rgba(9,19,33,0.4)] lg:block">
        <div className="mx-auto grid max-w-[1360px] gap-8 px-8 py-8">
          {group.columns.map((col) => (
            <div key={col.heading}>
              <p className="spec-label">{col.heading}</p>
              <ul className="mt-3 grid grid-cols-3 gap-x-8 gap-y-1">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="block rounded-md px-2 py-1.5 text-[0.95rem] text-graphite hover:bg-arctic hover:text-blue"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-[0_24px_40px_-24px_rgba(9,19,33,0.4)] lg:block">
      <div className="mx-auto max-w-[1360px] px-8 py-5">
        <ul className="flex flex-wrap gap-2">
          {group.links?.map((l) => (
            <li key={l.href + l.label}>
              <Link
                href={l.href}
                className="block rounded-full border border-line px-4 py-2 text-sm text-graphite hover:border-blue hover:text-blue"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
