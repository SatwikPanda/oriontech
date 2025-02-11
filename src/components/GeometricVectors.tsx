"use client";

import { motion } from "framer-motion";

const shapes = [
  { shape: "circle", size: 60, position: "top-40 right-52" },
  { shape: "square", size: 80, position: "bottom-60 left-44" },
  { shape: "triangle", size: 70, position: "top-60 left-1/4" },
  { shape: "circle", size: 50, position: "bottom-52 right-1/4" },
  { shape: "square", size: 65, position: "top-1/3 right-1/3" },
  { shape: "triangle", size: 55, position: "bottom-1/4 left-1/3" },
];

export default function GeometricVectors() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.position}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.8,
            scale: 1,
            rotate: [0, 360],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        >
          {shape.shape === "circle" && (
            <div
              className="rounded-full border-[4px] border-black/90"
              style={{ width: `${shape.size}px`, height: `${shape.size}px` }}
            />
          )}
          {shape.shape === "square" && (
            <div
              className="border-[4px] border-black/90 rotate-45"
              style={{ width: `${shape.size}px`, height: `${shape.size}px` }}
            />
          )}
          {shape.shape === "triangle" && (
            <div
              className="border-[4px] border-black/90"
              style={{
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
