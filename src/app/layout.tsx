"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./globals.css";
import HamburgerMenu from "../components/HamburgerMenu";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      {children}
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
      <body className="bg-white text-black">
        <nav
          className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled ? "py-3" : "py-4"
          }`}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />

          <div className="max-w-[90rem] mx-auto flex items-center justify-between px-6 relative">
            {/* Logo */}
            <Link href="/" className="text-2xl font-medium z-50">
              Orion
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/faqs">FAQs</NavLink>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="/login"
                className="relative overflow-hidden px-4 py-2 rounded-full"
                initial="initial"
                whileHover="hover"
              >
                Login
              </motion.a>
              <motion.a
                href="/contact"
                className="relative overflow-hidden bg-black text-white px-4 py-2 rounded-lg"
                initial="initial"
                whileHover="hover"
              >
                Contact us
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <HamburgerMenu
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />

            {/* Mobile Menu */}
            <motion.div
              className={`lg:hidden fixed inset-0 bg-white z-40 ${
                isMenuOpen ? "block" : "hidden"
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : -20,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="pt-24 px-6 flex flex-col gap-6">
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
        {children}
      </body>
    </html>
  );
}
