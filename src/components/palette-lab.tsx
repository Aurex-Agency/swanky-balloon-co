"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { BalloonCluster } from "./balloons";
import { vibes, swatches, eventTypes } from "@/data/swanky";
export interface Palette {
  vibe: string;
  colors: string[];
}
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
    <>
      <div className="vibe-options" aria-label="Choose a vibe">
        {vibes.map((v) => (
          <button
            key={v.name}
            type="button"
            aria-pressed={value.vibe === v.name}
            onClick={() => {
              onChange({ vibe: v.name, colors: v.colors });
              setMessage("");
            }}
          >
            {v.name}
          </button>
        ))}
      </div>
      <div className="swatch-heading">
        <span>MAKE IT YOURS</span>
        <span>{value.colors.length} / 3 colors</span>
      </div>
      <div className="swatches">
        {swatches.map((c) => (
          <button
            type="button"
            key={c.hex}
            aria-label={c.name}
            title={c.name}
            aria-pressed={value.colors.includes(c.hex)}
            onClick={() => choose(c.hex)}
            style={{ background: c.hex }}
          >
            {value.colors.includes(c.hex) && (
              <Check
                size={19}
                color={
                  ["#3652c9", "#bd294b", "#181517"].includes(c.hex)
                    ? "#fff"
                    : "#181517"
                }
              />
            )}
          </button>
        ))}
      </div>
      <p className="palette-hint" aria-live="polite">
        {message || "Pick up to three. There are no wrong answers."}
      </p>
    </>
  );
}
export function PaletteLab() {
  const [value, setValue] = useState<Palette>({
    vibe: vibes[0].name,
    colors: vibes[0].colors,
  });
  const [event, setEvent] = useState("");
  return (
    <section className="palette-section section" id="palette">
      <div className="section-intro">
        <span className="eyebrow">A LITTLE COLOR PLAY</span>
        <h2>
          Find your
          <br />
          party palette<span className="pink-text">.</span>
        </h2>
        <p>
          Your kind of color. Your kind of celebration.
          <br />
          Mix a little, dream a little. We’ll take it from here.
        </p>
      </div>
      <div className="palette-lab">
        <div className="palette-controls">
          <span className="eyebrow">01 / PICK YOUR VIBE</span>
          <PalettePicker value={value} onChange={setValue} />
          <label className="event-select-label" htmlFor="palette-event">
            What are we celebrating? <span>(optional)</span>
          </label>
          <select
            id="palette-event"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          >
            <option value="">Just dreaming for now</option>
            {eventTypes.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="palette-preview" data-testid="palette-preview">
          <span className="eyebrow">YOUR SWANKY STARTER BOARD</span>
          <BalloonCluster colors={value.colors} />
          <div className="starter-board">
            <div>
              <strong>{value.vibe}</strong>
              <span>
                {value.colors
                  .map((c) => swatches.find((s) => s.hex === c)?.name)
                  .join(" + ") || "A blank canvas"}
                {event ? ` · ${event}` : ""}
              </span>
            </div>
            <Link
              href={`/inquire?${new URLSearchParams({ vibe: value.vibe, colors: value.colors.join(","), event })}`}
              className="button button-ink"
            >
              Use This Palette <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
      </div>
      <p className="palette-footnote">
        A starting point for your vision. Final colors and materials are
        confirmed during design.
      </p>
    </section>
  );
}
