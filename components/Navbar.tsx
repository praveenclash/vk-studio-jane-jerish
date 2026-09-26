"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, Volume2, VolumeX, Menu, X, Calendar, MessageSquareHeart } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((e) => {
        console.log("Audio play blocked by browser:", e);
      });
    }
  };

  const navLinks = [
    { name: "Our Story", href: "#story" },
    { name: "Couple", href: "#couple" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "RSVP & Wishes", href: "#rsvp" },
    { name: "Guestbook", href: "#guestbook" },
    { name: "Travel & FAQ", href: "#travel" },
  ];

  return (
    <>
      {/* Background audio player (soft ambient royalty-free piano/acoustic) */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113337.mp3"
        preload="none"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#faf7f2]/95 backdrop-blur-md shadow-sm border-b border-[#c5a059]/20 py-2.5 sm:py-3"
            : "bg-gradient-to-b from-black/60 via-black/30 to-transparent py-3.5 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Monogram Brand */}
            <a
              href="#"
              className={`flex items-center gap-1.5 sm:gap-2 group transition-colors shrink-0 ${
                scrolled ? "text-[#231f20]" : "text-white"
              }`}
            >
              <span className="font-serif-luxury text-xl xs:text-2xl sm:text-3xl font-bold tracking-wider sm:tracking-widest text-[#c5a059]">
                J <span className="font-script text-lg sm:text-xl text-[#c5a059]">&</span> J
              </span>
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.25em] opacity-80 border-l border-[#c5a059]/40 pl-2">
                Jane & Jerish
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-[#c5a059] ${
                    scrolled ? "text-[#3a3530]" : "text-white/90"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions: Music toggle & RSVP CTA button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Music Player Button */}
              <button
                type="button"
                onClick={toggleMusic}
                title={isPlayingMusic ? "Mute Background Music" : "Play Romantic Wedding Music"}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium border transition-all touch-manipulation min-h-[36px] ${
                  isPlayingMusic
                    ? "bg-[#c5a059] text-white border-[#c5a059] animate-pulse"
                    : scrolled
                    ? "bg-white/90 text-[#554d42] border-[#c5a059]/40 hover:bg-[#c5a059]/10"
                    : "bg-black/35 text-white border-white/35 hover:bg-black/50"
                }`}
              >
                {isPlayingMusic ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-white" />
                    <span className="hidden md:inline text-[11px]">Music On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="hidden md:inline text-[11px]">Play Music</span>
                  </>
                )}
              </button>

              {/* RSVP button */}
              <a
                href="#rsvp"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white gold-gradient-bg shadow-md hover:shadow-lg hover:brightness-105 transition-all min-h-[36px]"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                RSVP
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center touch-manipulation ${
                  scrolled ? "text-[#231f20] hover:bg-black/5" : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu backdrop & dropdown */}
        {mobileMenuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 top-[57px] bg-black/40 backdrop-blur-sm z-40 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="lg:hidden relative z-50 bg-[#faf7f2]/98 backdrop-blur-xl border-b border-[#c5a059]/25 px-5 sm:px-6 py-5 shadow-2xl animate-fadeIn max-h-[calc(100dvh-4rem)] overflow-y-auto">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-[#231f20] hover:text-[#c5a059] transition-colors py-2 px-1 border-b border-[#c5a059]/10 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <span className="text-[#c5a059] text-xs">→</span>
                  </a>
                ))}
                <div className="pt-3 flex flex-col gap-2">
                  <a
                    href="#rsvp"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white gold-gradient-bg shadow-md active:scale-95 transition-transform"
                  >
                    RSVP & Send Wishes
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
