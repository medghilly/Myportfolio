import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Site primary: hsl(195, 100%, 45%) = #00B4D8 (cyan-blue)
// Site accent:  hsl(180, 100%, 45%) = #00E5CC (teal)
// Site dark bg: hsl(213, 52%, 13%)  = #0B1F3A

const PRIMARY = '#00B4D8';
const ACCENT  = '#00E5CC';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#060d18' }}
        >
          {/* ── Ambient background glows ── */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px]"
            style={{ background: PRIMARY }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full blur-[120px]"
            style={{ background: ACCENT }}
          />

          <div className="relative flex flex-col items-center z-10">

            {/* ── LOGO RING + HEXAGON ── */}
            <div className="relative w-52 h-52 flex items-center justify-center mb-10">

              {/* Outer SVG ring with orbiting dot */}
              <svg className="absolute w-full h-full" viewBox="0 0 208 208">
                {/* Static thin ring */}
                <circle cx="104" cy="104" r="90" fill="none" stroke="rgba(0,180,216,0.08)" strokeWidth="1" />

                {/* Animated arc */}
                <motion.circle
                  cx="104" cy="104" r="90"
                  fill="none"
                  stroke={`url(#ringGrad)`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="60 500"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '104px 104px' }}
                />

                {/* Orbiting glowing dot */}
                <motion.circle
                  cx="104" cy="14"
                  r="4"
                  fill="white"
                  filter="url(#dotGlow)"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '104px 104px' }}
                />

                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={PRIMARY} />
                    <stop offset="100%" stopColor={ACCENT} />
                  </linearGradient>
                  <filter id="dotGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Central Hexagon */}
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-28 h-28 flex items-center justify-center"
              >
                <svg viewBox="0 0 100 100" className="absolute w-full h-full">
                  <defs>
                    <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={PRIMARY} />
                      <stop offset="100%" stopColor={ACCENT} />
                    </linearGradient>
                    <filter id="hexGlow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  {/* Filled hexagon - subtle */}
                  <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" fill="rgba(0,180,216,0.07)" />
                  {/* Hexagon border */}
                  <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" fill="none" stroke="url(#hexGrad)" strokeWidth="2.5" filter="url(#hexGlow)" />
                </svg>

                {/* "M" Initial */}
                <span
                  className="text-5xl font-black relative z-20 select-none"
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  M
                </span>

                {/* Pulse glow behind hex */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{ background: PRIMARY }}
                />
              </motion.div>
            </div>

            {/* ── NAME ── */}
            <div className="text-center">
              <div className="overflow-hidden mb-3">
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-5xl font-black tracking-[0.25em] uppercase"
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  MOHAMED
                </motion.h2>
              </div>

              {/* Separator line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
                className="h-[2px] w-16 mx-auto mb-5 rounded-full"
                style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT})` }}
              />

              {/* Titles */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="flex flex-col items-center gap-1.5"
              >
                <p
                  className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em]"
                  style={{ color: PRIMARY }}
                >
                  FULL STACK DEVELOPER
                </p>
                <p
                  className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em]"
                  style={{ color: ACCENT }}
                >
                  &amp; NETWORK ENGINEER
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
