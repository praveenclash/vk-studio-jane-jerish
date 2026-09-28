"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  offset?: number;
  objectPosition?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  offset = 30,
  objectPosition = "center",
  priority = false,
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
      <motion.div
        style={{ y, scale }}
        className="absolute inset-[-12%] will-change-transform pointer-events-none select-none"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={78}
          style={{ objectPosition }}
          className={`object-cover ${className}`}
        />
      </motion.div>
    </div>
  );
}

