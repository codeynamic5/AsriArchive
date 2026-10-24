"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Virtual canvas dimensions — photos live in this coordinate space
const CANVAS_W = 4200;
const CANVAS_H = 3000;
const CX = CANVAS_W / 2; // centre x = 2100
const CY = CANVAS_H / 2; // centre y = 1500

interface PhotoCard {
  slug: string;
  country: string;
  place: string;
  x: number;  // distance from canvas centre
  y: number;
  w: number;  // image width (px)
  h: number;  // image height (px)
  rotate: number; // degrees
  bg: string; // placeholder colour until Sanity images are wired
}

// Spread around (0, 0) — offset from CX, CY
const PHOTOS: PhotoCard[] = [
  // ── top row ──────────────────────────────────────────────────────────
  { slug: "greece",      country: "Greece",           place: "Santorini",  x: -560, y: -350, w: 280, h: 188, rotate: -1.8, bg: "#C8CDCA" },
  { slug: "italy",       country: "Italy",            place: "Rome",       x: -230, y: -380, w: 195, h: 270, rotate:  1.6, bg: "#BEB8B2" },
  { slug: "turkey",      country: "Turkey",           place: "Istanbul",   x:  80,  y: -330, w: 295, h: 192, rotate: -0.7, bg: "#C4C0BC" },
  { slug: "netherlands", country: "Netherlands",      place: "Amsterdam",  x:  420, y: -360, w: 235, h: 320, rotate:  1.3, bg: "#BCC4CA" },
  { slug: "uk",          country: "UK",               place: "London",     x:  700, y: -310, w: 265, h: 175, rotate: -1.5, bg: "#B8BCBE" },

  // ── middle row ───────────────────────────────────────────────────────
  { slug: "indonesia",   country: "Indonesia",        place: "Bali",       x: -760, y: -30,  w: 235, h: 320, rotate: -2.3, bg: "#B2BCBA" },
  { slug: "spain",       country: "Spain",            place: "Barcelona",  x: -470, y:  50,  w: 310, h: 205, rotate:  1.0, bg: "#C0BCBA" },
  { slug: "germany",     country: "Germany",          place: "Munich",     x: -130, y:  80,  w: 218, h: 218, rotate:  2.8, bg: "#C6C4C0" },
  { slug: "croatia",     country: "Croatia",          place: "Dubrovnik",  x:  155, y:  20,  w: 265, h: 178, rotate: -1.2, bg: "#B6C0C6" },
  { slug: "serbia",      country: "Serbia",           place: "Belgrade",   x:  460, y:  65,  w: 205, h: 285, rotate:  1.8, bg: "#C4C0BC" },
  { slug: "czechia",     country: "Czech Republic",   place: "Prague",     x:  720, y:  30,  w: 255, h: 170, rotate: -0.9, bg: "#BEC6CA" },

  // ── lower row ────────────────────────────────────────────────────────
  { slug: "austria",     country: "Austria",          place: "Vienna",     x: -620, y:  330, w: 225, h: 305, rotate:  1.5, bg: "#C0BEBC" },
  { slug: "egypt",       country: "Egypt",            place: "Cairo",      x: -350, y:  370, w: 285, h: 190, rotate: -0.5, bg: "#CCBEB6" },
  { slug: "korea",       country: "South Korea",      place: "Seoul",      x:  -30, y:  400, w: 212, h: 212, rotate:  2.3, bg: "#B6C2C8" },
  { slug: "bosnia",      country: "Bosnia",           place: "Mostar",     x:  245, y:  345, w: 248, h: 335, rotate: -1.6, bg: "#BABEB8" },
  { slug: "hungary",     country: "Hungary",          place: "Budapest",   x:  535, y:  380, w: 270, h: 180, rotate:  1.0, bg: "#C8BCBA" },

  // ── outliers for discovery ───────────────────────────────────────────
  { slug: "indonesia",   country: "Indonesia",        place: "Lombok",     x: -1050, y: -180, w: 210, h: 290, rotate: -1.5, bg: "#B8C4BE" },
  { slug: "spain",       country: "Spain",            place: "Seville",    x:  980,  y: -150, w: 250, h: 165, rotate:  2.0, bg: "#C4C0BA" },
  { slug: "uk",          country: "UK",               place: "Edinburgh",  x: -900,  y:  380, w: 270, h: 180, rotate:  0.8, bg: "#B4BABC" },
  { slug: "germany",     country: "Germany",          place: "Berlin",     x:  900,  y:  320, w: 230, h: 310, rotate: -2.0, bg: "#C4C2BE" },
];

export default function TravelsPage() {
  // Track whether the user is dragging so we can suppress link clicks
  const dragging = useRef(false);

  return (
    <div
      className="relative overflow-hidden bg-surface select-none"
      style={{ height: "calc(100vh - 56px)" }}
      role="main"
      aria-label="Travel photos — drag to explore"
    >
      {/* Edge vignettes — hint that the canvas extends beyond the viewport */}
      <div className="pointer-events-none absolute inset-y-0 left-0  w-28 z-10 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10 bg-gradient-to-l from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0    h-16 z-10 bg-gradient-to-b from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-10 bg-gradient-to-t from-surface to-transparent" />

      {/* Drag hint */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none font-mono text-[10px] tracking-[0.22em] uppercase text-muted/45">
        drag to explore
      </p>

      {/* ── Draggable canvas ── */}
      <motion.div
        drag
        dragMomentum
        dragTransition={{ timeConstant: 280, power: 0.25 }}
        onDragStart={() => { dragging.current = true; }}
        onDragEnd={() => { setTimeout(() => { dragging.current = false; }, 0); }}
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          // Centre the canvas in the viewport so the cluster appears on load
          left: `calc(50% - ${CANVAS_W / 2}px)`,
          top:  `calc(50% - ${CANVAS_H / 2}px)`,
        }}
      >
        {PHOTOS.map((p, i) => (
          <motion.div
            key={`${p.slug}-${i}`}
            className="absolute"
            style={{
              left: CX + p.x,
              top:  CY + p.y,
              rotate: p.rotate,
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.035, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.05, zIndex: 20, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          >
            <Link
              href={`/travels/${p.slug}`}
              draggable={false}
              onClick={(e) => { if (dragging.current) e.preventDefault(); }}
              aria-label={`${p.place}, ${p.country}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2"
            >
              {/* White photo frame — polaroid style */}
              <div
                className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.11)] pointer-events-none"
                style={{ width: p.w, padding: "10px 10px 10px 10px" }}
              >
                <div style={{ width: "100%", height: p.h, backgroundColor: p.bg }} />
              </div>

              {/* Caption */}
              <p
                className="mt-2 font-mono text-muted/65 pointer-events-none"
                style={{ fontSize: "10px", letterSpacing: "0.06em" }}
              >
                {p.place}
                <span className="mx-1.5 opacity-40">·</span>
                {p.country}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
