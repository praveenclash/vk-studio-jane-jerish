"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Send, Heart, CheckCircle2, User, Users, MessageSquare, AlertCircle, Sparkles } from "lucide-react";

export default function RsvpAndWishes() {
  const [formData, setFormData] = useState({
    name: "",
    relation: "Friend",
    attendance: "attending",
    guests_count: 1,
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        // Confetti celebration blast
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#c5a059", "#e5cb9b", "#9e3e4b", "#ffffff"],
        });

        // Broadcast event so WishesWall updates live
        window.dispatchEvent(new CustomEvent("wedding_new_wish", { detail: data.data }));

        // Reset form
        setFormData({
          name: "",
          relation: "Friend",
          attendance: "attending",
          guests_count: 1,
          message: "",
        });
      } else {
        setErrorMsg(data.error || "Failed to save to database. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("Something went wrong while connecting to the database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="py-16 sm:py-24 max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8">
      {/* Container card with gold glow */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-10 md:p-12 shadow-xl border border-[#c5a059]/30 relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#c5a059] font-script text-2xl xs:text-3xl sm:text-4xl block mb-1 sm:mb-2">
            Will You Join Us?
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#231f20] font-normal tracking-wide">
            RSVP & Send Your Wishes
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059] fill-[#c5a059]" />
            <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
          </div>
          <p className="text-[#6b6661] text-xs sm:text-sm px-2">
            Your wishes will be stored in our SQL database and shown on the live guestbook wall below.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-[#f0fdf4] border border-green-300 text-green-900 flex items-start gap-3 shadow-sm animate-fadeIn">
            <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-1">Thank You So Much!</h4>
              <p className="text-xs sm:text-sm text-green-800 leading-relaxed">
                Your wedding wish and RSVP have been successfully saved to our database. Your lovely message is now visible on our Guestbook Wall below!
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-2.5 sm:mt-3 text-xs font-semibold text-green-700 underline hover:text-green-800 touch-manipulation"
              >
                Send another wish
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-xs sm:text-sm">
            <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#3a3530] mb-1.5 sm:mb-2">
                Your Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 text-base sm:text-sm transition-all bg-[#faf7f2]/50"
                />
              </div>
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#3a3530] mb-1.5 sm:mb-2">
                Relation / Guest of
              </label>
              <select
                value={formData.relation}
                onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 text-base sm:text-sm transition-all bg-[#faf7f2]/50"
              >
                <option value="Friend">Friend of Bride / Groom</option>
                <option value="Family">Family & Relative</option>
                <option value="Colleague">Colleague / Work</option>
                <option value="Well-wisher">Well-Wisher & Neighbor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Attendance Status */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#3a3530] mb-1.5 sm:mb-2">
                Will You Attend?
              </label>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "attending" })}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border text-center min-h-[44px] flex items-center justify-center touch-manipulation ${
                    formData.attendance === "attending"
                      ? "bg-[#c5a059] text-white border-[#c5a059] shadow-sm"
                      : "bg-[#faf7f2] text-stone-600 border-stone-200 hover:border-[#c5a059]"
                  }`}
                >
                  🎉 Yes, Attending
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "regretfully_decline" })}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border text-center min-h-[44px] flex items-center justify-center touch-manipulation ${
                    formData.attendance === "regretfully_decline"
                      ? "bg-stone-800 text-white border-stone-800 shadow-sm"
                      : "bg-[#faf7f2] text-stone-600 border-stone-200 hover:border-stone-400"
                  }`}
                >
                  💌 Can&apos;t Make It
                </button>
              </div>
            </div>

            {/* Number of Guests */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#3a3530] mb-1.5 sm:mb-2">
                Number of Guests Attending
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Users className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guests_count}
                  onChange={(e) =>
                    setFormData({ ...formData, guests_count: parseInt(e.target.value) || 1 })
                  }
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 text-base sm:text-sm transition-all bg-[#faf7f2]/50"
                />
              </div>
            </div>
          </div>

          {/* Wedding Wishes Message */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#3a3530] mb-1.5 sm:mb-2">
              Your Wedding Blessing & Wishes *
            </label>
            <div className="relative">
              <textarea
                required
                rows={4}
                placeholder="Share your warm thoughts, blessings, and congratulations for Jane & Jerish..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3.5 sm:p-4 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 text-base sm:text-sm transition-all bg-[#faf7f2]/50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full gold-gradient-bg text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 min-h-[48px] touch-manipulation"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving to Database...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Wishes & Submit RSVP
                </>
              )}
            </button>
            <p className="text-[10px] sm:text-[11px] text-stone-500 mt-2.5 sm:mt-3">
              Stored securely in our SQL database • Instant live display
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
