import { STICKERS, type StickerName } from "@/lib/swanky/stickers";

type Props = { name: StickerName; label?: string; className?: string };

/** Inline SVG sticker or logo mark from the Swanky library. Decorative unless labelled. */
export function Sticker({ name, label, className }: Props) {
  return (
    <span
      className={`sticker ${className ?? ""}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: STICKERS[name] }}
    />
  );
}
