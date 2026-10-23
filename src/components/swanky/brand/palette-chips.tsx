"use client";

import { useState } from "react";
import {
  PALETTE_LABELS,
  PALETTES,
  type PaletteName,
} from "@/lib/swanky/tokens";
import { PALETTE_EVENT } from "./garland-motion";

const NAMES = Object.keys(PALETTES) as PaletteName[];

/** "Try it in your colors": recolors any interactive garland on the page. */
export function PaletteChips({
  label = "Try it in your colors",
}: {
  label?: string;
}) {
  const [active, setActive] = useState<PaletteName>("mix");
  return (
    <div className="palette-try" role="group" aria-label="Recolor the garland">
      <span className="label">{label}</span>
      <div className="palette-chips">
        {NAMES.map((name) => (
          <button
            key={name}
            type="button"
            className="chip-btn"
            aria-pressed={active === name}
            onClick={() => {
              setActive(name);
              window.dispatchEvent(
                new CustomEvent(PALETTE_EVENT, { detail: name }),
              );
            }}
          >
            {PALETTES[name].slice(0, 3).map(([hex]) => (
              <i key={hex} style={{ background: hex }} aria-hidden="true" />
            ))}
            {PALETTE_LABELS[name]}
          </button>
        ))}
      </div>
    </div>
  );
}
