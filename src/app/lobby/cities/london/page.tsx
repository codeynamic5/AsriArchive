// src/app/lobby/cities/london/page.tsx
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";           // now resolves!
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function LondonPage() {
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "cities", "london", "collections"),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snap) =>
      setCollections(snap.docs.map((d) => d.data()))
    );
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">London</h1>
      <div className="grid grid-cols-3 gap-4">
        {collections.map((col, i) => (
          <div key={i} className="border rounded p-4">
            <h2 className="font-semibold mb-2">{col.title}</h2>
            <img
              src={col.images[0].url}
              alt={col.title}
              className="w-full h-40 object-cover rounded"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
