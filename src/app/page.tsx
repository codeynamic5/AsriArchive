"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-home">
      {/* subtle noise grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }}
      />

      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.h1
          className="font-display text-6xl md:text-8xl font-black text-ink tracking-tight leading-none mb-8 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Asri&apos;s Archive
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/lobby"
            className="inline-block px-10 py-3 font-mono text-xs tracking-[0.2em] uppercase border-2 border-ink rounded-full text-ink hover:bg-accent-dark hover:border-accent-dark hover:text-white transition-all duration-300"
          >
            Enter
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
