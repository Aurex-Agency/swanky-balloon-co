// The balloon curtain for page transitions: a flock of cartoon balloons, in the garland's
// style, that rises up and over the screen and floats away. It is built for the visitor's
// actual screen size (so balloons stay round and the swap is always fully covered) with a
// fresh arrangement each time it is rebuilt.
//
// Top to bottom the curtain is: a scattered leading edge (enters first as it rises), a
// dense core over a solid backing at least one screen tall, and a trailing edge whose
// balloons trail strings. Two layers move at slightly different speeds for depth: the
// main flock (small balloons behind larger ones, over the solid backing) and a sparse
// front layer of big balloons. Each layer is returned as SVG markup with its colors baked in, so the
// page can turn it into a pre-decoded image and only ever slide finished bitmaps.
import { COLOR } from "./tokens";

export type Curtain = {
  /** Heights in px. */
  lead: number;
  core: number;
  total: number;
  layers: [main: string, front: string];
};

// Share of balloons per color slot. Slot 5 is always olive, kept rarest.
const SLOT_WEIGHTS = [0.26, 0.23, 0.19, 0.15, 0.12, 0.05];

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};
const f1 = (n: number) => Math.round(n * 10) / 10;

type Ball = { x: number; y: number; r: number; k: number };

export function buildCurtain(
  width: number,
  height: number,
  colors: string[] = curtainColors(),
  backing = "#EFE4D6",
  seed = (Math.random() * 1e9) | 0,
): Curtain {
  const rand = rng(seed);
  // Balloon size follows the screen width: larger relative to small phones.
  const R = Math.min(96, Math.max(44, 0.06 * width + 20));
  const lead = Math.round(height * 0.32);
  const core = Math.round(height * 1.4);
  const trail = Math.round(height * 0.42);
  const total = lead + core + trail;
  const coreEnd = lead + core;
  // Fully dense a balloon-and-a-half past each edge of the solid backing, so its
  // straight edges are always hidden under balloons.
  const pad = R * 1.5;
  const density = (y: number) =>
    y < lead - pad
      ? 0.06 + 0.94 * smooth(y / (lead - pad))
      : y < coreEnd + pad
        ? 1
        : 1 - 0.92 * smooth((y - coreEnd - pad) / (trail - pad));
  const slot = () => {
    const r = rand();
    let acc = 0;
    for (let i = 0; i < SLOT_WEIGHTS.length; i++) {
      acc += SLOT_WEIGHTS[i];
      if (r <= acc) return i;
    }
    return 0;
  };

  function scatter(scale: number, keep: number): Ball[] {
    const r0 = R * scale;
    const step = r0 * 1.55;
    const balls: Ball[] = [];
    let row = 0;
    for (let y = -r0 * 0.4; y < total + r0; y += step * 0.866, row++) {
      for (let x = ((row % 2) * step) / 2 - step; x < width + step; x += step) {
        const jy = y + (rand() - 0.5) * step * 0.6;
        if (rand() > density(jy) * keep) continue;
        balls.push({
          x: x + (rand() - 0.5) * step * 0.6,
          y: jy,
          r: r0 * (0.72 + rand() * 0.56),
          k: slot(),
        });
      }
    }
    // Relax so balloons press together like a real bunch instead of piling up.
    for (let pass = 0; pass < 6; pass++) {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i],
            b = balls[j];
          const min = (a.r + b.r) * 0.8;
          const dx = b.x - a.x,
            dy = b.y - a.y,
            d = Math.hypot(dx, dy);
          if (d < min && d > 0.01) {
            const push = ((min - d) / d) * 0.5;
            a.x -= dx * push;
            a.y -= dy * push;
            b.x += dx * push;
            b.y += dy * push;
          }
        }
      }
    }
    return balls.sort((a, b) => b.r - a.r);
  }

  function draw(sets: [Ball[], boolean][], withBacking: boolean) {
    const sw = f1(Math.max(2, R / 28));
    let out = withBacking
      ? `<rect x="0" y="${lead}" width="${width}" height="${core}" fill="${backing}"/>`
      : "";
    for (const [balls, strings] of sets)
      for (const b of balls) {
        const x = f1(b.x),
          y = f1(b.y),
          r = f1(b.r);
        // Balloons in the trailing edge trail a curly string and a knot.
        if (strings && b.y > coreEnd - b.r) {
          const len = b.r * (1.2 + rand() * 1.2);
          const top = y + r;
          const sway = b.r * 0.35 * (rand() > 0.5 ? 1 : -1);
          out += `<path d="M${x} ${f1(top)} C${f1(b.x + sway)} ${f1(top + len * 0.35)} ${f1(b.x - sway)} ${f1(top + len * 0.65)} ${x} ${f1(top + len)}" fill="none" stroke="${COLOR.olive}" stroke-width="${f1(sw * 0.7)}" stroke-linecap="round"/>`;
          out += `<path d="M${f1(b.x - r * 0.12)} ${f1(top + r * 0.1)} L${f1(b.x + r * 0.12)} ${f1(top + r * 0.1)} L${x} ${f1(top - r * 0.05)}Z" fill="${colors[b.k]}" stroke="${COLOR.olive}" stroke-width="${f1(sw * 0.7)}" stroke-linejoin="round"/>`;
        }
        const sx = f1(b.x - b.r * 0.4),
          sy = f1(b.y - b.r * 0.38);
        out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${colors[b.k]}" stroke="${COLOR.olive}" stroke-width="${sw}"/><ellipse cx="${sx}" cy="${sy}" rx="${f1(b.r * 0.15)}" ry="${f1(b.r * 0.27)}" transform="rotate(38 ${sx} ${sy})" fill="#FFFBF4" opacity=".85"/>`;
      }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${total}" viewBox="0 0 ${width} ${total}" aria-hidden="true" focusable="false">${out}</svg>`;
  }

  return {
    lead,
    core,
    total,
    layers: [
      draw(
        [
          [scatter(0.62, 0.95), false],
          [scatter(1, 1), true],
        ],
        true,
      ),
      draw([[scatter(1.3, 0.22), true]], false),
    ],
  };
}

/** Five light brand colors shuffled into slots 0–4; olive always takes slot 5. */
export function curtainColors(rand: () => number = Math.random) {
  const light: string[] = [
    COLOR.blush,
    COLOR.blue,
    COLOR.ivory,
    COLOR.sand,
    COLOR.gold,
  ];
  for (let i = light.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [light[i], light[j]] = [light[j], light[i]];
  }
  return [...light, COLOR.olive];
}
