// The two Swanky eases.
// glide: Slush's default curve, slow start and long soft landing.
// float: replaces Slush's slush-bounce (which lurches to 57% in the first 8% of its time).
// A damped spring that lifts off gently, overshoots a soft 9% around 35% of the time and
// settles without a jolt, like a balloon on a string.
export const GLIDE = "0.65, 0.05, 0, 1";

function spring(damping: number, stiffness: number, lift: number) {
  const wd = stiffness * Math.sqrt(1 - damping * damping);
  const b = (lift - damping * stiffness) / wd;
  return (t: number) =>
    t >= 1
      ? 1
      : 1 +
        Math.exp(-damping * stiffness * t) *
          (-Math.cos(wd * t) + b * Math.sin(wd * t));
}

export function springPath(
  damping = 0.62,
  stiffness = 10.5,
  lift = 3,
  samples = 60,
) {
  const y = spring(damping, stiffness, lift);
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    pts.push(`${t.toFixed(4)},${y(t).toFixed(4)}`);
  }
  return "M" + pts.join(" L");
}

/** The same float spring as a CSS linear() easing, for the Web Animations API. */
export function floatLinear(samples = 40) {
  const y = spring(0.62, 10.5, 3);
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) pts.push(y(i / samples).toFixed(4));
  return `linear(${pts.join(", ")})`;
}

export const FLOAT = springPath();
export const DEFAULT_DURATION = 0.525;
