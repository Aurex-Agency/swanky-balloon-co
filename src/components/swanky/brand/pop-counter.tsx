"use client";

import { useEffect, useState } from "react";
import { POP_EVENT } from "./garland-motion";

export function PopCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const on = (e: Event) => setCount((e as CustomEvent<number>).detail);
    window.addEventListener(POP_EVENT, on);
    return () => window.removeEventListener(POP_EVENT, on);
  }, []);
  return (
    <span aria-live="polite" className="pop-count">
      {count ? `${count} popped · they grow back` : "Tap a balloon to pop it"}
    </span>
  );
}
