"use client";

import Header from "../../components/Header";
import Link from "next/link";

export default function TravelsPage() {
  // This would typically come from your data source
  const destinations = [
    { name: "Austria", href: "/travels/austria" },
    { name: "Bosnia", href: "/travels/bosnia" },
    { name: "Budapest", href: "/travels/budapest" },
    { name: "Croatia", href: "/travels/croatia" },
    { name: "Egypt", href: "/travels/egypt" },
    { name: "Germany", href: "/travels/germany" },
    { name: "Greece", href: "/travels/greece" },
    { name: "Indonesia", href: "/travels/indo" },
    { name: "Italy", href: "/travels/italy" },
    { name: "Korea", href: "/travels/korea" },
    { name: "Netherlands", href: "/travels/neth" },
    { name: "Prague", href: "/travels/prague" },
    { name: "Serbia", href: "/travels/serbia" },
    { name: "Spain", href: "/travels/spain" },
    { name: "Turkey", href: "/travels/turkey" },
    { name: "UK", href: "/travels/uk" },
    { name: "USA", href: "/travels/usa" },
  ];

  return (
    <div style={{ backgroundColor: 'var(--asri-light-gray)', minHeight: '100vh' }}>
      <Header currentPage="travels" />
      
      <h1>Travels</h1>
      
      <div className="travel-grid">
        {destinations.map((destination) => (
          <Link key={destination.name} href={destination.href}>
            <h2 className="travel-title">{destination.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
