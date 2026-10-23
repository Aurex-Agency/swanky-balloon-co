"use client";

import { confetti } from "@/lib/swanky/confetti";
import { gsap } from "@/lib/swanky/gsap";
import { useReducedMotion } from "../motion/motion-provider";
import { TransitionLink } from "../motion/transition-link";

type Props = {
  href: string;
  children: React.ReactNode;
  solid?: boolean;
  size?: "pill" | "btn";
  /** Confetti burst on click, for primary inquiry CTAs. */
  pop?: boolean;
  dot?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  solid,
  size = "btn",
  pop,
  dot,
  className,
}: Props) {
  const reduced = useReducedMotion();
  return (
    <TransitionLink
      href={href}
      className={`${size} ${solid ? "is-solid" : ""} ${className ?? ""}`}
      onClick={(e) => {
        if (!pop || reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        confetti(
          e.clientX || r.left + r.width / 2,
          e.clientY || r.top + r.height / 2,
        );
        gsap.fromTo(
          e.currentTarget,
          { scale: 0.94 },
          { scale: 1, duration: 0.7, ease: "float" },
        );
      }}
    >
      {dot && <span className="dot" aria-hidden="true" />}
      {children}
    </TransitionLink>
  );
}
