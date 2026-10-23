// Cartoon balloon garland, Swanky's answer to Slush's 3D ribbon. Drawn, not rendered:
// flat brand fills, olive outlines, one white shine per balloon. Balloons scatter along a
// Catmull-Rom spine, relax so they pack like a real organic garland, and render as one
// group per balloon so the page can inflate, push, pop and recolor each one.
// Seeded and pure, so server and client always draw the same garland.
import { COLOR, PALETTES, pickWeighted, shineFor } from "./tokens";

type Point = [number, number];

export const GARLAND_VARIANTS = {
  hero: {
    w: 1600,
    h: 720,
    count: 150,
    tube: 70,
    seed: 7,
    spine: [
      [-90, 660],
      [200, 600],
      [420, 420],
      [620, 200],
      [840, 230],
      [1000, 420],
      [1190, 520],
      [1410, 360],
      [1700, 60],
    ] as Point[],
  },
  arch: {
    w: 1000,
    h: 940,
    count: 130,
    tube: 62,
    seed: 4,
    spine: [
      [150, 940],
      [130, 560],
      [250, 270],
      [500, 140],
      [750, 270],
      [870, 560],
      [850, 940],
    ] as Point[],
  },
  swoosh: {
    w: 1200,
    h: 620,
    count: 95,
    tube: 62,
    seed: 21,
    spine: [
      [90, 470],
      [320, 260],
      [600, 190],
      [880, 280],
      [1110, 480],
    ] as Point[],
  },
};
export type GarlandVariant = keyof typeof GARLAND_VARIANTS;

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Arc-length parameterised samples (point + unit normal) along a Catmull-Rom spline.
function sampleSpine(pts: Point[], steps = 600) {
  const raw: Point[] = [];
  const per = steps / (pts.length - 1);
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)],
      p1 = pts[i],
      p2 = pts[i + 1],
      p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < per; k++) {
      const t = k / per,
        t2 = t * t,
        t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 *
        (2 * b +
          (-a + c) * t +
          (2 * a - 5 * b + 4 * c - d) * t2 +
          (-a + 3 * b - 3 * c + d) * t3);
      raw.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  raw.push(pts[pts.length - 1]);
  const len = [0];
  for (let i = 1; i < raw.length; i++)
    len.push(
      len[i - 1] +
        Math.hypot(raw[i][0] - raw[i - 1][0], raw[i][1] - raw[i - 1][1]),
    );
  const total = len[len.length - 1];
  return (u: number) => {
    const target = u * total;
    let i = 1;
    while (i < len.length - 1 && len[i] < target) i++;
    const a = raw[i - 1],
      b = raw[i];
    const k = (target - len[i - 1]) / (len[i] - len[i - 1] || 1);
    const dx = b[0] - a[0],
      dy = b[1] - a[1],
      m = Math.hypot(dx, dy) || 1;
    return { x: a[0] + dx * k, y: a[1] + dy * k, nx: -dy / m, ny: dx / m };
  };
}

const f1 = (n: number) => Math.round(n * 10) / 10;

export function garlandSVG(variant: GarlandVariant, { slice = true } = {}) {
  const V = GARLAND_VARIANTS[variant];
  const R = rng(V.seed);
  const at = sampleSpine(V.spine);
  const balls: {
    x: number;
    y: number;
    r: number;
    fill: string;
    u: number;
    depth: number;
    k: number;
  }[] = [];
  for (let i = 0; i < V.count; i++) {
    const u = Math.min(0.999, Math.max(0.001, (i + R()) / V.count));
    const p = at(u);
    const roll = R();
    // 24", 16", 11" and 5" balloons, the mix a real organic garland uses
    let r = roll < 0.08 ? 68 : roll < 0.38 ? 50 : roll < 0.74 ? 34 : 18;
    const taper = Math.min(1, Math.min(u, 1 - u) * 7 + 0.45);
    r *= taper * (0.92 + R() * 0.16);
    const off = (R() * 2 - 1) * V.tube * taper * (r > 40 ? 0.45 : 1);
    const fill = pickWeighted(PALETTES.mix, R());
    balls.push({
      x: p.x + p.nx * off,
      y: p.y + p.ny * off,
      r,
      fill,
      u,
      depth: R(),
      k: R(),
    });
  }
  // Relax so balloons press together instead of stacking on one spot.
  for (let pass = 0; pass < 24; pass++) {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i],
          b = balls[j];
        const min = (a.r + b.r) * 0.82;
        const dx = b.x - a.x,
          dy = b.y - a.y,
          d = Math.hypot(dx, dy);
        if (d < min && d > 0.01) {
          const push = (min - d) / d;
          const wa = b.r / (a.r + b.r),
            wb = a.r / (a.r + b.r);
          a.x -= dx * push * wa;
          a.y -= dy * push * wa;
          b.x += dx * push * wb;
          b.y += dy * push * wb;
        }
      }
    }
  }
  // Big balloons sit back, little ones tuck in front, with some shuffle.
  balls.sort((a, b) => b.r + b.depth * 18 - (a.r + a.depth * 18));

  const body = balls
    .map((b) => {
      const sw = b.r > 35 ? 3.4 : b.r > 20 ? 2.8 : 2.2;
      const sx = b.x - b.r * 0.4,
        sy = b.y - b.r * 0.38;
      // Outer group takes cursor push; inner group takes inflate, bob, squish and pop.
      return `<g class="b" data-u="${b.u.toFixed(3)}" data-k="${b.k.toFixed(3)}" data-x="${f1(b.x)}" data-y="${f1(b.y)}"><g class="bi"><circle cx="${f1(b.x)}" cy="${f1(b.y)}" r="${f1(b.r)}" fill="${b.fill}" stroke="${COLOR.olive}" stroke-width="${sw}"/><ellipse class="sh" cx="${f1(sx)}" cy="${f1(sy)}" rx="${f1(b.r * 0.15)}" ry="${f1(b.r * 0.27)}" transform="rotate(38 ${f1(sx)} ${f1(sy)})" fill="${shineFor(b.fill)}" opacity=".9"/></g></g>`;
    })
    .join("");

  let sparkles = "";
  for (let i = 0; i < 6; i++) {
    const p = at(0.08 + i * 0.165 + R() * 0.04);
    const side = R() > 0.5 ? 1 : -1;
    const x = p.x + p.nx * side * (V.tube + 70),
      y = p.y + p.ny * side * (V.tube + 70),
      s = 1.1 + R() * 1.2;
    sparkles += `<path class="spk" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" d="M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10Z" fill="${COLOR.gold}" stroke="${COLOR.olive}" stroke-width="1.6" stroke-linejoin="round"/>`;
  }

  const aspect = slice ? ' preserveAspectRatio="xMidYMid slice"' : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${V.w} ${V.h}"${aspect} class="garland-svg" aria-hidden="true" focusable="false">${sparkles}${body}</svg>`;
}
