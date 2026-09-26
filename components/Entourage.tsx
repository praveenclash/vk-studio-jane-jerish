"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";

export default function Entourage() {
  const party = [
    {
      role: "Best Man",
      name: "Marcus Samuel",
      relation: "Jerish's Childhood Best Friend",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
    {
      role: "Maid of Honor",
      name: "Pooja Varma",
      relation: "Jane's Sister & Confidante",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    },
    {
      role: "Groomsman",
      name: "Ashwin Nathan",
      relation: "College Roommate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    },
    {
      role: "Bridesmaid",
      name: "Deepika Rao",
      relation: "High School Buddy",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <span className="text-[#c5a059] font-script text-2xl xs:text-3xl sm:text-4xl block mb-1 sm:mb-2">
          Our Special People
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#231f20] font-normal tracking-wide">
          Bridal Party & Entourage
        </h2>
        <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
          <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
          <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059] fill-[#c5a059]" />
          <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
        </div>
        <p className="text-[#6b6661] text-xs sm:text-base leading-relaxed px-2">
          The wonderful friends and family standing by our side on our most meaningful day.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {party.map((person, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl sm:rounded-3xl p-3.5 xs:p-4 sm:p-5 border border-[#c5a059]/20 shadow-sm hover:shadow-md text-center group transition-all"
          >
            <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 mx-auto rounded-full overflow-hidden mb-3 sm:mb-5 border-2 border-[#c5a059]/30 p-1 bg-stone-50">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#a27e36] bg-[#faf7f2] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#c5a059]/20 inline-block mb-1.5 sm:mb-2">
              {person.role}
            </span>
            <h4 className="font-serif-luxury text-lg xs:text-xl sm:text-2xl text-[#231f20] font-normal leading-tight">
              {person.name}
            </h4>
            <p className="text-[11px] sm:text-xs text-[#6b6661] mt-1 line-clamp-2">
              {person.relation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
