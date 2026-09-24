import type { CSSProperties } from "react";
import Image from "next/image";
import type { PortfolioItem } from "@/data/swanky";
const positions = [
  [10, 48, 29, 0],
  [22, 24, 33, 1],
  [42, 12, 26, 0],
  [59, 18, 32, 2],
  [73, 38, 25, 1],
  [62, 58, 35, 0],
  [37, 61, 29, 2],
  [20, 67, 22, 1],
  [3, 69, 20, 2],
  [7, 29, 19, 2],
  [41, 36, 36, 1],
  [57, 0, 17, 2],
  [80, 64, 17, 1],
  [32, 8, 15, 2],
  [49, 80, 16, 1],
  [76, 18, 16, 0],
  [0, 51, 17, 0],
  [28, 47, 17, 2],
];
export function BalloonCluster({
  colors = ["#f2eee5", "#8c9aa8", "#a7b5a0"],
  className = "",
}: {
  colors?: string[];
  className?: string;
}) {
  const palette = colors.length ? colors : ["#f2eee5"];
  return (
    <div
      className={`balloon-cluster ${className}`}
      aria-hidden="true"
      style={
        {
          "--balloon-0": palette[0],
          "--balloon-1": palette[1] || palette[0],
          "--balloon-2": palette[2] || palette[0],
        } as CSSProperties
      }
    >
      {positions.map(([left, top, size, color], i) => (
        <span
          className="balloon"
          key={i}
          style={
            {
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}%`,
              background: `radial-gradient(circle at 30% 24%, #ffffff55 0%, transparent 44%), radial-gradient(circle at 70% 80%, #00000022, transparent 60%), var(--balloon-${color})`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
export function PortfolioArt({
  item,
  className = "",
  priority = false,
}: {
  item: PortfolioItem;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`portfolio-art ${className}`}
      style={{ background: item.background }}
    >
      {item.image ? (
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          preload={priority}
        />
      ) : (
        <>
          <span className="art-arch" />
          <span className="art-type">{item.motif}</span>
          <BalloonCluster colors={item.colors} />
          <span className="art-caption">
            PALETTE STUDY / {item.id === "soft-bloom" ? "02" : "01"}
          </span>
          <span className="concept-label">Illustrative concept</span>
          {process.env.NODE_ENV === "development" && (
            <span className="sr-only">Image needed: {item.imageNeeded}</span>
          )}
        </>
      )}
    </div>
  );
}
