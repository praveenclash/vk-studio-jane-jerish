"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const photos = [
    {
      id: 1,
      caption: "Lover's Embrace in the Coconut Grove",
      src: "/images/MAD_1664.webp",
      position: "center 20%",
    },
    {
      id: 2,
      caption: "Hand in Hand, Vows for a Lifetime",
      src: "/images/MAD_1732.webp",
      position: "center",
    },
    {
      id: 3,
      caption: "Golden Sunset by Kanyakumari Beach",
      src: "/images/MAD_1882.webp",
      position: "center 40%",
    },
    {
      id: 4,
      caption: "Whispers of the Ocean Shore",
      src: "/images/MAD_1873.webp",
      position: "center 20%",
    },
    {
      id: 5,
      caption: "Evening Glow & Endless Horizon",
      src: "/images/WhatsApp.jpeg",
      position: "center 20%",
    },
    {
      id: 6,
      caption: "A Tender Kiss of Devotion",
      src: "/images/MAD_1858.webp",
      position: "center 25%",
    },
    {
      id: 7,
      caption: "Sunset Laughter & Ocean Breeze",
      src: "/images/MAD_1881.webp",
      position: "center 30%",
    },
     {
      id: 8,
      caption: "Sunset Laughter & Ocean Breeze",
      src: "/images/MAD_1839.JPG",
      position: "center 30%",
    },
    {
      id: 9,
      caption: "Joyous Moments in Nature",
      src: "/images/MAD_1666.webp",
      position: "center 25%",
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + photos.length) % photos.length
      );
    }
  };

  return (
    <section id="gallery" className="py-14 sm:py-20 md:py-24 bg-[#0b0907] border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Subtle backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          <span className="text-[#d4af37] font-script text-xl sm:text-2xl block mb-1">
            Captured Moments
          </span>
          <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#fcfbf7] font-normal tracking-wide">
            Our Photo Gallery
          </h2>
          <div className="flex items-center justify-center gap-3 my-2.5 sm:my-3">
            <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4af37] fill-[#d4af37]" />
            <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
          </div>
          <p className="text-[#b8ab96] text-xs sm:text-sm leading-relaxed px-2">
            Every picture holds a gentle smile, a quiet prayer, and a promise of forever.
          </p>
        </motion.div>

        {/* Gallery Grid: Full-width 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              onClick={() => openLightbox(index)}
              className="group relative w-full aspect-[4/5] sm:aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:border-[#d4af37]/70 transition-all duration-300 border border-[#d4af37]/25 bg-stone-950 touch-manipulation"
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={78}
                priority={index < 2}
                style={{ objectPosition: photo.position }}
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Close button with safe-area support */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-[max(1rem,env(safe-area-inset-top,1rem))] right-[max(1rem,env(safe-area-inset-right,1rem))] text-white p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors z-50 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Previous arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-[max(0.5rem,env(safe-area-inset-left,0.5rem))] top-1/2 -translate-y-1/2 text-white p-2 sm:p-3 rounded-full bg-black/50 sm:bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors z-50 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Image & Caption container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-w-[88vw] sm:max-w-4xl max-h-[85vh] flex flex-col items-center pb-[env(safe-area-inset-bottom,0px)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedPhotoIndex]?.src}
                alt={photos[selectedPhotoIndex]?.caption}
                className="max-h-[65vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-[#d4af37]/30"
              />
              <p className="text-white/90 text-xs sm:text-sm mt-3 font-serif-luxury tracking-wider text-center px-4 max-w-md">
                {photos[selectedPhotoIndex]?.caption} <span className="text-[#e5cb9b]">({selectedPhotoIndex + 1} / {photos.length})</span>
              </p>
            </motion.div>

            {/* Next arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-[max(0.5rem,env(safe-area-inset-right,0.5rem))] top-1/2 -translate-y-1/2 text-white p-2 sm:p-3 rounded-full bg-black/50 sm:bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors z-50 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
