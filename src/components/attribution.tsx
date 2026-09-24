"use client";
import { useEffect } from "react";
export function AttributionCapture() {
  useEffect(() => {
    try {
      if (!sessionStorage.getItem("swanky-attribution")) {
        const p = new URLSearchParams(window.location.search);
        sessionStorage.setItem(
          "swanky-attribution",
          JSON.stringify({
            utmSource: p.get("utm_source") || "",
            utmMedium: p.get("utm_medium") || "",
            utmCampaign: p.get("utm_campaign") || "",
            utmContent: p.get("utm_content") || "",
            utmTerm: p.get("utm_term") || "",
            referrer: document.referrer,
            landingPage: window.location.href,
          }),
        );
      }
    } catch {
      /* Storage can be unavailable; inquiry still works. */
    }
  }, []);
  return null;
}
