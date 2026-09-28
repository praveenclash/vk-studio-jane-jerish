"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, Calendar, MapPin, ChevronDown, Sparkles, FileText } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import InvitationCardModal from "./InvitationCardModal";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax movement for hero background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, 50]);

  // Wedding target date (October 12, 2026 at 10:00 AM)
  const targetDate = new Date("2026-10-12T10:00:00").getTime();

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
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image with smooth scroll parallax inside fixed window */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/MAD_1926.webp')",
          }}
        />
        {/* Soft luxury dark gradients over image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-[#0b0907]" />
      </motion.div>

      {/* Decorative floral or sparkling aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content with smooth scroll fade */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full max-w-4xl mx-auto px-3.5 sm:px-6 text-center pt-[calc(env(safe-area-inset-top,0px)+5rem)] sm:pt-28 pb-12 sm:pb-16 flex flex-col items-center justify-center min-h-[100dvh]"
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/40 text-[#f6e29f] text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.25em] uppercase mb-3 shadow-md"
        >
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#d4af37]" />
          <span>Save The Date</span>
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#d4af37]" />
        </motion.div>

        {/* Sacred Scripture from Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-2 text-center"
        >
          <span className="text-sm font-serif text-[#d4af37]">✝</span>
          <p className="font-serif-luxury italic text-xs xs:text-sm text-[#f6e29f] tracking-wide">
            &ldquo;The thing proceedeth from the Lord&rdquo;{" "}
            <span className="font-cinzel text-[10px] text-[#d4af37] not-italic tracking-wider uppercase">
              (Genesis 24:50)
            </span>
          </p>
        </motion.div>

        {/* Subtitle */}
        {/* <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-luxury italic text-white/85 text-sm sm:text-base mb-1 tracking-wide px-2"
        >
          Together with our parents, we invite you to celebrate the Holy Matrimony of
        </motion.p> */}

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-luxury text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide my-1.5 sm:my-2 drop-shadow-md leading-tight inline-flex flex-wrap items-center justify-center gap-2 xs:gap-3 sm:gap-4"
        >
          <span>Jane</span>
          <span className="inline-flex items-center justify-center mx-1">
            <Heart className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#d4af37] fill-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] animate-pulse" />
          </span>
          <span>Jerish</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-20 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-2 sm:my-2.5"
        />

        {/* Date & Location */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white/90 text-xs sm:text-sm mb-6 sm:mb-8 tracking-wider text-center font-cinzel"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span className="font-medium tracking-widest">October 12, 2026</span>
          </div>
          <span className="hidden sm:inline text-[#d4af37]">•</span>
          {/* <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span className="font-medium tracking-wide">St. James Church &amp; ASKR Mandapam, Thoothukudi</span>
          </div> */}
        </motion.div>

        {/* Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg mx-auto mb-6 sm:mb-8 px-1"
        >
          <p className="text-[#f6e29f]/90 text-[10px] sm:text-xs font-cinzel uppercase tracking-[0.25em] mb-2.5 sm:mb-3">
            Counting Down To Our Forever
          </p>
          <div className="grid grid-cols-4 gap-1 xs:gap-2 sm:gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-black/55 backdrop-blur-md border border-[#d4af37]/35 rounded-xl sm:rounded-2xl py-2 sm:py-3 px-1 sm:px-2 text-center transform hover:scale-105 transition-transform shadow-lg"
              >
                <div className="font-cinzel text-lg xs:text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-[8px] xs:text-[10px] sm:text-[11px] font-cinzel text-[#f6e29f] uppercase tracking-wider xs:tracking-widest font-medium mt-0.5 truncate">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto px-4 sm:px-0"
        >
          {/* Send Wishes CTA */}
          <a
            href="#rsvp"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full gold-gradient-bg text-black font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-2xl hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
          >
            <Heart className="w-4 h-4 fill-black" />
            Send Wishes
          </a>

          {/* View Official Invitation Card Button */}
          <button
            type="button"
            onClick={() => setIsCardModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-[#181410] border border-[#d4af37]/60 text-[#f6e29f] hover:bg-[#d4af37]/20 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all min-h-[44px] cursor-pointer touch-manipulation"
          >
            <FileText className="w-4 h-4 text-[#d4af37]" />
            <span>Invitation Card</span>
          </button>

         
        </motion.div>
      </motion.div>

      {/* Floating scroll indicator */}
      <a
        href="#couple"
        className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white flex-col items-center gap-1 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/80 font-cinzel">Scroll Down</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-white/80" />
      </a>

      {/* Official Invitation Card Modal */}
      <InvitationCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />
    </section>
  );
}
