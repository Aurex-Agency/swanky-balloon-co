"use client";

// Slush's page transition, rebuilt for the App Router. The layout marks the page shell
// with [data-shell] and the swapping content with [data-page]; the nav sits outside it.
//
// On an internal link we snapshot what is on screen into a fixed stage and start pushing
// it back right away, then navigate. When the new route commits, the old page swings away
// left while brand-colored panels sweep past and the new page swings in from the right
// and lands flat. Everything runs on the Web Animations API with transforms only, so the
// browser's compositor keeps it smooth even while React mounts the new page. The
// transition ends the moment the new page lands. Reduced motion skips it entirely.
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import { setAmbientSuspended } from "@/lib/swanky/ambient";
import { FLOAT } from "@/lib/swanky/eases";
import { BRAND_COLORS, gsap, ScrollTrigger } from "@/lib/swanky/gsap";
import { useMotion } from "./motion-provider";

type TransitionContextValue = {
  navigate: (href: string) => void;
  isTransitioning: () => boolean;
  onEnter: (cb: () => void) => () => void;
};
const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  isTransitioning: () => false,
  onEnter: () => () => {},
});

// Timing in ms. Slush runs ~3.6s end to end; this lands in ~1.75s.
const PUSH = 550; // old page pushes back into a card
const OVERLAP = 200; // the swing starts this long before the push ends
const SWING = 900; // carousel swing
const SETTLE = 500; // new page comes forward and flattens

// The float spring as a CSS linear() easing, so the compositor can run it.
const FLOAT_CSS = (() => {
  const stops = FLOAT.replace(/^M/, "")
    .split(" L")
    .map((p) => p.split(",").map(Number))
    .map(([t, y]) => `${y} ${(t * 100).toFixed(1)}%`);
  return `linear(${stops.join(", ")})`;
})();
const GLIDE_CSS = "cubic-bezier(0.65, 0.05, 0, 1)";
const floatEase = () =>
  typeof CSS !== "undefined" &&
  CSS.supports("animation-timing-function", "linear(0, 1)")
    ? FLOAT_CSS
    : "cubic-bezier(0.34, 1.25, 0.64, 1)";

const T = (x: number, ry: number, z: number) =>
  `translate3d(${x}%, 0, ${Math.round(z)}px) rotateY(${ry}deg)`;

/** Copies only the sections that are on screen; the rest become same-height spacers. */
function snapshot(page: HTMLElement) {
  const vh = window.innerHeight;
  const copy = (el: Element): Node => {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) {
      const spacer = document.createElement("div");
      spacer.style.height = `${r.height}px`;
      return spacer;
    }
    return el.cloneNode(true);
  };
  const clone = page.cloneNode(false) as HTMLElement;
  clone.removeAttribute("data-page");
  for (const child of Array.from(page.children)) {
    if (child.tagName === "MAIN") {
      const main = child.cloneNode(false) as HTMLElement;
      main.removeAttribute("id");
      for (const section of Array.from(child.children))
        main.appendChild(copy(section));
      clone.appendChild(main);
    } else {
      clone.appendChild(copy(child));
    }
  }
  clone.style.transform = `translateY(${-window.scrollY}px)`;
  return clone;
}

