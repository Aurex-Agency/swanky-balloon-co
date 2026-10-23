import { MotionToggle } from "./motion-toggle";

// Shown in order; narrower screens keep only the first ones that fit.
const ITEMS = [
  <>
    <span className="ticker-wide">Custom </span>balloon installations
  </>,
  "Nashville, Brentwood + Middle Tennessee",
  "Garlands, arches + helium",
];

/** The olive announcement strip across the top. It stays still; the motion toggle here pauses the site's other loops. */
export function Ticker() {
  return (
    <div className="ticker">
      <p className="ticker-line">
        {ITEMS.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </p>
      <MotionToggle className="ticker-toggle" />
    </div>
  );
}
