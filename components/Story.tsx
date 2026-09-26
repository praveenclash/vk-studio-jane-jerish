"use client";

import React from "react";
import { Heart, Coffee, Compass, Gem, Star } from "lucide-react";

export default function Story() {
  const milestones = [
    {
      year: "August 2021",
      title: "The First Glance",
      description:
        "A serendipitous meeting at a mutual friend's book reading in Bangalore. What started as a brief hello turned into four hours of non-stop conversation about dreams, music, and favorite books.",
      icon: Coffee,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",
    },
    {
      year: "March 2023",
      title: "Adventures & Road Trips",
      description:
        "From early morning coastal drives to rainy mountain getaways in Munnar, we discovered that travelling through life together is our greatest joy.",
      icon: Compass,
      image: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=700&q=80",
    },
    {
      year: "December 2025",
      title: "The Sunset Proposal",
      description:
        "On a golden sunset evening overlooking the waves at Mahabalipuram, Jerish went down on one knee. With tears of happiness and laughter, Jane said 'YES!' forever.",
      icon: Gem,
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80",
    },
    {
      year: "December 2026",
      title: "The Big Day — We Do!",
      description:
        "Surrounded by our dearest family and closest friends, we will make our holy covenant and celebrate the beginning of our forever.",
      icon: Star,
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80",
    },
  ];

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#f5efe6]/40 border-y border-[#c5a059]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-[#c5a059] font-script text-2xl xs:text-3xl sm:text-4xl block mb-1 sm:mb-2">
            Our Journey
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#231f20] font-normal tracking-wide">
            How Our Love Story Unfolded
          </h2>
          <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
            <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059] fill-[#c5a059]" />
            <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
          </div>
          <p className="text-[#6b6661] text-xs sm:text-base leading-relaxed px-2">
            Every love story is beautiful, but ours is our absolute favorite. Here are the unforgettable chapters leading to our wedding day.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#c5a059]/10 via-[#c5a059] to-[#c5a059]/10" />

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
                  <div className={`w-full md:w-1/2 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-[#c5a059]/20 hover:shadow-md transition-shadow">
                      <div className={`flex items-center gap-2 mb-3 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#faf7f2] border border-[#c5a059]/30 text-[11px] sm:text-xs font-semibold text-[#a27e36]">
                          <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                          <span>{item.year}</span>
                        </div>
                      </div>
                      <h3 className="font-serif-luxury text-xl xs:text-2xl sm:text-3xl text-[#231f20] mb-2 font-normal">
                        {item.title}
                      </h3>
                      <p className="text-[#6b6661] text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node icon for desktop */}
                  <div className="hidden md:flex relative items-center justify-center w-12 h-12 rounded-full bg-[#c5a059] text-white shadow-md z-10 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Photo card */}
                  <div className="w-full md:w-1/2">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-[#c5a059]/30 group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
