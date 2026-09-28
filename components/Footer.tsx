"use client";

import React from "react";
import { Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#060403] text-stone-300 pt-12 sm:pt-16 pb-[max(3rem,calc(env(safe-area-inset-bottom,0px)+2.5rem))] border-t border-[#d4af37]/30 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Monogram */}
        <div className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl font-normal text-white mb-2 tracking-wide leading-tight">
          Jane <span className="font-script text-[#d4af37] text-3xl xs:text-4xl sm:text-5xl">&</span> Jerish
        </div>

        <p className="font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#d4af37] mb-4 sm:mb-6 font-medium">
          Forever Begins • October 12, 2026
        </p>

        {/* Wedding Hashtag */}
        <div className="inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 bg-[#14100c] border border-[#d4af37]/35 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-cinzel font-semibold tracking-wider text-[#f6e29f] mb-6 sm:mb-8 max-w-full text-center shadow-md">
          <span className="flex items-center justify-center gap-1.5">Forever Jane <Heart className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" /> Jerish </span>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-3 xs:gap-5 sm:gap-8 text-[11px] sm:text-xs font-cinzel font-medium tracking-wider uppercase text-stone-400 mb-8 sm:mb-10 px-2">
          <a href="#story" className="py-1 px-1 hover:text-[#d4af37] transition-colors">Our Story</a>
          <a href="#couple" className="py-1 px-1 hover:text-[#d4af37] transition-colors">The Couple</a>
          <a href="#events" className="py-1 px-1 hover:text-[#d4af37] transition-colors">Events</a>
          <a href="#gallery" className="py-1 px-1 hover:text-[#d4af37] transition-colors">Gallery</a>
          <a href="#rsvp" className="py-1 px-1 hover:text-[#d4af37] transition-colors">RSVP</a>
          <a href="#guestbook" className="py-1 px-1 hover:text-[#d4af37] transition-colors">Wishes Wall</a>
          <a href="#travel" className="py-1 px-1 hover:text-[#d4af37] transition-colors">Travel</a>
        </div>

        <div className="w-20 sm:w-24 h-[1px] bg-[#d4af37]/40 mb-6" />

        {/* Closing note */}
        <p className="text-[11px] sm:text-xs text-stone-400 flex items-center justify-center gap-1.5 mb-6 sm:mb-8 text-center px-2">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" /> for Jane & Jerish • VK Studio
        </p>

        {/* Back to top button */}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-[#181410] border border-[#d4af37]/35 hover:bg-[#d4af37] text-[#d4af37] hover:text-black flex items-center justify-center transition-all shadow-lg group touch-manipulation min-w-[44px] min-h-[44px] cursor-pointer"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      </motion.div>
    </footer>
  );
}
