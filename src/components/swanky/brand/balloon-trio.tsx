import { shineFor } from "@/lib/swanky/tokens";

const SPOTS = [
  { cx: 62, cy: 70, r: 40 },
  { cx: 118, cy: 52, r: 44 },
  { cx: 96, cy: 112, r: 42 },
];

/** Three cartoon balloons in a palette's colors. Decorative; pair it with text. */
export function BalloonTrio({
  colors,
  className,
}: {
  colors: readonly string[];
  className?: string;
}) {
  const fills = colors.length ? colors : ["#F7F0E6", "#F7F0E6", "#F7F0E6"];
  return (
    <svg
      className={`balloon-trio ${className ?? ""}`}
      viewBox="0 0 180 190"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M62 112 C58 140 74 150 84 186 M118 98 C122 130 104 150 90 186 M96 154 C94 166 92 176 88 186"
        fill="none"
        stroke="#565522"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {SPOTS.map((s, i) => {
        const fill = fills[i % fills.length];
        const sx = s.cx - s.r * 0.4,
          sy = s.cy - s.r * 0.38;
        return (
          <g key={i}>
            <circle
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill={fill}
              stroke="#565522"
              strokeWidth="3"
            />
            <ellipse
              cx={sx}
              cy={sy}
              rx={s.r * 0.15}
              ry={s.r * 0.27}
              transform={`rotate(38 ${sx} ${sy})`}
              fill={shineFor(fill)}
              opacity=".9"
            />
          </g>
        );
      })}
    </svg>
  );
}
