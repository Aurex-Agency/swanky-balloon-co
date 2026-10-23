"use client";

// The wordmark stage: the word sits twice (behind and in front of the garland) so it reads
// as sticker letters on top. Letters hop on hover; hero stickers float and can be thrown.
import { useRef } from "react";
import { Draggable, gsap, useGSAP } from "@/lib/swanky/gsap";
import { useReducedMotion } from "../motion/motion-provider";

type Props = {
  word: string;
  garland: React.ReactNode;
  stickers?: React.ReactNode;
  className?: string;
};

export function HeroStage({ word, garland, stickers, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const letters = [...word];

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reduced) return;
      const back = root.querySelectorAll<HTMLElement>(".wordmark-back .ch");
      const front = root.querySelectorAll<HTMLElement>(".wordmark-front .ch");
      const hop = (i: number) =>
        gsap
          .timeline()
          .to([front[i], back[i]], {
            y: "-0.14em",
            rotate: i % 2 ? 6 : -6,
            duration: 0.22,
            ease: "power2.out",
          })
          .to([front[i], back[i]], {
            y: 0,
            rotate: 0,
            duration: 0.9,
            ease: "float",
          });
      const offs = Array.from(front).map((ch, i) => {
        const fn = () => hop(i);
        ch.addEventListener("mouseenter", fn);
        return () => ch.removeEventListener("mouseenter", fn);
      });
      root
        .querySelectorAll("[data-float]")
        .forEach((el, i) =>
          gsap.to(el, {
            y: "+=7",
            rotate: "+=3",
            duration: 3 + (i % 4) * 0.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.37,
          }),
        );
      const drags = Draggable.create(root.querySelectorAll("[data-drag]"), {
        type: "x,y",
        bounds: root.closest("section") ?? undefined,
        inertia: true,
        edgeResistance: 0.8,
        onPress() {
          gsap.to(this.target, { scale: 1.12, duration: 0.2 });
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, duration: 0.8, ease: "float" });
        },
      });
      return () => {
        offs.forEach((off) => off());
        drags.forEach((d) => d.kill());
      };
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} className={`wordmark-stage ${className ?? ""}`}>
      <h1 className="wordmark wordmark-back" aria-label={word}>
        {letters.map((ch, i) => (
          <span className="ch" key={i} aria-hidden="true">
            {ch}
          </span>
        ))}
      </h1>
      {garland}
      <div className="wordmark wordmark-front" aria-hidden="true">
        {letters.map((ch, i) => (
          <span className="ch" key={i}>
            {ch}
          </span>
        ))}
      </div>
      {stickers}
    </div>
  );
}
