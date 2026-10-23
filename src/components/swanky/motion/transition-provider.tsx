"use client";

// Page transition: a balloon release. On an internal link a flock of cartoon balloons
// rises from the bottom and covers the whole screen; the route swaps underneath while it
// is covered; then the balloons float up and away, revealing the new page as its intro
// plays. Two balloon layers move at slightly different speeds for depth.
//
// Smoothness: each layer is drawn ahead of time, while the browser is idle, into a canvas
// bitmap, so the transition only slides finished bitmaps (Web Animations, transforms
// only) and the compositor never has to draw balloons mid-flight or wait on React. The
// link is prefetched on click and pushed on the first frame the solid core covers the
// screen, so the swap never shows. Reduced motion gets a short fade instead; browser
// back/forward navigates instantly.
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { setAmbientSuspended } from "@/lib/swanky/ambient";
import {
  buildCurtain,
  type Curtain,
  curtainColors,
} from "@/lib/swanky/curtain";
import { ScrollTrigger } from "@/lib/swanky/gsap";
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

const RISE = 560; // balloons sweep up and cover the screen
const AWAY = 720; // balloons float up and off, revealing the new page
const FADE = 180; // reduced motion
const RISE_EASE = "cubic-bezier(0.33, 0, 0.2, 1)"; // quick lift, soft arrival
const AWAY_EASE = "cubic-bezier(0.55, 0, 0.8, 0.45)"; // drifts off, picking up speed
const DRIFT = 0.12; // screen heights the flock drifts up while the page swaps
// The front layer travels farther than the main flock, so the release has depth.
const DEPTH = [1, 1.16];
const SWAY = [0, 1.6]; // vw of sideways drift per layer
const BACKING = "#EFE4D6";
// Canvas resolution: crisp but within phone GPU memory and Safari's canvas size limit.
const MAX_DPR = 1.5;
const MAX_PIXELS = 12_000_000;

type Prepared = { w: number; h: number; c: Curtain };
type Phase = "idle" | "rising" | "pushed";

const layersOf = (root: HTMLElement | null) =>
  Array.from(
    root?.querySelectorAll<HTMLCanvasElement>("canvas.curtain-layer") ?? [],
  );

// Where each layer sits, as a translateY in px: start (below), cover, end (above).
function positions(c: Curtain) {
  const h = window.innerHeight;
  const cover = -(c.lead + c.core / 2 - h / 2);
  const start = h;
  const end = -c.total - 40;
  return DEPTH.map((k) => ({
    start: cover + (start - cover) * k,
    cover,
    end: cover + (end - cover) * k,
  }));
}
const shift = (y: number, swayVw: number) =>
  `translate3d(${swayVw}vw, ${Math.round(y)}px, 0)`;

