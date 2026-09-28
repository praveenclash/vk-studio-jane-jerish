"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  RefreshCw,
  MessageSquareHeart,
  Sparkles,
  ArrowLeft,
  Search,
  Send,
  PlusCircle,
  X,
  CheckCircle,
  TrendingUp,
  Clock
} from "lucide-react";
import confetti from "canvas-confetti";
import Footer from "@/components/Footer";

interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
  likes: number;
}

export default function WishesPage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [likedIds, setLikedIds] = useState<Record<number, boolean>>({});
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  // Quick Modal to Write a Wish
  const [showAddModal, setShowAddModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setWishes(json.data);
      }
    } catch (e) {
      console.error("Failed to load wishes from database:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWishes();

    const handleNewWish = (e: Event) => {
      const customEvent = e as CustomEvent<Wish>;
      if (customEvent.detail) {
        setWishes((prev) => [customEvent.detail, ...prev]);
      } else {
        fetchWishes();
      }
    };

    window.addEventListener("wedding_new_wish", handleNewWish);
    return () => window.removeEventListener("wedding_new_wish", handleNewWish);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchWishes();
  };

  const handleLike = async (id: number) => {
    if (likedIds[id]) return;

    setLikedIds((prev) => ({ ...prev, [id]: true }));
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );

    try {
      await fetch(`/api/wishes/${id}/like`, { method: "POST" });
    } catch (e) {
      console.error("Failed to like wish:", e);
    }
  };

  const handleSendWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) {
      setSubmitError("Please fill in both your name and blessings message.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName.trim(),
          message: formMessage.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(true);
        setWishes((prev) => [data.data, ...prev]);
        window.dispatchEvent(new CustomEvent("wedding_new_wish", { detail: data.data }));

        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#f6e29f", "#ffffff"],
        });

        setTimeout(() => {
          setShowAddModal(false);
          setSubmitSuccess(false);
          setFormName("");
          setFormMessage("");
        }, 1800);
      } else {
        setSubmitError(data.error || "Failed to save wish.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter & Sort
  const filteredWishes = useMemo(() => {
    let result = wishes.filter((w) => {
      const query = search.toLowerCase();
      return (
        w.name.toLowerCase().includes(query) ||
        w.message.toLowerCase().includes(query)
      );
    });

    if (sortBy === "popular") {
      result = [...result].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else {
      result = [...result].sort((a, b) => b.id - a.id);
    }

    return result;
  }, [wishes, search, sortBy]);

  const totalLikes = wishes.reduce((acc, curr) => acc + (curr.likes || 0), 0);

  return (
    <div className="min-h-screen bg-[#0b0907] text-[#fcfbf7] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#f6e29f]">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-[#0b0907]/90 backdrop-blur-md border-b border-[#d4af37]/25 px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-stone-300 hover:text-[#d4af37] text-xs sm:text-sm font-cinzel font-semibold uppercase tracking-wider transition-colors min-h-[40px] px-2 py-1 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
            <span>Back</span>
          </Link>

          {/* Logo center */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/logo-gold.png"
              alt="Jane & Jerish Logo"
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
            />
            <span className="font-serif-luxury text-sm sm:text-base text-[#fcfbf7] hidden xs:inline tracking-wider">
              Jane & Jerish
            </span>
          </Link>

          {/* Write Wish CTA */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full gold-gradient-bg text-black font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all touch-manipulation cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Send Wish</span>
            <span className="xs:hidden">Wish</span>
          </motion.button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <span className="text-[#d4af37] font-script text-2xl sm:text-3xl block mb-1">
            Complete Guestbook
          </span>
          <h1 className="font-serif-luxury text-3xl xs:text-4xl sm:text-5xl text-[#fcfbf7] font-normal tracking-wide">
            All Wedding Wishes & Blessings
          </h1>
          <div className="flex items-center justify-center gap-3 my-3.5">
            <div className="w-12 sm:w-16 h-[1px] bg-[#d4af37]" />
            <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
            <div className="w-12 sm:w-16 h-[1px] bg-[#d4af37]" />
          </div>
          <p className="text-[#b8ab96] text-xs sm:text-sm leading-relaxed px-4 max-w-xl mx-auto">
            <span className="italic text-[#f6e29f]">&ldquo;Every love story is beautiful, but ours is our favorite.&rdquo;</span> A timeless collection of blessings and prayers showered upon Jane Jaculin &amp; Jerish.
          </p>

          {/* Stats Badges & Refresh */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#181410] px-3.5 sm:px-4 py-2 rounded-full border border-[#d4af37]/25 shadow-sm text-xs font-semibold text-[#fcfbf7]">
              <MessageSquareHeart className="w-4 h-4 text-[#d4af37]" />
              <span>{wishes.length} Wishes Received</span>
            </div>

            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#181410] px-3.5 sm:px-4 py-2 rounded-full border border-[#d4af37]/25 shadow-sm text-xs font-semibold text-[#fcfbf7]">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>{totalLikes} Hearts</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 bg-[#181410] hover:bg-[#251e18] px-3.5 sm:px-4 py-2 rounded-full border border-[#d4af37]/35 text-xs font-semibold text-[#f6e29f] shadow-sm transition-all touch-manipulation cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#d4af37]" : "text-[#d4af37]"}`} />
              <span>Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Search & Sort Toolbar */}
        <div className="glass-panel-midnight p-3.5 sm:p-4 rounded-2xl border border-[#d4af37]/25 shadow-sm mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4 text-[#d4af37]" />
            </div>
            <input
              type="text"
              placeholder="Search blessings by guest name or words..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d4af37]/30 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#14100c] text-white placeholder:text-stone-500"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 self-end sm:self-auto shrink-0">
            <span className="text-xs font-semibold text-[#ded6ca] mr-1">Sort:</span>
            <button
              onClick={() => setSortBy("latest")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                sortBy === "latest"
                  ? "gold-gradient-bg text-black font-semibold shadow-sm"
                  : "bg-[#181410] text-[#cfc5b6] hover:text-white border border-[#d4af37]/20"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Latest</span>
            </button>
            <button
              onClick={() => setSortBy("popular")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                sortBy === "popular"
                  ? "gold-gradient-bg text-black font-semibold shadow-sm"
                  : "bg-[#181410] text-[#cfc5b6] hover:text-white border border-[#d4af37]/20"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Most Loved</span>
            </button>
          </div>
        </div>

        {/* Wishes Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-3 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[#b8ab96] font-medium">Gathering heartfelt blessings...</p>
          </div>
        ) : filteredWishes.length === 0 ? (
          <div className="text-center py-16 glass-panel-midnight rounded-3xl border border-[#d4af37]/25 p-8 max-w-md mx-auto">
            <MessageSquareHeart className="w-10 h-10 text-[#d4af37] mx-auto mb-3" />
            <h3 className="font-serif-luxury text-xl text-[#fcfbf7] mb-1">
              {search ? "No Matches Found" : "No Wishes Yet"}
            </h3>
            <p className="text-xs text-[#b8ab96] mb-5">
              {search
                ? `No blessings matched "${search}". Try searching another name or keyword.`
                : "Be the very first one to send blessings to Jane & Jerish!"}
            </p>
            {search ? (
              <button
                onClick={() => setSearch("")}
                className="px-4 py-2 rounded-full border border-[#d4af37]/40 text-xs font-semibold text-[#f6e29f]"
              >
                Clear Search
              </button>
            ) : (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-5 py-2.5 rounded-full gold-gradient-bg text-black text-xs font-bold uppercase tracking-wider"
              >
                Write First Wish
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence>
              {filteredWishes.map((wish, index) => {
                const isLiked = likedIds[wish.id];

                return (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.05, 0.5),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="glass-panel-midnight rounded-2xl p-5 sm:p-6 shadow-md border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all flex flex-col justify-between group overflow-hidden"
                  >
                    <div>
                      {/* Top row: Name & Sparkle */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <h3 className="font-serif-luxury text-base sm:text-lg font-semibold text-[#fcfbf7] truncate">
                          {wish.name}
                        </h3>
                        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]/60 shrink-0" />
                      </div>

                      {/* Message Body */}
                      <p className="text-[#d4c9b9] text-xs sm:text-sm leading-relaxed italic mb-6 break-words overflow-hidden">
                        &ldquo;{wish.message}&rdquo;
                      </p>
                    </div>

                    {/* Bottom row: Date & Heart Reaction */}
                    <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between text-xs text-[#8f8272]">
                      <span className="text-[10px] sm:text-[11px] text-[#8f8272]">
                        {wish.created_at
                          ? new Date(wish.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Recently"}
                      </span>

                      <motion.button
                        type="button"
                        whileTap={{ scale: 1.25 }}
                        onClick={() => handleLike(wish.id)}
                        disabled={isLiked}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all touch-manipulation min-h-[32px] ${
                          isLiked
                            ? "bg-rose-950/70 text-rose-300 border border-rose-500/40 cursor-default"
                            : "bg-[#181410] hover:bg-rose-950/50 text-[#cfc5b6] hover:text-rose-300 border border-[#d4af37]/25 cursor-pointer"
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isLiked
                              ? "fill-rose-400 text-rose-400 scale-110"
                              : "text-stone-400"
                          } transition-transform`}
                        />
                        <span>{wish.likes || 0}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Bottom CTA to write a wish */}
        <div className="mt-14 sm:mt-20 text-center">
          <div className="glass-panel-midnight-elevated max-w-xl mx-auto p-6 sm:p-8 rounded-3xl border border-[#d4af37]/35 shadow-xl">
            <span className="text-[#d4af37] font-script text-xl sm:text-2xl block mb-1">
              Leave Your Mark
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-normal mb-2">
              Have a blessing to share with the couple?
            </h3>
            <p className="text-xs text-[#b8ab96] mb-5">
              Send your love and warm congratulations to Jane Jaculin & Jerish. Your message will appear immediately on this wall!
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 rounded-full gold-gradient-bg text-black font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all touch-manipulation cursor-pointer"
            >
              Write Your Blessing Now
            </button>
          </div>
        </div>
      </main>

      {/* MODAL: Send a Wish */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg glass-panel-midnight-elevated rounded-3xl border border-[#d4af37]/40 p-5 xs:p-6 sm:p-8 shadow-2xl relative my-8"
            >
              {/* Close button */}
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-5">
                <span className="text-[#d4af37] font-script text-xl block mb-0.5">
                  Warm Blessings
                </span>
                <h2 className="font-serif-luxury text-xl sm:text-2xl text-white font-normal">
                  Send Your Wedding Wishes
                </h2>
                <p className="text-xs text-[#b8ab96] mt-1">
                  Your message will be displayed on the Guestbook Wall and preserved for the couple.
                </p>
              </div>

              {/* Feedback messages */}
              {submitSuccess && (
                <div className="mb-4 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5 animate-fadeIn">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Your wedding wish was posted successfully! Thank you!</span>
                </div>
              )}

              {submitError && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <span>{submitError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSendWish} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-cinzel font-semibold uppercase tracking-wider text-[#ded6ca] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh & Family"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] text-base sm:text-sm bg-[#14100c] text-white placeholder:text-stone-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-cinzel font-semibold uppercase tracking-wider text-[#ded6ca] mb-1">
                    Your Wedding Blessing & Wishes *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share your prayers, love, and warm wishes for Jane Jaculin & Jerish..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-[#d4af37]/30 focus:outline-none focus:border-[#d4af37] text-base sm:text-sm bg-[#14100c] text-white placeholder:text-stone-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-300 hover:bg-white/5 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || submitSuccess}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl gold-gradient-bg text-black text-xs font-bold uppercase tracking-wider shadow hover:brightness-110 disabled:opacity-50 min-h-[40px] cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Blessing
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
