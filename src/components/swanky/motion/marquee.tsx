"use client";

// Slush's scroll-direction marquee: each row loops forever, reverses when you scroll the
// other way, and drifts ±8vw as it crosses the viewport. Rows are decorative; the band
// carries a visually hidden sentence for screen readers.
import { useRef } from "react";
import { ambient } from "@/lib/swanky/ambient";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/swanky/gsap";
import { useReducedMotion } from "./motion-provider";

type Row = { text: string; dir: 1 | -1; speed?: number };

export function Marquee({ rows }: { rows: Row[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reduced) return;
      root.querySelectorAll<HTMLElement>(".marquee").forEach((el) => {
        const track = el.querySelector<HTMLElement>(".marquee-track")!;
        const sets = el.querySelectorAll(".marquee-set");
        const dir = Number(el.dataset.dir);
        const loop = ambient(
          gsap
            .to(sets, {
              xPercent: -100,
              repeat: -1,
              duration: Number(el.dataset.speed),
              ease: "none",
            })
            .totalProgress(0.5),
        );
        gsap.set(sets, { xPercent: dir === 1 ? 100 : -100 });
        loop.timeScale(dir);
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (s) => loop.timeScale(s.direction === 1 ? -dir : dir),
        });
        gsap.fromTo(
          track,
          { x: `${dir === -1 ? 8 : -8}vw` },
          {
            x: `${dir === -1 ? -8 : 8}vw`,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0,
            },
          },
        );
      });
    },
    { scope: ref, dependencies: [reduced] },
  );
  return (
    <div ref={ref} className="marquee-rows">
      {rows.map((row) => (
        <div
          className="marquee"
          data-dir={row.dir}
          data-speed={row.speed ?? 28}
          key={row.text}
          aria-hidden="true"
        >
          <div className="marquee-track">
            {[0, 1, 2].map((set) => (
              <div className="marquee-set" key={set}>
                {[0, 1, 2, 3].map((i) => (
                  <span className="mq-pill" key={i}>
                    {row.text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
