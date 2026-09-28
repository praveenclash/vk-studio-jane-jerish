"use client";

import React, { useState } from "react";
import { ChevronDown, Heart, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the dress code for the events?",
      answer:
        "For Pre-Wedding at Kanyakumari Beach: Coastal pastels, casual chic, or light ethnic wear. For Wedding at ASKR Thirumana Mandapam: Traditional silk sarees, dhotis, or formal suits. For Reception at CSI Church Punnaiyadi Community Hall: Elegant evening wear, suits, or festive attire.",
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
      question: "Is there any gift policy?",
      answer:
        "Your presence, prayers, and heartfelt blessings are our greatest gift. Having you celebrate this milestone with us is all we ask for!",
    },
    {
      question: "Is there parking available at the venues?",
      answer:
        "Yes, ample parking space is available for all guests at both ASKR Thirumana Mandapam and CSI Church Punnaiyadi Community Hall.",
    },
    {
      question: "How do I reach the wedding venues?",
      answer:
        "Both venues are well-connected by road in Kanyakumari District. You can use the 'View Map' buttons in the Wedding Events section above for exact Google Maps GPS directions directly to ASKR Thirumana Mandapam and CSI Church Punnaiyadi Community Hall.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
      >
        <span className="text-[#d4af37] font-script text-xl sm:text-2xl block mb-1">
          Helpful Information
        </span>
        <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#fcfbf7] font-normal tracking-wide">
          Frequently Asked Questions
        </h2>
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
          <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4af37] fill-[#d4af37]" />
          <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
        </div>
      </motion.div>

      {/* Accordion */}
      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel-midnight rounded-xl sm:rounded-2xl border border-[#d4af37]/25 overflow-hidden shadow-md transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-[#181410] transition-colors touch-manipulation min-h-[50px] cursor-pointer"
              >
                <span className="font-serif-luxury text-sm sm:text-base text-[#fcfbf7] font-medium leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37] shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2 text-xs sm:text-sm text-[#cfc5b6] leading-relaxed border-t border-[#d4af37]/15">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
