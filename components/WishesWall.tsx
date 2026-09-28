"use client";

import React, { useState, useEffect } from "react";
import { Heart, RefreshCw, MessageSquareHeart, Users, Calendar, Sparkles, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

interface Wish {
  id: number;
  name: string;
  relation: string;
  message: string;
  attendance: string;
  guests_count: number;
  created_at: string;
  likes: number;
}

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [likedIds, setLikedIds] = useState<Record<number, boolean>>({});

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

    // Listen for new wish event dispatched by RSVP form
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

    // Optimistic UI update
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

  const totalGuestsAttending = wishes
    .filter((w) => w.attendance === "attending")
    .reduce((acc, curr) => acc + (curr.guests_count || 1), 0);

  return (
    <section id="guestbook" className="py-16 sm:py-24 bg-[#0e0b08] border-t border-[#d4af37]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          <span className="text-[#d4af37] font-script text-xl sm:text-2xl block mb-1">
            Warm Blessings
          </span>
          <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#fcfbf7] font-normal tracking-wide">
            Guestbook & Wishes Wall
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4af37] fill-[#d4af37]" />
            <div className="w-10 sm:w-12 h-[1px] bg-[#d4af37]" />
          </div>
          <p className="text-[#b8ab96] text-xs sm:text-sm leading-relaxed px-2">
            Real-time messages sent by friends & family from around the world, stored in our database.
          </p>

          {/* Stats Bar & Refresh Button */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-5 sm:mt-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#181410] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#d4af37]/25 shadow-sm text-[11px] sm:text-xs font-semibold text-[#fcfbf7]">
              <MessageSquareHeart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4af37]" />
              <span>{wishes.length} Wishes Received</span>
            </div>

            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#181410] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#d4af37]/25 shadow-sm text-[11px] sm:text-xs font-semibold text-[#fcfbf7]">
              <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#d4af37]" />
              <span>{totalGuestsAttending} Confirmed Guests</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 bg-[#181410] hover:bg-[#251e18] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#d4af37]/35 text-[11px] sm:text-xs font-semibold text-[#f6e29f] shadow-sm transition-all touch-manipulation min-h-[34px] cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#d4af37]" : "text-[#d4af37]"}`} />
              <span>Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Wishes List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3">
            <div className="w-8 h-8 border-3 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs sm:text-sm text-[#b8ab96] font-medium">Fetching wishes from database...</p>
          </div>
        ) : wishes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 sm:py-16 glass-panel-midnight-elevated rounded-3xl border border-[#d4af37]/30 p-6 sm:p-8 max-w-md mx-auto"
          >
            <MessageSquareHeart className="w-8 sm:w-10 h-8 sm:h-10 text-[#d4af37] mx-auto mb-3" />
            <h3 className="font-serif-luxury text-xl text-[#fcfbf7] mb-1">No Wishes Yet</h3>
            <p className="text-xs text-[#b8ab96] mb-4">
              Be the very first one to send blessings to Jane & Jerish using the form above!
            </p>
            <a
              href="#rsvp"
              className="inline-block px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full gold-gradient-bg text-black shadow touch-manipulation"
            >
              Write First Wish
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {wishes.map((wish, index) => {
              const isAttending = wish.attendance === "attending";
              const isLiked = likedIds[wish.id];

              return (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="glass-panel-midnight rounded-2xl p-4 xs:p-5 sm:p-6 shadow-md border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all flex flex-col justify-between group overflow-hidden"
                >
                  <div>
                    {/* Top row: Name & Relation */}
                    <div className="flex items-start justify-between gap-2 mb-2.5 sm:mb-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-serif-luxury text-base sm:text-lg font-semibold text-[#fcfbf7] truncate">
                          {wish.name}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] font-cinzel font-medium text-[#d4af37] tracking-wider uppercase">
                          {wish.relation || "Guest"}
                        </span>
                      </div>

                      {/* Attendance Badge */}
                      <span
                        className={`text-[9px] xs:text-[10px] font-semibold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0 ${
                          isAttending
                            ? "bg-emerald-950/70 text-emerald-300 border border-emerald-500/40"
                            : "bg-stone-900 text-stone-400 border border-stone-700"
                        }`}
                      >
                        {isAttending ? `Attending (${wish.guests_count || 1})` : "Sent Wishes"}
                      </span>
                    </div>

                    {/* Message Body */}
                    <p className="text-[#d4c9b9] text-xs sm:text-sm leading-relaxed italic mb-4 sm:mb-6 break-words overflow-hidden">
                      &ldquo;{wish.message}&rdquo;
                    </p>
                  </div>

                  {/* Bottom row: Date & Heart Reaction */}
                  <div className="pt-2.5 sm:pt-3 border-t border-[#d4af37]/15 flex items-center justify-between text-xs text-[#8f8272]">
                    <span className="text-[10px] sm:text-[11px] text-[#8f8272]">
                      {wish.created_at ? new Date(wish.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      }) : "Recently"}
                    </span>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 1.25 }}
                      onClick={() => handleLike(wish.id)}
                      disabled={isLiked}
                      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all touch-manipulation min-h-[32px] ${
                        isLiked
                          ? "bg-rose-950/70 text-rose-300 border border-rose-500/40 cursor-default"
                          : "bg-[#181410] hover:bg-rose-950/50 text-[#cfc5b6] hover:text-rose-300 border border-[#d4af37]/25 cursor-pointer"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? "fill-rose-400 text-rose-400 scale-110" : "text-stone-400"
                        } transition-transform`}
                      />
                      <span>{wish.likes || 0}</span>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
