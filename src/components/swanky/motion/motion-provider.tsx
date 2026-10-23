"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/swanky/gsap";

type MotionContextValue = { getLenis: () => Lenis | null; reduced: boolean };
const MotionContext = createContext<MotionContextValue>({
  getLenis: () => null,
  reduced: false,
});

const QUERY = "(prefers-reduced-motion: reduce)";
function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(QUERY).matches;
const getServerReduced = () => false;

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getReduced, getServerReduced);
}

/** Lenis smooth scroll at Slush's lerp 0.12, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.12, autoRaf: false });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return (
    <MotionContext.Provider
      value={{ getLenis: () => lenisRef.current, reduced }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export const useMotion = () => useContext(MotionContext);
