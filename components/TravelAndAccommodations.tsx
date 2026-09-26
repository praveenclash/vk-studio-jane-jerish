"use client";

import React from "react";
import { Plane, Train, Hotel, Car, MapPin, ExternalLink, Heart } from "lucide-react";

export default function TravelAndAccommodations() {
  const accommodations = [
    {
      name: "The Leela Palace Chennai",
      stars: "5 Star Luxury",
      distance: "0.2 km from Sangeet Venue",
      address: "Adyar Sea Face, MRC Nagar, Chennai",
      link: "https://www.theleela.com",
    },
    {
      name: "ITC Grand Chola",
      stars: "5 Star Luxury",
      distance: "At the Reception Venue",
      address: "Anna Salai, Guindy, Chennai",
      link: "https://www.itchotels.com",
    },
    {
      name: "Radisson Blu Hotel GRT",
      stars: "4 Star Premium",
      distance: "10 mins from Airport / 15 mins to Venues",
      address: "GST Road, St. Thomas Mount, Chennai",
      link: "https://www.radissonhotels.com",
    },
  ];

  return (
    <section id="travel" className="py-16 sm:py-24 bg-[#faf7f2] border-t border-[#c5a059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-[#c5a059] font-script text-2xl xs:text-3xl sm:text-4xl block mb-1 sm:mb-2">
            Guest Guide
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#231f20] font-normal tracking-wide">
            Travel & Accommodations
          </h2>
          <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
            <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059] fill-[#c5a059]" />
            <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
          </div>
          <p className="text-[#6b6661] text-xs sm:text-base leading-relaxed px-2">
            For our cherished friends and family travelling from out of town, we have compiled helpful travel directions and stay options.
          </p>
        </div>

        {/* Travel Transit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="bg-white p-4 xs:p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#c5a059]/20 shadow-sm flex items-start gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#faf7f2] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
              <Plane className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-lg sm:text-xl text-[#231f20] font-semibold mb-1">
                Chennai Airport (MAA)
              </h4>
              <p className="text-xs text-[#6b6661] leading-relaxed">
                Approx. 15 km (25-35 minutes) to the reception venue. Prepaid taxis, Uber, and Ola are available 24/7.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 xs:p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#c5a059]/20 shadow-sm flex items-start gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#faf7f2] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
              <Train className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-lg sm:text-xl text-[#231f20] font-semibold mb-1">
                Central & Egmore Stations
              </h4>
              <p className="text-xs text-[#6b6661] leading-relaxed">
                Approx. 10 km away. Connected via Chennai Metro directly to Guindy (ITC Grand Chola) and city venues.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 xs:p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#c5a059]/20 shadow-sm flex items-start gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#faf7f2] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
              <Car className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxury text-lg sm:text-xl text-[#231f20] font-semibold mb-1">
                Valet & Parking
              </h4>
              <p className="text-xs text-[#6b6661] leading-relaxed">
                Complimentary valet parking will be available at all wedding venues for our esteemed guests.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Hotels */}
        <div>
          <h3 className="font-serif-luxury text-xl xs:text-2xl sm:text-3xl text-[#231f20] mb-4 sm:mb-6 text-center">
            Recommended Nearby Stays
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {accommodations.map((hotel, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 xs:p-5 sm:p-6 border border-[#c5a059]/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a27e36] bg-[#faf7f2] px-2.5 py-0.5 rounded-full border border-[#c5a059]/20">
                      {hotel.stars}
                    </span>
                    <span className="text-[11px] sm:text-xs text-stone-500">{hotel.distance}</span>
                  </div>
                  <h4 className="font-serif-luxury text-lg sm:text-xl text-[#231f20] font-semibold mb-1.5 sm:mb-2">
                    {hotel.name}
                  </h4>
                  <p className="text-xs text-[#6b6661] mb-5 sm:mb-6 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{hotel.address}</span>
                  </p>
                </div>

                <a
                  href={hotel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl border border-[#c5a059]/40 text-xs font-semibold text-[#a27e36] hover:bg-[#faf7f2] transition-colors min-h-[42px] touch-manipulation"
                >
                  <span>Book / View Hotel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
