"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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

  const heroImages = [
    { src: "/images/Hero_Image_1.jpeg", pcPos: "sm:object-[center_20%]" },
    { src: "/images/Hero_Image_2.jpeg", pcPos: "sm:object-[center_32%]" },
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatic slideshow cycle every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

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
    <section ref={containerRef} className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Background Image Slideshow with smooth crossfade and scroll parallax */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 will-change-transform"
      >
        {heroImages.map((img, idx) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              idx === currentImageIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            {/* Full-bleed Edge-to-Edge Image (No side space on any screen) */}
            <Image
              src={img.src}
              alt="Jane & Jerish Wedding"
              fill
              priority={idx === 0}
              sizes="100vw"
              quality={85}
              className={`object-cover object-center ${img.pcPos}`}
            />
          </div>
        ))}
        {/* Soft luxury dark gradient: clear over faces in upper half, dark at bottom for readable text */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
      </motion.div>

      {/* Decorative floral or sparkling aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content with smooth scroll fade - Positioned at bottom so faces are 100% visible */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full max-w-4xl mx-auto px-3.5 sm:px-6 text-center pt-[calc(env(safe-area-inset-top,0px)+4.25rem)] sm:pt-20 pb-6 sm:pb-12 flex flex-col items-center justify-end min-h-dvh"
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#d4af37]/40 text-[#f6e29f] text-[10px] xs:text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-1.5 sm:mb-3 shadow-md"
        >
          <Sparkles className="w-2.5 xs:w-3 sm:w-3.5 h-2.5 xs:h-3 sm:h-3.5 text-[#d4af37]" />
          <span>Save The Date</span>
          <Sparkles className="w-2.5 xs:w-3 sm:w-3.5 h-2.5 xs:h-3 sm:h-3.5 text-[#d4af37]" />
        </motion.div>

        {/* Sacred Scripture from Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-1 sm:mb-2 text-center"
        >
          <span className="text-xs sm:text-sm font-serif text-[#d4af37]">✝</span>
          <p className="font-serif-luxury italic text-[11px] xs:text-xs sm:text-sm text-[#f6e29f] tracking-wide">
            &ldquo;The thing proceedeth from the Lord&rdquo;{" "}
            <span className="font-cinzel text-[9px] xs:text-[10px] text-[#d4af37] not-italic tracking-wider uppercase">
              (Genesis 24:50)
            </span>
          </p>
        </motion.div>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-luxury text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide my-1 sm:my-2 drop-shadow-md leading-tight inline-flex flex-wrap items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-4"
        >
          <span>Jane</span>
          <span className="inline-flex items-center justify-center mx-0.5 sm:mx-1">
            <Heart className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#d4af37] fill-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] animate-pulse" />
          </span>
          <span>Jerish</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-16 sm:w-28 h-px bg-linear-to-r from-transparent via-[#d4af37] to-transparent my-1 sm:my-2.5"
        />

        {/* Date & Location */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6 text-white/90 text-[11px] xs:text-xs sm:text-sm mb-3 sm:mb-8 tracking-wider text-center font-cinzel"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#d4af37] shrink-0" />
            <span className="font-medium tracking-widest">October 12, 2026</span>
          </div>
        </motion.div>

        {/* Live Countdown Timer - Compact & elegant on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xs sm:max-w-lg mx-auto mb-3.5 sm:mb-8 px-1"
        >
          <p className="text-[#f6e29f]/90 text-[9px] xs:text-[10px] sm:text-xs font-cinzel uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-1.5 sm:mb-3">
            Counting Down To Our Forever
          </p>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-black/55 backdrop-blur-md border border-[#d4af37]/35 rounded-lg xs:rounded-xl sm:rounded-2xl py-1.5 xs:py-2 sm:py-3 px-1 sm:px-2 text-center transform hover:scale-105 transition-transform shadow-lg"
              >
                <div className="font-cinzel text-base xs:text-xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-[7px] xs:text-[9px] sm:text-[11px] font-cinzel text-[#f6e29f] uppercase tracking-wider font-medium mt-0.5 truncate">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons - Perfectly Centered on Mobile & PC */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row items-center justify-center gap-2 sm:gap-4 w-full max-w-[320px] xs:max-w-sm sm:max-w-lg mx-auto px-1 sm:px-0"
        >
          {/* Send Wishes CTA */}
          <a
            href="#rsvp"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 xs:px-4 sm:px-7 py-1.5 sm:py-3 rounded-full gold-gradient-bg text-black font-bold text-[10px] xs:text-xs sm:text-sm uppercase tracking-wide sm:tracking-wider whitespace-nowrap shadow-md hover:shadow-xl hover:brightness-110 active:scale-95 transition-all min-h-8 sm:min-h-11"
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-black shrink-0" />
            <span>Send Wishes</span>
          </a>

          {/* View Official Invitation Card Button */}
          <button
            type="button"
            onClick={() => setIsCardModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 xs:px-4 sm:px-7 py-1.5 sm:py-3 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/60 text-[#f6e29f] hover:bg-[#d4af37]/20 font-bold text-[10px] xs:text-xs sm:text-sm uppercase tracking-wide sm:tracking-wider whitespace-nowrap shadow-md active:scale-95 transition-all min-h-8 sm:min-h-11 cursor-pointer touch-manipulation"
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-[#d4af37] shrink-0" />
            <span>Invitation Card</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating scroll indicator */}
      <a
        href="#couple"
        className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white flex-col items-center gap-1 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest text-[#d4af37]/80 font-cinzel">Scroll Down</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#d4af37]/80" />
      </a>

      {/* Official Invitation Card Modal */}
      <InvitationCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />
    </section>
  );
}

