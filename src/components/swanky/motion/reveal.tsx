"use client";

// Slush's scroll reveals. Each fires once when its top reaches 80% of the viewport.
// Only content below the fold starts hidden, so the page is complete at rest.
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/swanky/gsap";
import { useReducedMotion } from "./motion-provider";

const belowFold = (el: Element) =>
  el.getBoundingClientRect().top > window.innerHeight * 0.92;

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";
type RevealProps = {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
  id?: string;
};

/** Lines swing in on their Y axis from 5em deep (0.85s float, 0.15s per line). */
export function HeadingReveal({
  as: As = "h2",
  className,
  children,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced || !belowFold(el)) return;
      const split = SplitText.create(el, {
        type: "lines",
        linesClass: "line",
        aria: "auto",
      });
      gsap.set(el, { perspective: 1000 });
      gsap.set(split.lines, { z: "5em", rotateY: -45, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to(split.lines, {
            z: "0em",
            rotateY: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: "float",
          }),
      });
    },
    { dependencies: [reduced] },
  );
  return (
    <As ref={ref as never} className={className} id={id}>
      {children}
    </As>
  );
}

/** Characters slide in from the left, last letter first (0.65s float, 0.015s each). */
export function SlantText({
  as: As = "p",
  className,
  children,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced || !belowFold(el)) return;
      const split = SplitText.create(el, { type: "words,chars", aria: "auto" });
      gsap.set(split.chars, { x: "-0.25em", autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to(split.chars, {
            x: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: "float",
            stagger: { each: 0.015, from: "end" },
          }),
      });
    },
    { dependencies: [reduced] },
  );
  return (
    <As ref={ref as never} className={className} id={id}>
      {children}
    </As>
  );
}

/** Children marked [data-card] swing in from the right (x 5em, z 20em, rotateY −30°, scale 0.75). */
export function CardReveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced || !belowFold(el)) return;
      const cards = el.querySelectorAll("[data-card]");
      gsap.set(cards, {
        x: "5em",
        z: "20em",
        rotateY: -30,
        scale: 0.75,
        autoAlpha: 0,
      });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () =>
          gsap.to(cards, {
            x: 0,
            z: 0,
            rotateY: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.85,
            ease: "float",
            stagger: { amount: 0.2 },
          }),
      });
    },
    { scope: ref, dependencies: [reduced] },
  );
  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      {children}
    </div>
  );
}
