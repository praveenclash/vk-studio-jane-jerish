"use client";

import React from "react";
import { Heart, Coffee, Compass, Gem, Star } from "lucide-react";
import { motion } from "framer-motion";
import ParallaxImage from "./ParallaxImage";

export default function Story() {
  const milestones = [
    {
      year: "June 21, 2026",
      title: "First Met in Kanyakumari",
      description:
        "A fateful and magical day by the scenic shores of Kanyakumari where the three seas embrace. What started with warm greetings blossomed immediately into an effortless connection of shared values, smiles, and heartfelt conversation.",
      icon: Coffee,
      image: "/images/MAD_1873.webp",
    },
    {
      year: "August 2026",
      title: "Growing Together & Cherished Moments",
      description:
        "Through thoughtful discussions about life, family, and future dreams, every passing day made it crystal clear — we were meant to walk through life's every season together hand in hand.",
      icon: Compass,
      image: "/images/MAD_1721.webp",
    },
    {
      year: "September 19, 2026",
      title: "Pre-Wedding by Kanyakumari Beach",
      description:
        "Along the golden sands and sea breeze of Kanyakumari Beach, we celebrated our pre-wedding moments with laughter and joyous anticipation for the sacred vows to come.",
      icon: Gem,
      image: "/images/MAD_1882.webp",
    },
    {
      year: "October 12, 2026",
      title: "The Big Day — Forever Begins!",
      description:
        "Surrounded by our beloved parents, family, and well-wishers at ASKR Thirumana Mandapam and CSI Church Punnaiyadi Community Hall, we make our sacred covenant in holy matrimony.",
      icon: Star,
      image: "/images/MAD_1740.webp",
    },
  ];

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#0e0b08] border-y border-[#d4af37]/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          <span className="text-[#d4af37] font-script text-xl sm:text-2xl block mb-1">
            Our Journey
          </span>
          <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#fcfbf7] font-normal tracking-wide">
            How Our Love Story Unfolded
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4af37] fill-[#d4af37]" />
            <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
          </div>
          <p className="text-[#b8ab96] text-xs sm:text-sm leading-relaxed px-2">
            Every love story is beautiful, but ours is our absolute favorite. Here are the unforgettable chapters leading to our wedding day.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37] to-[#d4af37]/10" />

          <div className="space-y-8 sm:space-y-12 md:space-y-20">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-4 sm:gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Text card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full md:w-1/2 ${isEven ? "md:text-right" : "md:text-left"}`}
                  >
                    <div className="glass-panel-midnight-elevated p-5 sm:p-7 rounded-2xl sm:rounded-3xl hover:border-[#d4af37]/50 transition-all">
                      <div className={`flex items-center gap-2 mb-2.5 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#1a140f] border border-[#d4af37]/35 text-[10px] sm:text-xs font-cinzel font-semibold text-[#f6e29f]">
                          <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#d4af37]" />
                          <span>{item.year}</span>
                        </div>
                      </div>
                      <h3 className="font-serif-luxury text-lg xs:text-xl sm:text-2xl text-[#fcfbf7] mb-2 font-medium">
                        {item.title}
                      </h3>
                      <p className="text-[#d4c9b9] text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Center Node icon for desktop */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hidden md:flex relative items-center justify-center w-12 h-12 rounded-full bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/25 z-10 shrink-0"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  {/* Photo card with Parallax inside fixed window */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-1/2"
                  >
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-[#d4af37]/30 group bg-stone-900">
                      <ParallaxImage
                        src={item.image}
                        alt={item.title}
                        offset={30}
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
