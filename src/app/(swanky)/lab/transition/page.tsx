import type { Metadata } from "next";
import { Garland } from "@/components/swanky/brand/garland";
import { PageIntro } from "@/components/swanky/motion/page-intro";
import { ButtonLink } from "@/components/swanky/ui/button-link";
import styles from "../lab.module.css";

// Second lab route, so the carousel transition has somewhere to go.
export const metadata: Metadata = {
  title: "Foundation lab: page two",
  robots: { index: false, follow: false },
};

export default function TransitionLab() {
  return (
    <section className="band band-blue" aria-labelledby="lab-two">
      <PageIntro className={`band-inner ${styles.workHero}`}>
        <p className="label" data-load="">
          Page two
        </p>
        <h1 id="lab-two" data-load="">
          It’s all in <em>the details.</em>
        </h1>
        <div className={styles.arch} data-load="">
          <Garland variant="arch" />
        </div>
        <div className="cta-row" data-load="">
          <ButtonLink href="/lab" solid>
            Back to the lab
          </ButtonLink>
        </div>
      </PageIntro>
    </section>
  );
}
