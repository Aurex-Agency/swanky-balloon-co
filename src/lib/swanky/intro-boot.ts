// The first-load intro, started by a small inline script as soon as the page's HTML has
// parsed, so the hero paints and animates without waiting for React to hydrate (on a
// mid-range phone that wait is about 3s, all of it with the headline hidden). It only
// uses the Web Animations API, which changes no attributes, so hydration still sees the
// server's markup. PageIntro and GarlandMotion check window.__introBooted and skip
// replaying what already ran; pages reached by a page transition animate from those
// components as before, timed to the balloons. Mirrors their GSAP timings.
import { floatLinear } from "./eases";

declare global {
  interface Window {
    __introBooted?: Set<Element>;
  }
}

/** Whether the inline boot script already played this element's first-load intro. */
export const introBooted = (el: Element) =>
  window.__introBooted?.has(el) ?? false;

const ID = "swanky-intro";

/** Resolves once the boot intro inside `root` has finished playing (at once if none is).
 *  GSAP reads an element's current transform the first time it touches it, so anything
 *  that tweens these elements waits for this rather than capture a mid-intro frame. */
export const introSettled = (root: Element) =>
  Promise.all(
    root
      .getAnimations({ subtree: true })
      .filter((a) => a.id === ID)
      .map((a) => a.finished.catch(() => {})),
  ).then(() => {});

/** Whether the boot intro is still animating this element. */
export const introPlaying = (el: Element) =>
  el.getAnimations().some((a) => a.id === ID);

// Serialized into the page, so it must stay self-contained: no imports or helpers.
function boot(easing: string, id: string) {
  const booted = new Set<Element>();
  window.__introBooted = booted;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const play = (
    el: Element,
    from: Keyframe,
    delay: number,
    duration: number,
  ) => {
    if (reduced) return;
    const to: Keyframe = {};
    for (const k in from)
      to[k] = k === "opacity" ? 1 : k === "transformOrigin" ? from[k] : "none";
    el.animate([from, to], { id, duration, delay, easing, fill: "backwards" });
  };
  // Components that hydrated first have already set up their own intro.
  const fresh = (sel: string) =>
    Array.from(document.querySelectorAll(sel)).filter(
      (el) => !el.classList.contains("intro-ready"),
    );
  fresh("[data-intro]").forEach((root) => {
    booted.add(root);
    Array.from(root.querySelectorAll(".wordmark .ch"))
      .reverse()
      .forEach((c, i) =>
        play(
          c,
          { opacity: 0, transform: "translateX(-0.25em)" },
          100 + i * 50,
          650,
        ),
      );
    root
      .querySelectorAll("[data-load]")
      .forEach((b, i) =>
        play(
          b,
          { opacity: 0, transform: "translateY(3em)" },
          600 + i * 100,
          1000,
        ),
      );
    Array.from(root.querySelectorAll("[data-hero-sticker]"))
      .sort(() => Math.random() - 0.5)
      .forEach((s, i) =>
        play(
          s,
          {
            opacity: 0,
            transform: "scale(0.2) rotate(-90deg)",
          },
          600 + i * 100,
          1000,
        ),
      );
  });
  fresh(".garland[data-inflate]").forEach((root) => {
    booted.add(root);
    Array.from(root.querySelectorAll<SVGGElement>(".b"))
      .sort((a, b) => +a.dataset.u! - +b.dataset.u!)
      .forEach((b, i) => {
        const inner = b.querySelector(".bi");
        if (inner)
          play(
            inner,
            {
              transform: "scale(0)",
              transformOrigin: `${b.dataset.x}px ${b.dataset.y}px`,
            },
            150 + i * 6,
            700,
          );
      });
    // Sparkles carry their position in a transform attribute, so they only fade in.
    root
      .querySelectorAll(".spk")
      .forEach((s, i) => play(s, { opacity: 0 }, 1200 + i * 120, 900));
  });
  // Lifts the CSS that hides intro states until scripts run (see components.css).
  document.documentElement.classList.add("intro-booted");
}

export const INTRO_BOOT = `(${boot.toString()})(${JSON.stringify(floatLinear())},${JSON.stringify(ID)})`;
