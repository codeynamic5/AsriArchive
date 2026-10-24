"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const SESSION_KEY = "asri-archive-visited";

export default function FrontDoorPage() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Skip front-door for returning visitors in the same session
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      router.replace("/menu");
    }
  }, [router]);

  function handleEnter() {
    if (leaving) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setLeaving(true);
    // Navigate after exit animation completes (500ms)
    setTimeout(() => router.push("/menu"), 500);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleEnter();
    }
  }

  return (
    // Skip-to-content for keyboard users
    <>
      <a
        href="#enter-btn"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-white focus:rounded focus:font-mono focus:text-xs"
      >
        Skip to enter
      </a>

      <motion.main
        className="h-screen w-full flex items-center justify-center bg-lobby overflow-hidden"
        aria-label="Asri's Archive front door"
        animate={leaving ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <div className="text-center select-none">
          {/* Wordmark */}
          <motion.h1
            className="font-display font-black text-ink leading-none tracking-tight"
            style={{ fontSize: "clamp(44px, 8vw, 96px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Asri&apos;s Archive
          </motion.h1>

          {/* Enter button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-20"
          >
            <button
              id="enter-btn"
              ref={buttonRef}
              onClick={handleEnter}
              onKeyDown={handleKeyDown}
              aria-label="Enter Asri's Archive"
              className="
                min-w-[160px] px-14 py-5
                font-body text-base text-ink
                border border-ink/35 rounded-full
                hover:bg-ink/5 hover:border-ink/55
                transition-all duration-300
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ink/60
                focus-visible:ring-offset-4 focus-visible:ring-offset-lobby
                cursor-pointer
              "
            >
              Enter
            </button>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}
