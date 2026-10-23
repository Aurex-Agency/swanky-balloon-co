"use client";

// Slush's page transition, rebuilt for the App Router. The layout marks the page shell
// with [data-shell] and the swapping content with [data-page]; the nav sits outside it.
// On an internal link we snapshot the current page into a fixed stage, navigate without
// scrolling, and once the new route commits we run the 3D carousel: the old page shrinks
// into a card and swings away left while three brand-colored panels sweep past and the
// new page swings in from the right. Reduced motion skips the carousel.
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
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

const SWING = 1.25; // the carousel swing (Slush: 1.25s)
const PUSH = 0.8; // push back and final settle (Slush: 0.8s)

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { getLenis, reduced } = useMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const pending = useRef<HTMLElement | null>(null);
  const running = useRef(false);
  const enterCallbacks = useRef(new Set<() => void>());
  const failSafe = useRef<number | undefined>(undefined);

  const flushEnter = useCallback(() => {
    const callbacks = [...enterCallbacks.current];
    enterCallbacks.current.clear();
    callbacks.forEach((cb) => cb());
  }, []);

  const finish = useCallback(
    (old: HTMLElement | null) => {
      window.clearTimeout(failSafe.current);
      const stage = stageRef.current,
        shell = document.querySelector<HTMLElement>("[data-shell]");
      old?.remove();
      if (stage) {
        stage
          .querySelectorAll<HTMLElement>(".pt-panel")
          .forEach((p) => (p.style.display = "none"));
        stage.hidden = true;
      }
      const next = shell?.querySelector<HTMLElement>("[data-page]");
      if (shell) gsap.set(shell, { clearProps: "all" });
      if (next)
        gsap.set(next, {
          clearProps: "transform,borderRadius,height,overflow",
        });
      running.current = false;
      flushEnter();
      getLenis()?.start();
      ScrollTrigger.refresh();
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
      getLenis()?.stop();
      const old = document.createElement("div");
      old.className = "pt-old";
      old.setAttribute("aria-hidden", "true");
      old.inert = true;
      const clone = page.cloneNode(true) as HTMLElement;
      clone.removeAttribute("data-page");
      clone.style.transform = `translateY(${-window.scrollY}px)`;
      old.appendChild(clone);
      stage.appendChild(old);
      stage.hidden = false;
      pending.current = old;
      // If the route never commits (offline, error), put everything back.
      failSafe.current = window.setTimeout(() => {
        pending.current = null;
        finish(old);
      }, 6000);
      router.push(href, { scroll: false });
    },
    [finish, getLenis, reduced, router],
  );

  // The new route has committed: run the carousel between the snapshot and the new page.
  useLayoutEffect(() => {
    const old = pending.current;
    const stage = stageRef.current,
      shell = document.querySelector<HTMLElement>("[data-shell]");
    const next = shell?.querySelector<HTMLElement>("[data-page]");
    if (!old || !stage || !shell || !next) return;
    pending.current = null;
    window.clearTimeout(failSafe.current);
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true, force: true });

    const w = window.innerWidth;
    const panels = Array.from(stage.querySelectorAll<HTMLElement>(".pt-panel"));
    const colors = gsap.utils.shuffle(BRAND_COLORS.slice(0, 5));
    panels.forEach((p, i) =>
      gsap.set(p, { display: "block", backgroundColor: colors[i] }),
    );

    gsap
      .timeline({ defaults: { ease: "float" }, onComplete: () => finish(old) })
      .set(shell, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 102,
        perspective: 1000,
        overflow: "hidden",
      })
      .set(next, {
        height: "100vh",
        overflow: "hidden",
        borderRadius: "2em",
        rotateY: -45,
        xPercent: 200,
        z: -0.5 * w,
      })
      .set(panels[0], { z: -0.5 * w, rotateY: 45, xPercent: -200 })
      .set(panels[1], { z: -0.5 * w, rotateY: -45, xPercent: 200 })
      .set(panels[2], { z: -0.25 * w, rotateY: -45, xPercent: 200 })
      .to(old, { z: -1 * w, duration: PUSH })
      .to(
        panels[0],
        { xPercent: -100, rotateY: 22.5, z: -0.85 * w, duration: PUSH },
        "<",
      )
      .to(
        panels[1],
        { xPercent: 100, rotateY: -22.5, z: -0.85 * w, duration: PUSH },
        "<",
      )
      .to(
        old,
        { rotateY: 45, xPercent: -200, z: -0.5 * w, duration: SWING },
        ">-=0.25",
      )
      .to(
        panels[0],
        { xPercent: -300, rotateY: 67.5, z: -0.25 * w, duration: SWING },
        "<",
      )
      .to(
        panels[1],
        { xPercent: -100, rotateY: 22.5, z: -0.85 * w, duration: SWING },
        "<",
      )
      .to(
        panels[2],
        { xPercent: 100, rotateY: -22.5, z: -0.85 * w, duration: SWING },
        "<",
      )
      .to(next, { rotateY: 0, xPercent: 0, z: -1 * w, duration: SWING }, "<")
      .to(
        next,
        { z: 0, borderRadius: "0em", ease: "glide", duration: PUSH },
        ">-=0.5",
      )
      .to(
        panels[1],
        { xPercent: -200, rotateY: 45, z: -0.25 * w, duration: 1.875 },
        "<+=0.2",
      )
      .to(
        panels[2],
        {
          xPercent: 200,
          rotateY: -45,
          z: -0.25 * w,
          duration: 1.875,
          onStart: flushEnter,
        },
        "<",
      );
  }, [pathname, finish, flushEnter, getLenis]);

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
 * Runs `cb` when the page is ready to animate in: immediately on a fresh load, or at
 * Slush's cue near the end of the carousel when the page arrives by transition.
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
