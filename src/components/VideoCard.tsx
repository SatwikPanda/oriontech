"use client";

import { motion } from "framer-motion";
import CrossIcon from "./CrossIcon";
import { useState } from "react";

const VideoCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-12 right-12 bg-white rounded-2xl shadow-xl overflow-hidden w-72 h-40 z-50"
    >
      <CrossIcon onClick={() => setIsVisible(false)} />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/demo.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
};

export default VideoCard;
