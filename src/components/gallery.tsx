"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from "lucide-react";
import { portfolio, categories } from "@/data/swanky";
import { PortfolioArt } from "./balloons";
export function Gallery({ limit }: { limit?: number }) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const items = portfolio
    .filter((p) => category === "All" || p.category === category)
    .slice(0, limit || portfolio.length);
  useEffect(() => {
    if (active === null) {
      dialog.current?.close();
      return;
    }
    dialog.current?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [active]);
  function move(direction: number) {
    setActive((i) =>
      i === null ? null : (i + direction + items.length) % items.length,
    );
  }
  return (
    <>
      <div className="gallery-filters" aria-label="Filter gallery">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setActive(null);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <button
            className="gallery-card"
            key={item.id}
            onClick={() => setActive(i)}
            aria-label={`View ${item.title}`}
          >
            <PortfolioArt item={item} />
            <span className="gallery-caption">
              <span>
                <small>
                  {item.image ? item.category : "COLOR + STYLING CONCEPT"}
                </small>
                <strong>{item.title}</strong>
              </span>
              <ArrowUpRight size={22} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        className="lightbox"
        ref={dialog}
        onCancel={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
        aria-labelledby="lightbox-title"
      >
        {active !== null && items[active] && (
          <>
            <button
              className="lightbox-close icon-button"
              onClick={() => setActive(null)}
              aria-label="Close image"
            >
              <X />
            </button>
            <PortfolioArt item={items[active]} />
            <div className="lightbox-caption">
              <button
                className="icon-button"
                onClick={() => move(-1)}
                aria-label="Previous image"
              >
                <ArrowLeft />
              </button>
              <div>
                <h2 id="lightbox-title">{items[active].title}</h2>
                <p>
                  {items[active].image
                    ? items[active].category
                    : "Illustrative concept. Portfolio photography to come."}
                </p>
              </div>
              <button
                className="icon-button"
                onClick={() => move(1)}
                aria-label="Next image"
              >
                <ArrowRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
