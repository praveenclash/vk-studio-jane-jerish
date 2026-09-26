"use client";

import React, { useState, useEffect } from "react";
import { Heart, Calendar, MapPin, ChevronDown, Sparkles } from "lucide-react";

export default function Hero() {
  // Wedding target date (December 20, 2026)
  const targetDate = new Date("2026-12-20T10:30:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with warm cinematic overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85')",
        }}
      >
        {/* Soft luxury gradients over image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#faf7f2]" />
      </div>

      {/* Decorative floral or sparkling aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a059]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 sm:pt-32 pb-14 sm:pb-20 flex flex-col items-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6 shadow-sm">
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#e5cb9b]" />
          <span>Save The Date</span>
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#e5cb9b]" />
        </div>

        {/* Subtitle */}
        <p className="font-serif-luxury italic text-white/90 text-base sm:text-2xl mb-1 sm:mb-2 tracking-wide px-2">
          Together with our parents, we invite you to celebrate
        </p>

        {/* Couple Names */}
        <h1 className="font-serif-luxury text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-normal tracking-tight my-1 sm:my-2 drop-shadow-md leading-tight">
          Jane <span className="font-script text-[#e5cb9b] text-3xl xs:text-4xl sm:text-6xl md:text-8xl">&</span> Jerish
        </h1>

        <div className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent my-3 sm:my-4" />

        {/* Date & Location */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-white/90 text-xs sm:text-base mb-8 sm:mb-10 tracking-wider text-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#e5cb9b] shrink-0" />
            <span className="font-medium">December 20, 2026</span>
          </div>
          <span className="hidden sm:inline text-[#e5cb9b]">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#e5cb9b] shrink-0" />
            <span className="font-medium">Grand Palace Hall, Chennai</span>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="w-full max-w-xl mx-auto mb-8 sm:mb-10 px-1">
          <p className="text-white/80 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-4">
            Counting Down To Our Forever
          </p>
          <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 text-center transform hover:scale-105 transition-transform"
              >
                <div className="font-serif-luxury text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-[9px] xs:text-[10px] sm:text-xs text-[#e5cb9b] uppercase tracking-wider font-medium mt-0.5 sm:mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <a
            href="#rsvp"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full gold-gradient-bg text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all min-h-[46px]"
          >
            <Heart className="w-4 h-4 fill-white" />
            RSVP & Send Wishes
          </a>
          <a
            href="#events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-[#231f20] font-semibold text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all min-h-[46px]"
          >
            <Calendar className="w-4 h-4" />
            View Schedule
          </a>
        </div>
      </div>

      {/* Floating scroll indicator */}
      <a
        href="#couple"
        className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white flex-col items-center gap-1 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/80">Scroll Down</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-white/80" />
      </a>
    </section>
  );
}
