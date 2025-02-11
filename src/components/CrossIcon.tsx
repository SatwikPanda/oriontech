import { motion } from "framer-motion";

interface CrossIconProps {
  onClick: () => void;
}

const CrossIcon = ({ onClick }: CrossIconProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </motion.button>
  );
};

export default CrossIcon;
