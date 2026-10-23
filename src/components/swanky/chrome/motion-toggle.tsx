"use client";

import { useEffect, useState } from "react";
import {
  isAmbientPaused,
  restoreAmbientPaused,
  setAmbientPaused,
} from "@/lib/swanky/ambient";

/** Pauses every looping animation on the site (WCAG 2.2.2 pause, stop, hide). */
export function MotionToggle({ className }: { className?: string }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const sync = (e: Event) => setPaused((e as CustomEvent<boolean>).detail);
    window.addEventListener("swanky:motion", sync);
    restoreAmbientPaused();
    return () => window.removeEventListener("swanky:motion", sync);
  }, []);
  return (
    <button
      type="button"
      className={`motion-toggle ${className ?? ""}`}
      aria-pressed={paused}
      onClick={() => setAmbientPaused(!isAmbientPaused())}
    >
      {paused ? "Play motion" : "Pause motion"}
    </button>
  );
}
