"use client";

import Link from "next/link";

interface NavProps {
  links?: { label: string; href: string }[];
  rightSlot?: React.ReactNode;
}

const defaultLinks = [
  { label: "Lobby", href: "/lobby" },
  { label: "Travel", href: "/travel" },
  { label: "Ayu's Book Club", href: "/bookclub" },
  { label: "Exposures", href: "/exposures" },
];

export default function Nav({ links = defaultLinks, rightSlot }: NavProps) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(5px)",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <nav style={{ display: "flex", gap: "2rem", flex: 1, justifyContent: "center" }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{ color: "#333", fontWeight: "bold", padding: "0.5rem 1rem", transition: "color 0.3s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#666")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#333")}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      {rightSlot}
    </header>
  );
}
