import { motion } from "framer-motion";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerMenu({ isOpen, onClick }: HamburgerProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden z-50 flex flex-col justify-center items-center w-12 h-12 relative"
      aria-label="Menu"
    >
      <motion.span
        className="w-7 h-0.5 bg-black absolute rounded-full"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -6,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <motion.span
        className="w-7 h-0.5 bg-black absolute rounded-full"
        animate={{
          opacity: isOpen ? 0 : 1,
          x: isOpen ? 10 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <motion.span
        className="w-7 h-0.5 bg-black absolute rounded-full"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 6,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </button>
  );
}
