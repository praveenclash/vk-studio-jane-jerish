"use client";

import React from "react";
import { Plane, Train, Hotel, Car, MapPin, ExternalLink, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function TravelAndAccommodations() {
  const accommodations = [
    {
      name: "Sparsa Resort Kanyakumari",
      stars: "4 Star Luxury",
      distance: "Near Sunset Point / Beach",
      address: "Beach Road, Kanyakumari, Tamil Nadu",
      link: "https://www.sparsaresorts.com",
    },
    {
      name: "The Gopinivas Grand",
      stars: "Premium Hotel",
      distance: "5 mins to Beach & Transit",
      address: "Near Seashore, Kanyakumari, Tamil Nadu",
      link: "https://www.thegopinivasgrand.com",
    },
    {
      name: "Annai Resorts & Spa",
      stars: "Luxury Resort",
      distance: "Prime Coastal Location",
      address: "Kovalam Road, Kanyakumari, Tamil Nadu",
      link: "https://www.annairesorts.com",
    },
  ];

  return (
    <section id="travel" className="py-16 sm:py-24 bg-[#0b0907] border-t border-[#d4af37]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          <span className="text-[#d4af37] font-script text-xl sm:text-2xl block mb-1">
            Guest Guide
          </span>
          <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#fcfbf7] font-normal tracking-wide">
            Travel & Accommodations
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4af37] fill-[#d4af37]" />
            <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
          </div>
          <p className="text-[#b8ab96] text-xs sm:text-sm leading-relaxed px-2">
            For our cherished friends and family travelling from out of town to Kanyakumari, we have compiled helpful travel directions and stay options.
          </p>
        </motion.div>

        {/* Travel Transit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {[
            {
              icon: Plane,
              title: "Trivandrum Airport (TRV)",
              desc: "Approx. 85-90 km to Kanyakumari. 24/7 prepaid airport cabs and express buses are conveniently available.",
            },
            {
              icon: Train,
              title: "Kanyakumari & Nagercoil Stations",
              desc: "Kanyakumari (CAPE) & Nagercoil Junction (NCJ) have direct express trains from Chennai, Bangalore, and across India.",
            },
            {
              icon: Car,
              title: "Road & Venue Parking",
              desc: "Ample parking space is provided at both ASKR Thirumana Mandapam and CSI Church Punnaiyadi Community Hall.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-panel-midnight p-4 xs:p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#d4af37]/20 shadow-md flex items-start gap-3.5 sm:gap-4 group hover:border-[#d4af37]/50 transition-colors"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#181410] border border-[#d4af37]/35 flex items-center justify-center text-[#d4af37] shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base sm:text-lg text-[#fcfbf7] font-semibold mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#cfc5b6] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recommended Hotels */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif-luxury text-xl sm:text-2xl text-[#fcfbf7] mb-4 sm:mb-6 text-center font-normal"
          >
            Recommended Nearby Stays
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {accommodations.map((hotel, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-panel-midnight rounded-2xl p-4 xs:p-5 sm:p-6 border border-[#d4af37]/20 shadow-md flex flex-col justify-between hover:border-[#d4af37]/50 transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#f6e29f] bg-[#181410] px-2.5 py-0.5 rounded-full border border-[#d4af37]/30">
                      {hotel.stars}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#b8ab96]">{hotel.distance}</span>
                  </div>
                  <h4 className="font-serif-luxury text-lg sm:text-xl text-[#fcfbf7] font-semibold mb-1.5 sm:mb-2">
                    {hotel.name}
                  </h4>
                  <p className="text-xs text-[#cfc5b6] mb-5 sm:mb-6 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{hotel.address}</span>
                  </p>
                </div>

                <a
                  href={hotel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl border border-[#d4af37]/45 text-xs font-semibold text-[#f6e29f] hover:bg-[#d4af37]/15 transition-colors min-h-[42px] touch-manipulation"
                >
                  <span>Book / View Hotel</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
