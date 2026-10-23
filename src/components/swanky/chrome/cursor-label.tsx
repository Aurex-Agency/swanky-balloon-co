"use client";

// Slush's cursor follower: a small olive pill that trails the pointer and names what a
// [data-cursor] element does ("View", "Drag", "Pop!"). Fine pointers only.
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/swanky/gsap";
import { useReducedMotion } from "../motion/motion-provider";

export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced || !window.matchMedia("(pointer: fine)").matches)
        return;
      const qx = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" });
      const qy = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" });
      const move = (e: PointerEvent) => {
        qx(e.clientX + 14);
        qy(e.clientY + 18);
        const target = (e.target as Element | null)?.closest<HTMLElement>(
          "[data-cursor]",
        );
        if (target) {
          el.textContent = target.dataset.cursor ?? "";
          el.classList.add("on");
        } else {
          el.classList.remove("on");
        }
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    },
    { dependencies: [reduced] },
  );
  return <div ref={ref} className="cursor-label" aria-hidden="true" />;
}
