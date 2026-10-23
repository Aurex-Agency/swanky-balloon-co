// Swanky sticker library: Jenn's line illustrations as filled cartoon stickers
// (brand fill, 3px olive outline, one ivory shine), plus her logo marks.
// Every entry is a static SVG string rendered inline by <Sticker>.
import { COLOR as C } from "./tokens";
import { monogramGroup, monogramSVG, primaryLogoSVG } from "./logo";

const S = `stroke="${C.olive}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const shine = (cx: number, cy: number, rx: number, ry: number, rot = 0) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="${C.ivory}" opacity=".75"/>`;
const svg = (vb: string, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${body}</svg>`;
const sparkle = (x: number, y: number, s: number, fill: string = C.olive) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10Z" fill="${fill}"/>`;

// Classic scallop: arcs bulging outward between points on a circle (labels).
export function scallopPath(cx: number, cy: number, r: number, n: number) {
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  const ar = Math.sin(Math.PI / n) * r * 1.08;
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < pts.length; i++)
    d += ` A${ar.toFixed(2)} ${ar.toFixed(2)} 0 0 1 ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`;
  return d + "Z";
}

// Radial outline sampled from r(θ): the seal's soft scallop and wave ring.
function radial(
  cx: number,
  cy: number,
  fn: (a: number) => number,
  steps = 720,
) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rr = fn(a);
    d += `${i ? "L" : "M"}${(cx + rr * Math.cos(a)).toFixed(2)} ${(cy + rr * Math.sin(a)).toFixed(2)}`;
  }
  return d + "Z";
}

// Jenn's round signatures (Canva guide p.4) around the real SB monogram: soft scallop or
// wave-ring edge, serif name on top, spaced tagline below, sparkles at 9 and 3 o'clock,
// and the monogram's balloon rising past the inner ring.
function seal(fill: string, border: "scallop" | "wave", id: string) {
  const edge =
    border === "wave"
      ? `<circle cx="100" cy="100" r="93" fill="${fill}" stroke="${C.olive}" stroke-width="1.8"/><path d="${radial(100, 100, (a) => 87 + 2.2 * Math.sin(a * 32))}" fill="none" stroke="${C.olive}" stroke-width="1.5"/>`
      : `<path d="${radial(100, 100, (a) => 87 + 6 * Math.abs(Math.cos(a * 10)))}" fill="${fill}" stroke="${C.olive}" stroke-width="2"/><circle cx="100" cy="100" r="62" fill="none" stroke="${C.olive}" stroke-width="1"/>`;
  return svg(
    "0 0 200 200",
    `<defs><path id="${id}-top" d="M27 100 A73 73 0 0 1 173 100"/><path id="${id}-bot" d="M21 100 A79 79 0 0 0 179 100"/></defs>${edge}` +
      `<text font-family="Playfair Display Variable, Playfair Display, Georgia, serif" font-size="15" letter-spacing="2.5" fill="${C.olive}"><textPath href="#${id}-top" startOffset="50%" text-anchor="middle">SWANKY BALLOON CO.</textPath></text>` +
      `<text font-family="Montserrat Variable, Montserrat, Helvetica, Arial, sans-serif" font-size="7.8" font-weight="600" letter-spacing="3" fill="${C.olive}"><textPath href="#${id}-bot" startOffset="50%" text-anchor="middle">CELEBRATE BEAUTIFULLY</textPath></text>` +
      `${sparkle(23, 101, 0.52)}${sparkle(177, 101, 0.52)}${monogramGroup(66, 50, 102, C.olive)}`,
  );
}

