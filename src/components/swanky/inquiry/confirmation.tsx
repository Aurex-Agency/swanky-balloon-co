"use client";
import { useEffect, useState } from "react";
import { BalloonTrio } from "../brand/balloon-trio";
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
        <BalloonTrio colors={summary?.colors ?? []} />
        {summary && (
          <div>
            <span className="label">Your celebration</span>
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
