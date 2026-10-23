"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PortfolioItem } from "@/data/swanky";
import { Flip, gsap, useGSAP } from "@/lib/swanky/gsap";
import { useReducedMotion } from "../motion/motion-provider";
import { TransitionLink } from "../motion/transition-link";

type Props = { items: PortfolioItem[]; categories: string[] };

/** Palette filters (Flip-animated) over the portfolio, with a full-photo lightbox. */
export function WorkGallery({ items, categories }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<PortfolioItem | null>(null);
  const shown = items.filter((i) => filter === "All" || i.category === filter);

  // Animate cards from where they were to where the new filter puts them.
  useGSAP(
    () => {
      if (!flipState.current || reduced) return;
      Flip.from(flipState.current, {
        duration: 0.5,
        ease: "glide",
        scale: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { autoAlpha: 0, scale: 0.85 },
            { autoAlpha: 1, scale: 1, duration: 0.6, ease: "float" },
          ),
        onLeave: (els) =>
          gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.3 }),
      });
      flipState.current = null;
    },
    { scope: ref, dependencies: [filter] },
  );

  const choose = (c: string) => {
    if (ref.current)
      flipState.current = Flip.getState(
        ref.current.querySelectorAll(".work-card, .filter-active"),
      );
    setFilter(c);
  };

  return (
    <div ref={ref} className="work-gallery">
      <div className="filter-pills" role="group" aria-label="Filter by palette">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className="pill filter-pill"
            aria-pressed={filter === c}
            onClick={() => choose(c)}
          >
            {filter === c && (
              <span
                className="filter-active"
                data-flip-id="active"
                aria-hidden="true"
              />
            )}
            <span>{c}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length}{" "}
        {shown.length === 1 ? "celebration" : "celebrations"}
      </p>
      <ul className="work-grid">
        {shown.map((item) => (
          <li key={item.id} className="work-card" data-flip-id={item.id}>
            <button
              type="button"
              className="work-photo"
              aria-label={`View ${item.title}`}
              onClick={() => {
                setOpen(item);
                dialogRef.current?.showModal();
              }}
            >
              <Image
                src={item.image!}
                alt={item.alt}
                width={900}
                height={1150}
                sizes="(max-width: 760px) 92vw, 30vw"
              />
            </button>
            <div className="work-meta">
              <span className="dots" aria-hidden="true">
                {item.colors.map((c) => (
                  <i key={c} style={{ background: c }} />
                ))}
              </span>
              <h3>
                <TransitionLink href={`/work/${item.id}`}>
                  {item.title}
                </TransitionLink>
              </h3>
              <p>{item.category}</p>
            </div>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={open?.title ?? "Photo"}
        onClose={() => setOpen(null)}
      >
        {open && (
          <>
            <Image
              src={open.image!}
              alt={open.alt}
              width={1200}
              height={1500}
              sizes="90vw"
            />
            <div className="lightbox-bar">
              <p>{open.title}</p>
              <TransitionLink
                href={`/work/${open.id}`}
                className="pill"
                onClick={() => dialogRef.current?.close()}
              >
                See the story
              </TransitionLink>
              <button
                type="button"
                className="pill is-solid"
                onClick={() => dialogRef.current?.close()}
              >
                Close
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
