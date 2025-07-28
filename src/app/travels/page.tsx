"use client";

import Header from "../../components/Header";
import Link from "next/link";
import Image from "next/image";

export default function TravelsPage() {
  // This would typically come from your data source
  const destinations = [
    { name: "Austria", image: "/images/travel/cam1.png", href: "/travels/austria" },
    { name: "Bosnia", image: "/images/travel/cam2.png", href: "/travels/bosnia" },
    { name: "Budapest", image: "/images/travel/cam3.png", href: "/travels/budapest" },
    { name: "Croatia", image: "/images/travel/cam4.png", href: "/travels/croatia" },
    { name: "Egypt", image: "/images/travel/cam5.png", href: "/travels/egypt" },
    { name: "Germany", image: "/images/travel/cam6.png", href: "/travels/germany" },
    { name: "Greece", image: "/images/travel/cam7.png", href: "/travels/greece" },
    { name: "Indonesia", image: "/images/travel/cam8.png", href: "/travels/indo" },
    { name: "Italy", image: "/images/travel/cam9.png", href: "/travels/italy" },
    { name: "Korea", image: "/images/travel/don1.png", href: "/travels/korea" },
    { name: "Netherlands", image: "/images/travel/neth.png", href: "/travels/neth" },
    { name: "Prague", image: "/images/travel/don2.png", href: "/travels/prague" },
    { name: "Serbia", image: "/images/travel/don4.png", href: "/travels/serbia" },
    { name: "Spain", image: "/images/travel/don5.png", href: "/travels/spain" },
    { name: "Turkey", image: "/images/travel/bridge1.png", href: "/travels/turkey" },
    { name: "UK", image: "/images/travel/bridge2.png", href: "/travels/uk" },
    { name: "USA", image: "/images/travel/tate.png", href: "/travels/usa" },
  ];

  return (
    <div className="travel-page">
      <Header currentPage="travels" />
      
      <div className="card-container">
        {destinations.map((destination) => (
          <Link key={destination.name} href={destination.href}>
            <div className="travel-card">
              <Image 
                src={destination.image} 
                alt={destination.name}
                width={150}
                height={150}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
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
