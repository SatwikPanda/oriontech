"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./globals.css";
import HamburgerMenu from "../components/HamburgerMenu";

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

export const AnimatedText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth < 768) {
          // Only trigger for mobile
          setIsFooterVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector("footer");
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, children }: { href: string; children: string }) => (
    <motion.a
      href={href}
      className="relative group"
      initial="initial"
      whileHover="hover"
    >
      <AnimatedText text={children} className="text-black" />
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black origin-left"
        initial={{ scaleX: 0 }}
        variants={{
          hover: {
            scaleX: 1,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      />
    </motion.a>
  );

  return (
    <html lang="en">
      <body className="bg-white text-black overflow-x-hidden w-full">
        <nav
          className={`fixed w-full transition-all duration-300 ${
            scrolled ? "py-3" : "py-4"
          } ${
            isFooterVisible
              ? "md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto"
              : "opacity-100"
          } z-[90]`}
        >
          {/* Add gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
          
          <div className="w-full px-4 flex items-center justify-between relative">
            {/* Logo */}
            <a href="/" className="text-2xl font-medium z-[100]">
              Orion.
            </a>

            {/* Desktop Navigation - Updated */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/faqs">FAQs</NavLink>
            </div>

            {/* Desktop Buttons - Updated */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="/login"
                className="relative overflow-hidden px-4 py-2 rounded-full"
                initial="initial"
                whileHover="hover"
              >
                <AnimatedText text="Login" />
              </motion.a>
              <motion.a
                href="/contact"
                className="relative overflow-hidden bg-black text-white px-4 py-2 rounded-lg"
                initial="initial"
                whileHover="hover"
              >
                <AnimatedText text="Contact us" className="text-white" />
              </motion.a>
            </div>

            {/* Hamburger Menu */}
            <HamburgerMenu
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />

            {/* Mobile Menu */}
            <motion.div
              className={`fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-white z-[95] overflow-hidden ${
                isMenuOpen ? "block" : "hidden"
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : -20,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="pt-24 px-4 flex flex-col gap-6 w-full max-w-[100vw]">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/faqs">FAQs</NavLink>
                <div className="flex flex-col gap-4 mt-6">
                  <a href="/login" className="w-full py-3 text-center">
                    Login
                  </a>
                  <a
                    href="/contact"
                    className="w-full py-3 text-center bg-black text-white rounded-lg"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </nav>
        <main className="overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
