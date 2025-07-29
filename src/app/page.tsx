// src/app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 
          className="text-6xl font-bold mb-8"
          style={{ 
            color: '#333',
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: '100px'
          }}
        >
          Asri&apos;s Archive
        </h1>
        <Link href="/lobby">
          <button 
            className={`asri-button px-10 py-3 rounded-full border-2 border-black
              bg-transparent
              text-black
              font-serif font-bold text-lg
              
              transition-colors duration-300 ease-out
              hover:bg-[#5b7894]
              hover:text-white
              `}
            style={{
              fontFamily: "'Times New Roman', Times, serif",
            }}
          >
            Enter
          </button>
        </Link>
      </div>
    </main>
  );
}
