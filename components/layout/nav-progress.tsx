"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin top progress bar that animates whenever the URL pathname changes.
 * Mounted in the root layout so navigation feels instant even when the
 * destination page renders synchronously (no Suspense boundary fires).
 */
export function NavProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const t = setTimeout(() => setActive(false), 600);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden"
    >
      <div
        className={`h-full bg-brand transition-[transform,opacity] duration-500 ease-out ${
          active
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
