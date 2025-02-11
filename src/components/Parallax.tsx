"use client";

import { useEffect, useRef } from "react";

interface ParallaxProps {
  className?: string;
  scale?: number;
  speed?: number;
}

export default function Parallax({
  className,
  scale = 1,
  speed = 20,
}: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;

      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Increased movement range
      const moveX = (clientX - centerX) / speed;
      const moveY = (clientY - centerY) / speed;

      elementRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [speed]);

  return (
    <div
      ref={elementRef}
      className={`fixed pointer-events-none transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      <div
        className="rounded-full bg-gradient-to-br from-neutral-200/30 to-neutral-100/20 backdrop-blur-sm"
        style={{
          width: `${400 * scale}px`,
          height: `${400 * scale}px`,
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
