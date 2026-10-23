// The two Swanky eases.
// glide: Slush's default curve, slow start and long soft landing.
// float: replaces Slush's slush-bounce (which lurches to 57% in the first 8% of its time).
// A damped spring that lifts off gently, overshoots a soft 9% around 35% of the time and
// settles without a jolt, like a balloon on a string.
export const GLIDE = "0.65, 0.05, 0, 1";

export function springPath(
  damping = 0.62,
  stiffness = 10.5,
  lift = 3,
  samples = 60,
) {
  const wd = stiffness * Math.sqrt(1 - damping * damping);
  const b = (lift - damping * stiffness) / wd;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const y =
      i === samples
        ? 1
        : 1 +
          Math.exp(-damping * stiffness * t) *
            (-Math.cos(wd * t) + b * Math.sin(wd * t));
    pts.push(`${t.toFixed(4)},${y.toFixed(4)}`);
  }
  return "M" + pts.join(" L");
}

export const FLOAT = springPath();
export const DEFAULT_DURATION = 0.525;
