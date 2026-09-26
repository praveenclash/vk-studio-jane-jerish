"use client";

import React, { useState, useEffect } from "react";
import { Heart, RefreshCw, MessageSquareHeart, Users, Calendar, Sparkles, ThumbsUp } from "lucide-react";

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
    <section id="guestbook" className="py-16 sm:py-24 bg-[#f5efe6]/40 border-t border-[#c5a059]/20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[#c5a059] font-script text-2xl xs:text-3xl sm:text-4xl block mb-1 sm:mb-2">
            Warm Blessings
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#231f20] font-normal tracking-wide">
            Guestbook & Wishes Wall
          </h2>
          <div className="flex items-center justify-center gap-3 my-3 sm:my-4">
            <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059] fill-[#c5a059]" />
            <div className="w-10 sm:w-12 h-[1px] bg-[#c5a059]" />
          </div>
          <p className="text-[#6b6661] text-xs sm:text-base leading-relaxed px-2">
            Real-time messages sent by friends & family from around the world, stored in our database.
          </p>

          {/* Stats Bar & Refresh Button */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-5 sm:mt-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#c5a059]/20 shadow-sm text-[11px] sm:text-xs font-semibold text-[#231f20]">
              <MessageSquareHeart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059]" />
              <span>{wishes.length} Wishes Received</span>
            </div>

            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#c5a059]/20 shadow-sm text-[11px] sm:text-xs font-semibold text-[#231f20]">
              <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059]" />
              <span>{totalGuestsAttending} Confirmed Guests</span>
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-[#faf7f2] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#c5a059]/30 text-[11px] sm:text-xs font-semibold text-[#a27e36] shadow-sm transition-all touch-manipulation min-h-[34px]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Wishes List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3">
            <div className="w-8 h-8 border-3 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs sm:text-sm text-stone-500 font-medium">Fetching wishes from database...</p>
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 max-w-md mx-auto">
            <MessageSquareHeart className="w-8 sm:w-10 h-8 sm:h-10 text-[#c5a059] mx-auto mb-3" />
            <h3 className="font-serif-luxury text-xl text-stone-800 mb-1">No Wishes Yet</h3>
            <p className="text-xs text-stone-500 mb-4">
              Be the very first one to send blessings to Jane & Jerish using the form above!
            </p>
            <a
              href="#rsvp"
              className="inline-block px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full gold-gradient-bg text-white shadow touch-manipulation"
            >
              Write First Wish
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {wishes.map((wish) => {
              const isAttending = wish.attendance === "attending";
              const isLiked = likedIds[wish.id];

              return (
                <div
                  key={wish.id}
                  className="bg-white rounded-2xl p-4 xs:p-5 sm:p-6 shadow-sm border border-[#c5a059]/20 hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden"
                >
                  <div>
                    {/* Top row: Name & Relation */}
                    <div className="flex items-start justify-between gap-2 mb-2.5 sm:mb-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-serif-luxury text-lg xs:text-xl font-bold text-[#231f20] truncate">
                          {wish.name}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#a27e36] tracking-wide uppercase">
                          {wish.relation || "Guest"}
                        </span>
                      </div>

                      {/* Attendance Badge */}
                      <span
                        className={`text-[9px] xs:text-[10px] font-semibold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shrink-0 ${
                          isAttending
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-stone-100 text-stone-600 border border-stone-200"
                        }`}
                      >
                        {isAttending ? `Attending (${wish.guests_count || 1})` : "Sent Wishes"}
                      </span>
                    </div>

                    {/* Message Body */}
                    <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic mb-4 sm:mb-6 break-words overflow-hidden">
                      &ldquo;{wish.message}&rdquo;
                    </p>
                  </div>

                  {/* Bottom row: Date & Heart Reaction */}
                  <div className="pt-2.5 sm:pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                    <span className="text-[10px] sm:text-[11px] text-stone-400">
                      {wish.created_at ? new Date(wish.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      }) : "Recently"}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleLike(wish.id)}
                      disabled={isLiked}
                      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all touch-manipulation min-h-[32px] ${
                        isLiked
                          ? "bg-rose-50 text-rose-600 border border-rose-200 cursor-default"
                          : "bg-stone-50 hover:bg-rose-50 text-stone-600 hover:text-rose-600 border border-stone-200"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? "fill-rose-500 text-rose-500 scale-110" : "text-stone-400"
                        } transition-transform`}
                      />
                      <span>{wish.likes || 0}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
