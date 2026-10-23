// Swanky's pop: confetti dots in brand colors, plus an optional "Pop!" word bubble.
import { BRAND_COLORS, gsap } from "./gsap";

export function confetti(x: number, y: number, color?: string) {
  for (let i = 0; i < 14; i++) {
    const dot = document.createElement("span");
    dot.className = "confetti";
    dot.setAttribute("aria-hidden", "true");
    dot.style.background =
      color && i % 2 ? color : BRAND_COLORS[i % BRAND_COLORS.length];
    dot.style.left = `${x - 5}px`;
    dot.style.top = `${y - 5}px`;
    document.body.appendChild(dot);
    const a = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
    const r = 60 + Math.random() * 70;
    gsap
      .timeline({ onComplete: () => dot.remove() })
      .to(dot, {
        x: Math.cos(a) * r,
        y: Math.sin(a) * r - 20,
        scale: 0.6 + Math.random() * 0.9,
        duration: 0.6,
        ease: "power3.out",
      })
      .to(
        dot,
        { y: "+=40", autoAlpha: 0, duration: 0.5, ease: "power1.in" },
        "-=0.1",
      );
  }
}

const WORDS = ["Pop!", "Pop!", "Eek!", "Pow!", "Oops!"];
export function popWord(x: number, y: number) {
  const w = document.createElement("span");
  w.className = "pop-word";
  w.setAttribute("aria-hidden", "true");
  w.textContent = WORDS[Math.floor(Math.random() * WORDS.length)];
  w.style.left = `${x}px`;
  w.style.top = `${y}px`;
  document.body.appendChild(w);
  gsap
    .timeline({ onComplete: () => w.remove() })
    .fromTo(
      w,
      { scale: 0.2, rotate: -20, xPercent: -50, yPercent: -50 },
      {
        scale: 1,
        rotate: gsap.utils.random(-10, 10),
        y: -46,
        duration: 0.5,
        ease: "float",
      },
    )
    .to(w, { autoAlpha: 0, y: -70, duration: 0.35 }, "+=0.25");
}
