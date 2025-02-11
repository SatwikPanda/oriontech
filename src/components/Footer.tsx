"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About", "Careers", "Contact", "Blog"],
    },
    {
      title: "Services",
      links: [
        "Web Development",
        "App Development",
        "UI/UX Design",
        "Consulting",
      ],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "License"],
    },
  ];

  return (
    <footer className="relative bg-white text-black">
      {/* Top Separator Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-black/5 via-black/10 to-black/5" />

      <div className="py-16 px-4 md:px-6">
        <div className="max-w-[90rem] mx-auto">
          {/* ...existing grid layout... */}

          {/* Update text colors to use black/60 consistently */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-medium">Orion</h2>
              <p className="text-black/60 text-sm max-w-xs">
                Crafting digital experiences that leave lasting impressions
                through innovative design and development.
              </p>
            </div>

            {/* Links Sections */}
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-sm font-medium uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-black/60 hover:text-black transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-black/10 border-t flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-black/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Orion. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-black/60 hover:text-black transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
