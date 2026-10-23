"use client";

import { useState } from "react";
import { vibes } from "@/data/swanky";
import { mixFrom, PALETTES } from "@/lib/swanky/tokens";
import { PALETTE_EVENT } from "./garland-motion";

const CHIPS = vibes.filter((v) => v.name !== "Build My Own");

/** "Try it in your colors": recolors any interactive garland on the page. */
export function PaletteChips({
  label = "Try it in your colors",
}: {
  label?: string;
}) {
  const [active, setActive] = useState(CHIPS[0].name);
  return (
    <div className="palette-try" role="group" aria-label="Recolor the garland">
      <span className="label">{label}</span>
      <div className="palette-chips">
        {CHIPS.map((v, i) => (
          <button
            key={v.name}
            type="button"
            className="chip-btn"
            aria-pressed={active === v.name}
            onClick={() => {
              setActive(v.name);
              // The signature chip restores the full six-color mix.
              const mix = i === 0 ? PALETTES.mix : mixFrom(v.colors);
              window.dispatchEvent(
                new CustomEvent(PALETTE_EVENT, { detail: mix }),
              );
            }}
          >
            {v.colors.map((hex) => (
              <i key={hex} style={{ background: hex }} aria-hidden="true" />
            ))}
            {v.name}
          </button>
        ))}
      </div>
    </div>
  );
}
