"use client";

import { useEffect, useRef } from "react";

const generateBlobPath = () => {
  const points = 6; // Reduced number of points
  const slice = (Math.PI * 2) / points;
  const radius = 200; // Reduced base radius

  let path = "M ";

  for (let i = 0; i <= points; i++) {
    const angle = slice * i;
    // Reduced random variation for smoother morphing
    const randomRadius = radius + (Math.random() - 0.5) * 50;
    const x = Math.cos(angle) * randomRadius;
    const y = Math.sin(angle) * randomRadius;

    if (i === 0) {
      path += `${x},${y}`;
    } else {
      // Smoother control points
      const cp1x = Math.cos(angle - slice / 2) * radius * 1.2;
      const cp1y = Math.sin(angle - slice / 2) * radius * 1.2;
      path += ` Q ${cp1x},${cp1y} ${x},${y}`;
    }
  }

  return path + " Z";
};

export default function Blob() {
  const blobRef = useRef<SVGPathElement>(null);
  const prevPathRef = useRef<string>("");
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!blobRef.current) return;

    const currentPath = generateBlobPath();
    prevPathRef.current = currentPath;
    let animationFrameId: number;

    const animate = () => {
      if (blobRef.current) {
        // Generate new path and interpolate with previous
        const targetPath = generateBlobPath();
        blobRef.current.setAttribute("d", prevPathRef.current);
        prevPathRef.current = targetPath;
      }
      // Slower animation frame rate
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
      }, 150); // Add delay between frames
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Reduced movement range and added damping
      const moveX = ((clientX - centerX) / centerX) * 50;
      const moveY = ((clientY - centerY) / centerY) * 50;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="blob-container">
      <svg
        viewBox="-400 -400 800 800" // Increased viewBox for no clipping
        className="w-[800px] h-[800px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <defs>
          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" style={{ stopColor: "rgba(254, 77, 52, 0.4)" }} />
            <stop
              offset="100%"
              style={{ stopColor: "rgba(254, 77, 52, 0.25)" }}
            />
          </linearGradient>
        </defs>
        <path
          ref={blobRef}
          fill="url(#blob-gradient)"
          filter="url(#goo)"
          className="transition-transform duration-700 ease-out"
        />
      </svg>
    </div>
  );
}
