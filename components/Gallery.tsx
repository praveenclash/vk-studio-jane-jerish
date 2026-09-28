"use client";

import React, { useState } from "react";
import { Heart, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ParallaxImage from "./ParallaxImage";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const photos = [
    {
      id: 1,
      category: "prewedding",
      caption: "Lover's Embrace in the Coconut Grove",
      src: "/images/MAD_1664.webp",
      position: "center 20%",
    },
    {
      id: 2,
      category: "prewedding",
      caption: "Radiant Smiles & Gentle Grace",
      src: "/images/MAD_1748.webp",
      position: "center 25%",
    },
    {
      id: 3,
      category: "details",
      caption: "Hand in Hand, Vows for a Lifetime",
      src: "/images/MAD_1732.webp",
      position: "center",
    },
    {
      id: 4,
      category: "beach",
      caption: "Golden Sunset by Kanyakumari Beach",
      src: "/images/MAD_1882.webp",
      position: "center 40%",
    },
    {
      id: 5,
      category: "prewedding",
      caption: "A Bridge of Love & New Beginnings",
      src: "/images/MAD_1721.webp",
      position: "center 25%",
    },
    {
      id: 6,
      category: "beach",
      caption: "Whispers of the Ocean Shore",
      src: "/images/MAD_1873.webp",
      position: "center 20%",
    },
    {
      id: 7,
      category: "prewedding",
      caption: "Under the Canopy of Grace",
      src: "/images/MAD_1739.webp",
      position: "center 30%",
    },
    {
      id: 8,
      category: "beach",
      caption: "Evening Glow & Endless Horizon",
      src: "/images/MAD_1880.webp",
      position: "center 20%",
    },
    {
      id: 9,
      category: "prewedding",
      caption: "Peaceful Solace in the Woods",
      src: "/images/MAD_1824.webp",
      position: "center 20%",
    },
    {
      id: 10,
      category: "prewedding",
      caption: "A Tender Kiss of Devotion",
      src: "/images/MAD_1858.webp",
      position: "center 25%",
    },
    {
      id: 11,
      category: "beach",
      caption: "Sunset Laughter & Ocean Breeze",
      src: "/images/MAD_1881.webp",
      position: "center 30%",
    },
    {
      id: 12,
      category: "prewedding",
      caption: "Joyous Moments in Nature",
      src: "/images/MAD_1666.webp",
      position: "center 25%",
    },
  ];

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <section id="gallery" className="py-14 sm:py-20 md:py-24 bg-[#0b0907] border-t border-[#d4af37]/20 relative overflow-hidden">
      {/* Subtle backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-7 sm:mb-10"
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
            A glimpse into our favorite memories and beautiful snapshots as we celebrate our holy union.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-8">
            {[
              { id: "all", label: "All Photos" },
              { id: "prewedding", label: "Pre-Wedding" },
              { id: "beach", label: "Beach & Sunset" },
              { id: "details", label: "Rings & Details" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 xs:px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all touch-manipulation min-h-[36px] ${
                  activeCategory === tab.id
                    ? "gold-gradient-bg text-black shadow-md shadow-[#d4af37]/20"
                    : "bg-[#181410] text-[#b8ab96] hover:text-white border border-[#d4af37]/25 hover:border-[#d4af37]"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-5 lg:gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:border-[#d4af37]/70 transition-all duration-300 border border-[#d4af37]/25 bg-stone-950 touch-manipulation"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                style={{ objectPosition: photo.position }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
                loading="lazy"
              />

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-4 text-white pointer-events-none z-10">
                <span className="text-[11px] sm:text-xs font-serif-luxury tracking-wide drop-shadow line-clamp-2 text-[#fcfbf7]">
                  {photo.caption}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-[#f6e29f] mt-1 font-semibold uppercase tracking-wider font-cinzel">
                  <ZoomIn className="w-3 h-3 text-[#d4af37]" /> Tap to view
                </span>
              </div>
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
                src={filteredPhotos[selectedPhotoIndex]?.src}
                alt={filteredPhotos[selectedPhotoIndex]?.caption}
                className="max-h-[65vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-[#d4af37]/30"
              />
              <p className="text-white/90 text-xs sm:text-sm mt-3 font-serif-luxury tracking-wider text-center px-4 max-w-md">
                {filteredPhotos[selectedPhotoIndex]?.caption} <span className="text-[#e5cb9b]">({selectedPhotoIndex + 1} / {filteredPhotos.length})</span>
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
