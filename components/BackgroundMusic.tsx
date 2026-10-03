"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="jj-particle" style={style} />;
}

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    document.body.style.overflow = showOverlay ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showOverlay]);

  const handleEnter = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.8;
      audio.play().catch(err => console.warn("Playback failed:", err));
    }
    setShowOverlay(false);
  };

  const particles: { top: string; left: string; size: number; delay: number; dur: number }[] = [
    { top: "8%",  left: "12%", size: 4, delay: 0,   dur: 6 },
    { top: "20%", left: "80%", size: 3, delay: 1.2, dur: 7 },
    { top: "35%", left: "5%",  size: 5, delay: 0.5, dur: 5 },
    { top: "50%", left: "90%", size: 3, delay: 2,   dur: 8 },
    { top: "65%", left: "25%", size: 4, delay: 1.8, dur: 6 },
    { top: "75%", left: "70%", size: 5, delay: 0.8, dur: 7 },
    { top: "85%", left: "45%", size: 3, delay: 2.5, dur: 5 },
    { top: "15%", left: "55%", size: 4, delay: 1.5, dur: 9 },
    { top: "45%", left: "50%", size: 2, delay: 3,   dur: 6 },
    { top: "90%", left: "15%", size: 3, delay: 0.3, dur: 8 },
    { top: "5%",  left: "65%", size: 3, delay: 1.1, dur: 7 },
    { top: "60%", left: "8%",  size: 4, delay: 2.2, dur: 5 },
  ];

  return (
    <>
      <audio
        ref={audioRef}
        src="/api/wedding-song"
        loop
        playsInline
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />

      <style>{`
        .jj-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #f6e29f 0%, #d4af37 60%, transparent 100%);
          animation: jjFloat var(--p-dur, 6s) ease-in-out var(--p-delay, 0s) infinite alternate;
          pointer-events: none;
        }
        @keyframes jjFloat {
          0%   { transform: translateY(0px)   scale(1);   opacity: 0.3; }
          50%  { transform: translateY(-22px) scale(1.3); opacity: 0.7; }
          100% { transform: translateY(8px)   scale(0.9); opacity: 0.3; }
        }
        @keyframes jjShimmer {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        .jj-enter-btn {
          background: linear-gradient(90deg,#7a4f10 0%,#d4af37 25%,#f6e29f 50%,#d4af37 75%,#7a4f10 100%);
          background-size: 300% auto;
          animation: jjShimmer 3s linear infinite;
          color: #0b0907;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          border-radius: 9999px;
          padding: clamp(0.75rem,2.5vw,1rem) clamp(2rem,7vw,3rem);
          font-size: clamp(0.7rem,2vw,0.9rem);
          box-shadow: 0 0 32px rgba(212,175,55,0.5), 0 0 80px rgba(212,175,55,0.15), 0 4px 20px rgba(0,0,0,0.6);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          z-index: 1;
        }
        .jj-enter-btn:hover {
          transform: scale(1.07);
          box-shadow: 0 0 50px rgba(212,175,55,0.75), 0 6px 28px rgba(0,0,0,0.65);
        }
        .jj-enter-btn:active { transform: scale(0.96); }
        @keyframes jjPulseRing {
          0%   { transform: scale(1);    opacity: 0.5; }
          100% { transform: scale(1.7);  opacity: 0;   }
        }
        .jj-ring {
          position: absolute;
          inset: -8px;
          border-radius: 9999px;
          border: 1.5px solid rgba(212,175,55,0.65);
          animation: jjPulseRing 2.2s ease-out infinite;
          pointer-events: none;
        }
        .jj-ring2 { animation-delay: 1.1s; }
        .jj-corner {
          position: absolute;
          width: clamp(55px,13vw,100px);
          height: clamp(55px,13vw,100px);
          opacity: 0.6;
          pointer-events: none;
        }
        .jj-corner-tl { top:0;    left:0; }
        .jj-corner-tr { top:0;    right:0;  transform:scaleX(-1); }
        .jj-corner-bl { bottom:0; left:0;   transform:scaleY(-1); }
        .jj-corner-br { bottom:0; right:0;  transform:scale(-1,-1); }
        .jj-divider { display:flex; align-items:center; gap:0.5rem; width:100%; }
        .jj-divider-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent); }
        @keyframes jjGlow {
          0%,100% { text-shadow: 0 0 30px rgba(212,175,55,0.3); }
          50%      { text-shadow: 0 0 60px rgba(212,175,55,0.65), 0 0 100px rgba(212,175,55,0.2); }
        }
        .jj-name-glow { animation: jjGlow 3.5s ease-in-out infinite; }
      `}</style>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: "fixed", inset: 0, zIndex: 99999,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "radial-gradient(ellipse at 50% 35%,#1c1207 0%,#0d0906 45%,#060403 100%)",
              overflow: "hidden",
            }}
          >
            {/* Ambient glow */}
            <div style={{
              position: "absolute", width: "70vw", height: "60vh",
              top: "15%", left: "15%", borderRadius: "50%",
              background: "radial-gradient(ellipse,rgba(212,175,55,0.06) 0%,transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Particles */}
            {particles.map((p, i) => (
              <Particle key={i} style={{
                top: p.top, left: p.left,
                width: p.size, height: p.size,
                // @ts-ignore
                "--p-delay": `${p.delay}s`,
                "--p-dur": `${p.dur}s`,
              }} />
            ))}

            {/* Corner ornaments */}
            {(["tl","tr","bl","br"] as const).map(pos => (
              <svg key={pos} className={`jj-corner jj-corner-${pos}`} viewBox="0 0 100 100" fill="none">
                <path d="M8 8 L8 48" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 8 L48 8" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 8 Q40 8 44 24 Q48 40 64 42" stroke="#d4af37" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.65"/>
                <path d="M8 8 Q22 8 22 22" stroke="#d4af37" strokeWidth="0.8" fill="none" opacity="0.4"/>
                <circle cx="8"  cy="8"  r="3.5" fill="#d4af37" opacity="0.9"/>
                <circle cx="48" cy="8"  r="1.5" fill="#d4af37" opacity="0.5"/>
                <circle cx="8"  cy="48" r="1.5" fill="#d4af37" opacity="0.5"/>
                <circle cx="64" cy="42" r="2"   fill="#d4af37" opacity="0.35"/>
              </svg>
            ))}

            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", textAlign: "center",
                padding: "clamp(1.5rem,5vw,3rem) clamp(1.5rem,7vw,4rem)",
                maxWidth: 480, width: "90vw",
              }}
            >
              {/* VK Fotos branding */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                style={{ marginBottom: "0.8rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}
              >
                {/* Camera icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(0.8rem,2.5vw,1.05rem)",
                  color: "#d4af37",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                  textShadow: "0 0 20px rgba(212,175,55,0.5)",
                }}>VK Fotos</span>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(6px,1.6vw,8px)",
                  color: "#d4af37",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  opacity: 0.55,
                }}>Presents</span>
              </motion.div>

              {/* Top label */}
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.7em" }}
                animate={{ opacity: 0.7, letterSpacing: "0.3em" }}
                transition={{ delay: 0.5, duration: 1.1 }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(8px,2vw,10px)",
                  textTransform: "uppercase",
                  color: "#d4af37",
                  marginBottom: "1.2rem",
                }}
              >
                You are cordially invited
              </motion.p>

              {/* Top divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="jj-divider"
                style={{ marginBottom: "1.6rem" }}
              >
                <div className="jj-divider-line" />
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M9 1 L11 7 L17 7 L12 11 L14 17 L9 13 L4 17 L6 11 L1 7 L7 7 Z" fill="#d4af37" opacity="0.8"/>
                </svg>
                <div className="jj-divider-line" />
              </motion.div>

              {/* Names */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="jj-name-glow"
                style={{ lineHeight: 1.1, marginBottom: "0.5rem" }}
              >
                <span style={{
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: "clamp(3.2rem,15vw,6rem)",
                  color: "#f6e29f", display: "block",
                }}>Jane</span>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(0.65rem,2.2vw,0.9rem)",
                  color: "#d4af37", letterSpacing: "0.5em",
                  textTransform: "uppercase", display: "block",
                  margin: "0.15rem 0", opacity: 0.85,
                }}>&amp;</span>
                <span style={{
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: "clamp(3.2rem,15vw,6rem)",
                  color: "#f6e29f", display: "block",
                }}>Jerish</span>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ delay: 1, duration: 0.9 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(0.8rem,2.5vw,1.05rem)",
                  color: "#e8d5a3",
                  marginTop: "0.5rem", marginBottom: "0.3rem",
                }}
              >
                Forever Begins
              </motion.p>

              {/* Date */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.1, duration: 0.9 }}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(8px,2vw,10px)",
                  color: "#d4af37",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  marginBottom: "2rem",
                }}
              >
                October 12, 2026 &nbsp;•&nbsp; Kanyakumari
              </motion.p>

              {/* Bottom divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="jj-divider"
                style={{ marginBottom: "2.2rem" }}
              >
                <div className="jj-divider-line" />
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <circle cx="6" cy="6" r="3" fill="#d4af37" opacity="0.75"/>
                  <circle cx="6" cy="6" r="5.5" stroke="#d4af37" strokeWidth="0.6" opacity="0.35" fill="none"/>
                </svg>
                <div className="jj-divider-line" />
              </motion.div>

              {/* Enter button */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                style={{ position: "relative", display: "inline-flex" }}
              >
                <div className="jj-ring" />
                <div className="jj-ring jj-ring2" />
                <button
                  id="jj-enter-btn"
                  className="jj-enter-btn"
                  onClick={handleEnter}
                  aria-label="Open Invitation and play music"
                >
                  Open 
                </button>
              </motion.div>

              {/* Music hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{
                  marginTop: "1.5rem",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(7px,1.8vw,9px)",
                  color: "#d4af37",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                🎵 Wedding music will play on entry
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
