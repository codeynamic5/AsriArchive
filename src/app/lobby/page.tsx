// src/app/lobby/page.tsx
"use client";

import Link from "next/link";
import Header from "../../components/Header";

export default function LobbyPage() {
  const cities = [
    { name: "London", href: "/lobby/cities/london", image: "/images/travel/london2.png" },
    { name: "Cambridge", href: "/lobby/cities/cambridge", image: "/images/travel/cam1.png" },
    { name: "Vienna", href: "/lobby/cities/vienna", image: "/images/travel/austria.jpg" },
    { name: "Manchester", href: "/lobby/cities/manchester", image: "/images/travel/mainman.png" },
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
          className="card-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '200px',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          {cities.map((city) => (
            <Link key={city.name} href={city.href}>
              <div 
                className="travel-card"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img 
                  src={city.image}
                  alt={city.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/images/travel/placeholder.jpg";
                  }}
                />
                <div 
                  className="overlay"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    color: 'white',
                    padding: '10px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontFamily: "'Times New Roman', Times, serif"
                  }}
                >
                  {city.name}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => (window.location.href = "/admin")}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: "'Times New Roman', Times, serif"
            }}
          >
            Admin Login
          </button>
        </div>
      </main>
    </div>
  );
}
