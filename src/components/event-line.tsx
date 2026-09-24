"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { eventTypes } from "@/data/swanky";
export function EventLine() {
  const [paused, setPaused] = useState(false);
  return (
    <div
      className={`marquee ${paused ? "marquee-paused" : ""}`}
      role="region"
      aria-label="Birthdays, showers, weddings, brand events, grand openings, milestones, just because"
    >
      <div aria-hidden="true">
        {[0, 1].map((i) => (
          <span key={i}>
            {eventTypes
              .filter((t) => t !== "Other")
              .map((t) => (
                <span key={t}>
                  {t} <span className="marquee-star">·</span>
                </span>
              ))}
          </span>
        ))}
      </div>
      <button
        className="marquee-control"
        type="button"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Play event line" : "Pause event line"}
      >
        {paused ? <Play size={15} /> : <Pause size={15} />}
      </button>
    </div>
  );
}
