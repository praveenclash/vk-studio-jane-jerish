"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, Volume2, VolumeX, Calendar, MessageSquareHeart } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
    }
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

  return (
    <>
      {/* Background audio player - Anbil Avan Christian Wedding Song */}
      <audio
        ref={audioRef}
        loop
        src="/music/wedding-song.mp3"
        preload="metadata"
        onPlay={() => setIsPlayingMusic(true)}
        onPause={() => setIsPlayingMusic(false)}
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

            </div>
          </div>
        </div>
      </header>
    </>
  );
}
