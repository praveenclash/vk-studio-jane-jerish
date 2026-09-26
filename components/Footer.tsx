"use client";

import React from "react";
import { Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1c1815] text-stone-300 py-12 sm:py-16 border-t border-[#c5a059]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Monogram */}
        <div className="font-serif-luxury text-3xl xs:text-4xl sm:text-5xl font-normal text-white mb-2 tracking-wide leading-tight">
          Jane <span className="font-script text-[#c5a059] text-4xl xs:text-5xl sm:text-6xl">&</span> Jerish
        </div>

        <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c5a059] mb-4 sm:mb-6">
          Forever Begins • December 20, 2026
        </p>

        {/* Wedding Hashtag */}
        <div className="inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 bg-white/5 border border-[#c5a059]/30 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider text-[#e5cb9b] mb-6 sm:mb-8 max-w-full text-center">
          <span>#JaneJerishWedding</span>
          <span className="hidden xs:inline">•</span>
          <span>#ForeverJaneAndJerish</span>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-3 xs:gap-5 sm:gap-8 text-[11px] sm:text-xs font-medium tracking-wider uppercase text-stone-400 mb-8 sm:mb-10 px-2">
          <a href="#story" className="py-1 px-1 hover:text-[#c5a059] transition-colors">Our Story</a>
          <a href="#couple" className="py-1 px-1 hover:text-[#c5a059] transition-colors">The Couple</a>
          <a href="#events" className="py-1 px-1 hover:text-[#c5a059] transition-colors">Events</a>
          <a href="#gallery" className="py-1 px-1 hover:text-[#c5a059] transition-colors">Gallery</a>
          <a href="#rsvp" className="py-1 px-1 hover:text-[#c5a059] transition-colors">RSVP</a>
          <a href="#guestbook" className="py-1 px-1 hover:text-[#c5a059] transition-colors">Wishes Wall</a>
          <a href="#travel" className="py-1 px-1 hover:text-[#c5a059] transition-colors">Travel</a>
        </div>

        <div className="w-20 sm:w-24 h-[1px] bg-[#c5a059]/40 mb-6" />

        {/* Closing note */}
        <p className="text-[11px] sm:text-xs text-stone-400 flex items-center justify-center gap-1.5 mb-6 sm:mb-8 text-center px-2">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" /> for Jane & Jerish • VK Studio
        </p>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#c5a059] text-white flex items-center justify-center transition-all shadow-md group touch-manipulation min-w-[44px] min-h-[44px]"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
