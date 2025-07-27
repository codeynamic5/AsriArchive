// src/app/lobby/cities/london/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";

interface Collection {
  title: string;
  images: { url: string; name: string }[];
}

export default function LondonPage() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "cities", "london", "collections"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      const cols: Collection[] = snap.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
          title: data.title as string,
          images: (data.images as any[]).map((img) => ({
            url: img.url as string,
            name: img.name as string,
          })),
        };
      });
      setCollections(cols);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">London</h1>
      <div className="grid grid-cols-3 gap-4">
        {collections.map((col, idx) => (
          <div key={idx} className="border rounded p-4">
            <h2 className="font-semibold mb-2">{col.title}</h2>
            {col.images[0] && (
              <Image
                src={col.images[0].url}
                alt={col.title}
                width={300}
                height={200}
                className="rounded object-cover"
                priority={idx === 0}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
