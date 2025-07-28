// src/app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center" style={{ backgroundColor: '#f0f0f0' }}>
      <div className="text-center">
        <h1 
          className="text-6xl font-bold mb-8"
          style={{ 
            color: '#333',
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: '100px'
          }}
        >
          Asri's Archive
        </h1>
        <Link href="/lobby">
          <button 
            className="px-8 py-3 border-2 rounded-full transition duration-300"
            style={{
              borderColor: '#333',
              color: '#333',
              fontFamily: "'Times New Roman', Times, serif",
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#333';
            }}
          >
            Enter
          </button>
        </Link>
      </div>
    </main>
  );
}
