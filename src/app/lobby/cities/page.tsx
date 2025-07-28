"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../../../components/Header";

export default function CitiesPage() {
  const cities = [
    { name: "Cambridge", href: "/lobby/cities/cambridge", image: "/images/travel/cam1.png" },
    { name: "Vienna", href: "/lobby/cities/vienna", image: "/images/travel/cam2.png" },
    { name: "Manchester", href: "/lobby/cities/manchester", image: "/images/travel/mainman.png" },
    { name: "London", href: "/lobby/cities/london", image: "/images/travel/london2.png" },
  ];

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Header currentPage="lobby" />
      
      <main style={{ paddingTop: '120px', padding: '120px 2rem 2rem' }}>
        <div className="text-center mb-8">
          <h1 
            style={{ 
              color: '#333',
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '60px',
              marginBottom: '2rem'
            }}
          >
            Cities
          </h1>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 1rem'
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
                  height: '250px'
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
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <Image
                    src={city.image}
                    alt={city.name}
                    width={300}
                    height={180}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ padding: '1rem', textAlign: 'center' }}>
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
      </main>
    </div>
  );
}
