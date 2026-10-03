"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
        scrolled
          ? "bg-[#0b0907]/95 backdrop-blur-md shadow-2xl border-b border-[#d4af37]/25 py-2 sm:py-2.5"
          : "bg-linear-to-b from-black/85 via-black/40 to-transparent py-3 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Monogram Brand */}
          <a
            href="#"
            className="flex items-center gap-1.5 sm:gap-2 group transition-colors shrink-0 text-white"
          >
            <img
              src="/images/logo-gold.png"
              alt="JJ Monogram Logo"
              className="h-8 xs:h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)]"
            />
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.25em] border-l border-[#d4af37]/40 pl-2 sm:pl-2.5 text-[#d4af37] font-semibold group-hover:text-[#f6e29f] transition-colors">
              Jane & Jerish
            </span>
          </a>

          {/* Actions: RSVP CTA button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wish button */}
            <a
              href="#rsvp"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-black gold-gradient-bg shadow-md hover:shadow-lg hover:brightness-110 transition-all min-h-9"
            >
              <Heart className="w-3.5 h-3.5 fill-black" />
              Wish
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

