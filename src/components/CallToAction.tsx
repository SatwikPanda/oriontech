"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import WaterEffect from "./WaterEffect";
import { AnimatedText } from "../app/layout";

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end center"],
  });

  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const yProgress = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 mask-radial-center">
        <WaterEffect imageUrl="/images/ab-bg-4.jpg" />
      </div>

      {/* Content */}
      <div className="max-w-[90rem] mx-auto relative z-10">
        <motion.div
          className="text-center flex flex-col items-center gap-16"
          style={{
            opacity: opacityProgress,
            y: yProgress,
          }}
        >
          {/* Heading */}
          <div className=" text-8xl ">
            <h2 className="tracking-[-0.02em] font-medium">
              Start building Products
            </h2>
            <p className="tracking-[-0.02em] font-medium text-black/80">
              people can&#39;t ignore
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.a
              href="/contact"
              className="relative overflow-hidden bg-black text-white px-8 py-3 rounded-lg text-lg font-medium"
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span className="relative z-10 block">
                <AnimatedText text="Build your idea" />
              </motion.span>
            </motion.a>

            <motion.a
              href="/about"
              className="relative overflow-hidden backdrop-blur bg-black/5 px-8 py-3 rounded-lg text-lg font-medium"
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span className="relative z-10 block">
                <AnimatedText text="About us" />
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
