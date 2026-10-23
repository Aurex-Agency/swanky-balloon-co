"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { darkSwatches, swatches, vibes } from "@/data/swanky";

export interface Palette {
  vibe: string;
  colors: string[];
}

/** Choose a starting palette, then make it yours with up to three balloon colors. */
export function PalettePicker({
  value,
  onChange,
}: {
  value: Palette;
  onChange: (value: Palette) => void;
}) {
  const [message, setMessage] = useState("");
  function choose(hex: string) {
    if (value.colors.includes(hex)) {
      onChange({ ...value, colors: value.colors.filter((c) => c !== hex) });
      setMessage("");
    } else if (value.colors.length < 3) {
      onChange({ ...value, colors: [...value.colors, hex] });
      setMessage("");
    } else {
      setMessage("Three colors selected. Remove a color to try another.");
    }
  }
  return (
    <div className="palette-picker">
      <div className="vibe-options" role="group" aria-label="Choose a palette">
        {vibes.map((v) => (
          <button
            key={v.name}
            type="button"
            className="chip-btn"
            aria-pressed={value.vibe === v.name}
            onClick={() => {
              onChange({ vibe: v.name, colors: v.colors });
              setMessage("");
            }}
          >
            {v.colors.map((hex) => (
              <i key={hex} style={{ background: hex }} aria-hidden="true" />
            ))}
            {v.name}
          </button>
        ))}
      </div>
      <div className="swatch-heading">
        <span className="label">Make it yours</span>
        <span className="label">{value.colors.length} / 3 colors</span>
      </div>
      <div className="swatch-grid" role="group" aria-label="Balloon colors">
        {swatches.map((c) => {
          const on = value.colors.includes(c.hex);
          return (
            <button
              type="button"
              key={c.hex}
              className="swatch-btn"
              aria-pressed={on}
              onClick={() => choose(c.hex)}
            >
              <span className="swatch-dot" style={{ background: c.hex }}>
                {on && (
                  <Check
                    size={18}
                    color={darkSwatches.includes(c.hex) ? "#F7F0E6" : "#252524"}
                    aria-hidden="true"
                  />
                )}
              </span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>
      <p className="palette-hint" aria-live="polite">
        {message || "Pick up to three. There are no wrong answers."}
      </p>
    </div>
  );
}
