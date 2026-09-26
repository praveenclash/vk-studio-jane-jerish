"use client";

import React from "react";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";

export default function Couple() {
  return (
    <section id="couple" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <span className="text-[#c5a059] font-script text-2xl xs:text-3xl sm:text-4xl block mb-1 sm:mb-2">
          The Happy Couple
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#231f20] font-normal tracking-wide">
          Meet Bride & Groom
        </h2>
        <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
          <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
          <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059] fill-[#c5a059]" />
          <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
        </div>
        <p className="text-[#6b6661] text-xs sm:text-base leading-relaxed px-2">
          &ldquo;When I saw you I fell in love, and you smiled because you knew.&rdquo; Two souls destined to walk together through every season of life.
        </p>
      </div>

      {/* Couple Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
        {/* Groom Card */}
        <div className="bg-white rounded-3xl p-4 xs:p-6 sm:p-8 shadow-sm border border-[#c5a059]/25 hover:shadow-xl transition-all duration-300 relative group">
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5 sm:mb-6 bg-stone-100 shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80"
              alt="Groom - Jerish"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider text-[#a27e36] uppercase shadow-sm">
              The Groom
            </div>
          </div>

          <div className="text-center px-1">
            <h3 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#231f20] font-normal mb-1">
              Jerish David
            </h3>
            <p className="text-[11px] sm:text-xs uppercase tracking-widest text-[#c5a059] font-medium mb-2.5 sm:mb-3">
              Son of Mr. David & Mrs. Mary
            </p>
            <p className="text-[#6b6661] text-xs sm:text-sm leading-relaxed italic mb-4">
              &ldquo;Jane brings warmth, spontaneous laughter, and tranquility to my life. Loving her has been the easiest and most beautiful decision I have ever made.&rdquo;
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[#a27e36] bg-[#faf7f2] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#c5a059]/20 max-w-full">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
              <span>Software Architect • Coffee Enthusiast</span>
            </div>
          </div>
        </div>

        {/* Bride Card */}
        <div className="bg-white rounded-3xl p-4 xs:p-6 sm:p-8 shadow-sm border border-[#c5a059]/25 hover:shadow-xl transition-all duration-300 relative group">
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5 sm:mb-6 bg-stone-100 shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
              alt="Bride - Jane"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider text-[#a27e36] uppercase shadow-sm">
              The Bride
            </div>
          </div>

          <div className="text-center px-1">
            <h3 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#231f20] font-normal mb-1">
              Jane Jennifer
            </h3>
            <p className="text-[11px] sm:text-xs uppercase tracking-widest text-[#c5a059] font-medium mb-2.5 sm:mb-3">
              Daughter of Mr. Joseph & Mrs. Esther
            </p>
            <p className="text-[#6b6661] text-xs sm:text-sm leading-relaxed italic mb-4">
              &ldquo;Jerish is my safe harbor, my biggest cheerleader, and my favorite adventure partner. I cannot wait to spend all my tomorrows by his side.&rdquo;
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[#a27e36] bg-[#faf7f2] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#c5a059]/20 max-w-full">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
              <span>Creative Designer • World Traveler</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
