"use client";
import { useEffect, useState } from "react";
import { BalloonCluster } from "./balloons";
interface Summary {
  eventType: string;
  eventDate: string;
  venueCity: string;
  vibe: string;
  colors: string[];
  demo: boolean;
}
export function Confirmation() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [demo, setDemo] = useState(false);
  useEffect(() => {
    try {
      const value = JSON.parse(
        sessionStorage.getItem("swanky-confirmation") || "null",
      );
      queueMicrotask(() => {
        setSummary(value);
        setDemo(
          new URLSearchParams(window.location.search).get("demo") === "true" ||
            value?.demo === true,
        );
      });
    } catch {
      /* Confirmation is readable even without browser storage. */
    }
  }, []);
  return (
    <>
      {demo && (
        <p className="demo-confirmation" role="status">
          Demo complete. This inquiry was not sent to Swanky and no date has
          been reserved.
        </p>
      )}
      <div className="confirmation-board">
        <BalloonCluster colors={summary?.colors} />
        {summary && (
          <div>
            <span className="eyebrow">YOUR NEXT GOOD TIME</span>
            <h2>
              {summary.eventType} in {summary.venueCity}
            </h2>
            <p>
              {summary.eventDate} · {summary.vibe}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
