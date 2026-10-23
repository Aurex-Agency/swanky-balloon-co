// Logo marks built from Jenn's master file. Never retype or redraw the monogram.
import {
  FULL_BOX,
  MONOGRAM_BOX,
  MONOGRAM_SHAPES,
  WORDMARK_SHAPES,
} from "./logo-shapes";

/** The SB monogram scaled into a box whose top-left is (x, y) with the given height. */
export function monogramGroup(
  x: number,
  y: number,
  height: number,
  fill: string,
) {
  const k = height / MONOGRAM_BOX.h;
  return `<g fill="${fill}" transform="translate(${x} ${y}) scale(${k.toFixed(5)}) translate(${-MONOGRAM_BOX.x} ${-MONOGRAM_BOX.y})">${MONOGRAM_SHAPES}</g>`;
}

export function primaryLogoSVG(fill: string) {
  const pad = 20;
  const b = FULL_BOX;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${b.x - pad} ${b.y - pad} ${b.w + pad * 2} ${b.h + pad * 2}"><g fill="${fill}">${MONOGRAM_SHAPES}${WORDMARK_SHAPES}</g></svg>`;
}

export function monogramSVG(fill: string) {
  const pad = 16;
  const b = MONOGRAM_BOX;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${b.x - pad} ${b.y - pad} ${b.w + pad * 2} ${b.h + pad * 2}"><g fill="${fill}">${MONOGRAM_SHAPES}</g></svg>`;
}
