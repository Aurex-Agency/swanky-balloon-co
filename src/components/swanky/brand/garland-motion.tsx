"use client";

import { useRef } from "react";
import { confetti, popWord } from "@/lib/swanky/confetti";
import { gsap, useGSAP } from "@/lib/swanky/gsap";
import { ambient } from "@/lib/swanky/ambient";
import {
  PALETTES,
  pickWeighted,
  shineFor,
  type Weighted,
} from "@/lib/swanky/tokens";
import { useReducedMotion } from "../motion/motion-provider";
import { usePageEnter } from "../motion/transition-provider";

/** Dispatch with a weighted color mix (see mixFrom) to recolor interactive garlands. */
export const PALETTE_EVENT = "swanky:palette";
export const POP_EVENT = "swanky:pop";

type Props = {
  svg: string;
  interactive: boolean;
  className?: string;
  id?: string;
};

export function GarlandMotion({ svg, interactive, className, id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inflateRef = useRef<() => void>(() => {});

  useGSAP(
    (_, contextSafe) => {
      const root = ref.current;
      if (!root) return;
      const balls = Array.from(root.querySelectorAll<SVGGElement>(".b")).sort(
        (a, b) => +a.dataset.u! - +b.dataset.u!,
      );
      const inner = balls.map((b) => b.querySelector<SVGGElement>(".bi")!);
      const sparkles = Array.from(
        root.querySelectorAll<SVGPathElement>(".spk"),
      );

      // Recolor: fills ripple along the garland, start to end.
      const recolor = (e: Event) => {
        const pal = (e as CustomEvent<Weighted>).detail ?? PALETTES.mix;
        balls.forEach((b, i) => {
          const fill = pickWeighted(pal, +b.dataset.k!);
          const circle = b.querySelector("circle")!,
            shine = b.querySelector(".sh")!;
          if (reduced) {
            circle.setAttribute("fill", fill);
            shine.setAttribute("fill", shineFor(fill));
            return;
          }
          gsap.to(circle, { attr: { fill }, duration: 0.35, delay: i * 0.004 });
          gsap.to(shine, {
            attr: { fill: shineFor(fill) },
            duration: 0.35,
            delay: i * 0.004,
          });
          gsap.fromTo(
            inner[i],
            { scale: 0.86 },
            { scale: 1, duration: 0.7, ease: "float", delay: i * 0.004 },
          );
        });
      };
      if (interactive) window.addEventListener(PALETTE_EVENT, recolor);
      const cleanups: (() => void)[] = [
        () => window.removeEventListener(PALETTE_EVENT, recolor),
      ];

      if (reduced) {
        root.classList.add("intro-ready");
        inflateRef.current = () => {};
        return () => cleanups.forEach((c) => c());
      }

      gsap.set([...inner, ...sparkles], { transformOrigin: "50% 50%" });
      gsap.set(inner, { scale: 0 });
      gsap.set(sparkles, { scale: 0 });
      root.classList.add("intro-ready");
      inflateRef.current = contextSafe!(() => {
        gsap
          .timeline({ delay: 0.15 })
          .to(inner, { scale: 1, duration: 0.7, ease: "float", stagger: 0.006 })
          .to(
            sparkles,
            {
              scale: 1,
              rotate: 0,
              duration: 0.9,
              ease: "float",
              stagger: 0.12,
            },
            1.05,
          );
        inner.forEach((b) =>
          ambient(
            gsap.to(b, {
              y: gsap.utils.random(-7, -3),
              duration: gsap.utils.random(2, 3.6),
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 1.6 + Math.random() * 2,
            }),
          ),
        );
        sparkles.forEach((s, i) =>
          ambient(
            gsap.to(s, {
              scale: 0.7,
              rotate: 20,
              duration: 1.4 + i * 0.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 2.4,
            }),
          ),
        );
      });

      if (!interactive) return () => cleanups.forEach((c) => c());

      // Squish on hover, pop on click or tap. Popped balloons grow back.
      let popped = 0;
      const squish = (b: SVGGElement) =>
        gsap.to(b, {
          keyframes: [
            { scaleX: 1.18, scaleY: 0.86, duration: 0.12 },
            { scaleX: 0.92, scaleY: 1.1, duration: 0.14 },
            { scaleX: 1, scaleY: 1, duration: 0.6, ease: "float" },
          ],
        });
      balls.forEach((b, i) => {
        const bi = inner[i];
        const enter = () => {
          if (!b.dataset.popped) squish(bi);
        };
        const click = (e: MouseEvent) => {
          if (b.dataset.popped) return;
          b.dataset.popped = "1";
          confetti(
            e.clientX,
            e.clientY,
            b.querySelector("circle")!.getAttribute("fill") ?? undefined,
          );
          popWord(e.clientX, e.clientY);
          gsap
            .timeline({
              onComplete: () => {
                delete b.dataset.popped;
              },
            })
            .to(bi, { scale: 1.25, duration: 0.08, ease: "power2.out" })
            .to(bi, {
              scale: 0,
              autoAlpha: 0,
              duration: 0.12,
              ease: "power2.in",
            })
            .to(
              bi,
              { scale: 1, autoAlpha: 1, duration: 0.9, ease: "float" },
              "+=2.2",
            );
          popped++;
          window.dispatchEvent(new CustomEvent(POP_EVENT, { detail: popped }));
        };
        b.addEventListener("mouseenter", enter);
        b.addEventListener("click", click);
        cleanups.push(() => {
          b.removeEventListener("mouseenter", enter);
          b.removeEventListener("click", click);
        });
      });

      // Balloons drift away from the cursor and spring back.
      if (window.matchMedia("(pointer: fine)").matches) {
        const svgEl = root.querySelector("svg")!;
        const host = root.parentElement ?? root;
        const movers = balls.map((b) => ({
          cx: +b.dataset.x!,
          cy: +b.dataset.y!,
          moved: false,
          qx: gsap.quickTo(b, "x", { duration: 0.8, ease: "power3" }),
          qy: gsap.quickTo(b, "y", { duration: 0.8, ease: "power3" }),
        }));
        const pt = svgEl.createSVGPoint();
        let frame = 0;
        let last: [number, number] | null = null;
        const push = () => {
          frame = 0;
          const m = svgEl.getScreenCTM();
          if (!m || !last) return;
          pt.x = last[0];
          pt.y = last[1];
          const p = pt.matrixTransform(m.inverse());
          for (const o of movers) {
            const dx = o.cx - p.x,
              dy = o.cy - p.y,
              d = Math.hypot(dx, dy);
            if (d < 170 && d > 0.1) {
              const f = Math.pow(1 - d / 170, 2) * 70;
              o.qx((dx / d) * f);
              o.qy((dy / d) * f);
              o.moved = true;
            } else if (o.moved) {
              o.qx(0);
              o.qy(0);
              o.moved = false;
            }
          }
        };
        const move = (e: PointerEvent) => {
          last = [e.clientX, e.clientY];
          if (!frame) frame = requestAnimationFrame(push);
        };
        const leave = () => {
          last = null;
          movers.forEach((o) => {
            o.qx(0);
            o.qy(0);
            o.moved = false;
          });
        };
        host.addEventListener("pointermove", move);
        host.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          host.removeEventListener("pointermove", move);
          host.removeEventListener("pointerleave", leave);
          cancelAnimationFrame(frame);
        });
      }
      return () => cleanups.forEach((c) => c());
    },
    { scope: ref, dependencies: [svg, interactive, reduced] },
  );

  usePageEnter(() => inflateRef.current());

  return (
    <div
      ref={ref}
      id={id}
      className={`garland ${className ?? ""}`}
      data-inflate=""
      data-interactive={interactive ? "" : undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
