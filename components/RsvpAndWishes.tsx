"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Send, Heart, CheckCircle2, User, MessageSquare, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RsvpAndWishes() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in your name and wedding wish message.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        // Confetti celebration blast
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#f6e29f", "#e5cb9b", "#ffffff"],
        });

        // Broadcast event so WishesWall updates live
        window.dispatchEvent(new CustomEvent("wedding_new_wish", { detail: data.data }));

        // Reset form
        setFormData({
          name: "",
          message: "",
        });
      } else {
        setErrorMsg(data.error || "Failed to send your wish. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("Something went wrong while sending your wish. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-16 sm:py-24 max-w-3xl mx-auto px-3.5 sm:px-6 lg:px-8">
      {/* Container card with gold glow */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel-midnight-elevated rounded-2xl sm:rounded-3xl p-5 xs:p-7 sm:p-10 md:p-12 shadow-2xl border border-[#d4af37]/35 relative overflow-hidden"
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <span className="text-[#d4af37] font-script text-xl sm:text-2xl block mb-1">
            Warm Blessings
          </span>
          <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#fcfbf7] font-normal tracking-wide">
            Send Your Wedding Wishes
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4af37] fill-[#d4af37]" />
            <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
          </div>
          <p className="text-[#b8ab96] text-xs sm:text-sm px-2">
            <span className="italic text-[#f6e29f]">&ldquo;Love is not just looking at each other, it&apos;s looking in the same direction.&rdquo;</span> Share your warm blessings for the happy couple.
          </p>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 flex items-start gap-3 shadow-lg"
            >
              <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm sm:text-base mb-1 text-emerald-300">Thank You So Much!</h4>
                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                  Your warm wedding wish has been received with joy! Your lovely message is now visible on our Wishes Wall below.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-2.5 sm:mt-3 text-xs font-semibold text-emerald-400 underline hover:text-emerald-300 touch-manipulation cursor-pointer"
                >
                  Send another wish
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Alert */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-3.5 sm:p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 flex items-center gap-2 text-xs sm:text-sm"
            >
              <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#ded6ca] mb-1.5 sm:mb-2">
              Your Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                <User className="w-4 h-4 text-[#d4af37]" />
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Aravind & Family"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/25 text-base sm:text-sm transition-all bg-[#14100c] text-[#fcfbf7] placeholder:text-stone-500"
              />
            </div>
          </div>

          {/* Wedding Wishes Message */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#ded6ca] mb-1.5 sm:mb-2">
              Your Wedding Blessing & Wishes *
            </label>
            <div className="relative">
              <textarea
                required
                rows={4}
                placeholder="Share your warm thoughts, blessings, and congratulations for Jane & Jerish..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3.5 sm:p-4 rounded-xl border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/25 text-base sm:text-sm transition-all bg-[#14100c] text-[#fcfbf7] placeholder:text-stone-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-2">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-12 py-3.5 sm:py-4 rounded-full gold-gradient-bg text-black font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 min-h-[48px] touch-manipulation cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Sending Your Blessing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Wishes
                </>
              )}
            </motion.button>
            <p className="text-[10px] sm:text-[11px] text-[#b8ab96] mt-2.5 sm:mt-3">
              Sent with love • Appears instantly on the Wishes Wall
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
