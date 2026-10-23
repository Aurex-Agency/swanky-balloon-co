"use client";

// Slush's page load (runPageLoad): hero characters slide in last-first, then [data-load]
// blocks rise in sequence and [data-hero-sticker] stickers spin in from small.
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/swanky/gsap";
import { useReducedMotion } from "./motion-provider";
import { usePageEnter, usePageTransition } from "./transition-provider";

export function PageIntro({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const play = useRef<() => void>(() => {});
  const { isTransitioning } = usePageTransition();

  useGSAP(
    (_, contextSafe) => {
      const root = ref.current;
      if (!root) return;
      const chars = root.querySelectorAll(".wordmark .ch");
      const blocks = root.querySelectorAll("[data-load]");
      const stickers = root.querySelectorAll("[data-hero-sticker]");
      // A page arriving by transition is shown finished inside the swinging card, so the
      // carousel carries the entrance and nothing pops in afterwards.
      if (reduced || isTransitioning()) {
        root.classList.add("intro-ready");
        return;
      }
      gsap.set(chars, { x: "-0.25em", autoAlpha: 0 });
      gsap.set(blocks, { y: "3em", autoAlpha: 0 });
      gsap.set(stickers, { scale: 0.2, rotate: -90, autoAlpha: 0 });
      root.classList.add("intro-ready");
      play.current = contextSafe!(() => {
        gsap
          .timeline({ defaults: { ease: "float" }, delay: 0.1 })
          .to(
            chars,
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.65,
              stagger: { each: 0.05, from: "end" },
            },
            0,
          )
          .to(blocks, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1 }, 0.5)
          .to(
            stickers,
            {
              scale: 1,
              rotate: 0,
              autoAlpha: 1,
              duration: 1,
              stagger: { each: 0.1, from: "random" },
            },
            0.5,
          );
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  usePageEnter(() => play.current());

  return (
    <div ref={ref} className={className} data-intro="">
      {children}
    </div>
  );
}
