// Looping, decorative motion (marquees, bobbing balloons, floating stickers) registers
// here so one "Pause motion" control can stop all of it (WCAG 2.2.2).
import type { gsap } from "gsap";

type Anim = gsap.core.Animation;
const loops = new Set<Anim>();
let paused = false;
const KEY = "swanky-motion-paused";

export function ambient<T extends Anim>(anim: T): T {
  loops.add(anim);
  if (paused) anim.pause();
  return anim;
}

export function isAmbientPaused() {
  return paused;
}

export function setAmbientPaused(next: boolean) {
  paused = next;
  for (const anim of loops) {
    const target = (
      "targets" in anim ? (anim as gsap.core.Tween).targets()[0] : undefined
    ) as Element | undefined;
    if (target && !target.isConnected) {
      loops.delete(anim);
      continue;
    }
    if (next) anim.pause();
    else anim.resume();
  }
  document.documentElement.classList.toggle("motion-paused", next);
  try {
    localStorage.setItem(KEY, next ? "1" : "0");
  } catch {
    /* The choice still applies for this visit. */
  }
  window.dispatchEvent(new CustomEvent("swanky:motion", { detail: next }));
}

export function restoreAmbientPaused() {
  try {
    if (localStorage.getItem(KEY) === "1") setAmbientPaused(true);
  } catch {
    /* Storage blocked: motion stays on. */
  }
}
