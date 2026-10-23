import type { Service } from "@/data/swanky";
import { Sticker } from "../brand/sticker";
import { TransitionLink } from "../motion/transition-link";

/** One of the four collections as a colored card that links to its page. */
export function ServiceCard({ service: s }: { service: Service }) {
  return (
    <TransitionLink
      href={s.href}
      className={`service-card tone-${s.color}`}
      data-card=""
    >
      <span className="label">{s.tag}</span>
      <Sticker name={s.sticker} />
      <span className="service-card-copy">
        <span className="service-card-title">{s.title}</span>
        <span className="service-card-text">{s.description}</span>
      </span>
    </TransitionLink>
  );
}
