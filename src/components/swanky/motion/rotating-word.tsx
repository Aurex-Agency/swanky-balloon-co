"use client";

// "A little more celebration for your birthday." The last word changes every 2.6s: the
// old word lifts out, the new one slants in by character. Screen readers get the full
// sentence once (see the sr-only text beside it), so this span is aria-hidden.
import { useRef } from "react";
import { isAmbientHalted } from "@/lib/swanky/ambient";
import { gsap, SplitText, useGSAP } from "@/lib/swanky/gsap";
import { useReducedMotion } from "./motion-provider";

export function RotatingWord({ words }: { words: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || reduced) return;
      let i = 0;
      const next = contextSafe!(() => {
        if (document.hidden || isAmbientHalted()) return;
        i = (i + 1) % words.length;
        gsap.to(el, {
          yPercent: -60,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            el.textContent = words[i];
            gsap.set(el, { yPercent: 0, autoAlpha: 1 });
            const split = SplitText.create(el, { type: "chars" });
            gsap.from(split.chars, {
              x: "-0.25em",
              autoAlpha: 0,
              duration: 0.65,
              ease: "float",
              stagger: { each: 0.025, from: "end" },
              onComplete: () => split.revert(),
            });
          },
        });
      });
      const timer = window.setInterval(next, 2600);
      return () => window.clearInterval(timer);
    },
    { dependencies: [reduced] },
  );
  return (
    <em ref={ref} className="rotator" aria-hidden="true">
      {words[0]}
    </em>
  );
}
