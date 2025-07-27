// src/app/lobby/page.tsx
"use client";

import Link from "next/link";

export default function LobbyPage() {
  return (
    <main className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Lobby</h2>
        <button
          onClick={() => (window.location.href = "/admin")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Admin Login
        </button>
      </header>

      <div className="grid grid-cols-2 gap-6">
        <Link href="/lobby/cities/london" className="block p-6 bg-pink-300 rounded hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-4">London</h3>
          {/* placeholder or thumbnail here */}
        </Link>
        <Link href="/lobby/cities/cambridge" className="block p-6 bg-pink-300 rounded hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-4">Cambridge</h3>
        </Link>
        {/* add more city cards */}
      </div>
    </main>
  );
}
