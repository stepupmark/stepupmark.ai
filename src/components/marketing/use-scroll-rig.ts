import { useRef } from "react";

import { useScroll, type MotionValue } from "motion/react";

import { useMediaQuery } from "~/hooks/use-media-query";

type ScrollRig = {
  /** Attach to the tall outer section in both branches, so the progress value
   *  is always measuring a real element. */
  ref: React.RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
  enabled: boolean;
};

// A rig needs room to draw and a visitor who wants motion. Below `lg` the dial
// is off-screen and the card track can't travel, so both sections fall back to
// plain stacked layouts instead of charging screens of scroll for nothing.
export function useScrollRig(): ScrollRig {
  const ref = useRef<HTMLElement>(null);
  const roomToDraw = useMediaQuery("(min-width: 64rem)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return { ref, progress: scrollYProgress, enabled: roomToDraw && !reduceMotion };
}
