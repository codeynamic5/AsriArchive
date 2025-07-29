// src/app/lobby/page.tsx
"use client";

import Link from "next/link";

export default function LobbyPage() {
  const sections = [
    { 
      name: "Travels", 
      href: "/travels"
    },
    { 
      name: "Exposures", 
      href: "/exposures"
    },
    { 
      name: "Cooking", 
      href: "/cooking"
    },
    { 
      name: "Ayu's Bookclub", 
      href: "/bookclub"
    },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
      <div className="lobby-grid">
        {sections.map((section) => (
          <Link key={section.name} href={section.href}>
            <div className="lobby-card flex flex-col justify-center items-center">
              <div 
                style={{
                  width: '200px',
                  height: '150px',
                  backgroundColor: '#dcdcdc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto',
                  borderRadius: '4px'
                }}
              >
                <span
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    color: "#333",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {section.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
