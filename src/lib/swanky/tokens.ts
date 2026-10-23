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

// The default garland mix. Weights sum to 1.
export const PALETTES = {
  mix: [
    [COLOR.blush, 0.27],
    [COLOR.blue, 0.22],
    [COLOR.ivory, 0.16],
    [COLOR.sand, 0.13],
    [COLOR.gold, 0.14],
    [COLOR.olive, 0.08],
  ],
} as const satisfies Record<string, Weighted>;

/** A garland mix from a palette's colors: the first color leads, the rest accent. */
export function mixFrom(colors: readonly string[]): Weighted {
  if (!colors.length) return PALETTES.mix;
  const weights =
    colors.length === 3
      ? [0.45, 0.33, 0.22]
      : colors.map(() => 1 / colors.length);
  return colors.map((c, i) => [c, weights[i]] as const);
}

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
