"use client";

import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Full-stack solutions with cutting-edge technologies",
    icon: "🌐",
    video: "/videos/web-dev.mp4",
    className: "col-span-2", // First item in first row
  },
  {
    id: 2,
    title: "App Development",
    description: "Native and cross-platform mobile solutions",
    icon: "📱",
    video: "/videos/mobile.mp4",
    className: "col-span-2", // Second item in first row
  },
  {
    id: 3,
    title: "Fast Delivery",
    description: "Quick turnaround with exceptional quality assurance",
    icon: "⚡",
    video: "/videos/delivery.mp4",
    className: "col-span-1", // First item in second row
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "User-centered design that drives engagement",
    icon: "🎨",
    video: "/videos/uiux.mp4",
    className: "col-span-2", // Center item in second row
  },
  {
    id: 5,
    title: "SEO Optimization",
    description:
      "Boost visibility and organic traffic with expert optimization",
    icon: "📈",
    video: "/videos/seo.mp4",
    className: "col-span-1", // Last item in second row
  },
];

export default function Services() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-[90rem] mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] font-medium mb-16 text-center max-w-[1200px] mx-auto leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Innovative Solutions Crafted <br /> to Elevate Your Business
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
          {/* First Row Container */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {services.slice(0, 2).map((service, i) => (
              <motion.div
                key={service.id}
                className="bg-white border border-black/10 rounded-3xl p-4 hover:border-black/30 transition-colors overflow-hidden h-[300px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="h-full flex flex-col">
                  {/* Video Container */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      <source src={service.video} type="video/mp4" />
                    </video>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <span className="text-3xl mb-3 block">{service.icon}</span>
                    <h3 className="text-xl font-medium mb-2">
                      {service.title}
                    </h3>
                    <p className="text-black/60 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second Row Container */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {services.slice(2).map((service, i) => (
              <motion.div
                key={service.id}
                className={`${service.className} bg-white border border-black/10 rounded-3xl p-4 hover:border-black/30 transition-colors overflow-hidden h-[300px]`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 2) * 0.1 }}
              >
                <div className="h-full flex flex-col">
                  {/* Video Container */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      <source src={service.video} type="video/mp4" />
                    </video>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <span className="text-3xl mb-3 block">{service.icon}</span>
                    <h3 className="text-xl font-medium mb-2">
                      {service.title}
                    </h3>
                    <p className="text-black/60 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