function swoosh() {
  const cols = [C.blush, C.blue, C.sand, C.ivory, C.olive, C.gold];
  let out = "";
  for (let i = 0; i < 26; i++) {
    const t = i / 25;
    const x = 18 + t * 184;
    const y = 70 - Math.sin(t * Math.PI) * 42 + Math.sin(i * 2.7) * 7;
    const rad = 9 + ((i * 37) % 11) * (0.6 + Math.sin(t * Math.PI) * 0.7);
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="${cols[(i * 5) % 6]}" stroke="${C.olive}" stroke-width="2"/>`;
  }
  return svg("0 0 220 110", out);
}

export const STICKERS = {
  "balloon-dog": svg(
    "0 0 160 120",
    `<g fill="${C.blush}" ${S}><ellipse cx="112" cy="90" rx="7" ry="17" transform="rotate(12 112 90)"/><ellipse cx="100" cy="92" rx="7" ry="16" transform="rotate(-6 100 92)"/><ellipse cx="129" cy="50" rx="6.5" ry="16" transform="rotate(32 129 50)"/><ellipse cx="86" cy="66" rx="33" ry="13"/><ellipse cx="66" cy="90" rx="7" ry="17" transform="rotate(8 66 90)"/><ellipse cx="55" cy="91" rx="7" ry="16" transform="rotate(-12 55 91)"/><ellipse cx="55" cy="47" rx="8" ry="18" transform="rotate(-22 55 47)"/><ellipse cx="54" cy="16" rx="6" ry="13" transform="rotate(28 54 16)"/><ellipse cx="44" cy="31" rx="14" ry="10" transform="rotate(-10 44 31)"/><ellipse cx="45" cy="14" rx="6" ry="12" transform="rotate(-6 45 14)"/><ellipse cx="25" cy="35" rx="12" ry="7" transform="rotate(10 25 35)"/></g>` +
      `<g fill="${C.blush}" ${S}><circle cx="118" cy="62" r="3.4"/><circle cx="58" cy="64" r="3.4"/></g>${shine(80, 60, 14, 3.4, -4)}${shine(40, 27, 5, 2.4, -12)}${shine(19, 33, 4, 1.8, 8)}<circle cx="14" cy="36" r="2.2" fill="${C.olive}"/>`,
  ),
  balloon: svg(
    "0 0 80 140",
    `<path d="M40 98 C33 108 47 114 40 124 C34 132 45 136 41 140" fill="none" stroke="${C.olive}" stroke-width="2.4" stroke-linecap="round"/><path d="M40 8 C62 8 74 26 74 46 C74 70 56 88 43 92 L37 92 C24 88 6 70 6 46 C6 26 18 8 40 8Z" fill="${C.blue}" ${S}/><path d="M34 99 L46 99 L40 91Z" fill="${C.blue}" ${S}/>${shine(23, 33, 5, 11, 22)}`,
  ),
  cake: svg(
    "0 0 120 120",
    `<ellipse cx="60" cy="104" rx="52" ry="8" fill="${C.ivory}" ${S}/><rect x="18" y="64" width="84" height="38" rx="10" fill="${C.sand}" ${S}/><path d="M18 74 C18 64 24 64 30 64 H90 C96 64 102 64 102 74 C97 80 93 72 88 78 C83 84 79 72 74 78 C69 84 65 72 60 78 C55 84 51 72 46 78 C41 84 37 72 32 78 C27 84 23 72 18 78Z" fill="${C.ivory}" ${S}/><rect x="32" y="38" width="56" height="28" rx="9" fill="${C.blush}" ${S}/><path d="M32 46 C32 38 36 38 41 38 H79 C84 38 88 38 88 46 C84 51 81 44 77 49 C73 54 70 44 66 49 C62 54 58 44 54 49 C50 54 47 44 43 49 C39 54 36 44 32 49Z" fill="${C.ivory}" ${S}/>` +
      `<g fill="${C.blue}" ${S}><rect x="44" y="20" width="6" height="18" rx="2"/><rect x="57" y="16" width="6" height="22" rx="2"/><rect x="70" y="20" width="6" height="18" rx="2"/></g><g fill="${C.gold}" ${S} stroke-width="2"><path d="M47 6 C51 11 51 15 47 16 C43 15 43 11 47 6Z"/><path d="M60 2 C64 7 64 11 60 12 C56 11 56 7 60 2Z"/><path d="M73 6 C77 11 77 15 73 16 C69 15 69 11 73 6Z"/></g>${shine(28, 92, 5, 2, 0)}`,
  ),
  bow: svg(
    "0 0 140 110",
    `<g fill="${C.gold}" ${S}><path d="M66 56 L44 100 L57 94 L63 104 L72 60Z"/><path d="M74 56 L96 100 L83 94 L77 104 L68 60Z"/><path d="M68 48 C50 18 12 16 12 40 C12 64 50 64 68 54Z"/><path d="M72 48 C90 18 128 16 128 40 C128 64 90 64 72 54Z"/><ellipse cx="70" cy="51" rx="10" ry="11"/></g>` +
      `<path d="M60 47 C46 34 28 32 24 40" fill="none" stroke="${C.olive}" stroke-width="2" stroke-linecap="round"/><path d="M80 47 C94 34 112 32 116 40" fill="none" stroke="${C.olive}" stroke-width="2" stroke-linecap="round"/>${shine(30, 34, 6, 2.6, -20)}${shine(110, 34, 6, 2.6, 20)}`,
  ),
  rings: svg(
    "0 0 140 116",
    `<g fill="none" stroke-linecap="round"><circle cx="56" cy="72" r="30" stroke="${C.olive}" stroke-width="13"/><circle cx="56" cy="72" r="30" stroke="${C.gold}" stroke-width="8"/><circle cx="86" cy="72" r="30" stroke="${C.olive}" stroke-width="13"/><circle cx="86" cy="72" r="30" stroke="${C.gold}" stroke-width="8"/><path d="M36 50 A30 30 0 0 1 56 42" stroke="${C.olive}" stroke-width="13"/><path d="M36 50 A30 30 0 0 1 56 42" stroke="${C.gold}" stroke-width="8"/></g>` +
      `<path d="M86 42 L74 30 L80 20 H92 L98 30Z" fill="${C.blue}" ${S}/><path d="M74 30 H98 M80 20 L86 30 L92 20" fill="none" stroke="${C.olive}" stroke-width="1.6"/>${shine(44, 52, 5, 2, -40)}`,
  ),
  "heart-bubble": svg(
    "0 0 120 110",
    `<path d="M60 8 C92 8 112 26 112 50 C112 74 92 90 62 90 C54 90 48 89 42 87 L20 102 L28 80 C16 72 8 62 8 50 C8 26 28 8 60 8Z" fill="${C.ivory}" ${S}/><path d="M60 68 C40 54 34 46 34 37 C34 29 40 24 47 24 C53 24 57 28 60 33 C63 28 67 24 73 24 C80 24 86 29 86 37 C86 46 80 54 60 68Z" fill="${C.blush}" ${S}/>${shine(46, 34, 5, 3, -30)}`,
  ),
  envelope: svg(
    "0 0 140 116",
    `<rect x="12" y="30" width="116" height="74" rx="9" fill="${C.ivory}" ${S}/><path d="M16 100 L57 64 M124 100 L83 64" fill="none" stroke="${C.olive}" stroke-width="2.4" stroke-linecap="round"/><path d="M14 36 L70 76 L126 36" fill="none" ${S}/><circle cx="70" cy="74" r="13" fill="${C.blush}" ${S}/>` +
      `<path d="M70 80 C64 76 62 73 62 70.5 C62 68 64 67 66 67 C68 67 69 68 70 69.5 C71 68 72 67 74 67 C76 67 78 68 78 70.5 C78 73 76 76 70 80Z" fill="${C.olive}"/>${sparkle(30, 14, 0.8, C.gold)}${sparkle(112, 18, 0.6, C.gold)}`,
  ),
  sparkle: svg(
    "0 0 100 100",
    `<path d="M50 4 C54 34 66 46 96 50 C66 54 54 66 50 96 C46 66 34 54 4 50 C34 46 46 34 50 4Z" fill="${C.gold}" ${S}/>${shine(44, 36, 3, 9, 10)}`,
  ),
  "seal-blush": seal(C.blush, "scallop", "seal-blush"),
  "seal-blue": seal(C.blue, "wave", "seal-blue"),
  "scallop-label": svg(
    "0 0 120 120",
    `<path d="${scallopPath(60, 60, 52, 12)}" fill="${C.blush}" ${S}/>`,
  ),
  swoosh: swoosh(),
  "logo-primary": primaryLogoSVG(C.olive),
  "logo-primary-ivory": primaryLogoSVG(C.ivory),
  monogram: monogramSVG(C.olive),
} as const;

export type StickerName = keyof typeof STICKERS;
