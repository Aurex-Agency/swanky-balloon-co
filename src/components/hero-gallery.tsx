"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { portfolio } from "@/data/swanky";
import { BrandSeal } from "./wordmark";
import styles from "./hero-gallery.module.css";

export function HeroGallery() {
  const [active, setActive] = useState(0);
  const item = portfolio[active];
  return (
    <div
      className={styles.feature}
      role="region"
      aria-label="Featured Swanky work"
    >
      <span className={styles.sideNote}>CUSTOM BALLOONS. VERY YOU.</span>
      <div className={styles.frame}>
        {portfolio.map((photo, index) => (
          <div
            key={photo.id}
            className={`${styles.slide} ${index === active ? styles.active : ""}`}
            aria-hidden={index !== active}
          >
            <Image
              src={photo.image!}
              alt={photo.alt}
              fill
              sizes="(max-width: 600px) 85vw, (max-width: 900px) 48vw, 42vw"
              preload={index === 0}
              loading={index === 0 ? undefined : "eager"}
            />
          </div>
        ))}
        <Link
          href="/gallery"
          className={styles.view}
          aria-label="Explore Swanky’s installations"
        >
          <ArrowUpRight size={26} />
        </Link>
      </div>
      <div className={styles.seal}>
        <BrandSeal />
      </div>
      <div className={styles.caption}>
        <span className={styles.photoName} aria-live="polite">
          <small>A FEW SWANKY MOMENTS</small>
          {item.category}
        </span>
        <div className={styles.controls} aria-label="Featured installations">
          {portfolio.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`Show ${photo.category}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
