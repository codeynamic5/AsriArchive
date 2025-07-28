"use client";

import Header from "../../components/Header";
import Link from "next/link";

export default function TravelsPage() {
  // This would typically come from your data source
  const destinations = [
    { name: "Austria", image: "/images/travel/austria.jpg", href: "/travels/austria" },
    { name: "Bosnia", image: "/images/travel/bosnia.jpg", href: "/travels/bosnia" },
    { name: "Budapest", image: "/images/travel/budapest.jpg", href: "/travels/budapest" },
    { name: "Croatia", image: "/images/travel/croatia.jpg", href: "/travels/croatia" },
    { name: "Egypt", image: "/images/travel/egypt.jpg", href: "/travels/egypt" },
    { name: "Germany", image: "/images/travel/germany.jpg", href: "/travels/germany" },
    { name: "Greece", image: "/images/travel/greece.jpg", href: "/travels/greece" },
    { name: "Indonesia", image: "/images/travel/indonesia.jpg", href: "/travels/indo" },
    { name: "Italy", image: "/images/travel/italy.jpg", href: "/travels/italy" },
    { name: "Korea", image: "/images/travel/korea.jpg", href: "/travels/korea" },
    { name: "Netherlands", image: "/images/travel/neth.png", href: "/travels/neth" },
    { name: "Prague", image: "/images/travel/prague.jpg", href: "/travels/prague" },
    { name: "Scotland", image: "/images/travel/scotland.jpg", href: "/travels/scot" },
    { name: "Serbia", image: "/images/travel/serbia.jpg", href: "/travels/serbia" },
    { name: "Spain", image: "/images/travel/spain.jpg", href: "/travels/spain" },
    { name: "Turkey", image: "/images/travel/turkey.jpg", href: "/travels/turkey" },
    { name: "UK", image: "/images/travel/uk.jpg", href: "/travels/uk" },
    { name: "USA", image: "/images/travel/usa.jpg", href: "/travels/usa" },
  ];

  return (
    <div className="travel-page">
      <Header currentPage="travels" />
      
      <div className="card-container">
        {destinations.map((destination) => (
          <Link key={destination.name} href={destination.href}>
            <div className="travel-card">
              <img 
                src={destination.image} 
                alt={destination.name}
                onError={(e) => {
                  // Fallback for missing images
                  e.currentTarget.src = "/images/travel/placeholder.jpg";
                }}
              />
              <div className="overlay">
                {destination.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
