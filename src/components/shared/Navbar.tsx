"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Travels",   href: "/travels"   },
  { label: "Gallery",   href: "/gallery"   },
  { label: "Cooking",   href: "/cooking"   },
  { label: "Book Club", href: "/book-club" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Skip-to-content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-ink focus:text-white focus:rounded focus:font-mono focus:text-xs"
      >
        Skip to content
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-50"
        role="banner"
      >
        <div className="flex items-center justify-between h-14" style={{ padding: "0 24px" }}>

          {/* Logotype — "Ay.," */}
          <Link
            href="/"
            aria-label="Asri's Archive — home"
            className="
              font-black text-ink leading-none tracking-tight
              hover:opacity-70 transition-opacity duration-200
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-ink/50 focus-visible:rounded-sm
            "
            style={{ fontFamily: "var(--font-logotype)", fontSize: "28px" }}
          >
            Ay.,
          </Link>

          {/* Desktop nav links */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    relative font-body text-[13px] tracking-wide
                    min-h-[44px] flex items-center
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-ink/40 focus-visible:rounded-sm
                    ${active ? "text-ink" : "text-muted hover:text-ink"}
                  `}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-2 left-0 right-0 h-px bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="
              md:hidden flex flex-col justify-center items-center
              w-11 h-11 gap-[5px] cursor-pointer
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:rounded
            "
          >
            <motion.span
              className="block w-5 h-px bg-ink origin-center"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
            <motion.span
              className="block w-5 h-px bg-ink"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-px bg-ink origin-center"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden"
            >
              <nav aria-label="Mobile navigation" className="flex flex-col py-4 gap-1" style={{ padding: "16px 24px" }}>
                {links.map((l) => {
                  const active = pathname.startsWith(l.href);
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`
                        font-body text-[15px] tracking-wide
                        min-h-[44px] flex items-center
                        border-b border-black/[0.05] last:border-0
                        transition-colors duration-200
                        ${active ? "text-ink font-semibold" : "text-muted hover:text-ink"}
                      `}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
