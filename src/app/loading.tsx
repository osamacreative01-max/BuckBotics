import { BootScreen } from "@/components/ui/BootScreen";

/**
 * Root route fallback — the Suspense boundary for the whole app, rendered
 * while the next segment streams in. Covers the cases a click interceptor
 * cannot: a direct URL load, a dynamic route such as /contact, and any
 * navigation whose destination was not prefetched.
 *
 * Client-side navigation to an already-prefetched static page resolves
 * before React ever mounts this, which is why app/navigation is covered by
 * the overlay in components/layout/RouteBoot.tsx as well.
 */
export default function Loading() {
  return <BootScreen />;
}
