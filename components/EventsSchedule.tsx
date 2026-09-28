"use client";

import React from "react";
import { Calendar, Clock, MapPin, Sparkles, Navigation, Heart } from "lucide-react";
import { motion } from "framer-motion";
import ParallaxImage from "./ParallaxImage";

export default function EventsSchedule() {
  const events = [
    {
      title: "Engagement Ceremony",
      tagline: "Rings Exchanged & Joyous Fellowship",
      date: "Sunday, October 11, 2026",
      time: "06:30 PM Onwards",
      venue: "ASKR Thirumana Mandapam",
      address: "Puthugramam, Thoothukudi, Tamil Nadu",
      dressCode: "Festive Ethnic, Silk Sarees / Suits",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Jane+%26+Jerish+Engagement&dates=20261011T130000Z/20261011T163000Z&details=Engagement+Celebration+at+ASKR+Thirumana+Mandapam&location=ASKR+Thirumana+Mandapam+Puthugramam+Thoothukudi",
      mapsUrl: "https://maps.google.com/?q=ASKR+Thirumana+Mandapam+Puthugramam+Thoothukudi",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Holy Matrimony Service",
      tagline: "Sacred Covenant & Church Solemnization",
      date: "Monday, October 12, 2026",
      time: "10:00 AM Sharp",
      venue: "St. James Church",
      address: "Toovipuram, Thoothukudi, Tamil Nadu",
      dressCode: "Traditional Silk Sarees, Silk Kurta / Formal Suits",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Jane+%26+Jerish+Holy+Matrimony&dates=20261012T043000Z/20261012T073000Z&details=Holy+Matrimony+Service+at+St.+James+Church+Toovipuram+Thoothukudi&location=St.+James+Church+Toovipuram+Thoothukudi",
      mapsUrl: "https://maps.google.com/?q=St.+James+Church+Toovipuram+Thoothukudi",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80",
      featured: true,
    },
    {
      title: "Wedding Feast & Function",
      tagline: "Grand Lunch Banquet & Family Felicitations",
      date: "Monday, October 12, 2026",
      time: "Followed Immediately After Church Service",
      venue: "ASKR Thirumana Mandapam",
      address: "Puthugramam, Thoothukudi, Tamil Nadu",
      dressCode: "Traditional Festive / Elegant Formal Attire",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Jane+%26+Jerish+Wedding+Reception+and+Feast&dates=20261012T070000Z/20261012T110000Z&details=Wedding+Feast+at+ASKR+Thirumana+Mandapam+Puthugramam+Thoothukudi&location=ASKR+Thirumana+Mandapam+Puthugramam+Thoothukudi",
      mapsUrl: "https://maps.google.com/?q=ASKR+Thirumana+Mandapam+Puthugramam+Thoothukudi",
      image: "https://images.unsplash.com/photo-1545232979-fbf68fe9f1f8?auto=format&fit=crop&w=700&q=80",
    },
  ];

  return (
    <section id="events" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
      >
        <span className="text-[#d4af37] font-script text-xl sm:text-2xl block mb-1">
          Celebrate With Us
        </span>
        <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#fcfbf7] font-normal tracking-wide">
          Wedding Events & Schedule
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
          <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4af37] fill-[#d4af37]" />
          <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
        </div>
        <p className="text-[#b8ab96] text-xs sm:text-sm leading-relaxed px-2">
          Please join us in each celebration as we step into this sacred chapter. Kindly find the timings and venues below.
        </p>
      </motion.div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`glass-panel-midnight-elevated rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-[#d4af37]/60 ${
              event.featured
                ? "border-[#d4af37] ring-2 ring-[#d4af37]/30 shadow-lg relative"
                : "border-[#d4af37]/25 shadow-sm"
            }`}
          >
            {event.featured && (
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 bg-[#d4af37] text-black text-[10px] sm:text-[11px] font-cinzel font-bold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                Main Ceremony
              </div>
            )}

            {/* Event Image with Parallax effect */}
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
              <ParallaxImage
                src={event.image}
                alt={event.title}
                offset={30}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 text-white pr-2 z-10">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-cinzel font-semibold text-[#f6e29f] block">
                  {event.tagline}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-4 xs:p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-luxury text-lg xs:text-xl sm:text-2xl text-[#fcfbf7] font-normal mb-3 sm:mb-4">
                  {event.title}
                </h3>

                <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#cfc5b6] mb-5 sm:mb-6">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Calendar className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span className="font-semibold text-[#fcfbf7]">{event.date}</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#fcfbf7] block">{event.venue}</span>
                      <span className="text-[11px] sm:text-[12px] text-[#b8ab96]">{event.address}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3 pt-1">
                    <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <div className="text-[11px] sm:text-[12px] text-[#f6e29f] bg-[#1a140f] px-2.5 py-1.5 rounded-lg border border-[#d4af37]/30 w-full break-words">
                      <span className="font-semibold text-[#d4af37]">Dress Code:</span> {event.dressCode}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3.5 sm:pt-4 border-t border-[#d4af37]/20 flex flex-col xs:flex-row sm:flex-col lg:flex-row gap-2">
                <a
                  href={event.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#d4af37]/45 text-xs font-semibold text-[#f6e29f] hover:bg-[#d4af37]/15 transition-colors min-h-[42px] touch-manipulation"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  Add to Calendar
                </a>
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl gold-gradient-bg text-xs font-bold text-black hover:brightness-110 transition-colors shadow-md min-h-[42px] touch-manipulation"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  View Map
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
