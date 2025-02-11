"use client";

import { motion } from "framer-motion";

const containerVariants = {
  initial: { overflow: "hidden" },
  hover: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
};

const letterVariants = {
  initial: {
    y: 0,
    rotate: 0,
    scale: 1,
  },
  hover: {
    y: -25,
    rotate: -4,
    scale: 0.9,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const overlayLetterVariants = {
  initial: {
    y: 15,
    rotate: 4,
    scale: 0.9,
    opacity: 0,
  },
  hover: {
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.div className="relative">
        <motion.div
          variants={containerVariants}
          className="block"
          style={{ perspective: "800px" }}
        >
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block origin-bottom"
              style={{
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          variants={containerVariants}
          className="absolute inset-0"
          style={{ perspective: "800px" }}
        >
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={overlayLetterVariants}
              className="inline-block origin-top"
              style={{
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
