"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage { src: string; alt: string }

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.93, y: 14 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.45, ease: "backOut" as const } },
};

export default function MasonryGrid({ images }: { images: GalleryImage[] }) {
  const [modal, setModal] = useState<GalleryImage | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modal) closeRef.current?.focus();
  }, [modal]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 px-8 py-6"
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            variants={item}
            role="button"
            tabIndex={0}
            aria-label={`View photo: ${img.alt}`}
            className="break-inside-avoid mb-4 overflow-hidden cursor-pointer group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            onClick={() => setModal(img)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setModal(img);
              }
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {modal && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setModal(null)}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center cursor-pointer p-8"
          >
            <button
              ref={closeRef}
              onClick={() => setModal(null)}
              aria-label="Close photo"
              className="absolute top-4 right-5 font-mono text-[11px] tracking-[0.18em] uppercase text-white/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white p-2"
            >
              Close ✕
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={modal.src}
                alt={modal.alt}
                width={1400}
                height={900}
                className="max-w-full max-h-[88vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
