// One place that registers GSAP plugins and the Swanky eases. Client components import
// GSAP from here so the eases exist before any child's useGSAP runs.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { DEFAULT_DURATION, FLOAT, GLIDE } from "./eases";

let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    CustomEase,
    Draggable,
    InertiaPlugin,
    Flip,
  );
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

export { gsap, ScrollTrigger, SplitText, Draggable, Flip, useGSAP };
