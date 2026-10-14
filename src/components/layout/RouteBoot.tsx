"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BootScreen } from "@/components/ui/BootScreen";

/**
 * Navigation overlay — makes the boot sequence visible on client-side route
 * changes.
 *
 * `loading.tsx` alone cannot do this: Next.js prefetches static routes, so a
 * click usually resolves before React mounts the fallback and the frame swaps
 * in with no loading state at all. This component listens for internal link
 * clicks, raises the same BootScreen immediately, and lowers it once the new
 * pathname has rendered — after a minimum on-screen time, so the sequence is
 * readable even when the destination was already in cache.
 *
 * Only same-origin, same-tab navigations qualify. Modifier-key clicks,
 * downloads, external links, `mailto:`/`tel:` and in-page anchors are all
 * ignored, and a hard ceiling guarantees the overlay can never get stuck if a
 * navigation is interrupted or lands on the current path.
 */

/** Minimum time the sequence stays up, so a cached route still reads as one. */
const MIN_MS = 620;
/** Absolute ceiling — an interrupted navigation must never trap the overlay. */
const MAX_MS = 2600;

function isNavigatingLink(anchor: HTMLAnchorElement, event: MouseEvent): boolean {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  if (anchor.getAttribute("rel")?.includes("external")) return false;

  const href = anchor.getAttribute("href") ?? "";
  if (!href.startsWith("/")) return false; // external, mailto:, tel:, #
  if (href.startsWith("/#")) return false; // same-page anchor

  const target = new URL(href, window.location.origin);
  return target.pathname !== window.location.pathname;
}

export function RouteBoot() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const raisedAt = useRef(0);
  const pending = useRef(false);
  const closeTimer = useRef<number | null>(null);

  const clearClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Route resolved → lower the overlay, but only once the minimum read time
  // has passed so a prefetched page still shows the sequence.
  useEffect(() => {
    if (!pending.current) return;
    const wait = Math.max(0, MIN_MS - (Date.now() - raisedAt.current));
    clearClose();
    closeTimer.current = window.setTimeout(() => {
      pending.current = false;
      setVisible(false);
    }, wait);
    return clearClose;
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isNavigatingLink(anchor, event)) return;
      if (pending.current) return; // a second click while already showing

      clearClose();
      pending.current = true;
      raisedAt.current = Date.now();
      setVisible(true);

      // Ceiling: navigation may be interrupted, or resolve without a pathname
      // change. Either way the overlay must come down on its own.
      closeTimer.current = window.setTimeout(() => {
        pending.current = false;
        setVisible(false);
      }, MAX_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearClose();
    };
  }, []);

  if (!visible) return null;
  return <BootScreen />;
}
