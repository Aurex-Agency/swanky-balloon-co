"use client";

import { useState } from "react";
import { eventTypes, swatches, vibes } from "@/data/swanky";
import { mixFrom } from "@/lib/swanky/tokens";
import { BalloonTrio } from "../brand/balloon-trio";
import { PALETTE_EVENT } from "../brand/garland-motion";
import { type Palette, PalettePicker } from "../brand/palette-picker";
import { TransitionLink } from "../motion/transition-link";

/** Pick a palette, watch the garland change, then carry it into the inquiry. */
export function ColorStudio({ garland }: { garland: React.ReactNode }) {
  const [value, setValue] = useState<Palette>({
    vibe: vibes[0].name,
    colors: vibes[0].colors,
  });
  const [event, setEvent] = useState("");
  const change = (next: Palette) => {
    setValue(next);
    window.dispatchEvent(
      new CustomEvent(PALETTE_EVENT, { detail: mixFrom(next.colors) }),
    );
  };
  const names = value.colors
    .map((c) => swatches.find((s) => s.hex === c)?.name)
    .join(" + ");
  const href = `/inquire?${new URLSearchParams({ vibe: value.vibe, colors: value.colors.join(","), event })}`;
  return (
    <div className="studio">
      <div className="studio-controls">
        <PalettePicker value={value} onChange={change} />
        <label className="field-label" htmlFor="studio-event">
          What are we celebrating? <span>(optional)</span>
        </label>
        <select
          id="studio-event"
          className="field"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
        >
          <option value="">Just dreaming for now</option>
          {eventTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="studio-preview" data-testid="palette-preview">
        <div className="studio-garland">{garland}</div>
        <div className="studio-board">
          <BalloonTrio colors={value.colors} />
          <div>
            <p className="label">Your palette</p>
            <p className="studio-name">{value.vibe}</p>
            <p>
              {names || "A blank canvas"}
              {event ? ` · ${event}` : ""}
            </p>
          </div>
          <TransitionLink href={href} className="btn is-solid">
            Use this palette
          </TransitionLink>
        </div>
        <p className="palette-footnote">
          A starting point for your vision. Final colors and materials are
          confirmed during design.
        </p>
      </div>
    </div>
  );
}
