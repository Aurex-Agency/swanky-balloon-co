import { HeadingReveal } from "../motion/reveal";

type Tone = "ivory" | "blue" | "blush" | "olive";

type BandProps = {
  tone?: Tone;
  /** Scalloped top edge; used on olive bands. */
  scallop?: boolean;
  id?: string;
  className?: string;
  labelledBy?: string;
  children: React.ReactNode;
};

/** A full-bleed section band. Sections are never framed cards. */
export function Band({
  tone = "ivory",
  scallop,
  id,
  className,
  labelledBy,
  children,
}: BandProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`band band-${tone} ${scallop ? "scallop-top" : ""} ${className ?? ""}`}
    >
      <div className="band-inner">{children}</div>
    </section>
  );
}

type HeadProps = {
  eyebrow?: string;
  title: React.ReactNode;
  id?: string;
  children?: React.ReactNode;
};

/** Eyebrow, two-line Playfair headline (roman + italic) with the 3D line reveal, and a lead. */
export function SectionHead({ eyebrow, title, id, children }: HeadProps) {
  return (
    <div className="section-head">
      {eyebrow && <p className="label">{eyebrow}</p>}
      <HeadingReveal id={id}>{title}</HeadingReveal>
      {children && <p>{children}</p>}
    </div>
  );
}
