"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { reviews, trustedCompanies } from "../data/reviews";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Start with first real item

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.getAttribute("data-index"));
        setActiveIndex(index % reviews.length);
      }
    });
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const options = {
      root: scrollContainer,
      threshold: 0.6,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const cards = scrollContainer.querySelectorAll(".review-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (index: number) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 400;
    const gap = 32;
    const targetScroll =
      (index + 2) * (cardWidth + gap) - (window.innerWidth - cardWidth) / 2;

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-32 px-6 relative">
      {/* Background Effect */}

      {/* Main Heading */}
      <div className="text-center mb-24 relative z-10">
        <motion.h2
          className="text-6xl tracking-[-0.03em] font-medium mb-6 max-w-5xl mx-auto leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          We build with passion and precision to empower businesses and creators
          helping them innovate, grow, and succeed effortlessly.
        </motion.h2>
      </div>

      {/* Trusted By Section */}
      <div className="text-center mb-16 relative z-10">
        <motion.p
          className="text-lg text-black/60 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trusted by
        </motion.p>
        <div className="flex justify-center gap-12 mb-24">
          {trustedCompanies.map((company, i) => (
            <motion.span
              key={company}
              className="text-2xl font-medium text-black/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {company}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-[90rem] mx-auto relative z-10">
        <div
          ref={scrollRef}
          className="flex gap-8 py-12 overflow-x-auto no-scrollbar scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            maskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          }}
        >
          {[...reviews.slice(-2), ...reviews, ...reviews.slice(0, 2)].map(
            (review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="review-card flex-none"
                data-index={i - 2}
                style={{
                  width: "400px",
                  scrollSnapAlign: "center",
                }}
              >
                <ReviewCard
                  review={review}
                  isFocused={(i - 2) % reviews.length === activeIndex}
                />
              </div>
            )
          )}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`h-2 transition-all ${
                i === activeIndex ? "w-8 bg-black" : "w-2 bg-black/20"
              } rounded-full`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
