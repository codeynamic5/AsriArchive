// src/app/lobby/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";

export default function LobbyPage() {
  const sections = [
    { 
      name: "Travels", 
      href: "/travels", 
      image: "/images/travel/cam1.png",
      description: "Explore adventures around the world"
    },
    { 
      name: "Exposures", 
      href: "/exposures", 
      image: "/images/travel/cam2.png",
      description: "Photography and visual stories"
    },
    { 
      name: "Book Club", 
      href: "/bookclub", 
      image: "/images/travel/cam3.png",
      description: "Literary discussions and reviews"
    },
    { 
      name: "Cooking", 
      href: "/cooking", 
      image: "/images/travel/cam4.png",
      description: "Recipes and culinary adventures"
    },
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
              fontSize: '80px',
              marginBottom: '1rem'
            }}
          >
            Asri&apos;s Archive
          </h1>
          <p 
            style={{
              color: '#666',
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '20px',
              marginBottom: '3rem'
            }}
          >
            Welcome to my personal collection
          </p>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}
        >
          {sections.map((section) => (
            <Link key={section.name} href={section.href}>
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  height: '300px'
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
                    src={section.image}
                    alt={section.name}
                    width={400}
                    height={200}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 
                    style={{
                      color: '#333',
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: '24px',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {section.name}
                  </h3>
                  <p 
                    style={{
                      color: '#666',
                      fontFamily: "'Times New Roman', Times, serif",
                      fontSize: '16px',
                      lineHeight: '1.4'
                    }}
                  >
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
