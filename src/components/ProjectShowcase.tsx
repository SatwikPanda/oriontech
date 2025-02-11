"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import WaterEffect from "./WaterEffect";

// ...existing variants and constants...




const sidebarVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw",
    y: "100vh",
    rotateY: 45,
    rotateX: 45,
    scale: 0.8,
    transition: {
      duration: 2.5, // Increased duration
      ease: "easeInOut", // Changed to simpler easing
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.165, 0.84, 0.44, 1], // Custom easing
      opacity: { duration: 0.8 },
    },
  },
};

const searchBarVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
    y: "-50vh",
    rotateY: -45,
    scale: 0.8,
    transition: {
      duration: 2.5, // Increased duration
      ease: "easeInOut", // Changed to simpler easing
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.165, 0.84, 0.44, 1], // Custom easing
      opacity: { duration: 0.8 },
    },
  },
};

const projectsContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Desktop-only variants
const desktopCardVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
    y: "100vh",
    rotateZ: 10,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateZ: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
};


const projects = [
  {
    id: 1,
    title: "Rickman Architecture",
    category: "Web Design",
    description: "Interactive landing Page with User Experience Design",
    image: "/images/websites/radga.png",
    year: "2025",
    url: "https://www.radga.com",
  },
  {
    id: 2,
    title: "Spectral Finance",
    category: "Development",
    description: "Catchy Landing page to showcase their app",
    image: "/images/websites/spectral.png",
    year: "2025",
    url: "https://spectral-finance.webflow.io/",
  },
  {
    id: 3,
    title: "Luminous Labs",
    category: "Brand Identity",
    description: "Landing page and their shop interface",
    image: "/images/websites/luminous-labs.png",
    year: "2024",
    url: "https://www.luminouslabs.health/",
  },
  {
    id: 4,
    title: "Miga",
    category: "Brand Identity", // Changed to match category
    description: "Landing page for their brand presence",
    image: "/images/websites/miga.png",
    year: "2024",
    url: "https://www.migahealth.com/",
  },
  {
    id: 5,
    title: "Fanhubble",
    category: "Mobile Apps",
    description: "Artist showcase platform",
    image: "/images/websites/fanhubble.png",
    year: "2024",
    url: "https://fanhubble.com/",
  },
  {
    id: 6,
    title: "Blockchain Land",
    category: "Development",
    description: "Fullstack development for their blockchain platform",
    image: "/images/websites/blockchainland.png",
    year: "2024",
    url: "https://blockchain.land/",
  },
];

const categories = [
  {
    name: "All Projects",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    name: "Web Design",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 12h18M12 3v18M5.5 5.5l13 13M18.5 5.5l-13 13" />
      </svg>
    ),
  },
  {
    name: "Brand Identity",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    name: "Development",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: "Mobile Apps",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
];

export default function ProjectShowcase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [key, setKey] = useState(0); // Add key for forcing refresh
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Simplified filtering logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filtering
      const categoryMatch =
        activeCategory === "All Projects" ||
        project.category === activeCategory;

      // Search filtering
      const searchMatch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);



  // Simple mobile view without any animations or filtering
  const MobileView = () => (
    <div className="grid grid-cols-1 gap-4 pb-10">
      {projects.map((project) => (
        <a
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-2 rounded-lg border border-black/15"
        >
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-black/5">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-medium">{project.title}</h3>
            <p className="text-black/60 mt-1 text-sm">{project.description}</p>
            <span className="text-black/40 text-sm font-rmmono mt-2 block">
              {project.year}
            </span>
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <section className="py-32 px-6 relative overflow-guard">
      <div className="text-center mb-20">
        <motion.h2
          className="text-5xl md:text-7xl tracking-[-0.03em] font-medium mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          We build with precision,
          <br />
          so you can thrive.
        </motion.h2>
        <motion.p
          className="text-xl text-black/60 tracking-tight max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Every solution we create is crafted with meticulous attention to
          detail, combining innovation, reliability, and seamless performance so
          you can focus on growing and achieving more.
        </motion.p>
      </div>
      <div className="hidden md:block absolute inset-0 mask-radial-center ">
        <WaterEffect imageUrl="/images/bg-gradient.png" />
      </div>
      <div className="max-w-[88rem] mx-auto">
        {isMobile ? (
          <MobileView />
        ) : (
          <motion.div
            className="border bg-white border-black/15 p-1 rounded-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true, // Changed to true to prevent exit animations
              margin: "-50px",
              amount: 0.5,
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex flex-col lg:flex-row gap-2">
              {/* Mobile Sidebar Toggle */}
              <button
                className="lg:hidden flex items-center gap-2 p-4 text-black/60"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <span>Filter Projects</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M3 6h18M6 12h12M9 18h6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Sidebar */}
              <motion.div
                className={`w-full lg:w-64 shrink-0 bg-white border border-black/15 p-5 rounded-lg ${
                  isSidebarOpen ? "block" : "hidden lg:block"
                }`}
                variants={sidebarVariants}
                style={{ transformOrigin: "bottom left" }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-4xl font-medium">Orion</h2>
                  <img src="/Logo.svg" alt="logo" className="w-10" />
                </div>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={`${category.name}-${key}`} // Add key here
                      className={`text-left w-full py-2 px-3 rounded transition-colors flex items-center gap-3 ${
                        activeCategory === category.name
                          ? "text-black font-medium bg-black/5"
                          : "text-black/40 hover:text-black/60 hover:bg-black/5"
                      }`}
                    >
                      <span className="shrink-0">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>

              <div className="flex-1">
                {/* Search Bar */}
                {isMobile ? (
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-black/5 outline-none focus:outline-none focus:ring-1 focus:ring-black/15 transition-all bg-white border border-black/15"
                    />
                  </div>
                ) : (
                  <motion.div className="mb-2" variants={searchBarVariants}>
                    {/* ...existing animated search bar... */}
                  </motion.div>
                )}

                {/* Projects Grid */}
                <motion.div
                  className="grid grid-cols-3 gap-2"
                  variants={projectsContainerVariants}
                >
                  {filteredProjects.map((project) => (
                    <motion.a
                      key={project.id}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white p-2 rounded-lg border border-black/15 transition-all duration-300 hover:shadow-lg"
                      variants={desktopCardVariants}
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-black/5">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="text-lg font-medium">{project.title}</h3>
                        <p className="text-black/60 mt-1 text-sm">
                          {project.description}
                        </p>
                        <span className="text-black/40 text-sm font-rmmono mt-2 block">
                          {project.year}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
