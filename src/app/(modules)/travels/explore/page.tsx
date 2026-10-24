"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CANVAS_W = 3400;
const CANVAS_H = 1520;

interface PhotoCard {
  slug: string;
  country: string;
  place: string;
  x: number;
  y: number;
  w: number;
  h: number;
  bg: string;
}

const PHOTOS: PhotoCard[] = [
  // ── row 1 ───────────────────────────────────────────────────────────────
  { slug: "greece",      country: "Greece",        place: "Santorini",  x: 80,   y: 90,  w: 330, h: 220, bg: "#C8CDCA" },
  { slug: "italy",       country: "Italy",          place: "Rome",       x: 500,  y: 65,  w: 220, h: 315, bg: "#BEB8B2" },
  { slug: "turkey",      country: "Turkey",         place: "Istanbul",   x: 820,  y: 100, w: 350, h: 235, bg: "#C4C0BC" },
  { slug: "netherlands", country: "Netherlands",    place: "Amsterdam",  x: 1270, y: 75,  w: 265, h: 355, bg: "#BCC4CA" },
  { slug: "uk",          country: "UK",             place: "London",     x: 1660, y: 55,  w: 320, h: 212, bg: "#B8BCBE" },
  { slug: "czechia",     country: "Czech Republic", place: "Prague",     x: 2090, y: 80,  w: 290, h: 195, bg: "#BEC6CA" },
  { slug: "spain",       country: "Spain",          place: "Seville",    x: 2500, y: 65,  w: 290, h: 195, bg: "#C4C0BA" },
  { slug: "korea",       country: "South Korea",    place: "Seoul",      x: 2910, y: 78,  w: 250, h: 250, bg: "#B6C2C8" },

  // ── row 2 ───────────────────────────────────────────────────────────────
  { slug: "indonesia",   country: "Indonesia",      place: "Bali",       x: 65,   y: 430, w: 265, h: 375, bg: "#B2BCBA" },
  { slug: "spain",       country: "Spain",          place: "Barcelona",  x: 440,  y: 460, w: 360, h: 240, bg: "#C0BCBA" },
  { slug: "germany",     country: "Germany",        place: "Munich",     x: 920,  y: 440, w: 255, h: 255, bg: "#C6C4C0" },
  { slug: "croatia",     country: "Croatia",        place: "Dubrovnik",  x: 1295, y: 475, w: 305, h: 205, bg: "#B6C0C6" },
  { slug: "serbia",      country: "Serbia",         place: "Belgrade",   x: 1730, y: 448, w: 238, h: 335, bg: "#C4C0BC" },
  { slug: "austria",     country: "Austria",        place: "Vienna",     x: 2095, y: 430, w: 265, h: 360, bg: "#C0BEBC" },
  { slug: "egypt",       country: "Egypt",          place: "Cairo",      x: 2490, y: 468, w: 335, h: 220, bg: "#CCBEB6" },
  { slug: "hungary",     country: "Hungary",        place: "Budapest",   x: 2950, y: 450, w: 315, h: 208, bg: "#C8BCBA" },

  // ── row 3 ───────────────────────────────────────────────────────────────
  { slug: "bosnia",      country: "Bosnia",         place: "Mostar",     x: 80,   y: 910, w: 285, h: 395, bg: "#BABEB8" },
  { slug: "indonesia",   country: "Indonesia",      place: "Lombok",     x: 475,  y: 940, w: 240, h: 340, bg: "#B8C4BE" },
  { slug: "uk",          country: "UK",             place: "Edinburgh",  x: 830,  y: 920, w: 315, h: 208, bg: "#B4BABC" },
  { slug: "germany",     country: "Germany",        place: "Berlin",     x: 1265, y: 900, w: 258, h: 360, bg: "#C4C2BE" },
  { slug: "greece",      country: "Greece",         place: "Athens",     x: 1660, y: 930, w: 318, h: 212, bg: "#C8CDCA" },
  { slug: "italy",       country: "Italy",          place: "Florence",   x: 2100, y: 910, w: 224, h: 318, bg: "#BEB8B2" },
  { slug: "turkey",      country: "Turkey",         place: "Cappadocia", x: 2450, y: 940, w: 342, h: 230, bg: "#C4C0BC" },
  { slug: "netherlands", country: "Netherlands",    place: "Utrecht",    x: 2930, y: 915, w: 264, h: 355, bg: "#BCC4CA" },
];

export default function TravelsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollLeft = (CANVAS_W - el.clientWidth) / 2;
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-scroll scrollbar-none bg-surface"
      style={{ width: "100vw", height: "100vh" }}
      role="main"
      aria-label="Travel photos — scroll to explore"
    >
      <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>
        {PHOTOS.map((p, i) => (
          <motion.div
            key={`${p.slug}-${i}`}
            className="absolute"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.025, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.03, zIndex: 20, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
          >
            <Link
              href={`/travels/${p.slug}`}
              draggable={false}
              aria-label={`${p.place}, ${p.country}`}
              className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/40"
            >
              <div style={{ width: p.w, height: p.h, backgroundColor: p.bg }} />

              <div className="mt-[7px] flex items-baseline justify-between" style={{ width: p.w }}>
                <p className="font-mono text-muted/60" style={{ fontSize: "9px", letterSpacing: "0.07em" }}>
                  {p.place}
                </p>
                <p className="font-mono text-muted/35" style={{ fontSize: "9px", letterSpacing: "0.05em" }}>
                  {p.country}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <p
        className="fixed bottom-6 left-0 right-0 text-center z-20 pointer-events-none font-mono text-muted/40"
        style={{ fontSize: "9px", letterSpacing: "0.25em" }}
      >
        SCROLL TO EXPLORE
      </p>
    </div>
  );
}
