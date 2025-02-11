"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "../app/layout";
import VideoCard from "./VideoCard";
import WaterEffect from "./WaterEffect";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 mask-radial-center">
            <WaterEffect imageUrl="/images/bg-gradient.png" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[90rem] w-full relative z-10">
        <div className="max-w-[1000px] mx-auto text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[6vw] leading-[0.95] font-medium tracking-tight mb-10 whitespace-nowrap"
          >
            Build Digital Experiences
            <br />
            People Remember.
          </motion.h1>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <p className="text-xl max-w-md text-black/60 leading-[1]">
                  We craft exceptional websites and full-stack applications that
                  leave a lasting impact. From sleek designs to powerful
                  backends, we bring your ideas to life with cutting-edge
                  technology and seamless user experiences. Let's build
                  something unforgettable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Card - Fixed Position */}
      <VideoCard />
    </section>
  );
}
