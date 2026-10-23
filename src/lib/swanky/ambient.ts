// Looping, decorative motion (marquees, bobbing balloons, floating stickers) registers
// here so one "Pause motion" control can stop all of it (WCAG 2.2.2).
import type { gsap } from "gsap";

type Anim = gsap.core.Animation;
const loops = new Set<Anim>();
let paused = false;
// Held during page transitions so background loops don't compete with the carousel.
let suspended = false;
const KEY = "swanky-motion-paused";

export function ambient<T extends Anim>(anim: T): T {
  loops.add(anim);
  if (paused || suspended) anim.pause();
  return anim;
}

export function isAmbientPaused() {
  return paused;
}

/** True while loops should not run: the visitor paused motion or a transition is playing. */
export function isAmbientHalted() {
  return paused || suspended;
}

function apply() {
  const halt = paused || suspended;
  for (const anim of loops) {
    const target = (
      "targets" in anim ? (anim as gsap.core.Tween).targets()[0] : undefined
    ) as Element | undefined;
    if (target && !target.isConnected) {
      loops.delete(anim);
      continue;
    }
    if (halt) anim.pause();
    else anim.resume();
  }
}

export function setAmbientSuspended(next: boolean) {
  suspended = next;
  apply();
}

export function setAmbientPaused(next: boolean) {
  paused = next;
  apply();
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
