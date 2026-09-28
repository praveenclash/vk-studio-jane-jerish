"use client";

import React, { useState } from "react";
import { X, Download, ExternalLink, Calendar, MapPin, Sparkles, Heart, Cross } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InvitationCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvitationCardModal({ isOpen, onClose }: InvitationCardModalProps) {
  const [activeTab, setActiveTab] = useState<"digital" | "original">("digital");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2.5 xs:p-4 sm:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#0f0c09] border border-[#d4af37]/45 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Bar with Tabs and Close Button */}
          <div className="bg-[#181410] border-b border-[#d4af37]/25 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
            {/* View Mode Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("digital")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeTab === "digital"
                    ? "gold-gradient-bg text-black shadow-md font-bold"
                    : "bg-[#251e18] text-[#cfc5b6] hover:text-white"
                }`}
              >
                ✨ Royal Gold Card
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("original")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeTab === "original"
                    ? "gold-gradient-bg text-black shadow-md font-bold"
                    : "bg-[#251e18] text-[#cfc5b6] hover:text-white"
                }`}
              >
                📜 Printed Card Photo
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-3.5 xs:p-5 sm:p-8 overflow-y-auto">
            {activeTab === "digital" ? (
              /* ROYAL EMBOSSED GOLD DIGITAL RECREATION */
              <div className="relative rounded-2xl bg-[#14100c] border-2 border-[#d4af37]/60 p-4 xs:p-6 sm:p-8 shadow-inner text-center font-serif-luxury text-[#fcfbf7] overflow-hidden">
                {/* Decorative filigree corners */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]" />

                {/* Cross & Scripture */}
                <div className="flex flex-col items-center justify-center mb-3">
                  <div className="text-[#d4af37] text-2xl font-serif">✝</div>
                  <p className="text-xs xs:text-sm text-[#f6e29f] italic tracking-wide mt-1">
                    &ldquo;The thing proceedeth from the Lord&rdquo;
                  </p>
                  <span className="font-cinzel text-[10px] sm:text-xs text-[#d4af37] tracking-widest uppercase">
                    (Genesis 24:50)
                  </span>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <h3 className="font-script text-3xl xs:text-4xl sm:text-5xl text-[#d4af37] leading-none mb-1">
                    Holy Matrimony Invitation
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-stone-400 text-xs">
                    <span>💍</span>
                    <div className="w-12 h-[1px] bg-[#d4af37]/40" />
                    <span>💍</span>
                  </div>
                </div>

                {/* Parents of the Bride */}
                <div className="text-xs xs:text-sm text-[#cfc5b6] mb-3 leading-relaxed">
                  <p className="font-semibold text-white">
                    Mr. C. Johnson <span className="text-[11px] font-normal text-stone-400">B.Com., M.A., (Business)</span>
                  </p>
                  <p className="font-semibold text-white">
                    &amp; Mrs. R. Geetha Johnson <span className="text-[11px] font-normal text-stone-400">M.A., M.Ed. (Rtd. H.M)</span>
                  </p>
                  <p className="italic text-[11px] xs:text-xs text-[#b8ab96] mt-2 max-w-md mx-auto">
                    We solicit your esteemed presence and blessings with family and friends on the happy occasion of the marriage of our daughter
                  </p>
                </div>

                {/* Bride Name */}
                <div className="my-3 py-2 bg-[#1a140f] rounded-xl border border-[#d4af37]/25">
                  <h4 className="text-xl xs:text-2xl sm:text-3xl text-white font-normal">
                    J. Jane Jaculin Silviya
                  </h4>
                  <span className="font-cinzel text-[11px] sm:text-xs text-[#f6e29f] tracking-widest uppercase">
                    M.A., B.Ed
                  </span>
                </div>

                {/* Weds Knot */}
                <div className="my-2 inline-flex items-center justify-center gap-1.5 text-xs text-[#d4af37] font-script text-xl">
                  <span>Weds</span>
                </div>

                {/* Groom Name */}
                <div className="my-3 py-2 bg-[#1a140f] rounded-xl border border-[#d4af37]/25">
                  <h4 className="text-xl xs:text-2xl sm:text-3xl text-white font-normal">
                    Jerish Jeya Sekaran
                  </h4>
                  <span className="font-cinzel text-[11px] sm:text-xs text-[#f6e29f] tracking-widest uppercase block">
                    M.Th <span className="font-sans text-[10px] text-[#cfc5b6] lowercase">(HBI Professor)</span>
                  </span>
                  <p className="text-[11px] xs:text-xs text-[#cfc5b6] mt-1">
                    (S/o. <strong className="text-white">Rev. D. Jeyasekaran (IEM)</strong> &amp; <strong className="text-white">C. Rathinam Jeyasekaran IEM</strong>)
                  </p>
                </div>

                {/* Solemnization Ceremony Details */}
                <div className="my-4 p-3 rounded-xl bg-[#0b0907] border border-[#d4af37]/35 text-xs sm:text-sm leading-relaxed text-[#cfc5b6]">
                  <p className="italic mb-1">to be solemnized on</p>
                  <p className="font-cinzel font-bold text-sm xs:text-base text-[#f6e29f] uppercase tracking-wider">
                    Monday, 12th October 2026 at 10.00 a.m.
                  </p>
                  <p className="font-semibold text-white mt-1">
                    at St. James Church, Toovipuram, Thoothukudi
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#b8ab96] mt-1">
                    and thereafter the function at <strong className="text-white">ASKR Thirumana Mandapam, Puthugramam, Thoothukudi</strong>
                  </p>
                </div>

                {/* Bottom Row: Compliments & Engagement Notice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#d4af37]/25 text-left text-xs">
                  {/* Compliments */}
                  <div className="p-3 bg-[#181410] rounded-xl border border-[#d4af37]/20">
                    <p className="font-script text-base text-[#d4af37] mb-1">With Best Compliments From</p>
                    <p className="font-semibold text-white text-[11px]">Dr. J. Jerin Jacob Samuvel</p>
                    <p className="text-[10px] text-stone-400 mb-1">DNB Ortho, FNB (Hand &amp; Micro Surgery)</p>
                    <p className="font-semibold text-white text-[11px]">Dr. Sharon Sarah Sels <span className="text-[10px] text-stone-400">MS (OBS GYN)</span></p>
                    <p className="italic text-[11px] text-[#f6e29f] mt-1">
                      Our Princess: <strong className="text-white font-normal">Keziah Jacob</strong>
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">Friends &amp; Relatives</p>
                  </div>

                  {/* Engagement Box */}
                  <div className="p-3 bg-[#181410] rounded-xl border border-[#d4af37]/30 text-center flex flex-col justify-center">
                    <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                      Engagement
                    </span>
                    <p className="font-cinzel font-bold text-sm text-white mt-1">
                      11.10.2026 - Sunday
                    </p>
                    <p className="text-xs text-[#f6e29f]">at 6.30 pm</p>
                    <p className="text-[11px] text-[#cfc5b6] mt-1 leading-snug">
                      at ASKR Thirumana Mandapam,<br />Puthugramam, Thoothukudi
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* ORIGINAL PRINTED INVITATION CARD PHOTO */
              <div className="flex flex-col items-center">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d4af37]/40 max-h-[68vh] bg-stone-950">
                  <img
                    src="/images/wedding-invitation-card.png"
                    alt="Official Wedding Invitation Card - Jane & Jerish"
                    className="w-full h-auto max-h-[68vh] object-contain rounded-xl"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/images/wedding-invitation-card.png"
                    download="Jane_and_Jerish_Wedding_Invitation_Card.png"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Invitation Card</span>
                  </a>
                  <a
                    href="/images/wedding-invitation-card.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1e1812] border border-[#d4af37]/40 text-[#f6e29f] hover:bg-[#d4af37]/20 text-xs font-semibold tracking-wider transition-all"
                  >
                    <span>Open Full Screen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
