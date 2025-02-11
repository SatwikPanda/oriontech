"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

const services = [
  {
    id: 1,
    title: "Web Development",
    description:
      "OrionTech delivers high-performance, user-friendly websites and web apps with the latest technologies. Our expertise ensures innovation, speed, and scalability, making us the best choice for your digital success.",
    icon: "🌐",
    video: "/videos/web-dev.mp4",
    className: "col-span-2",
  },
  {
    id: 2,
    title: "App Development",
    description:
      "Create powerful, intuitive mobile applications that engage users and drive results. Our expert team delivers native and cross-platform solutions that set new standards in mobile excellence.",
    icon: "📱",
    video: "/videos/mobile.mp4",
    className: "col-span-2",
  },
  {
    id: 3,
    title: "Fast Delivery",
    description:
      "Experience rapid development without compromising quality. Our streamlined processes and expert team ensure quick turnaround while maintaining exceptional standards in every project.",
    icon: "⚡",
    video: "/videos/delivery.mp4",
    className: "col-span-2 md:col-span-2 lg:col-span-1", // Updated className
  },
  {
    id: 4,
    title: "UI/UX Design",
    description:
      "Transform user experiences with our innovative design solutions. We create intuitive, engaging interfaces that perfectly balance aesthetics and functionality for maximum impact.",
    icon: "🎨",
    video: "/videos/uiux.mp4",
    className: "col-span-2",
  },
  {
    id: 5,
    title: "SEO Optimization",
    description:
      "Boost your digital presence with our comprehensive SEO strategies. We optimize your content and structure for maximum visibility and organic growth in search rankings.",
    icon: "📈",
    video: "/videos/seo.mp4",
    className: "col-span-2 md:col-span-2 lg:col-span-1", // Updated className
  },
];

export default function Services() {
  const containerRef = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize vanilla-tilt on cards
  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) {
        VanillaTilt.init(card, {
          max: 5,
          speed: 400,
          glare: true,
          "max-glare": 0.2,
          scale: 1.02,
          transition: true,
          perspective: 1000,
        });
      }
    });

    // Cleanup
    return () => {
      cardRefs.current.forEach((card) => {
        if (card && (card as any).vanillaTilt) {
          (card as any).vanillaTilt.destroy();
        }
      });
    };
  }, []);

  return (
    <section className="py-32 px-6 relative overflow-hidden" ref={containerRef}>
      <motion.h2
        className="text-5xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-medium mb-16 text-center max-w-[1200px] mx-auto leading-[1.1]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Innovative Solutions Crafted <br /> to Elevate Your Business
      </motion.h2>

      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`${service.className} bg-white border border-black/10 rounded-lg hover:border-black/30 transition-colors overflow-hidden h-[400px] flex flex-col transform-gpu`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex flex-col h-full">
                <div className="p-6 flex-none">
                  <h3 className="text-2xl font-medium mb-3">{service.title}</h3>
                  <p className="text-black/60 text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="flex-1 relative mt-auto">
                  {i === 0 || i === 1 || i === 2 || i === 3 || i === 4 ? (
                    <img
                      src={
                        i === 0
                          ? "/images/services/webdev.jpg"
                          : i === 1
                          ? "/images/services/appdev.jpg"
                          : i === 2
                          ? "/images/services/fast.jpg"
                          : i === 3
                          ? "/images/services/uiux.jpg"
                          : "/images/services/seo.jpg"
                      }
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={service.video} type="video/mp4" />
                    </video>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
