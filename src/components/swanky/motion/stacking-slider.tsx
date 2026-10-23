"use client";

// Slush's stacking slider: drag or throw with inertia; cards you pass shrink to 60% and
// tilt −10° into a pile. Previous/next buttons and arrow keys move one card at a time.
import { useRef, useState } from "react";
import { Draggable, gsap, useGSAP } from "@/lib/swanky/gsap";
import { useReducedMotion } from "./motion-provider";

type Props = { label: string; children: React.ReactNode[] };

export function StackingSlider({ label, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const api = useRef<{ go: (i: number) => void }>({ go: () => {} });

  useGSAP(
    () => {
      const wrap = ref.current;
      if (!wrap) return;
      const slider = wrap.querySelector<HTMLElement>(".stack-slider")!;
      const slides = Array.from(
        slider.querySelectorAll<HTMLElement>(".stack-slide"),
      );
      let step = 0,
        max = 0,
        m = 0,
        shown = 0;
      const measure = () => {
        step =
          slides[0].offsetWidth +
          (parseFloat(getComputedStyle(slides[0]).marginRight) || 0);
        max = step * (slides.length - 1);
      };
      const layout = (announce = true) => {
        gsap.set(slider, { x: -m });
        slides.forEach((s, i) => {
          const passed = Math.max(0, m - i * step);
          const k = Math.min(passed / step, 1);
          gsap.set(s, {
            x: passed,
            scale: 1 - 0.4 * k,
            rotation: -10 * k,
            transformOrigin: "center center",
            zIndex: i,
          });
        });
        const now = Math.round(m / step);
        if (announce && now !== shown) {
          shown = now;
          setIndex(now);
        }
      };
      measure();
      const clamp = (v: number) => gsap.utils.clamp(0, max, v);
      const drag = Draggable.create(slider, {
        type: "x",
        bounds: { minX: -max, maxX: 0 },
        inertia: !reduced,
        snap: (v: number) => -Math.round(clamp(-v) / step) * step,
        onDrag() {
          m = clamp(-this.x);
          layout();
        },
        onThrowUpdate() {
          m = clamp(-this.x);
          layout();
        },
        onThrowComplete() {
          m = clamp(-this.x);
          layout();
        },
      })[0];
      api.current.go = (i: number) => {
        const target = clamp(i * step);
        const state = { m };
        gsap.to(state, {
          m: target,
          duration: reduced ? 0 : 0.725,
          ease: "float",
          onUpdate: () => {
            m = state.m;
            layout();
          },
          onComplete: () => drag.update(),
        });
      };
      layout(false);
      const onResize = () => {
        measure();
        m = clamp(m);
        drag.applyBounds({ minX: -max, maxX: 0 });
        layout();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: ref, dependencies: [reduced] },
  );

  const count = children.length;
  return (
    <div className="stack">
      <div
        ref={ref}
        className="stack-wrap"
        tabIndex={0}
        role="group"
        aria-label={`${label}, card ${index + 1} of ${count}. Use the arrow keys to move.`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            api.current.go(Math.min(count - 1, index + 1));
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            api.current.go(Math.max(0, index - 1));
          }
        }}
      >
        <div className="stack-slider">
          {children.map((child, i) => (
            <div className="stack-slide" key={i}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="stack-controls">
        <button
          type="button"
          className="pill"
          onClick={() => api.current.go(Math.max(0, index - 1))}
          disabled={index === 0}
        >
          Previous
        </button>
        <span className="label" aria-live="polite">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          className="pill"
          onClick={() => api.current.go(Math.min(count - 1, index + 1))}
          disabled={index === count - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
