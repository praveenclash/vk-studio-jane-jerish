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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${scrolled
            ? "bg-[#0b0907]/95 backdrop-blur-md shadow-2xl border-b border-[#d4af37]/25 py-2 sm:py-2.5"
            : "bg-gradient-to-b from-black/85 via-black/40 to-transparent py-3 sm:py-4"
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



            {/* Actions: Music toggle & RSVP CTA button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Music Player Button */}
              <button
                type="button"
                onClick={toggleMusic}
                title={isPlayingMusic ? "Mute Background Music" : "Play Romantic Wedding Music"}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium border transition-all touch-manipulation min-h-[36px] ${isPlayingMusic
                    ? "bg-[#d4af37] text-black font-semibold border-[#d4af37] animate-pulse"
                    : scrolled
                      ? "bg-[#16120e] text-[#ded6ca] border-[#d4af37]/40 hover:bg-[#d4af37]/15"
                      : "bg-black/40 text-white border-white/35 hover:bg-black/60"
                  }`}
              >
                {isPlayingMusic ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-black" />
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
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-black gold-gradient-bg shadow-md hover:shadow-lg hover:brightness-110 transition-all min-h-[36px]"
              >
                <Heart className="w-3.5 h-3.5 fill-black" />
               Wish
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center touch-manipulation text-white hover:bg-white/10"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#d4af37]" /> : <Menu className="w-6 h-6 text-[#d4af37]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu backdrop & dropdown */}
        {mobileMenuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 top-[calc(env(safe-area-inset-top,0px)+54px)] bg-black/70 backdrop-blur-sm z-40 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="lg:hidden relative z-50 bg-[#120e0a]/98 backdrop-blur-2xl border-b border-[#d4af37]/30 px-5 sm:px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] shadow-2xl animate-fadeIn max-h-[calc(100dvh-5rem)] overflow-y-auto">
              <div className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm sm:text-base font-medium text-[#fcfbf7] hover:text-[#d4af37] transition-colors py-2.5 px-1 border-b border-[#d4af37]/15 flex items-center justify-between min-h-[44px] touch-manipulation"
                  >
                    <span>{link.name}</span>
                    <span className="text-[#d4af37] text-xs">→</span>
                  </a>
                ))}
                <div className="pt-3 flex flex-col gap-2">
                  <a
                    href="#rsvp"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black gold-gradient-bg shadow-md active:scale-95 transition-transform min-h-[44px] flex items-center justify-center touch-manipulation"
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
