"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.3; // Increased time multiplier
    
    // Stronger wave movement
    vec2 offset = vec2(
      sin(uv.y * 2.0 + time) * 0.03 +
      sin(uv.x * 3.0 - time * 1.2) * 0.03 +
      sin((uv.x + uv.y) * 4.0 - time * 0.8) * 0.02 +
      sin(uv.y * 5.0 + time * 1.4) * 0.02,
      
      cos(uv.x * 2.0 + time * 0.8) * 0.03 +
      cos(uv.y * 3.0 - time * 1.1) * 0.03 +
      cos((uv.x - uv.y) * 4.0 + time * 0.9) * 0.02 +
      cos(uv.x * 5.0 - time * 1.3) * 0.02
    );
    
    vec2 samplePos = clamp(uv - offset, vec2(0.01), vec2(0.99));
    vec4 color = texture2D(uTexture, samplePos);
    
    gl_FragColor = color;
  }
`;

export default function WaterEffect({ imageUrl }: { imageUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const THREE = require("three");
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Setup scene with smaller scale
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.7, 0.7, 0.7, -0.7, 0, 1); // Reduced from ±0.9 to ±0.7
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Create mesh with smaller geometry
    const geometry = new THREE.PlaneGeometry(1.4, 1.4); // Reduced from 1.8 to 1.4
    const texture = new THREE.TextureLoader().load(imageUrl);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Handle window resize
    const handleResize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let rafId: number;
    const animate = () => {
      material.uniforms.uTime.value += 0.01; // Increased animation speed
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [imageUrl]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
