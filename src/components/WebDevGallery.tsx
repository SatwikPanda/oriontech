"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

const originalImages = [
  "/images/websites/radga.png",
  "/images/websites/spectral.png",
  "/images/websites/luminous-labs.png",
  "/images/websites/miga.png",
  "/images/websites/fanhubble.png",
  "/images/websites/blockchainland.png",
];

export default function WebDevGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create a larger randomized array of images
  const images = useMemo(() => {
    const duplicatedImages = [
      ...originalImages,
      ...originalImages,
      ...originalImages,
    ];
    return duplicatedImages.sort(() => Math.random() - 0.5);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[160px] perspective-2000 overflow-hidden"
    >
      <div className="sticky top-0 flex items-center justify-center h-full">
        <div className="relative w-full h-full">
          <div className="grid grid-cols-6 md:grid-cols-8 gap-1 transform-3d p-1 w-full">
            {images.map((img, i) => (
              <motion.div
                key={`${img}-${i}`}
                className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-sm"
                style={{
                  translateY: useTransform(
                    scrollYProgress,
                    [0, 1],
                    [10 * ((i % 4) + 1), 0]
                  ),
                  translateZ: useTransform(
                    scrollYProgress,
                    [0, 1],
                    [-20 * Math.floor(i / 4), 0]
                  ),
                  rotateX: useTransform(scrollYProgress, [0, 1], [5, 0]),
                  scale: useTransform(scrollYProgress, [0, 1], [0.98, 1]),
                  opacity: useTransform(
                    scrollYProgress,
                    [0, 0.2, 1],
                    [0, 1, 1]
                  ),
                }}
              >
                <img
                  src={img}
                  alt={`Project ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
