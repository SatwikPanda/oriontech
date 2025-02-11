"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "../app/layout";

const footerLinks = {
  Company: ["About", "Projects", "Process", "Careers"],
  Services: ["Web Development", "App Development", "UI/UX Design", "SEO"],
  Resources: ["Blog", "Case Studies", "Documentation", "Help Center"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

const socialLinks = [
  { name: "Twitter", url: "https://twitter.com" },
  { name: "Instagram", url: "https://instagram.com" },
  { name: "LinkedIn", url: "https://linkedin.com" },
  { name: "GitHub", url: "https://github.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 relative">
      <div className="max-w-[90rem] mx-auto px-6 min-h-[80vh] flex flex-col justify-between">
        {/* Main Footer Content */}
        <div className="grid grid-cols-[1.5fr,repeat(4,1fr)] gap-12 py-24">
          {/* Brand Column */}
          <div className="space-y-8 relative z-10">
            <h2 className="text-2xl font-medium">Orion</h2>
            <p className="text-black/60 leading-relaxed max-w-sm">
              Building exceptional digital experiences with precision and
              innovation. Let's create something extraordinary together.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium"
              whileHover={{ x: 5 }}
            >
              Get in touch
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.a>
          </div>

          {/* Links Columns with z-index */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="relative z-10">
              <h3 className="font-medium mb-6">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href={`/${link.toLowerCase()}`}
                      className="text-black/60 hover:text-black transition-colors"
                      initial="initial"
                      whileHover="hover"
                    >
                      <AnimatedText text={link} />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links - No Border */}
        <div className="flex justify-between items-center py-12 relative z-10">
          <p className="text-sm text-black/40">
            © 2024 Orion. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                className="text-sm text-black/40 hover:text-black transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                initial="initial"
                whileHover="hover"
              >
                <AnimatedText text={social.name} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Background Logo - Moved to bottom */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none bottom-32">
          <div className="flex items-center gap-8 opacity-[0.03]">
            <span className="text-[40vh] font-light tracking-tighter">
              Orion
            </span>
            <img
              src="/Logo.svg"
              alt="Background Logo"
              className="w-[35vh] opacity-50"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
