"use client";

import React, { useState, useEffect } from "react";
import { Heart, RefreshCw, MessageSquareHeart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Wish {
  id: number;
  name: string;
  message: string;
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

  const totalLikes = wishes.reduce((acc, curr) => acc + (curr.likes || 0), 0);
  const displayedWishes = wishes.slice(0, 3);

  return (
    <section id="guestbook" className="py-16 sm:py-24 bg-[#0e0b08] border-t border-[#d4af37]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title on Left/Center and View All on Right */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-12 pb-5 border-b border-[#d4af37]/20"
        >
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-5 text-center md:text-left">
            <div>
              <span className="text-[#d4af37] font-script text-xl sm:text-2xl block mb-1">
                Warm Blessings
              </span>
              <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-4xl text-[#fcfbf7] font-normal tracking-wide">
                Guestbook & Wishes Wall
              </h2>
              <p className="text-[#b8ab96] text-xs sm:text-sm leading-relaxed mt-1 max-w-xl">
                <span className="italic text-[#f6e29f]">&ldquo;Two hearts, one love, forever blessed.&rdquo;</span> Heartfelt blessings from our dearest family and friends.
              </p>
            </div>

            {/* Right side: Stats Badges & View All Button */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 shrink-0">
              <div className="inline-flex items-center gap-1.5 bg-[#181410] px-3 py-1.5 rounded-full border border-[#d4af37]/25 shadow-sm text-[11px] sm:text-xs font-semibold text-[#fcfbf7]">
                <MessageSquareHeart className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{wishes.length} Wishes</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#181410] px-3 py-1.5 rounded-full border border-[#d4af37]/25 shadow-sm text-[11px] sm:text-xs font-semibold text-[#fcfbf7]">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>{totalLikes} Hearts</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-1 bg-[#181410] hover:bg-[#251e18] px-3 py-1.5 rounded-full border border-[#d4af37]/35 text-[11px] sm:text-xs font-semibold text-[#f6e29f] shadow-sm transition-all touch-manipulation min-h-[34px] cursor-pointer"
                title="Refresh wishes"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#d4af37]" : "text-[#d4af37]"}`} />
              </motion.button>

              {/* View All Button on Right Side */}
              <Link
                href="/wishes"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full gold-gradient-bg text-black font-cinzel font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all touch-manipulation cursor-pointer group"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Wishes List (Preview 3 Wishes) */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3">
            <div className="w-8 h-8 border-3 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs sm:text-sm text-[#b8ab96] font-medium">Gathering heartfelt blessings...</p>
          </div>
        ) : displayedWishes.length === 0 ? (
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
            {displayedWishes.map((wish, index) => {
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
                    {/* Top row: Name & Sparkle */}
                    <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                      <h4 className="font-serif-luxury text-base sm:text-lg font-semibold text-[#fcfbf7] truncate">
                        {wish.name}
                      </h4>
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]/60 shrink-0" />
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

        {/* Bottom CTA to View All Wishes */}
        {wishes.length > 0 && (
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/wishes"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full border border-[#d4af37]/40 bg-[#181410] hover:bg-[#251e18] text-[#f6e29f] hover:text-[#d4af37] text-xs sm:text-sm font-cinzel font-semibold uppercase tracking-wider shadow-md transition-all touch-manipulation group"
            >
              <span>View All {wishes.length} Wishes & Blessings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#d4af37]" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
