"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  offset?: number;
  objectPosition?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  offset = 35,
  objectPosition = "center",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth vertical parallax shift inside the container
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.18, 1.12]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden select-none">
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale, objectPosition }}
        className={`w-full h-full object-cover will-change-transform pointer-events-none select-none transition-opacity duration-300 ${className}`}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}
