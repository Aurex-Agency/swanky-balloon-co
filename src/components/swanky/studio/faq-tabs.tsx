"use client";

import { useEffect, useRef, useState } from "react";
import { faqs, faqTopics } from "@/data/swanky";
import type { Flip } from "gsap/Flip";
import { loadFlip, useGSAP } from "@/lib/swanky/gsap";
import { useReducedMotion } from "../motion/motion-provider";

const TABS = ["All", ...faqTopics];

/** FAQ grouped by topic. The active tab marker moves with Flip (0.5s glide). */
export function FaqTabs() {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef<Flip.FlipState | null>(null);
  // Loaded after the page is up; until then tabs switch without the marker animation.
  const flip = useRef<typeof Flip | null>(null);
  useEffect(() => {
    loadFlip().then((f) => (flip.current = f));
  }, []);
  const reduced = useReducedMotion();
  const [tab, setTab] = useState<string>("All");
  const shown = faqs.filter((f) => tab === "All" || f.topic === tab);

  useGSAP(
    () => {
      if (state.current && !reduced)
        flip.current?.from(state.current, { duration: 0.5, ease: "glide" });
      state.current = null;
    },
    { scope: ref, dependencies: [tab] },
  );

  return (
    <div ref={ref} className="faq">
      <div className="filter-pills" role="group" aria-label="FAQ topics">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className="pill filter-pill"
            aria-pressed={tab === t}
            onClick={() => {
              if (ref.current && flip.current)
                state.current = flip.current.getState(
                  ref.current.querySelectorAll(".filter-active"),
                );
              setTab(t);
            }}
          >
            {tab === t && (
              <span
                className="filter-active"
                data-flip-id="faq-active"
                aria-hidden="true"
              />
            )}
            <span>{t}</span>
          </button>
        ))}
      </div>
      <div className="faq-list">
        {shown.map((f) => (
          <details key={f.question}>
            <summary>
              <span>{f.question}</span>
              <span className="faq-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
