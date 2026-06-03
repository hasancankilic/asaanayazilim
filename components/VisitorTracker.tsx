"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * VisitorTracker — silently sends visitor info to /api/track-visitor
 * on every page load. Include once in the locale layout.
 */
export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Collect client-side info
    const screenRes = `${window.screen.width}x${window.screen.height}`;

    fetch("/api/track-visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        screenRes,
      }),
      keepalive: true, // won't block page unload
    }).catch(() => {
      // Silently fail — never break the user experience
    });
  }, [pathname]);

  return null; // renders nothing
}
