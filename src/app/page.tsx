// src/app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center bg-purple-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Asri’s Archive
        </h1>
        <Link href="/lobby">
          <button className="px-8 py-3 border-2 border-black rounded-full hover:bg-gray-700 hover:text-white transition">
            Enter
          </button>
        </Link>
      </div>
    </main>
  );
}
