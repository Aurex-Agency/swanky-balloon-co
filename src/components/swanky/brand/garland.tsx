import { garlandSVG, type GarlandVariant } from "@/lib/swanky/garland";
import { GarlandMotion } from "./garland-motion";

type Props = {
  variant: GarlandVariant;
  interactive?: boolean;
  className?: string;
  id?: string;
};

/** Cartoon balloon garland, drawn on the server and brought to life on the client. */
export function Garland({
  variant,
  interactive = false,
  className,
  id,
}: Props) {
  return (
    <GarlandMotion
      svg={garlandSVG(variant)}
      interactive={interactive}
      className={className}
      id={id}
    />
  );
}
