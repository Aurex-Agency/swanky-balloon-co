// Brand values from Jenn's Canva guide ("Swanky — Expanded Brand & Social Guide", p.5).
// CSS custom properties in src/styles/swanky/tokens.css mirror these.
export const COLOR = {
  ivory: "#F7F0E6",
  olive: "#565522",
  oliveDeep: "#3E3D17",
  gold: "#C7AD50",
  blue: "#A8BDCB",
  blush: "#E8C3BA",
  sand: "#C9B79F",
  charcoal: "#252524",
} as const;

export type Weighted = readonly (readonly [string, number])[];

// Balloon mixes. Weights sum to 1 and drive both the garland and the palette chips.
export const PALETTES = {
  mix: [
    [COLOR.blush, 0.27],
    [COLOR.blue, 0.22],
    [COLOR.ivory, 0.16],
    [COLOR.sand, 0.13],
    [COLOR.gold, 0.14],
    [COLOR.olive, 0.08],
  ],
  bloom: [
    [COLOR.blush, 0.5],
    [COLOR.ivory, 0.3],
    [COLOR.sand, 0.2],
  ],
  blue: [
    [COLOR.blue, 0.5],
    [COLOR.ivory, 0.3],
    [COLOR.sand, 0.2],
  ],
  garden: [
    [COLOR.olive, 0.2],
    [COLOR.gold, 0.3],
    [COLOR.ivory, 0.3],
    [COLOR.sand, 0.2],
  ],
  golden: [
    [COLOR.gold, 0.42],
    [COLOR.sand, 0.3],
    [COLOR.blush, 0.28],
  ],
} as const satisfies Record<string, Weighted>;

export type PaletteName = keyof typeof PALETTES;

export const PALETTE_LABELS: Record<PaletteName, string> = {
  mix: "Swanky mix",
  bloom: "Soft Bloom",
  blue: "Blue Hour",
  garden: "Garden Party",
  golden: "Golden Hour",
};

export function pickWeighted(mix: Weighted, k: number) {
  let acc = 0;
  for (const [hex, w] of mix) {
    acc += w;
    if (k <= acc) return hex;
  }
  return mix[mix.length - 1][0];
}

export const shineFor = (fill: string) =>
  fill === COLOR.ivory ? "#FFFFFF" : "#FFFBF4";
