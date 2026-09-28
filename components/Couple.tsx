"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ParallaxImage from "./ParallaxImage";

export default function Couple() {
  return (
    <section id="couple" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
      >
        <span className="text-[#d4af37] font-script text-xl sm:text-2xl block mb-1">
          The Happy Couple
        </span>
        <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#fcfbf7] font-normal tracking-wide">
          Meet Bride & Groom
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
          <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4af37] fill-[#d4af37]" />
          <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
        </div>
        <p className="text-[#b8ab96] text-xs sm:text-sm leading-relaxed px-2">
          &ldquo;When I saw you I fell in love, and you smiled because you knew.&rdquo; Two souls destined to walk together through every season of life.
        </p>
      </motion.div>

      {/* Couple Cards Grid with Parallax Image inside */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
        {/* Groom Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-midnight-elevated rounded-3xl p-4 xs:p-6 sm:p-8 hover:border-[#d4af37]/50 transition-all duration-300 relative group"
        >
          {/* Fixed aspect ratio card window - image glides smoothly inside on scroll */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5 sm:mb-6 bg-stone-900 shadow-inner">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80"
              alt="Groom - Jerish"
              offset={40}
              objectPosition="top center"
            />
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-[#0b0907]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] sm:text-xs font-cinzel font-semibold tracking-wider text-[#f6e29f] border border-[#d4af37]/40 uppercase shadow-sm">
              The Groom
            </div>
          </div>

          <div className="text-center px-1">
            <h3 className="font-serif-luxury text-xl xs:text-2xl sm:text-3xl text-[#fcfbf7] font-normal mb-1">
              Jerish Jeyasekaran
            </h3>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-cinzel font-medium mb-2.5 sm:mb-3">
              Son of Mr. Jeyasekaran & Mrs. Rethinam Jeyasekaran
            </p>
            <p className="text-[#d4c9b9] text-xs sm:text-sm leading-relaxed italic mb-4">
              &ldquo;Jane brings warmth, spontaneous laughter, and tranquility to my life. Loving her has been the easiest and most beautiful decision I have ever made.&rdquo;
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[#f6e29f] bg-[#1a140f] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#d4af37]/30 max-w-full">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0 text-[#d4af37]" />
              <span>Professor • Educator</span>
            </div>
          </div>
        </motion.div>

        {/* Bride Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-midnight-elevated rounded-3xl p-4 xs:p-6 sm:p-8 hover:border-[#d4af37]/50 transition-all duration-300 relative group"
        >
          {/* Fixed aspect ratio card window - image glides smoothly inside on scroll */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5 sm:mb-6 bg-stone-900 shadow-inner">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
              alt="Bride - Jane"
              offset={40}
              objectPosition="top center"
            />
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-[#0b0907]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] sm:text-xs font-cinzel font-semibold tracking-wider text-[#f6e29f] border border-[#d4af37]/40 uppercase shadow-sm">
              The Bride
            </div>
          </div>

          <div className="text-center px-1">
            <h3 className="font-serif-luxury text-xl xs:text-2xl sm:text-3xl text-[#fcfbf7] font-normal mb-1">
              Jane Jaculin Silviya
            </h3>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d4af37] font-cinzel font-medium mb-2.5 sm:mb-3">
              Daughter of Mr. Johnson & Mrs. Geetha
            </p>
            <p className="text-[#d4c9b9] text-xs sm:text-sm leading-relaxed italic mb-4">
              &ldquo;Jerish is my safe harbor, my biggest cheerleader, and my favorite adventure partner. I cannot wait to spend all my tomorrows by his side.&rdquo;
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[#f6e29f] bg-[#1a140f] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#d4af37]/30 max-w-full">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0 text-[#d4af37]" />
              <span>Beloved Bride • Loving Partner</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
