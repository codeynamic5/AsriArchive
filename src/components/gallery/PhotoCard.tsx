"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PhotoCardProps {
  href: string;
  src: string;
  alt: string;
  label: string;
}

export default function PhotoCard({ href, src, alt, label }: PhotoCardProps) {
  return (
    <motion.div
      className="flex-none w-[350px] max-w-[calc(100vw-3rem)]"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="relative block w-full h-[220px] sm:h-[250px] rounded overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.12)] cursor-pointer group"
      >
        <Image src={src} alt={alt} fill className="object-cover select-none" draggable={false} />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/40 to-black/60 group-hover:from-black/60 group-hover:to-black/80 transition-all duration-300">
          <span className="font-display text-2xl font-bold text-white tracking-[0.12em] [text-shadow:2px_2px_8px_rgba(0,0,0,0.8)]">
            {label}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
