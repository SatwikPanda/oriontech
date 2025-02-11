"use client";

import { motion, AnimatePresence } from "framer-motion";
import CrossIcon from "./CrossIcon";
import { useState } from "react";

const VideoCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="hidden md:block fixed bottom-12 right-12 bg-white rounded-2xl shadow-xl overflow-hidden w-72 h-40 z-50"
        >
          <CrossIcon onClick={handleClose} />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoCard;
