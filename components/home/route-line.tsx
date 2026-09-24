"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const draw: Variants = {
  hidden: { clipPath: "inset(0 100% 100% 0)" },
  shown: { clipPath: "inset(0 0% 0% 0)", transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] } },
};

/**
 * The site's signature element: three parallel "road lines" echoing the R mark —
 * brand-orange in the middle, two faint white lanes either side.
 * Horizontal on desktop, vertical on mobile. Draws once on entering view
 * (clip-path reveal works for both orientations); fully drawn with reduced motion.
 *
 * The in-view trigger sits on the unclipped wrapper: a fully clipped element
 * never reports as intersecting.
 */
export function RouteLine() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="absolute top-0 bottom-0 left-[5px] w-[14px] lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-[14px] lg:w-auto"
      initial={reduceMotion ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div variants={draw} className="flex size-full justify-between lg:flex-col">
        <span className="w-px bg-white/20 lg:h-px lg:w-full" />
        <span className="w-0.5 bg-brand-orange lg:h-0.5 lg:w-full" />
        <span className="w-px bg-white/20 lg:h-px lg:w-full" />
      </motion.div>
    </motion.div>
  );
}
