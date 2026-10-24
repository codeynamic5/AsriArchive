"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Lobby",           href: "/lobby" },
  { label: "Travels",         href: "/travels" },
  { label: "Ayu's Book Club", href: "/bookclub" },
  { label: "Exposures",       href: "/exposures" },
];

export default function Navbar({ extra }: { extra?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Skip to content — visible only on focus for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase"
      >
        Skip to main content
      </a>

      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-[0_1px_6px_rgba(0,0,0,0.08)]"
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-0">
          {/* Nav — centred on desktop, scrollable on mobile */}
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-8 overflow-x-auto scrollbar-none mx-auto"
          >
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    relative font-sans text-[11px] font-semibold uppercase tracking-widest
                    px-3 py-3 min-h-[44px] flex items-center
                    whitespace-nowrap transition-colors duration-200
                    rounded-sm
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                    ${active ? "text-accent" : "text-ink hover:text-accent/70"}
                  `}
                >
                  {l.label}
                  {/* Active underline indicator */}
                  {active && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {extra && <div className="flex-shrink-0 ml-4">{extra}</div>}
        </div>
      </header>
    </>
  );
}
