"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionTemplate } from "framer-motion";

export default function MouseGlow() {
  // Use spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base dim dot grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Bright dot grid masked by mouse position */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle at center, #ff6600 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}
