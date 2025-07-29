"use client";

import Link from "next/link";

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const navItems = [
    { name: "Lobby", href: "/lobby" },
    { name: "Travels", href: "/travels" },
    { name: "Exposures", href: "/exposures" },
    { name: "Cooking", href: "/cooking" },
        { name: "Book Club", href: "/bookclub" },
  ];

  return (
    <header className="header">
      <nav className="nav-links">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className={currentPage === item.name.toLowerCase() ? "active" : ""}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}