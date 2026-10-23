import { MotionToggle } from "./motion-toggle";

const ITEMS = [
  "Custom balloon installations",
  "Nashville",
  "Brentwood",
  "Middle Tennessee",
  "Celebrate beautifully",
  "Garlands, arches + helium",
];

/** The olive announcement strip (Slush's top marquee). Pausable with the motion toggle. */
export function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-window" aria-hidden="true">
        <div className="ticker-track">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
      <p className="sr-only">
        Custom balloon installations in Nashville, Brentwood and Middle
        Tennessee.
      </p>
      <MotionToggle className="ticker-toggle" />
    </div>
  );
}
