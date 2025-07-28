// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect immediately to lobby
    router.push("/lobby");
  }, [router]);

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
          Asri&apos;s Archive
        </h1>
        <p style={{ color: '#666', fontFamily: "'Times New Roman', Times, serif" }}>
          Loading...
        </p>
      </div>
    </main>
  );
}