async function rasterize(svg: string) {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } finally {
    // The decoded image keeps its pixels; the URL is no longer needed.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

const whenIdle = (cb: () => void) =>
  (window.requestIdleCallback ?? ((f: () => void) => setTimeout(f, 400)))(cb);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { getLenis, reduced } = useMotion();
  const curtainRef = useRef<HTMLDivElement>(null);
  const prepared = useRef<Prepared | null>(null);
  const preparing = useRef<Promise<Prepared | null> | null>(null);
  const phase = useRef<Phase>("idle");
  const fromPath = useRef("");
  const enterCallbacks = useRef(new Set<() => void>());
  const failSafe = useRef<number | undefined>(undefined);

  const flushEnter = useCallback(() => {
    const callbacks = [...enterCallbacks.current];
    enterCallbacks.current.clear();
    callbacks.forEach((cb) => cb());
  }, []);

  // Draw a flock for the current screen into the canvases. `fresh` makes a new
  // arrangement and color mix even when the size is unchanged.
  const prepare = useCallback((fresh = false): Promise<Prepared | null> => {
    const root = curtainRef.current;
    if (!root) return Promise.resolve(null);
    const w = window.innerWidth,
      h = window.innerHeight;
    const p = prepared.current;
    if (!fresh && p && p.w === w && Math.abs(p.h - h) < 80)
      return Promise.resolve(p);
    if (preparing.current) return preparing.current;
    const run = (async () => {
      const c = buildCurtain(w, h, curtainColors(), BACKING);
      const images = await Promise.all(c.layers.map(rasterize));
      // Never redraw under a transition that is already playing.
      if (phase.current !== "idle" && prepared.current)
        return prepared.current;
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        MAX_DPR,
        Math.sqrt(MAX_PIXELS / (w * c.total)),
      );
      layersOf(root).forEach((canvas, i) => {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(c.total * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${c.total}px`;
        canvas
          .getContext("2d")
          ?.drawImage(images[i], 0, 0, canvas.width, canvas.height);
      });
      prepared.current = { w, h, c };
      return prepared.current;
    })().finally(() => {
      preparing.current = null;
    });
    preparing.current = run;
    return run;
  }, []);

  // Prepare the flock when the browser is idle, and again after resizing.
  useEffect(() => {
    if (reduced) return;
    // Skipped if reduced motion resolves before the browser goes idle.
    let live = true;
    whenIdle(() => {
      if (live) void prepare();
    });
    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        if (phase.current === "idle") void prepare();
      }, 300);
    };
    window.addEventListener("resize", onResize);
    return () => {
      live = false;
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [prepare, reduced]);

  const finish = useCallback(() => {
    window.clearTimeout(failSafe.current);
    const root = curtainRef.current;
    layersOf(root).forEach((el) =>
      el.getAnimations().forEach((a) => a.cancel()),
    );
    root?.getAnimations().forEach((a) => a.cancel());
    if (root) root.hidden = true;
    phase.current = "idle";
    delete document.documentElement.dataset.transitioning;
    setAmbientSuspended(false);
    getLenis()?.start();
    // Re-measure scroll positions on the frame after the reveal, then quietly draw a
    // fresh flock for next time.
    requestAnimationFrame(() => ScrollTrigger.refresh());
    if (!reduced)
      whenIdle(() => {
        if (phase.current === "idle") void prepare(true);
      });
  }, [getLenis, prepare, reduced]);

  // Float the balloons away (or fade back in, for reduced motion) and reveal the page.
  const release = useCallback(() => {
    window.clearTimeout(failSafe.current);
    const root = curtainRef.current;
    const c = prepared.current?.c;
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    // Let the float-away get going before the new page's intro starts its own work.
    window.setTimeout(flushEnter, reduced ? 0 : 120);
    if (!root) return finish();
    if (reduced || !c || root.classList.contains("is-fade")) {
      root
        .animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: FADE,
          fill: "forwards",
        })
        .finished.then(finish, () => {});
      return;
    }
    const pos = positions(c);
    const anims = layersOf(root).map((el, i) =>
      el.animate([{ transform: shift(pos[i].end, SWAY[i] * 2) }], {
        duration: AWAY,
        easing: AWAY_EASE,
        fill: "forwards",
      }),
    );
    anims[0]?.finished.then(finish, () => {});
  }, [finish, flushEnter, getLenis, reduced]);

  const navigate = useCallback(
    (href: string) => {
      if (phase.current !== "idle") return;
      const url = new URL(href, window.location.href);
      const root = curtainRef.current;
      if (!root || url.pathname === window.location.pathname) {
        router.push(href);
        return;
      }
      phase.current = "rising";
      fromPath.current = window.location.pathname;
      document.documentElement.dataset.transitioning = "true";
      setAmbientSuspended(true);
      getLenis()?.stop();
      router.prefetch(href);

      const push = () => {
        if (phase.current !== "rising") return;
        phase.current = "pushed";
        router.push(href, { scroll: false });
      };
      // If the route never arrives (offline, error), uncover the page anyway.
      failSafe.current = window.setTimeout(release, 6000);

      const fade = () => {
        root.className = "curtain is-fade";
        root.hidden = false;
        root
          .animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: FADE,
            fill: "forwards",
          })
          .finished.then(push, () => {});
      };
      if (reduced) return fade();

      const rise = ({ c }: Prepared) => {
        if (phase.current !== "rising") return;
        root.className = "curtain";
        root.hidden = false;
        const pos = positions(c);
        const h = window.innerHeight;
        const layers = layersOf(root);
        layers.forEach((el, i) => {
          el.animate(
            [
              { transform: shift(pos[i].start, -SWAY[i]) },
              { transform: shift(pos[i].cover, 0) },
            ],
            { duration: RISE, easing: RISE_EASE, fill: "forwards" },
          );
          // While the new page loads, keep drifting gently upward instead of stopping.
          // The drift stays well inside the covered range; floating away picks up from
          // wherever it is.
          el.animate(
            [
              { transform: shift(pos[i].cover, 0) },
              {
                transform: shift(pos[i].cover - DRIFT * h * DEPTH[i], SWAY[i]),
              },
            ],
            { delay: RISE, duration: 2400, easing: "linear", fill: "forwards" },
          );
        });
        // Swap pages on the first frame the solid core covers the whole screen
        // (measured, not guessed), so the change never shows between balloons.
        const watch = () => {
          if (phase.current !== "rising") return;
          const top = (layers[0]?.getBoundingClientRect().top ?? 0) + c.lead;
          if (top <= 0 && top + c.core >= window.innerHeight) push();
          else requestAnimationFrame(watch);
        };
        requestAnimationFrame(watch);
      };

      const ready = prepared.current;
      if (
        ready &&
        ready.w === window.innerWidth &&
        Math.abs(ready.h - window.innerHeight) < 80
      ) {
        rise(ready);
      } else {
        // First click before the idle preparation ran: draw now, then rise.
        prepare().then((p) => (p ? rise(p) : fade()), fade);
      }
    },
    [getLenis, prepare, reduced, release, router],
  );

  // The new route has committed under the curtain: reveal it. Also covers a browser
  // back/forward that lands mid-transition.
  useLayoutEffect(() => {
    if (phase.current === "idle") return;
    if (window.location.pathname === fromPath.current) return;
    release();
  }, [pathname, release]);

  const value: TransitionContextValue = {
    navigate,
    isTransitioning: () => phase.current !== "idle",
    onEnter: (cb) => {
      enterCallbacks.current.add(cb);
      return () => enterCallbacks.current.delete(cb);
    },
  };

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div ref={curtainRef} className="curtain" hidden aria-hidden="true">
        <canvas className="curtain-layer" />
        <canvas className="curtain-layer" />
      </div>
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);

/**
 * Runs `cb` when the page is ready to animate in: immediately on a fresh load, or as the
 * balloons float away when the page arrives by transition.
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
