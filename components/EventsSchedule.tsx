"use client";

import React from "react";
import { Calendar, Clock, MapPin, Sparkles, Navigation, Heart } from "lucide-react";

export default function EventsSchedule() {
  const events = [
    {
      title: "Sangeet & Haldi Celebration",
      tagline: "Music, Dance & Joyous Traditions",
      date: "Saturday, December 19, 2026",
      time: "05:00 PM – 10:00 PM",
      venue: "Emerald Lawn, The Leela Palace",
      address: "Adyar Sea Face, MRC Nagar, Chennai, Tamil Nadu 600028",
      dressCode: "Vibrant Yellow, Mustard or Festive Indian Wear",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Jane+%26+Jerish+Sangeet+%26+Haldi&dates=20261219T113000Z/20261219T163000Z&details=Join+us+for+music,+dance,+and+Haldi!&location=The+Leela+Palace+Chennai",
      mapsUrl: "https://maps.google.com/?q=The+Leela+Palace+Chennai",
      image: "https://images.unsplash.com/photo-1545232979-fbf68fe9f1f8?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Holy Matrimony & Wedding Vows",
      tagline: "Sacred Covenant & Exchanging of Rings",
      date: "Sunday, December 20, 2026",
      time: "10:00 AM – 12:30 PM (Followed by Lunch)",
      venue: "St. Mary's Cathedral Hall",
      address: "Parry's Corner / Santhome High Road, Chennai, Tamil Nadu",
      dressCode: "Traditional Pattu Sarees, Silk Kurta / Formal Suits",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Jane+%26+Jerish+Holy+Matrimony&dates=20261220T043000Z/20261220T070000Z&details=Holy+Matrimony+Service+and+Blessings&location=Chennai",
      mapsUrl: "https://maps.google.com/?q=St+Marys+Cathedral+Chennai",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80",
      featured: true,
    },
    {
      title: "Grand Evening Reception & Dinner",
      tagline: "Toasts, Grand Feast & Dancing",
      date: "Sunday, December 20, 2026",
      time: "06:30 PM Onwards",
      venue: "Grand Ballroom, ITC Grand Chola",
      address: "No. 63, Anna Salai, Guindy, Chennai, Tamil Nadu 600032",
      dressCode: "Black Tie, Tuxedo, Cocktail Dresses / Glamorous Attire",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Jane+%26+Jerish+Grand+Reception&dates=20261220T130000Z/20261220T173000Z&details=Reception+Gala+and+Dinner+Banquet&location=ITC+Grand+Chola+Chennai",
      mapsUrl: "https://maps.google.com/?q=ITC+Grand+Chola+Chennai",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
    },
  ];

  return (
    <section id="events" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <span className="text-[#c5a059] font-script text-2xl xs:text-3xl sm:text-4xl block mb-1 sm:mb-2">
          Celebrate With Us
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#231f20] font-normal tracking-wide">
          Wedding Events & Schedule
        </h2>
        <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
          <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
          <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059] fill-[#c5a059]" />
          <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
        </div>
        <p className="text-[#6b6661] text-xs sm:text-base leading-relaxed px-2">
          Please join us in each celebration as we step into this sacred chapter. Kindly find the timings and venues below.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {events.map((event, idx) => (
          <div
            key={idx}
            className={`rounded-3xl overflow-hidden bg-white border flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
              event.featured
                ? "border-[#c5a059] ring-2 ring-[#c5a059]/20 shadow-md relative"
                : "border-[#c5a059]/20 shadow-sm"
            }`}
          >
            {event.featured && (
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-[#c5a059] text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                Main Ceremony
              </div>
            )}

            {/* Event Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 text-white pr-2">
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#e5cb9b] block">
                  {event.tagline}
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-4 xs:p-5 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-luxury text-xl xs:text-2xl text-[#231f20] font-normal mb-3 sm:mb-4">
                  {event.title}
                </h3>

                <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#554d42] mb-5 sm:mb-6">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Calendar className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span className="font-semibold text-[#231f20]">{event.date}</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#231f20] block">{event.venue}</span>
                      <span className="text-[11px] sm:text-[12px] text-[#6b6661]">{event.address}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3 pt-1">
                    <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <div className="text-[11px] sm:text-[12px] text-[#855e1a] bg-[#faf7f2] px-2.5 py-1 rounded-md border border-[#c5a059]/20 w-full break-words">
                      <span className="font-medium">Dress Code:</span> {event.dressCode}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3.5 sm:pt-4 border-t border-[#c5a059]/15 flex flex-col xs:flex-row sm:flex-col lg:flex-row gap-2">
                <a
                  href={event.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#c5a059]/40 text-xs font-semibold text-[#a27e36] hover:bg-[#faf7f2] transition-colors min-h-[42px] touch-manipulation"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Add to Calendar
                </a>
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#c5a059] text-xs font-semibold text-white hover:bg-[#a27e36] transition-colors shadow-sm min-h-[42px] touch-manipulation"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  View Map
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
