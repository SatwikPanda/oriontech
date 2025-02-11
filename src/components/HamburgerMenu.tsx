import { motion } from "framer-motion";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerMenu({ isOpen, onClick }: HamburgerProps) {
  return (
    <button
      onClick={onClick}
      className="block lg:hidden z-[100] w-10 h-10 relative bg-white/80 backdrop-blur-sm rounded-lg"
      aria-label="Menu"
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <motion.span
          className="w-5 h-0.5 bg-black absolute rounded-full"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -4,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-5 h-0.5 bg-black absolute rounded-full"
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-5 h-0.5 bg-black absolute rounded-full"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 4,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </button>
  );
}
