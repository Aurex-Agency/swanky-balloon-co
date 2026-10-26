// One place that registers GSAP plugins and the Swanky eases. Client components import
// GSAP from here so the eases exist before any child's useGSAP runs.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { DEFAULT_DURATION, FLOAT, GLIDE } from "./eases";

let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);
  CustomEase.create("glide", GLIDE);
  CustomEase.create("float", FLOAT);
  gsap.defaults({ ease: "glide", duration: DEFAULT_DURATION });
  registered = true;
}

export const BRAND_COLORS = [
  "#E8C3BA",
  "#A8BDCB",
  "#C7AD50",
  "#C9B79F",
  "#565522",
  "#F7F0E6",
];

// Plugins only a few components use load on demand, which keeps them out of the JS every
// page downloads and parses before it can respond.
export const loadDraggable = () =>
  Promise.all([import("gsap/Draggable"), import("gsap/InertiaPlugin")]).then(
    ([{ Draggable }, { InertiaPlugin }]) => {
      gsap.registerPlugin(Draggable, InertiaPlugin);
      return Draggable;
    },
  );
export const loadFlip = () =>
  import("gsap/Flip").then(({ Flip }) => {
    gsap.registerPlugin(Flip);
    return Flip;
  });

export { gsap, ScrollTrigger, SplitText, useGSAP };
