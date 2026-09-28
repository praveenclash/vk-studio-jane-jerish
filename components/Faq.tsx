"use client";

import React, { useState } from "react";
import { ChevronDown, Heart, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the dress code for the celebrations?",
      answer:
        "For Engagement (Oct 11): Festive ethnic wear, silk sarees, or suits. For Holy Matrimony & Feast (Oct 12): Traditional silk sarees, dhotis, or elegant formal attire.",
    },
    {
      question: "Can I bring my family and children?",
      answer:
        "Yes, absolutely! Your beloved family and little ones are warmly welcome to join in every joyous moment with us.",
    },
    {
      question: "Is there any gift policy?",
      answer:
        "Your love, prayers, and heartfelt presence are the greatest gifts we could ever ask for. That is all we truly wish for!",
    },
    {
      question: "Is parking available at the venues?",
      answer:
        "Yes, ample and convenient parking space is available at both St. James Church (Toovipuram) and ASKR Mandapam (Puthugramam).",
    },
    {
      question: "How do I reach the wedding venues?",
      answer:
        "Both venues are located right in Thoothukudi town. You can tap the 'View Map' buttons in the Events section above for one-click Google Maps GPS navigation.",
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
