"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sections = [
  { label: "Travels",          href: "/travels",   placeholderBg: "#8FA4B2" },
  { label: "Gallery",          href: "/gallery",   placeholderBg: "#6E8797" },
  { label: "Cooking",          href: "/cooking",   placeholderBg: "#C4AFA0" },
  { label: "Asri's Book Club", href: "/book-club", placeholderBg: "#A89E8E" },
];

// Easing curves
const EASE_OUT = [0.16, 1, 0.3, 1] as const;   // fast start → gentle deceleration
const EASE_IN  = [0.4, 0, 1, 1]   as const;    // smooth re-entry on mouse-leave

// Per-element variants — parent whileHover="hovered" propagates to all children
const bgVariants = {
  rest:    { scale: 1,    transition: { duration: 0.55, ease: EASE_IN  } },
  hovered: { scale: 1.07, transition: { duration: 0.7,  ease: EASE_OUT } },
};

const overlayVariants = {
  rest:    { opacity: 1,   transition: { duration: 0.5, ease: EASE_IN  } },
  hovered: { opacity: 0.4, transition: { duration: 0.6, ease: EASE_OUT } },
};

const labelVariants = {
  rest:    { y: 0,  opacity: 0.88, transition: { duration: 0.45, ease: EASE_IN  } },
  hovered: { y: -4, opacity: 1,    transition: { duration: 0.55, ease: EASE_OUT } },
};

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cellVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function MenuPage() {
  return (
    <main className="h-screen w-screen bg-lobby p-3 overflow-hidden" aria-label="Section menu">
      <a
        href="#menu-grid"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-ink focus:rounded focus:font-mono focus:text-xs"
      >
        Skip to sections
      </a>

      <motion.nav
        id="menu-grid"
        role="list"
        aria-label="Archive sections"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 grid-rows-2 gap-3 h-full w-full"
      >
        {sections.map((s) => (
          <motion.div
            key={s.href}
            variants={cellVariants}
            role="listitem"
            className="relative overflow-hidden"
          >
            {/*
             * whileHover="hovered" on this div propagates to every motion child
             * that declares matching variant keys — no competing CSS transitions.
             */}
            <motion.div
              className="absolute inset-0"
              initial="rest"
              whileHover="hovered"
            >
              {/* Background — scales on hover */}
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: s.placeholderBg }}
                variants={bgVariants}
                aria-hidden="true"
              />

              {/* Static bottom gradient for label legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Dim overlay — fades out to "light up" the image */}
              <motion.div
                className="absolute inset-0 bg-black/25 pointer-events-none"
                variants={overlayVariants}
                aria-hidden="true"
              />

              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.h2
                  className="font-display font-black text-white text-center leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                  style={{ fontSize: "clamp(20px, 3vw, 44px)" }}
                  variants={labelVariants}
                >
                  {s.label}
                </motion.h2>
              </div>

              {/* Full-area link — sits on top for click/focus, pointer-events handled naturally */}
              <Link
                href={s.href}
                aria-label={`Enter ${s.label}`}
                className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/60"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.nav>
    </main>
  );
}