type Pending = { old: HTMLElement; panels: HTMLElement[]; start: number };

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { getLenis, reduced } = useMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const pending = useRef<Pending | null>(null);
  const running = useRef(false);
  const enterCallbacks = useRef(new Set<() => void>());
  const failSafe = useRef<number | undefined>(undefined);

  const flushEnter = useCallback(() => {
    const callbacks = [...enterCallbacks.current];
    enterCallbacks.current.clear();
    callbacks.forEach((cb) => cb());
  }, []);

  const finish = useCallback(
    (old: HTMLElement | null, panels: HTMLElement[]) => {
      window.clearTimeout(failSafe.current);
      const stage = stageRef.current;
      const shell = document.querySelector<HTMLElement>("[data-shell]");
      const next = shell?.querySelector<HTMLElement>("[data-page]");
      for (const el of [old, next, ...panels]) {
        el?.getAnimations().forEach((a) => a.cancel());
      }
      old?.remove();
      panels.forEach((p) => p.removeAttribute("style"));
      if (stage) stage.hidden = true;
      shell?.removeAttribute("style");
      next?.removeAttribute("style");
      running.current = false;
      setAmbientSuspended(false);
      getLenis()?.start();
      flushEnter();
      // Re-measure scroll positions after the frame that shows the new page.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    [flushEnter, getLenis],
  );

  const navigate = useCallback(
    (href: string) => {
      if (running.current) return;
      const url = new URL(href, window.location.href);
      const stage = stageRef.current;
      const page = document.querySelector<HTMLElement>(
        "[data-shell] [data-page]",
      );
      if (
        reduced ||
        !stage ||
        !page ||
        url.pathname === window.location.pathname
      ) {
        router.push(href);
        return;
      }
      running.current = true;
      setAmbientSuspended(true);
      getLenis()?.stop();

      const w = window.innerWidth;
      const old = document.createElement("div");
      old.className = "pt-old";
      old.setAttribute("aria-hidden", "true");
      old.inert = true;
      old.appendChild(snapshot(page));
      stage.appendChild(old);

      const panels = Array.from(
        stage.querySelectorAll<HTMLElement>(".pt-panel"),
      );
      const colors = gsap.utils.shuffle(BRAND_COLORS.slice(0, 5));
      const starts = [
        T(-200, 45, -0.5 * w),
        T(200, -45, -0.5 * w),
        T(200, -45, -0.25 * w),
      ];
      panels.forEach((p, i) => {
        p.style.display = "block";
        p.style.backgroundColor = colors[i];
        p.style.transform = starts[i];
      });
      stage.hidden = false;

      // Push back immediately so the click feels instant while the route loads.
      const ease = floatEase();
      const push = { duration: PUSH, easing: ease, fill: "forwards" } as const;
      old.animate(
        [{ transform: T(0, 0, 0) }, { transform: T(0, 0, -w) }],
        push,
      );
      panels[0].animate(
        [{ transform: starts[0] }, { transform: T(-100, 22.5, -0.85 * w) }],
        push,
      );
      panels[1].animate(
        [{ transform: starts[1] }, { transform: T(100, -22.5, -0.85 * w) }],
        push,
      );

      pending.current = { old, panels, start: performance.now() };
      // If the route never commits (offline, error), put everything back.
      failSafe.current = window.setTimeout(() => {
        pending.current = null;
        finish(old, panels);
      }, 8000);
      router.push(href, { scroll: false });
    },
    [finish, getLenis, reduced, router],
  );

  // The new route has committed: swing the snapshot out and the new page in.
  useLayoutEffect(() => {
    const p = pending.current;
    const shell = document.querySelector<HTMLElement>("[data-shell]");
    const next = shell?.querySelector<HTMLElement>("[data-page]");
    if (!p || !shell || !next) return;
    pending.current = null;
    window.clearTimeout(failSafe.current);

    const w = window.innerWidth;
    const { old, panels } = p;
    Object.assign(shell.style, {
      position: "fixed",
      inset: "0",
      zIndex: "102",
      perspective: "1000px",
      overflow: "hidden",
    });
    Object.assign(next.style, {
      height: "100vh",
      overflow: "hidden",
      borderRadius: "2em",
      transform: T(200, -45, -0.5 * w),
      willChange: "transform",
    });
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true, force: true });

    const ease = floatEase();
    const delay = Math.max(0, PUSH - OVERLAP - (performance.now() - p.start));
    // The swing overlaps the end of the push, so it gives only end keyframes: the browser
    // picks up from wherever the push is, with no jump between the two.
    const swing = {
      duration: SWING,
      delay,
      easing: ease,
      fill: "forwards",
    } as const;
    old.animate([{ transform: T(-200, 45, -0.5 * w) }], swing);
    panels[0].animate([{ transform: T(-300, 67.5, -0.25 * w) }], swing);
    panels[1].animate([{ transform: T(-100, 22.5, -0.85 * w) }], swing);
    panels[2].animate(
      [
        { transform: T(200, -45, -0.25 * w) },
        { transform: T(100, -22.5, -0.85 * w) },
      ],
      swing,
    );
    // One track for the new page: swing in on the float spring, then glide forward flat.
    const landing = next.animate(
      [
        {
          transform: T(200, -45, -0.5 * w),
          borderRadius: "2em",
          easing: ease,
        },
        {
          transform: T(0, 0, -w),
          borderRadius: "2em",
          easing: GLIDE_CSS,
          offset: SWING / (SWING + SETTLE),
        },
        { transform: T(0, 0, 0), borderRadius: "0em" },
      ],
      { duration: SWING + SETTLE, delay, fill: "forwards" },
    );
    landing.finished.then(
      () => finish(old, panels),
      () => {},
    );
  }, [pathname, finish, getLenis]);

  const value: TransitionContextValue = {
    navigate,
    isTransitioning: () => running.current,
    onEnter: (cb) => {
      enterCallbacks.current.add(cb);
      return () => enterCallbacks.current.delete(cb);
    },
  };

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div ref={stageRef} className="pt-stage" hidden aria-hidden="true">
        <div className="pt-panel" />
        <div className="pt-panel" />
        <div className="pt-panel" />
      </div>
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);

/**
 * Runs `cb` when the page is ready: immediately on a fresh load, or once the carousel has
 * landed when the page arrives by transition.
 */
export function usePageEnter(cb: () => void) {
  const { isTransitioning, onEnter } = useContext(TransitionContext);
  const latest = useRef(cb);
  useLayoutEffect(() => {
    latest.current = cb;
  });
  useLayoutEffect(() => {
    const run = () => latest.current();
    if (isTransitioning()) return onEnter(run);
    run();
    // Mount only: a page enters once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
