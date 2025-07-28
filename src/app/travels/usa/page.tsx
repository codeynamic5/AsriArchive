"use client";

import Header from "../../../components/Header";
import Link from "next/link";
import Image from "next/image";

export default function USAPage() {
  const cities = [
    { name: "New York", href: "/travels/usa/newyork", image: "/images/travel/cam1.png" },
    { name: "Los Angeles", href: "/travels/usa/losangeles", image: "/images/travel/cam2.png" },
    { name: "Chicago", href: "/travels/usa/chicago", image: "/images/travel/cam3.png" },
    { name: "Miami", href: "/travels/usa/miami", image: "/images/travel/cam4.png" },
    { name: "San Francisco", href: "/travels/usa/sanfrancisco", image: "/images/travel/cam5.png" },
  ];

  return (
    <div className="travel-page">
      <Header currentPage="travels" />
      
      <div style={{ paddingTop: '120px', padding: '120px 2rem 2rem' }}>
        <h1 style={{ 
          color: '#333',
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: '60px',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          USA
        </h1>
        
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {cities.map((city) => (
            <Link key={city.name} href={city.href}>
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  height: '280px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <Image 
                    src={city.image} 
                    alt={city.name}
                    width={300}
                    height={200}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <h3 
                    style={{
                      color: '#333',
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }}
                  >
                    {city.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
