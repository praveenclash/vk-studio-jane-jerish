"use client";

import React, { useState } from "react";
import { ChevronDown, Heart, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the dress code for the events?",
      answer:
        "For Sangeet: Festive Indian Ethnic / Bright yellow or mustard tones. For Holy Matrimony: Traditional silk sarees, dhotis, or formal suits. For Reception: Glamorous evening wear, tuxedos, evening gowns, or designer lehengas.",
    },
    {
      question: "Can I bring a Plus One or additional family members?",
      answer:
        "Yes, absolutely! Please make sure to indicate the total number of guests attending when submitting your RSVP form above so we can ensure comfortable seating and hospitality.",
    },
    {
      question: "Are children welcome to the ceremonies?",
      answer:
        "Yes, children and little ones are dearly loved and welcome to join the joyous celebrations!",
    },
    {
      question: "What is the gift policy?",
      answer:
        "Your presence and blessings are our greatest wedding gift. However, if you wish to honor us with a gift, a wishing well card or monetary blessings for our future home will be warmly received.",
    },
    {
      question: "Is there parking available at the venues?",
      answer:
        "Yes, complimentary valet parking is arranged for all guests at both the cathedral and ITC Grand Chola.",
    },
    {
      question: "Whom should I contact if I have questions on the wedding day?",
      answer:
        "You can reach out to our Wedding Coordinators: Marcus (+91 98765 43210) or Ashwin (+91 98765 12345) for any assistance.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <span className="text-[#c5a059] font-script text-2xl xs:text-3xl sm:text-4xl block mb-1 sm:mb-2">
          Helpful Information
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#231f20] font-normal tracking-wide">
          Frequently Asked Questions
        </h2>
        <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
          <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
          <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059] fill-[#c5a059]" />
          <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
        </div>
      </div>

      {/* Accordion */}
      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl border border-[#c5a059]/20 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-[#faf7f2]/50 transition-colors touch-manipulation min-h-[50px]"
              >
                <span className="font-serif-luxury text-base sm:text-xl text-[#231f20] font-medium leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-[#c5a059] shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2 text-xs sm:text-sm text-[#6b6661] leading-relaxed border-t border-stone-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
